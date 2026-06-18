import React from 'react'

const Logo = ({ variant = 'nav' }) => {
  if (variant === 'footer') {
    return (
      <div className="agents-logo agents-logo--footer">
        <span className="agents-logo__rt">
          <span className="agents-logo__r">R</span>
          <span className="agents-logo__t">T</span>
        </span>
        <span className="agents-logo__name">Raymone Technologies</span>
      </div>
    )
  }

  return (
    <a href="#top" className="agents-logo agents-logo--nav">
      <span className="agents-logo__rt">
        <span className="agents-logo__r">R</span>
        <span className="agents-logo__t">T</span>
      </span>
      <span className="agents-logo__tagline">
        Raymone
        <br />
        Technologies
      </span>
    </a>
  )
}

export default Logo
