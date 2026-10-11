import React from 'react'

const sources = [
  { src: 'CDC Tick Data & Tracker', role: 'County-level tickborne-disease incidence — the geographic exposure signal. Live in Signal Card today: real case counts and rates per 100k, not modeled.', real: true },
  { src: 'AHRQ MEPS', role: 'Population-level condition and expenditure patterns, used to calibrate base rates. Public use files, no approval required — not yet pulled into the model.' },
  { src: 'AHRQ HCUP', role: 'Regional hospital and ED utilization patterns. DUA submitted, awaiting response.' },
  { src: 'BLS / Census ACS', role: 'Occupational and geographic exposure risk — outdoor and agricultural work. Public, no approval required — not yet pulled into the model.' },
]

const DataRigor = () => (
  <section id="data" className="ts-section ts-no-print">
    <div className="ts-container">
      <p className="ts-eyebrow">Data &amp; rigor</p>
      <h2>Built on public federal data. Nothing else.</h2>
      <div className="ts-data-grid">
        {sources.map((s) => (
          <div className="ts-data-card" key={s.src}>
            <div className="src">{s.src}{s.real && <span className="ts-real-badge">LIVE &middot; REAL DATA</span>}</div>
            <p>{s.role}</p>
          </div>
        ))}
      </div>
      <div className="ts-disclosure">
        <b>Where we are today:</b> geographic exposure risk is grounded in real CDC county-level
        tickborne-disease data, not a guess. The risk-score point weights and the disclosed
        non-conversion rate are still illustrative/synthetic, pending calibration against real
        MEPS/HCUP/CCW data — we say so on the tool itself rather than overstate what's proven this
        early. CCW and HCUP requests are both filed and submitted, awaiting response; MEPS and BLS/ACS
        public files need no approval and are the next real-data integration planned. None of this
        blocks what's live today.
      </div>
    </div>
  </section>
)

export default DataRigor
