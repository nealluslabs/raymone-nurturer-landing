import React, { useEffect, useState } from 'react'
import FHIR from 'fhirclient/browser'

// Redirect target for the SMART App Launch started in EHRLaunchPage. This
// completes the real OAuth2 token exchange (FHIR.oauth2.ready()) against
// whatever FHIR server launched us, then makes a real FHIR Patient.read
// call. Everything shown under "Fetched from the real FHIR server" below
// is live data returned by that call, not a mockup. What it does NOT do is
// recompute a Signal Card score from this real patient context yet &mdash;
// that hand-off (mapping a fetched Condition/Observation list into
// computeScore()) is the next concrete engineering step, named honestly
// at the bottom of this page instead of faked.
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
        setState({ status: 'ready', client, patient, encounter })
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

  const { patient, encounter, client } = state
  const name = patient.name && patient.name[0]
    ? [...(name_given(patient)), ...(name_family(patient))].join(' ')
    : '(name not provided by server)'

  return (
    <Shell>
      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#1E7A4C' }}>
        LIVE &middot; REAL SMART ON FHIR LAUNCH COMPLETED
      </p>
      <h2>Connected to patient context</h2>
      <p>
        This is a real OAuth2 token exchange and a real <code>Patient.read</code> FHIR call against
        the server that launched this app &mdash; not a mockup.
      </p>
      <div style={boxStyle}>
        <p><b>FHIR server (iss):</b> {client.state.serverUrl}</p>
        <p><b>Patient ID:</b> {patient.id}</p>
        <p><b>Name:</b> {name}</p>
        <p><b>Gender:</b> {patient.gender || '(not provided)'}</p>
        <p><b>Birth date:</b> {patient.birthDate || '(not provided)'}</p>
        {encounter && <p><b>Encounter:</b> {encounter.id}</p>}
      </div>
      <p className="ts-hint" style={{ marginTop: 16 }}>
        Honest next step, not yet built: map this patient's real Conditions/Observations into
        Signal Card's existing <code>computeScore()</code> pipeline automatically, instead of the
        clinician re-entering county/occupation/symptoms by hand. Today, continue manually into the
        live demo with this patient context in mind:
      </p>
      <a className="ts-btn ts-btn--primary" href="/truesignalanalytics#demo" style={{ marginTop: 12, display: 'inline-block' }}>
        Continue to Signal Card &rarr;
      </a>
    </Shell>
  )
}

function name_given(patient) {
  return (patient.name[0].given || [])
}
function name_family(patient) {
  return patient.name[0].family ? [patient.name[0].family] : []
}

const Shell = ({ children }) => (
  <div style={pageStyle}><div style={cardStyle}>{children}</div></div>
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
const boxStyle = {
  background: '#F3F6F2',
  borderRadius: 8,
  padding: '12px 16px',
  marginTop: 16,
  fontSize: 14,
  lineHeight: 1.6,
}

export default EHRAppPage
