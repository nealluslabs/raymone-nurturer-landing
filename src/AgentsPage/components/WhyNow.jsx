import React from 'react'

const WHY_ITEMS = [
  {
    number: '01',
    title: 'The Single-Shot Problem',
    body: 'One API call to an LLM answers one question. But business problems need reasoning over time. Agents loop, learn, and refine until they solve what matters.',
  },
  {
    number: '02',
    title: 'Knowledge Needs Structure',
    body: 'Your data lives everywhere—databases, documents, Slack, spreadsheets. Agents need to navigate that chaos. Knowledge graphs and RAG ensure they reason over what you actually know.',
  },
  {
    number: '03',
    title: 'Deployment Needs Observability',
    body: "You can't trust a black box in production. Agents need logs, traces, decision records. You need to see what they're doing and why—so you can audit, refine, and improve.",
  },
  {
    number: '04',
    title: 'Systems Need Integration',
    body: "An agent in isolation is a demo. An agent connected to your CRM, your code repo, your data warehouse—that's a system that compounds. Integration is non-negotiable.",
  },
]

const WhyNow = () => (
  <section id="why" className="agents-section agents-section--dark">
    <div className="agents-container agents-container--1000">
      <header className="agents-section-header agents-section-header--760 agents-section-header--why">
        <p className="agents-eyebrow">Why Agents Now</p>
        <h2 className="agents-heading-lg agents-heading-lg--light">
          The Gap Between AI Hype and Real Systems
        </h2>
        <p className="agents-section-intro agents-section-intro--light">
          Single-shot LLM calls don't scale. One question answered isn't a business problem solved.
          Real intelligence requires structure, persistence, and integration.
        </p>
      </header>

      <ol className="agents-why-list">
        {WHY_ITEMS.map(({ number, title, body }) => (
          <li key={number} className="agents-why-list__item">
            <span className="agents-why-list__number">{number}</span>
            <div>
              <h3 className="agents-why-list__title">{title}</h3>
              <p className="agents-why-list__body">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="agents-why-closing">
        This is where we focus. Not the hype. The hard part
        <span className="agents-accent">:</span> making agents work in the real world
        <span className="agents-accent">.</span>
      </p>
    </div>
  </section>
)

export default WhyNow
