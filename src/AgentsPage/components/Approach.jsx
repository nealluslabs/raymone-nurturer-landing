import React from 'react'
import { ShareIcon, NetworkIcon, DatabaseIcon, EyeIcon } from './Icons'

const APPROACH_ITEMS = [
  {
    icon: ShareIcon,
    title: 'Multi-Agent Orchestration',
    body: 'Agents working together. One agent researches, another analyzes, a third decides. Complex problems require multiple perspectives—we handle the coordination so your systems think at scale.',
  },
  {
    icon: NetworkIcon,
    title: 'Knowledge Graphs',
    body: 'Structure matters. Your data lives in systems, databases, documents. Knowledge graphs let agents reason over what you actually know—not just what they hallucinate. Grounded intelligence.',
  },
  {
    icon: DatabaseIcon,
    title: 'RAG Pipelines',
    body: 'Retrieval-Augmented Generation means agents always pull from your ground truth before responding. Real data. Real context. Real answers. No making things up.',
  },
  {
    icon: EyeIcon,
    title: 'Observability & Control',
    body: 'You need to see what agents decide and why. Real-time traces. Decision logs. The ability to intervene. Build trust by making every agent decision auditable.',
  },
]

const Approach = () => (
  <section id="approach" className="agents-section agents-section--dark">
    <div className="agents-container agents-container--1100">
      <header className="agents-section-header agents-section-header--center agents-section-header--760">
        <p className="agents-eyebrow">How We Approach It</p>
        <h2 className="agents-heading-lg agents-heading-lg--light">
          Agents Built to Reason, Not Just Retrieve
        </h2>
        <p className="agents-section-intro agents-section-intro--light">
          Intelligent agents aren't just language models in a loop. They're systems that reason over
          structured knowledge, integrate with your tools, and operate with transparency and control.
        </p>
      </header>

      <div className="agents-grid agents-grid--2">
        {APPROACH_ITEMS.map(({ icon: Icon, title, body }) => (
          <article key={title} className="agents-card agents-card--dark">
            <Icon className="agents-card__icon agents-card__icon--lg" />
            <h3 className="agents-card__title agents-card__title--dark">{title}</h3>
            <p className="agents-card__body agents-card__body--dark">{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Approach
