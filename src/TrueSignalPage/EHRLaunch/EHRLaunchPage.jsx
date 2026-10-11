import React, { useEffect, useState } from 'react'
import FHIR from 'fhirclient/browser'

// This is the "launch" endpoint a real EHR (or the public SMART Health IT
// sandbox) redirects to, carrying ?iss=<FHIR server>&launch=<launch token>
// in the query string. It is NOT a mockup: it performs a real SMART App
// Launch (EHR-launch, authorization-code + PKCE) against whatever FHIR
// server issued the request. Tested end-to-end against the public,
// no-registration-required sandbox at https://launch.smarthealthit.org.
const EHRLaunchPage = () => {
  const [status, setStatus] = useState('starting')
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.get('iss') || !params.get('launch')) {
      setStatus('missing-context')
      return
    }
    setStatus('authorizing')
    FHIR.oauth2
      .authorize({
        clientId: 'signal-card-demo',
        scope: 'launch patient/*.read openid fhirUser',
        redirectUri: window.location.origin + '/truesignalanalytics/ehr-app',
        iss: params.get('iss'),
        launch: params.get('launch'),
        completeInTarget: true,
      })
      .catch((e) => {
        setError(String(e))
        setStatus('error')
      })
  }, [])

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#5A695E' }}>
          SIGNAL CARD &mdash; SMART ON FHIR LAUNCH
        </p>
        {status === 'missing-context' && (
          <>
            <h2>No launch context received</h2>
            <p>
              This page is meant to be opened by an EHR (or a SMART sandbox) via a real SMART App
              Launch, which appends <code>?iss=...&amp;launch=...</code> to this URL. Opening it
              directly, with no launch context, isn't a supported path.
            </p>
            <p>
              To try the real thing: open{' '}
              <a href="https://launch.smarthealthit.org/?launch_url=https%3A%2F%2Fraymonetech.com%2Ftruesignalanalytics%2Fehr-launch">
                launch.smarthealthit.org
              </a>{' '}
              with this page's URL pre-filled as the launch URL, pick a synthetic patient, and
              launch.
            </p>
          </>
        )}
        {status === 'authorizing' && <h2>Starting authorization&hellip;</h2>}
        {status === 'error' && (
          <>
            <h2>Launch failed</h2>
            <p>{error}</p>
          </>
        )}
      </div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#F3F6F2',
  fontFamily: 'Inter, sans-serif',
  padding: 24,
}
const cardStyle = {
  maxWidth: 560,
  background: '#fff',
  borderRadius: 12,
  padding: 32,
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
}

export default EHRLaunchPage
