import React from 'react'
import {
  CodeIcon,
  TrendingUpIcon,
  TargetIcon,
  LayersIcon,
  CompassIcon,
  LayoutGridIcon,
} from './Icons'

const CAPABILITIES = [
  {
    icon: CodeIcon,
    title: 'Engineering Agents',
    body: 'Code review agents that catch regressions. Debugging agents that trace root causes. Architecture advisors that design systems. Let AI handle the pattern matching.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Sales Agents',
    body: 'Outreach agents that personalize at scale. Lead qualification agents that score and segment. Deal analysis agents that surface signals. Your team closes more deals.',
  },
  {
    icon: TargetIcon,
    title: 'Marketing Agents',
    body: 'Campaign optimization agents that test and learn. Content research agents that find angles. Competitive analysis agents that track the landscape. Insights that drive strategy.',
  },
  {
    icon: LayersIcon,
    title: 'Operations Agents',
    body: 'Data synthesis agents that connect silos. Process automation agents that handle routine work. Vendor evaluation agents that surface the right partners. Systems that scale without hiring.',
  },
  {
    icon: CompassIcon,
    title: 'Leadership Intelligence',
    body: "Agents that synthesize company data into strategic insights. Real-time dashboards of what matters. Pattern recognition across teams and metrics. Decision-making that's informed, not reactive.",
  },
  {
    icon: LayoutGridIcon,
    title: 'Your Domain',
    body: 'Not seeing your use case? Agents work wherever reasoning + data + action matter. From finance to HR, supply chain to customer success—if you have problems that need thinking, agents can solve them.',
    inverted: true,
  },
]

const Capabilities = () => (
  <section id="capabilities" className="agents-section agents-section--light">
    <div className="agents-container">
      <header className="agents-section-header agents-section-header--center agents-section-header--820">
        <p className="agents-eyebrow">What Agents Can Do</p>
        <h2 className="agents-heading-lg">
          From Vision to Execution—Agents Across Your Organization
        </h2>
      </header>

      <div className="agents-grid agents-grid--3">
        {CAPABILITIES.map(({ icon: Icon, title, body, inverted }) => (
          <article
            key={title}
            className={`agents-card agents-card--light${inverted ? ' agents-card--inverted' : ''}`}
          >
            <Icon className="agents-card__icon" />
            <h3 className="agents-card__title">{title}</h3>
            <p className="agents-card__body">{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Capabilities
