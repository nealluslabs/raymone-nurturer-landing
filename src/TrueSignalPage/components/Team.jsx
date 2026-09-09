import React from 'react'

const Team = () => (
  <section id="team" className="ts-section ts-team">
    <div className="ts-container">
      <p className="ts-eyebrow">Team</p>
      <h2>True Signal Analytics</h2>
      <p style={{ marginTop: 18 }}>
        We're a small team of health economists and AI/ML practitioners building reproducible, auditable
        tools on U.S. federal open data. We joined the TOPx HHS Tech Sprint because the cost of invisible
        illness is, at its core, a measurement and detection failure — and we think it's a solvable data
        problem.
      </p>
      <div className="ts-badge-row">
        <span className="ts-badge">TOPx HHS Tech Sprint for AI and Invisible Illness</span>
        <span className="ts-badge">Lyme Innovation Track</span>
        <a className="ts-badge" href="https://invisibleillness.crowdicity.com/" target="_blank" rel="noreferrer">
          invisibleillness.crowdicity.com
        </a>
      </div>
    </div>
  </section>
)

export default Team
