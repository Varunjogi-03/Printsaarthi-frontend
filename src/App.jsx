import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CallToAction from './components/CallToAction'
import SiteFooter from './components/SiteFooter'
import DatabaseStatus from './components/DatabaseStatus'
import { useAuth } from './context/AuthContext'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-yellow-400"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <NavBar/>
    <main data-theme="printsaarthi" className="bg-base-100">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
      <SiteFooter />
    </main>
    <DatabaseStatus />
    </>
  )
}

export default App
