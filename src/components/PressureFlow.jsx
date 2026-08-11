import MetricCard from './MetricCard'

const pressureFlowMetrics = [
  { icon: 'fas fa-gauge-high', colorClass: 'green', label: 'Inlet Pressure', value: '2.8', unit: 'bar' },
  { icon: 'fas fa-gauge-high', colorClass: 'blue', label: 'Pump Pressure', value: '5.6', unit: 'bar' },
  { icon: 'fas fa-compress-arrows-alt', colorClass: 'teal', label: 'Membrane DP', value: '1.3', unit: 'bar' },
  { icon: 'fas fa-tachometer-alt', colorClass: 'orange', label: 'Flow Rate', value: '22.5', unit: 'L/min' },
]

export default function PressureFlow() {
  return (
    <div className="card" id="pressure-flow">
      <div className="card-title">Pressure & Flow</div>
      <div className="metrics-grid-2x2">
        {pressureFlowMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </div>
  )
}
