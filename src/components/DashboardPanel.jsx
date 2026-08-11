import React from 'react'
import SystemOverview from './SystemOverview'
import WaterQuality from './WaterQuality'
import PressureFlow from './PressureFlow'
import TankStatus from './TankStatus'
import EnergyMonitoring from './EnergyMonitoring'
import SystemAlerts from './SystemAlerts'
import QuickActions from './QuickActions'

export default function DashboardPanel() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* System Overview + Water Production */}
      <SystemOverview />

      {/* Water Quality + Pressure & Flow + Tank Status */}
      <div className="row">
        <WaterQuality />
        <PressureFlow />
        <TankStatus />
      </div>

      {/* Energy + Alerts + Quick Actions */}
      <div className="bottom-row">
        <EnergyMonitoring />
        <SystemAlerts />
        <QuickActions />
      </div>
    </div>
  )
}
