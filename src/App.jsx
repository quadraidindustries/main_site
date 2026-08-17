import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { useSensorData } from './hooks/useSensorData'
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
  const { readings, history, alerts } = useSensorData()

  const renderPanel = () => {
    switch (activeId) {
      case 'nav-dashboard':
        return <DashboardPanel readings={readings} alerts={alerts} />
      case 'nav-water-quality':
        return <WaterQualityPanel readings={readings} />
      case 'nav-performance':
        return <PerformancePanel readings={readings} history={history} />
      case 'nav-energy':
        return <EnergyPanel readings={readings} history={history} />
      case 'nav-alerts':
        return <AlertsPanel readings={readings} alerts={alerts} />
      case 'nav-history':
        return <HistoryPanel readings={readings} history={history} />
      case 'nav-settings':
        return <SettingsPanel readings={readings} />
      default:
        return <DashboardPanel readings={readings} alerts={alerts} />
    }
  }

  return (
    <div className="main-layout">
      <Sidebar activeId={activeId} setActiveId={setActiveId} readings={readings} />
      <main className="content" id="main-content">
        {renderPanel()}
      </main>
    </div>
  )
}
