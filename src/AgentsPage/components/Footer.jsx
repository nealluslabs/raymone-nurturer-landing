import React, { useState } from 'react'
import Logo from './Logo'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <footer className="agents-footer">
      <div className="agents-container agents-footer__grid">
        <div className="agents-footer__brand">
          <Logo variant="footer" />
          <a href="mailto:info@raymonetech.com" className="agents-footer__email">
            info@raymonetech.com
          </a>
        </div>

        <div className="agents-footer__links">
          <p className="agents-footer__label">Company</p>
          <a href="#start">Support</a>
          <a href="#start">Contact</a>
          <a href="#start">FAQ</a>
        </div>

        <div className="agents-footer__newsletter">
          <p className="agents-footer__label">Get notified about news &amp; updates</p>
          <form className="agents-footer__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit" className="agents-btn agents-btn--primary agents-btn--sm">
              {submitted ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <div className="agents-container agents-footer__bar">
        <span>&copy; 2026 Raymone Technologies. All rights reserved.</span>
        <div className="agents-footer__legal">
          <a href="#start">Terms and Conditions</a>
          <a href="#start">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
