import React from 'react'

const steps = [
  { n: '01', title: 'Enter', body: "Symptoms, ZIP code, and occupation — entered at the visit, by the clinician or the patient." },
  { n: '02', title: 'Score', body: 'Compared against real federal surveillance and utilization patterns: tick incidence, occupational exposure, population base rates.' },
  { n: '03', title: 'Disclose', body: "Every score ships with its false-positive rate and a plain 'this is not a diagnosis' statement." },
  { n: '04', title: 'Act', body: 'A concrete next step, not just a number — e.g., consider two-tier Lyme serology.' },
]

const HowItWorks = () => (
  <section id="how-it-works" className="ts-section">
    <div className="ts-container">
      <p className="ts-eyebrow">How it works</p>
      <h2>Four steps, at the point of care</h2>
      <div className="ts-steps">
        {steps.map((s) => (
          <div className="ts-step" key={s.n}>
            <div className="n">{s.n}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default HowItWorks
