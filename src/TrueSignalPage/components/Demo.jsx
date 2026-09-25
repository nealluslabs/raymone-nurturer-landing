import React, { useMemo, useState } from 'react'
import { buildRiskAssessment } from '../fhir'

const COUNTIES = [
  { label: 'Litchfield County, CT — High', tier: 'high', zip: '06759' },
  { label: 'Bucks County, PA — High', tier: 'high', zip: '18901' },
  { label: 'Hennepin County, MN — Moderate', tier: 'mod', zip: '55401' },
  { label: 'Fulton County, GA — Low', tier: 'low', zip: '30301' },
]

const SYMPTOMS = [
  { key: 'fatigue', label: 'Fatigue' },
  { key: 'joint', label: 'Joint pain' },
  { key: 'fog', label: 'Brain fog' },
  { key: 'rash', label: 'Rash noticed' },
]

// Sourced from ccw-analysis/analyze.py (2026-09-24 run) — a corrected cohort analysis
// (flagged cohort N, conversion to Lyme within 12mo = P, rate = P/N) run against a
// SYNTHETIC CCW-schema dataset, not real Medicare claims. Numbers will be replaced
// once the real CMS CCW Limited Data Set request is approved and the same script is
// re-run against it unchanged.
const COUNTY_MODEL = {
  high: { conversionPct: 13.25, n: 1215, p: 161 },
  mod: { conversionPct: 5.6, n: 1662, p: 93 },
  low: { conversionPct: 1.37, n: 1756, p: 24 },
}

function computeScore({ symptoms, bite, occ, countyIdx, duration }) {
  const county = COUNTIES[countyIdx]
  let score = 5
  const factors = []

  const geo = county.tier === 'high' ? 35 : county.tier === 'mod' ? 15 : 5
  score += geo
  factors.push(['County tick-incidence tier', `${county.tier === 'high' ? 'High' : county.tier === 'mod' ? 'Moderate' : 'Low'} (+${geo})`])

  const occAdd = occ === 'yes' ? 20 : 0
  score += occAdd
  factors.push(['Outdoor / agricultural occupation', occ === 'yes' ? `Yes (+${occAdd})` : 'No (+0)'])

  const symAdd = symptoms.length * 8
  score += symAdd
  factors.push(['Symptom cluster', `${symptoms.length}/4 present (+${symAdd})`])

  const biteAdd = bite === 'yes' ? 15 : 0
  score += biteAdd
  factors.push(['Tick bite recalled', bite === 'yes' ? `Yes (+${biteAdd})` : 'No (+0)'])

  const durAdd = duration === 'long' ? 10 : duration === 'mid' ? 5 : 0
  score += durAdd
  factors.push(['Symptom duration', `${duration === 'long' ? '>3 months' : duration === 'mid' ? '1–3 months' : '<4 weeks'} (+${durAdd})`])

  score = Math.max(2, Math.min(95, score))
  const tier = score >= 60 ? 'Elevated' : score >= 30 ? 'Moderate' : 'Low'

  // Modeled conversion rate for this county's tick-incidence tier, from the synthetic
  // CCW cohort analysis — replaces the earlier arbitrary 28/18/6 placeholder.
  const model = COUNTY_MODEL[county.tier]
  const conversionPct = model.conversionPct
  const nonConversionPct = +(100 - conversionPct).toFixed(1)

  const nextStep =
    tier === 'Elevated'
      ? 'Recommend two-tier Lyme serology (ELISA, reflex Western blot); document occupational and geographic exposure history.'
      : tier === 'Moderate'
      ? 'Consider two-tier serology if symptoms persist beyond two weeks; note exposure risk in the chart.'
      : 'Continue routine care; reassess if symptoms progress or new exposure is reported.'
  const patientBody =
    tier === 'Elevated'
      ? "Your symptoms, where you live, and your outdoor work add up to a higher chance this could be tick-related. This is not a diagnosis — it's a reason to ask your doctor about a tick disease blood test."
      : tier === 'Moderate'
      ? "There's some chance your symptoms could be tick-related, based on where you live and your recent activity. Worth mentioning to your doctor if things don't improve soon."
      : "Based on what you've shared, a tick-related cause looks less likely right now — but tell your doctor if new symptoms or a bite show up."

  return { score, tier, conversionPct, nonConversionPct, model, nextStep, patientBody, factors, zip: county.zip }
}

const riskColor = (tier) =>
  tier === 'Elevated' ? 'var(--ts-risk-high)' : tier === 'Moderate' ? 'var(--ts-risk-mod)' : 'var(--ts-risk-low)'

