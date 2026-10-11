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
        MOCKUP BELOW &mdash; illustrative EHR chrome and an unpopulated example patient, not a real EHR
        product. But the launch mechanism underneath it is real, not mocked:
      </p>
      <div className="ts-ehr__liveproof">
        <p className="ts-real-badge ts-real-badge--cited" style={{ marginBottom: 8 }}>LIVE &middot; REAL SMART ON FHIR LAUNCH</p>
        <p>
          Signal Card now has a real SMART App Launch endpoint (OAuth2 + PKCE, via the standard{' '}
          <code>fhirclient</code> library), tested end-to-end against the public SMART Health IT
          sandbox: real authorization request, real provider login, real patient selection, real
          token exchange, real <code>Patient.read</code> FHIR call returning a real synthetic
          patient record. No part of that mechanism is faked.
        </p>
        <a
          className="ts-btn ts-btn--outline"
          href="https://launch.smarthealthit.org/?launch_url=https%3A%2F%2Fraymonetech.com%2Ftruesignalanalytics%2Fehr-launch"
          target="_blank"
          rel="noreferrer"
        >
          Try the real launch &rarr;
        </a>
        <p className="ts-hint" style={{ marginTop: 8 }}>
          The launch now also maps what a real chart can honestly supply into Signal Card
          automatically &mdash; a real ZIP-matched county, real condition-keyword symptom
          matches, a real Occupation observation if one exists &mdash; and says so per field.
          Tick-bite recall and symptom duration have no standard FHIR equivalent in any chart, so
          they're always left for the clinician to ask, never silently defaulted into the score.
        </p>
      </div>
      <p className="ts-demo__note" style={{ marginTop: 16 }}>
        The chrome below remains an illustrative mockup, not a real EHR product or real patient data.
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
        <h3>The actual technical plan</h3>
        <ol>
          <li>
            <b>SMART on FHIR App Launch</b> &mdash; <i>done, not just planned.</i> The launch/redirect pair above
            is live at <code>/truesignalanalytics/ehr-launch</code> and <code>/truesignalanalytics/ehr-app</code>,
            tested end-to-end against the public sandbox. The FHIR RiskAssessment resource already built (see
            the live demo) is exactly the payload a real EHR launch would read and write back.
          </li>
          <li>
            <b>Automatic hand-off into scoring</b> &mdash; <i>done, with honest limits.</i> The launch maps real
            address/condition/occupation data into Signal Card automatically where a chart can actually supply
            it, and flags every field it can't (tick-bite recall, symptom duration have no FHIR equivalent in
            any chart) rather than guessing. See <code>ehrMapping.js</code> for exactly what's matched and how.
          </li>
          <li>
            <b>CDS Hooks</b> (patient-view or order-select hook) remains a realistic alternative or complement
            &mdash; it would trigger Signal Card's logic automatically at a workflow moment, rather than
            requiring the clinician to open an app at all. Not started.
          </li>
          <li>
            <b>What's still required for a real pilot:</b> registering Signal Card with a vendor EHR's actual
            (non-sandbox) app directory, a security/privacy review before touching real patient data, and a
            pilot clinic willing to test a real launch. None of this has started &mdash; named here as the
            concrete next step, not claimed as done.
          </li>
        </ol>
      </div>
    </div>
  </section>
)

export default EHRMockup
