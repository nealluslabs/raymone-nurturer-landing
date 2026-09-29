import React from 'react'

const EHRMockup = () => (
  <section id="ehr" className="ts-section ts-ehr">
    <div className="ts-container">
      <p className="ts-eyebrow">Remaining gap &mdash; EHR / clinical-workflow integration</p>
      <h2>What embedded-in-the-visit would look like</h2>
      <p className="ts-cost__lede">
        Dr. Anand's core requirement from Milestone 1 was explicit: <i>"I'd trust a number I could see the
        reasoning behind. A black box that adds five minutes to my day is a hard no."</i> She meant embedded in
        her existing chart workflow, not a separate portal she has to remember to open. That isn't built yet
        &mdash; this is a mockup of the target, plus the real technical plan to get there, not a working
        integration.
      </p>
      <p className="ts-demo__note">
        MOCKUP &mdash; illustrative EHR chrome and an unpopulated example patient, not a real EHR product or
        real patient data. No working integration exists yet.
      </p>

      <div className="ts-ehr__frame">
        <div className="ts-ehr__topbar">
          <span className="ts-ehr__logo">Example EHR</span>
          <span className="ts-ehr__patient">Patient: J. Example &middot; DOB 01/01/1985 (placeholder) &middot; MRN 000000 (placeholder)</span>
        </div>
        <div className="ts-ehr__body">
          <div className="ts-ehr__nav">
            <span>Problem List</span>
            <span>Medications</span>
            <span>Labs</span>
            <span className="active">Visit Note</span>
            <span>Orders</span>
          </div>
          <div className="ts-ehr__note">
            <p className="ts-ehr__note-title">Visit Note &mdash; today</p>
            <p>CC: fatigue, joint pain x 3 months. Pt reports outdoor occupational exposure...</p>
            <p className="ts-ehr__note-placeholder">(example chart text, not a real note)</p>
          </div>
          <div className="ts-ehr__app">
            <div className="ts-ehr__app-head">
              <span>SMART on FHIR App</span>
              <b>Signal Card</b>
            </div>
            <div className="ts-ehr__app-body">
              <span className="ts-meter-tier" style={{ color: 'var(--ts-risk-high)', fontSize: 18 }}>Elevated</span>
              <p className="ts-ehr__app-line">Non-conversion (synthetic model): ~86.8%</p>
              <p className="ts-ehr__app-line">Basis: county tier, occupation, symptom cluster &mdash; tap to expand reasoning</p>
              <div className="ts-ehr__app-next"><b>Recommend:</b> two-tier Lyme serology (ELISA, reflex Western blot)</div>
              <p className="ts-hint" style={{ marginTop: 8 }}>
                On save, writes back as a FHIR RiskAssessment resource (see the live Signal Card demo above for the actual resource).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="ts-ehr__plan">
        <h3>The actual technical plan (not yet started)</h3>
        <ol>
          <li>
            <b>SMART on FHIR App Launch</b> is the primary intended path &mdash; the EHR launches Signal Card
            with OAuth2 context (patient, encounter, user) already established, so the clinician never leaves
            their chart. The FHIR RiskAssessment resource already built (see the live demo) is exactly the
            payload this launch pattern would read and write back.
          </li>
          <li>
            <b>CDS Hooks</b> (patient-view or order-select hook) is a realistic alternative or complement &mdash;
            it triggers Signal Card's logic automatically at a workflow moment, rather than requiring the
            clinician to open an app at all.
          </li>
          <li>
            <b>What's actually required to build this:</b> access to a vendor EHR sandbox (e.g., a public SMART
            sandbox for initial development), registering Signal Card as an app, a security/privacy review
            before touching any real patient context, and a pilot clinic willing to test a real launch. None of
            this has started &mdash; it's named here as the concrete next step, not claimed as done.
          </li>
        </ol>
      </div>
    </div>
  </section>
)

export default EHRMockup
