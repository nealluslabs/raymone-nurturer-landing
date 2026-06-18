import React, { useState, useEffect } from 'react'
import Logo from './Logo'

const NAV_LINKS = [
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#approach', label: 'Approach' },
  { href: '#work', label: 'Work With Us' },
  { href: '#why', label: 'Why Now' },
]

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="agents-nav" aria-label="Main">
      <div className="agents-nav__inner">
        <Logo />

        <button
          type="button"
          className="agents-nav__toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`agents-nav__links${menuOpen ? ' agents-nav__links--open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="agents-nav__link" onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a href="#start" className="agents-btn agents-btn--primary agents-btn--sm" onClick={closeMenu}>
            Book a Consultation
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
