import React from 'react'
import SystemOverview from './SystemOverview'
import WaterQuality from './WaterQuality'
import PressureFlow from './PressureFlow'
import TankStatus from './TankStatus'
import EnergyMonitoring from './EnergyMonitoring'
import SystemAlerts from './SystemAlerts'
import QuickActions from './QuickActions'

export default function DashboardPanel({ readings, alerts }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* System Overview + Water Production */}
      <SystemOverview readings={readings} />

      {/* Water Quality + Pressure & Flow + Tank Status */}
      <div className="row">
        <WaterQuality readings={readings} />
        <PressureFlow readings={readings} />
        <TankStatus readings={readings} />
      </div>

      {/* Energy + Alerts + Quick Actions */}
      <div className="bottom-row">
        <EnergyMonitoring readings={readings} />
        <SystemAlerts alerts={alerts} />
        <QuickActions readings={readings} />
      </div>
    </div>
  )
}
