import React from 'react'

const WORK_OPTIONS = [
  {
    title: 'Platform',
    subtitle: 'Self-Serve Agent Builder',
    body: 'For product teams and startups building agent-powered features. Drag, configure, deploy. Pre-built agent types. Integrations with your stack. Go from idea to production in weeks, not months.',
    cta: 'Explore the Platform',
    href: '#start',
    accent: 'primary',
  },
  {
    title: 'Services',
    subtitle: 'Custom Architecture & Implementation',
    body: 'For enterprises building proprietary agent systems. We architect multi-agent frameworks tailored to your domain. Training, deployment, and ongoing optimization. Your team owns the system.',
    cta: 'Talk to Our Team',
    href: '#start',
    accent: 'neutral',
  },
  {
    title: 'Open Source',
    subtitle: 'Frameworks, Tools & Community',
    body: 'For developers building from first principles. Opinionated but flexible frameworks. Tools for evaluation, orchestration, and observability. Build in the open, contribute back.',
    cta: 'Check Out Our Repo',
    href: '#start',
    accent: 'neutral',
  },
]

const WorkWithUs = () => (
  <section id="work" className="agents-section agents-section--light">
    <div className="agents-container">
      <header className="agents-section-header agents-section-header--center agents-section-header--760">
        <p className="agents-eyebrow">Three Ways to Work With Us</p>
        <h2 className="agents-heading-lg">Flexibility Built In</h2>
      </header>

      <div className="agents-grid agents-grid--3 agents-grid--work">
        {WORK_OPTIONS.map(({ title, subtitle, body, cta, href, accent }) => (
          <article
            key={title}
            className={`agents-work-card agents-work-card--${accent}`}
          >
            <h3 className="agents-work-card__title">{title}</h3>
            <p className="agents-work-card__subtitle">{subtitle}</p>
            <p className="agents-work-card__body">{body}</p>
            <a href={href} className="agents-text-link">
              {cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default WorkWithUs
