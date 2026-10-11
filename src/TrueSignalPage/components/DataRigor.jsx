import React from 'react'

const sources = [
  { src: 'CDC Tick Data & Tracker', role: 'County-level tickborne-disease case counts, sourced from CDC\'s NNDSS case surveillance — the geographic exposure signal. Live in Signal Card today: real case counts and rates per 100k, not modeled.', real: true },
  { src: 'CDC ArboNET', role: 'A different CDC system: state-level tick infection-prevalence surveillance (what % of ticks actually carry the Lyme bacterium), via Foster et al. 2023. Live in Signal Card today alongside the case rate — distinct measures, shown side by side, not combined.', real: true },
  { src: 'AHRQ MEPS', role: 'Population-level condition and expenditure patterns. Real published AHRQ statistic now cited in the True Cost Card (women with a fibromyalgia/chronic-fatigue-cluster condition: $10,542 vs $4,357 mean annual cost) — supporting context, not yet a direct input to Signal Card\'s scoring.', cited: true },
  { src: 'AHRQ HCUP', role: 'Regional hospital and ED utilization patterns. DUA submitted, awaiting response.' },
  { src: 'BLS / Census ACS', role: 'Real county-level agricultural/forestry/fishing/hunting/mining workforce share (Census ACS Subject Table S2403), shown as context next to the occupation question in Signal Card. A population statistic, not an individual risk signal — doesn\'t replace the patient\'s own yes/no answer.', cited: true },
]

const DataRigor = () => (
  <section id="data" className="ts-section ts-no-print">
    <div className="ts-container">
      <p className="ts-eyebrow">Data &amp; rigor</p>
      <h2>Built on public federal data. Nothing else.</h2>
      <div className="ts-data-grid">
        {sources.map((s) => (
          <div className="ts-data-card" key={s.src}>
            <div className="src">
              {s.src}
              {s.real && <span className="ts-real-badge">LIVE &middot; REAL DATA</span>}
              {s.cited && <span className="ts-real-badge ts-real-badge--cited">REAL CITATION</span>}
            </div>
            <p>{s.role}</p>
          </div>
        ))}
      </div>
      <div className="ts-disclosure">
        <b>Where we are today:</b> geographic exposure risk is grounded in real CDC county-level
        case data and real CDC ArboNET tick infection-prevalence data (two different CDC systems,
        shown as two different measures, not merged into one number); the True Cost Card cites a
        real published AHRQ MEPS statistic as supporting evidence; and real Census ACS occupational
        data now shows alongside the occupation question. The risk-score point weights and the
        disclosed non-conversion rate are still illustrative/synthetic, pending calibration against
        real HCUP/CCW data — we say so on the tool itself rather than overstate what's proven this
        early. CCW and HCUP requests are both filed and submitted, awaiting response. None of this
        blocks what's live today.
      </div>
    </div>
  </section>
)

export default DataRigor
