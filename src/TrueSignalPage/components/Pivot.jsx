import React from 'react'

const Pivot = () => (
  <section className="ts-section ts-pivot ts-no-print">
    <div className="ts-container ts-pivot__grid">
      <div>
        <p className="ts-eyebrow">How we got here</p>
        <h2>A pivot we earned, not our starting idea</h2>
        <div className="ts-pivot__from-to">
          <span className="ts-pivot__pill ts-pivot__pill--was">True Cost — cost of illness</span>
          <span aria-hidden="true">&rarr;</span>
          <span className="ts-pivot__pill ts-pivot__pill--now">Signal Card — early detection</span>
        </div>
      </div>
      <div>
        <p>
          We entered the TOPx HHS Tech Sprint under the Cost of Illness challenge, pitching
          <strong> True Cost</strong> — a tool to quantify what the Lyme diagnostic odyssey costs
          patients and the system. HHS reassigned our team to the <strong>Lyme Innovation</strong> track,
          whose mandate is different: detect earlier, diagnose faster.
        </p>
        <p style={{ marginTop: 16 }}>
          Interviews with primary care clinicians and specialists confirmed the reassignment was right.
          One clinician told us she'd only trust a prompt embedded in her existing workflow, not a
          retrospective report. Another warned that any risk score needs to disclose its false-positive
          rate, or it risks doing real harm. Signal Card is what came out of that shift.
        </p>
        <p style={{ marginTop: 16 }}>
          The original cost model isn't gone — it's now a secondary tool for insurance appeals and
          public-health budget cases, validated by two further interviews in that world.
        </p>
      </div>
    </div>
  </section>
)

export default Pivot
