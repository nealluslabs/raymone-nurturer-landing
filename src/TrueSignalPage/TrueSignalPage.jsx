import React, { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Pivot from './components/Pivot'
import HowItWorks from './components/HowItWorks'
import DataRigor from './components/DataRigor'
import Team from './components/Team'
import Demo from './components/Demo'
import Footer from './components/Footer'
import './truesignal.css'

const TrueSignalPage = () => {
  useEffect(() => {
    document.body.classList.add('truesignal-route')
    return () => document.body.classList.remove('truesignal-route')
  }, [])

  return (
    <div className="truesignal-page">
      <Nav />
      <Hero />
      <Pivot />
      <HowItWorks />
      <DataRigor />
      <Team />
      <Demo />
      <Footer />
    </div>
  )
}

export default TrueSignalPage
