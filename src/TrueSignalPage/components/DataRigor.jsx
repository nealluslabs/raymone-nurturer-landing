import React from 'react'

const sources = [
  { src: 'CDC Tick Data & Tracker', role: 'County-level tick and tickborne-disease incidence — the geographic exposure signal.' },
  { src: 'AHRQ MEPS', role: 'Population-level condition and expenditure patterns, used to calibrate base rates.' },
  { src: 'AHRQ HCUP', role: 'Regional hospital and ED utilization patterns.' },
  { src: 'BLS / Census ACS', role: 'Occupational and geographic exposure risk — outdoor and agricultural work.' },
]

const DataRigor = () => (
  <section id="data" className="ts-section">
    <div className="ts-container">
      <p className="ts-eyebrow">Data &amp; rigor</p>
      <h2>Built on public federal data. Nothing else.</h2>
      <div className="ts-data-grid">
        {sources.map((s) => (
          <div className="ts-data-card" key={s.src}>
            <div className="src">{s.src}</div>
            <p>{s.role}</p>
          </div>
        ))}
      </div>
      <div className="ts-disclosure">
        <b>Where we are today:</b> scoring logic is illustrative, pending calibration against fitted
        MEPS/HCUP statistics — we say so on the tool itself rather than overstate what's proven this
        early. A request for CMS CCW Medicare claims data is in progress; when it arrives, it becomes a
        second proof-of-concept validating the score against real longitudinal diagnosis histories,
        limited to the Medicare population. It does not block what's live today.
      </div>
    </div>
  </section>
)

export default DataRigor
