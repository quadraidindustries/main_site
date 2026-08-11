import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import Auth from './components/Auth'
import Sidebar from './components/Sidebar'
import DashboardPanel from './components/DashboardPanel'
import WaterQualityPanel from './components/WaterQualityPanel'
import PerformancePanel from './components/PerformancePanel'
import EnergyPanel from './components/EnergyPanel'
import AlertsPanel from './components/AlertsPanel'
import HistoryPanel from './components/HistoryPanel'
import SettingsPanel from './components/SettingsPanel'

export default function App() {
  const [activeId, setActiveId] = useState('nav-dashboard')
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <Auth />
  }

  const renderPanel = () => {
    switch (activeId) {
      case 'nav-dashboard':
        return <DashboardPanel />
      case 'nav-water-quality':
        return <WaterQualityPanel />
      case 'nav-performance':
        return <PerformancePanel />
      case 'nav-energy':
        return <EnergyPanel />
      case 'nav-alerts':
        return <AlertsPanel />
      case 'nav-history':
        return <HistoryPanel />
      case 'nav-settings':
        return <SettingsPanel />
      default:
        return <DashboardPanel />
    }
  }

  return (
    <div className="main-layout">
      <Sidebar activeId={activeId} setActiveId={setActiveId} />
      <main className="content" id="main-content">
        {renderPanel()}
      </main>
    </div>
  )
}
