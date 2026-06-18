import React from 'react'

const START_OPTIONS = [
  {
    title: 'Explore the Platform',
    body: "See how agents work. Try building one. Discover what's possible.",
    cta: 'Start Free',
    variant: 'primary',
  },
  {
    title: 'See a Demo',
    body: 'Watch an agent solve a real problem in your domain.',
    cta: 'Request Demo',
    variant: 'outline',
  },
  {
    title: 'Talk to Our Team',
    body: 'Build something custom. Scale across your organization.',
    cta: 'Book a Call',
    variant: 'outline',
  },
  {
    title: 'Developer Resources',
    body: 'Dive into docs, frameworks, and open source tools.',
    cta: 'Visit GitHub',
    variant: 'outline',
  },
]

const GetStarted = () => (
  <section id="start" className="agents-section agents-section--deep">
    <div className="agents-container">
      <header className="agents-section-header agents-section-header--center agents-section-header--740">
        <p className="agents-eyebrow">Get Started</p>
        <h2 className="agents-heading-xl agents-heading-xl--light">Ready to Build?</h2>
        <p className="agents-section-intro agents-section-intro--light">
          Whether you're exploring what agents can do for your team or ready to build custom systems,
          we're here to help.
        </p>
      </header>

      <div className="agents-grid agents-grid--4">
        {START_OPTIONS.map(({ title, body, cta, variant }) => (
          <article key={title} className="agents-start-card">
            <h3 className="agents-start-card__title">{title}</h3>
            <p className="agents-start-card__body">{body}</p>
            <a
              href="#start"
              className={`agents-btn agents-btn--block agents-btn--${variant === 'primary' ? 'primary' : 'outline'}`}
            >
              {cta}
            </a>
          </article>
        ))}
      </div>

      <p className="agents-start-tagline">
        Agents for engineering. Sales. Marketing. Operations.{' '}
        <strong>Every role. Every industry.</strong> Build the future with AI that actually works.
      </p>
    </div>
  </section>
)

export default GetStarted
