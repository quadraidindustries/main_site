import MetricCard from './MetricCard'

export default function PressureFlow({ readings }) {
  const pressureFlowMetrics = [
    { icon: 'fas fa-gauge-high', colorClass: 'green', label: 'Inlet Pressure', value: readings?.inlet_pressure ?? 2.8, unit: 'bar' },
    { icon: 'fas fa-gauge-high', colorClass: 'blue', label: 'Pump Pressure', value: readings?.pump_pressure ?? 5.6, unit: 'bar' },
    { icon: 'fas fa-compress-arrows-alt', colorClass: 'teal', label: 'Membrane DP', value: readings?.membrane_dp ?? 1.3, unit: 'bar' },
    { icon: 'fas fa-tachometer-alt', colorClass: 'orange', label: 'Flow Rate', value: readings?.flow_rate_l_min ?? 22.5, unit: 'L/min' },
  ]

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
