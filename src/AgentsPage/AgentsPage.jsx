import React, { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Approach from './components/Approach'
import WorkWithUs from './components/WorkWithUs'
import WhyNow from './components/WhyNow'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'
import './agents.css'

const AgentsPage = () => {
  useEffect(() => {
    document.body.classList.add('agents-route')
    return () => document.body.classList.remove('agents-route')
  }, [])

  return (
    <div className="agents-page">
      <Nav />
      <Hero />
      <Capabilities />
      <Approach />
      <WorkWithUs />
      <WhyNow />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default AgentsPage
