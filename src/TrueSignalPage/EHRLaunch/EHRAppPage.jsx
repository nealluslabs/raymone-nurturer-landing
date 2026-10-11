import React, { useEffect, useState } from 'react'
import FHIR from 'fhirclient/browser'
import { COUNTIES } from '../components/Demo'
import { encodeStateToSearch } from '../shareLink'
import { mapPatientToSignalCardState } from '../ehrMapping'

// Redirect target for the SMART App Launch started in EHRLaunchPage. This completes
// the real OAuth2 token exchange (FHIR.oauth2.ready()) against whatever FHIR server
// launched us, then makes real Patient.read / Condition.search / Observation.search
// FHIR calls. The fetched-patient -> Signal Card hand-off (mapPatientToSignalCardState)
// is real, not a mockup -- but it's honest about its limits: it only pre-fills what a
// generic chart can actually supply (matched ZIP, matched condition keywords, a
// standard Occupation observation if present), and explicitly flags the two inputs
// (tick-bite recall, symptom duration) no standard chart carries at all, rather than
// silently defaulting them into the score. See ehrMapping.js for the real rationale.
const EHRAppPage = () => {
  const [state, setState] = useState({ status: 'connecting' })

  useEffect(() => {
    FHIR.oauth2
      .ready()
      .then(async (client) => {
        const patient = await client.patient.read()
        let encounter = null
        try {
          if (client.encounter && client.encounter.id) {
            encounter = await client.encounter.read()
          }
        } catch (e) {
          // encounter context not always present/readable in the launch; non-fatal
        }

        let conditions = []
        try {
          const bundle = await client.request(`Condition?patient=${patient.id}`)
          conditions = (bundle.entry || []).map((e) => e.resource)
        } catch (e) {
          // Condition search can fail on some sandbox configs; non-fatal -- mapping
          // below treats an empty list the same as "nothing found," honestly.
        }

        let occupationObservations = []
        try {
          const obsBundle = await client.request(`Observation?patient=${patient.id}&code=74165-2`)
          occupationObservations = (obsBundle.entry || []).map((e) => e.resource)
        } catch (e) {
          // non-fatal, same reasoning as above
        }

        const mapping = mapPatientToSignalCardState({ patient, conditions, occupationObservations, counties: COUNTIES })
        setState({ status: 'ready', client, patient, encounter, conditions, mapping })
      })
      .catch((e) => setState({ status: 'error', error: String(e) }))
  }, [])

  if (state.status === 'connecting') {
    return <Shell><h2>Completing SMART launch&hellip;</h2></Shell>
  }
  if (state.status === 'error') {
    return (
      <Shell>
        <h2>Launch did not complete</h2>
        <p>{state.error}</p>
      </Shell>
    )
  }

  const { patient, encounter, client, conditions, mapping } = state
  const name = patient.name && patient.name[0]
    ? [...(name_given(patient)), ...(name_family(patient))].join(' ')
    : '(name not provided by server)'

  const continueQs = encodeStateToSearch(mapping.state)
  const continueHref = `/truesignalanalytics?${continueQs}#demo`

  return (
    <Shell wide>
      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#1E7A4C' }}>
        LIVE &middot; REAL SMART ON FHIR LAUNCH COMPLETED
      </p>
      <h2>Connected to patient context</h2>
      <p>
        Real OAuth2 token exchange, then real <code>Patient.read</code>, <code>Condition.search</code>, and
        <code> Observation.search</code> FHIR calls against the server that launched this app &mdash; not a mockup.
      </p>
      <div style={boxStyle}>
        <p><b>FHIR server (iss):</b> {client.state.serverUrl}</p>
        <p><b>Patient ID:</b> {patient.id}</p>
        <p><b>Name:</b> {name}</p>
        <p><b>Gender:</b> {patient.gender || '(not provided)'}</p>
        <p><b>Birth date:</b> {patient.birthDate || '(not provided)'}</p>
        <p><b>Real chart conditions found:</b> {conditions.length}</p>
        {encounter && <p><b>Encounter:</b> {encounter.id}</p>}
      </div>

      <h3 style={{ marginTop: 24 }}>What we could &mdash; and couldn&rsquo;t &mdash; auto-fill from this real chart</h3>
      <ProvenanceRow label="County" item={mapping.provenance.county} />
      <ProvenanceRow label="Symptoms" item={mapping.provenance.symptoms} />
      <ProvenanceRow label="Occupation" item={mapping.provenance.occupation} />
      <ProvenanceRow label="Tick bite recall" item={mapping.provenance.bite} />
      <ProvenanceRow label="Symptom duration" item={mapping.provenance.duration} />

      <p className="ts-hint" style={{ marginTop: 16 }}>
        {mapping.provenance.county.status === 'derived'
          ? 'County was pre-filled from a real address match below.'
          : 'County could NOT be matched to one of our pilot counties &mdash; the link below defaults it for navigation only. Change the county dropdown before trusting any score.'}
        {' '}Tick bite and symptom duration are never chart-derivable and are always defaulted conservatively; ask the patient directly.
      </p>
      <a className="ts-btn ts-btn--primary" href={continueHref} style={{ marginTop: 12, display: 'inline-block' }}>
        Continue to Signal Card, pre-filled from this chart &rarr;
      </a>
    </Shell>
  )
}

const ProvenanceRow = ({ label, item }) => {
  const color = item.status === 'derived' ? '#1E7A4C' : item.status === 'none-found' || item.status === 'not-found' ? '#9A6B00' : '#8A3B2A'
  const tag = item.status === 'derived' ? 'REAL MATCH' : item.status === 'none-found' ? 'NONE FOUND' : item.status === 'not-covered' ? 'NOT COVERED' : item.status === 'not-found' ? 'NOT FOUND' : 'NOT DERIVABLE'
  return (
    <div style={{ marginTop: 10, paddingLeft: 10, borderLeft: `3px solid ${color}` }}>
      <p style={{ margin: 0, fontSize: 13 }}>
        <b>{label}</b> &mdash; <span style={{ color, fontWeight: 700, fontSize: 11, fontFamily: 'IBM Plex Mono, monospace' }}>{tag}</span>
      </p>
      <p style={{ margin: '2px 0 0', fontSize: 13, color: '#444' }}>{item.detail}</p>
    </div>
  )
}

function name_given(patient) {
  return (patient.name[0].given || [])
}
function name_family(patient) {
  return patient.name[0].family ? [patient.name[0].family] : []
}

const Shell = ({ children, wide }) => (
  <div style={pageStyle}><div style={wide ? cardStyleWide : cardStyle}>{children}</div></div>
)

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#F3F6F2',
  fontFamily: 'Inter, sans-serif',
  padding: 24,
}
const cardStyle = {
  maxWidth: 560,
  background: '#fff',
  borderRadius: 12,
  padding: 32,
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
}
const cardStyleWide = { ...cardStyle, maxWidth: 720 }
const boxStyle = {
  background: '#F3F6F2',
  borderRadius: 8,
  padding: '12px 16px',
  marginTop: 16,
  fontSize: 14,
  lineHeight: 1.6,
}

export default EHRAppPage
