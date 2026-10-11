import React from 'react'

// Sourced from ccw-analysis/analyze.py (2026-09-24 run), trueCostCostCardInputs block --
// the same corrected cohort analysis that powers Signal Card's disclosed conversion rate
// also produces these figures from one data pull, per the reviewer's own suggestion.
// SYNTHETIC data -- not real Medicare claims. Will be re-run against the real CMS CCW
// Limited Data Set once that request is approved.
const COST_MODEL = {
  meanDaysToDiagnosis: 148,
  meanPreDiagnosisCostPerPatient: 568.64,
  totalPreDiagnosisCostAcrossCohort: 158081.64,
  patientsRepresented: 278,
}

const fmtUSD = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const fmtUSD0 = (n) => `$${Math.round(n).toLocaleString('en-US')}`

const CostCard = () => {
  const months = (COST_MODEL.meanDaysToDiagnosis / 30.4).toFixed(1)

  return (
    <section id="cost" className="ts-section ts-cost ts-no-print">
      <div className="ts-container">
        <p className="ts-eyebrow">Secondary deliverable &mdash; True Cost</p>
        <h2>True Cost Card</h2>
        <p className="ts-cost__lede">
          The same CCW cohort pull that powers Signal Card's detection score also reveals what patients pay
          while waiting for the right diagnosis &mdash; one data pull, two deliverables. This keeps the original
          True Cost concept alive as a named secondary output, for the payer and policy audiences who validated
          real demand for it in Milestone 1 (Karen, an insurance reviewer; Tom, a state policy stakeholder).
        </p>
        <p className="ts-demo__note">
          SYNTHETIC MODEL &mdash; from the same cohort analysis as Signal Card (n={COST_MODEL.patientsRepresented}
          {' '}patients who converted to a Lyme diagnosis within 12 months). Not real Medicare claims; pending the
          CMS CCW Limited Data Set request.
        </p>

        <div className="ts-cost__grid">
          <div>
            <p className="ts-variant-tag">Patient view &mdash; the receipt nobody gave you</p>
            <div className="ts-patient-card">
              <span className="p-tier">{months} months</span>
              <p>
                On average, patients in this synthetic model spent about <b>{COST_MODEL.meanDaysToDiagnosis} days</b>
                {' '}and <b>{fmtUSD(COST_MODEL.meanPreDiagnosisCostPerPatient)}</b> in visits coded to fatigue,
                fibromyalgia, or anxiety before the correct Lyme diagnosis was made.
              </p>
              <span className="p-foot">
                Every figure here traces back to the same CCW cohort model behind Signal Card's score &mdash;
                nothing here is invented separately.
              </span>
            </div>
          </div>

          <div>
            <p className="ts-variant-tag">Payer / policymaker view &mdash; aggregate burden</p>
            <div className="ts-stat-strip2" style={{ marginTop: 0 }}>
              <div className="ts-stat2">
                <div className="label">Total pre-diagnosis spend</div>
                <div className="value">{fmtUSD0(COST_MODEL.totalPreDiagnosisCostAcrossCohort)}</div>
              </div>
              <div className="ts-stat2">
                <div className="label">Patients represented</div>
                <div className="value">{COST_MODEL.patientsRepresented}</div>
              </div>
            </div>
            <p className="ts-disclaimer" style={{ marginTop: 14 }}>
              Intended use: a structured, source-traceable summary for insurance-appeal documentation (Karen's
              use case) and public-health budget justification (Tom's use case) &mdash; the same two audiences
              named in the original True Cost concept, now fed by a single validated data pipeline instead of a
              separate analysis effort.
            </p>
          </div>
        </div>

        <div className="ts-disclosure" style={{ marginTop: 28 }}>
          <b>Independent, real-world precedent for this pattern:</b> AHRQ's own published MEPS research found
          that women 18+ with a cluster of hard-to-diagnose chronic pain conditions &mdash; including chronic
          fatigue syndrome and fibromyalgia &mdash; had mean annual health care costs of <b>$10,542</b>, versus
          <b> $4,357</b> for women without, a real, federally-documented excess-cost burden (Soni, A.,
          <i> Health Care Use and Expenditures for Pain Conditions among Women 18 and Older</i>, AHRQ Statistical
          Brief #342, September 2011, based on 2008 MEPS data). This is a different, broader condition group
          than Lyme specifically, not Lyme-specific data, and 18 years old &mdash; cited here as real supporting
          evidence that the underlying phenomenon (vague, dismissed symptom clusters carrying real excess cost)
          is independently documented, not as an input to the cost figures above.
        </div>
      </div>
    </section>
  )
}

export default CostCard
