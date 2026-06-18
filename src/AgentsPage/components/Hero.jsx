import React from 'react'

const Hero = () => (
  <header id="top" className="agents-hero">
    <div className="agents-hero__glow" aria-hidden="true" />
    <div className="agents-hero__content">
      <p className="agents-eyebrow">Intelligent Agent Systems</p>
      <h1 className="agents-hero__title">
        AI Agents for <span className="agents-accent">Every Role</span>
      </h1>
      <p className="agents-hero__sub">
        Build intelligent systems that work like trusted team members—for your engineering team, your
        marketing, your sales, your operations.
      </p>
      <div className="agents-hero__actions">
        <a href="#work" className="agents-btn agents-btn--primary agents-btn--lg">
          Explore Platform <span aria-hidden="true">&rarr;</span>
        </a>
        <a href="#start" className="agents-btn agents-btn--outline agents-btn--lg">
          Book a Consultation
        </a>
      </div>
    </div>
  </header>
)

export default Hero
