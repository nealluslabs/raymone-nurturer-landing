import React from 'react'

const Nav = () => (
  <nav className="ts-nav">
    <div className="ts-nav__brand">True Signal <span>Analytics</span></div>
    <div className="ts-nav__links">
      <a href="#how-it-works">How it works</a>
      <a href="#data">Data &amp; rigor</a>
      <a href="#team">Team</a>
      <a href="#demo" className="ts-btn ts-btn--primary">Try Signal Card</a>
    </div>
  </nav>
)

export default Nav
