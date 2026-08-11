import MetricCard from './MetricCard'

const energyMetrics = [
  { icon: 'fas fa-bolt', colorClass: 'green', label: 'Voltage', value: '232', unit: 'V' },
  { icon: 'fas fa-bolt', colorClass: 'blue', label: 'Current', value: '3.6', unit: 'A' },
  { icon: 'fas fa-circle-notch', colorClass: 'orange', label: 'Power', value: '0.82', unit: 'kW' },
  { icon: 'fas fa-bolt', colorClass: 'purple', label: 'Energy Today', value: '8.45', unit: 'kWh' },
]

export default function EnergyMonitoring() {
  return (
    <div className="card" id="energy-monitoring">
      <div className="card-title">Energy Monitoring</div>
      <div className="energy-grid">
        {energyMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </div>
  )
}