const Demo = () => {
  const [symptoms, setSymptoms] = useState(['fatigue', 'joint', 'fog'])
  const [bite, setBite] = useState('no')
  const [occ, setOcc] = useState('yes')
  const [countyIdx, setCountyIdx] = useState(0)
  const [duration, setDuration] = useState('long')

  const toggleSymptom = (key) =>
    setSymptoms((prev) => (prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]))

  const result = useMemo(
    () => computeScore({ symptoms, bite, occ, countyIdx, duration }),
    [symptoms, bite, occ, countyIdx, duration]
  )

  const [showFhir, setShowFhir] = useState(false)
  const fhirResource = useMemo(
    () => buildRiskAssessment({ result, symptoms, bite, occ, county: COUNTIES[countyIdx], duration }),
    [result, symptoms, bite, occ, countyIdx, duration]
  )
  const fhirJson = useMemo(() => JSON.stringify(fhirResource, null, 2), [fhirResource])

  const downloadFhir = () => {
    const blob = new Blob([fhirJson], { type: 'application/fhir+json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'signal-card-risk-assessment.fhir.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section id="demo" className="ts-section ts-demo">
      <div className="ts-container">
        <p className="ts-eyebrow">Try it</p>
        <h2>Signal Card</h2>
        <p className="ts-demo__note">
          EXAMPLE ASSESSMENT &mdash; conversion-rate figures below come from a synthetic CCW-schema cohort model (not real Medicare claims), built to be re-run unchanged once real CMS CCW data arrives. No patient data is stored or transmitted.
        </p>

        <div className="ts-instrument">
          {/* Intake */}
          <div className="ts-panel">
            <div className="ts-panel-head"><h4>Intake</h4><span className="idx">01 / visit</span></div>
            <div className="ts-panel-body">
              <div className="ts-field-row">
                <span className="ts-field-num">1</span>
                <div>
                  <span className="ts-field-label">Symptoms present today</span>
                  <div className="ts-checks">
                    {SYMPTOMS.map((s) => (
                      <label key={s.key} className={`ts-chk${symptoms.includes(s.key) ? ' on' : ''}`}>
                        <input type="checkbox" checked={symptoms.includes(s.key)} onChange={() => toggleSymptom(s.key)} />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ts-field-row">
                <span className="ts-field-num">2</span>
                <div>
                  <span className="ts-field-label">Tick bite recalled?</span>
                  <div className="ts-radio-row">
                    <label className={bite === 'no' ? 'on' : ''}>
                      <input type="radio" name="bite" checked={bite === 'no'} onChange={() => setBite('no')} />No
                    </label>
                    <label className={bite === 'yes' ? 'on' : ''}>
                      <input type="radio" name="bite" checked={bite === 'yes'} onChange={() => setBite('yes')} />Yes
                    </label>
                  </div>
                </div>
              </div>

              <div className="ts-field-row">
                <span className="ts-field-num">3</span>
                <div>
                  <span className="ts-field-label" id="county-select-label">County / tick-incidence tier (CDC Tick Data &amp; Tracker)</span>
                  <select
                    className="ts-select"
                    aria-labelledby="county-select-label"
                    value={countyIdx}
                    onChange={(e) => setCountyIdx(Number(e.target.value))}
                  >
                    {COUNTIES.map((c, i) => (
                      <option key={c.label} value={i}>{c.label}</option>
                    ))}
                  </select>
                  <p className="ts-hint">ZIP {result.zip} &middot; tier drives the geographic-exposure term below</p>
                </div>
              </div>

              <div className="ts-field-row">
                <span className="ts-field-num">4</span>
                <div>
                  <span className="ts-field-label">Outdoor / agricultural occupation?</span>
                  <div className="ts-radio-row">
                    <label className={occ === 'yes' ? 'on' : ''}>
                      <input type="radio" name="occ" checked={occ === 'yes'} onChange={() => setOcc('yes')} />Yes
                    </label>
                    <label className={occ === 'no' ? 'on' : ''}>
                      <input type="radio" name="occ" checked={occ === 'no'} onChange={() => setOcc('no')} />No
                    </label>
                  </div>
                </div>
              </div>

              <div className="ts-field-row">
                <span className="ts-field-num">5</span>
                <div>
                  <span className="ts-field-label" id="duration-select-label">Symptom duration, unresolved</span>
                  <select
                    className="ts-select"
                    aria-labelledby="duration-select-label"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="short">Under 4 weeks</option>
                    <option value="mid">1&ndash;3 months</option>
                    <option value="long">Over 3 months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Readout */}
          <div className="ts-panel">
            <div className="ts-panel-head"><h4>Signal readout</h4><span className="idx">clinician view</span></div>
            <div className="ts-panel-body">
              <div className="ts-meter-row">
                <span className="ts-meter-tier" style={{ color: riskColor(result.tier) }}>{result.tier}</span>
                <span className="ts-meter-score">score {result.score} / 100</span>
              </div>
              <div className="ts-meter-track">
                <div className="ts-meter-fill" style={{ width: `${result.score}%`, background: riskColor(result.tier) }} />
              </div>
              <div className="ts-meter-ticks">
                <span>0 &mdash; low</span><span>30 &mdash; moderate</span><span>60 &mdash; elevated</span><span>100</span>
              </div>

              <ul className="ts-factor-list">
                {result.factors.map(([k, v]) => (
                  <li className="ts-factor" key={k}><span className="k">{k}</span><span className="v">{v}</span></li>
                ))}
              </ul>

              <div className="ts-stat-strip2">
                <div className="ts-stat2"><div className="label">Modeled non-conversion</div><div className="value">~{result.nonConversionPct}%</div></div>
                <div className="ts-stat2"><div className="label">Basis</div><div className="value" style={{ fontSize: 12.5 }}>Synthetic CCW cohort, n={result.model.n} (this county tier)</div></div>
              </div>

              <div className="ts-next-step"><b>Suggested next step</b>{result.nextStep}</div>
              <p className="ts-disclaimer">
                Modeled non-conversion rate comes from a corrected cohort analysis (flagged cohort N, conversion to
                Lyme within 12 months = P, rate = P/N) run against a <b>synthetic</b> CCW-schema dataset &mdash; not real
                Medicare claims. The same script is designed to run unchanged against the real CMS CCW Limited Data
                Set once that request is approved. Separately, published literature indicates early two-tier Lyme
                serology misses roughly 3 in 4 true cases (Branda et al., 2017) &mdash; a distinct testing-sensitivity
                limitation this score does not resolve, which is why any elevated flag still recommends serology
                and clinical follow-up rather than treating the score itself as a diagnosis.
              </p>

              <div className="ts-fhir">
                <div className="ts-fhir__row">
                  <button type="button" className="ts-btn ts-btn--outline" onClick={() => setShowFhir((v) => !v)} aria-expanded={showFhir}>
                    {showFhir ? 'Hide' : 'View'} FHIR output
                  </button>
                  <button type="button" className="ts-btn ts-btn--outline" onClick={downloadFhir}>
                    Download FHIR (.json)
                  </button>
                </div>
                <p className="ts-hint">
                  A standards-valid FHIR R4 RiskAssessment resource generated from this result &mdash; not a working
                  EHR integration (that's a separate, larger effort), but a real, exportable interoperability output.
                </p>
                {showFhir && <pre className="ts-fhir__code">{fhirJson}</pre>}
              </div>
            </div>
          </div>
        </div>

        <div className="ts-variants">
          <div>
            <p className="ts-variant-tag">Patient view &mdash; plain language</p>
            <div className="ts-patient-card">
              <span className="p-tier">{result.tier === 'Elevated' ? 'Higher chance' : result.tier === 'Moderate' ? 'Some chance' : 'Lower chance'}</span>
              <p>{result.patientBody}</p>
              <span className="p-foot">Based on a synthetic model (not yet real patient data): about {result.nonConversionPct} in 100 people with this county's profile did not turn out to have Lyme &mdash; worth testing, not worth panic.</span>
            </div>
          </div>
          <div>
            <p className="ts-variant-tag">Community health worker &mdash; offline lookup</p>
            <div className="ts-offline-card">
              <table>
                <thead><tr><th>County tier</th><th>Outdoor work</th><th>Guidance</th></tr></thead>
                <tbody>
                  <tr><td>High</td><td>Yes</td><td>Elevated &mdash; refer for testing</td></tr>
                  <tr><td>High</td><td>No</td><td>Moderate &mdash; monitor, ask re: exposure</td></tr>
                  <tr><td>Moderate</td><td>Yes</td><td>Moderate &mdash; monitor closely</td></tr>
                  <tr><td>Low</td><td>Any</td><td>Low &mdash; routine care</td></tr>
                </tbody>
              </table>
              <div className="ts-offline-note"><span className="ts-offline-dot" />No connectivity required &mdash; preloaded card, plain-language guidance only.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Demo
