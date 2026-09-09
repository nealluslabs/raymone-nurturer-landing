import React from 'react'

const Hero = () => (
  <header className="ts-hero">
    <div className="ts-container">
      <div className="ts-hero__inner">
        <p className="ts-eyebrow">TOPx HHS Tech Sprint · Lyme Innovation</p>
        <h1>The tick bite nobody remembers shouldn't cost a year of not being believed.</h1>
        <p className="ts-hero__sub">
          Signal Card is a point-of-care risk tool that surfaces a Lyme disease signal at the visit —
          built entirely from federal open data, before a diagnosis takes months to happen.
        </p>
        <div className="ts-hero__actions">
          <a href="#demo" className="ts-btn ts-btn--primary">Try Signal Card &rarr;</a>
          <a href="#how-it-works" className="ts-btn ts-btn--outline">How it works</a>
        </div>
      </div>

      <div className="ts-stat-strip">
        <div className="ts-stat">
          <div className="num">5&ndash;11 mo.</div>
          <div className="lbl">typical time-to-diagnosis in the patient journeys we studied</div>
        </div>
        <div className="ts-stat">
          <div className="num">8</div>
          <div className="lbl">real interviews grounding the product, not assumed personas</div>
        </div>
        <div className="ts-stat">
          <div className="num">4</div>
          <div className="lbl">public federal datasets powering the score, no PHI required</div>
        </div>
      </div>
    </div>
  </header>
)

export default Hero
