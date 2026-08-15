import MetricCard from './MetricCard'

export default function WaterQuality({ readings }) {
  const waterQualityMetrics = [
    { icon: 'fas fa-tint', colorClass: 'blue', label: 'TDS (Input)', value: readings?.tds_input ?? 356, unit: 'ppm' },
    { icon: 'fas fa-tint', colorClass: 'green', label: 'TDS (Output)', value: readings?.tds_output ?? 28, unit: 'ppm' },
    { icon: 'fas fa-flask', colorClass: 'purple', label: 'pH', value: readings?.ph ?? 7.2, unit: '' },
    { icon: 'fas fa-bolt', colorClass: 'orange', label: 'ORP', value: readings?.orp ?? 620, unit: 'mV' },
    { icon: 'fas fa-water', colorClass: 'teal', label: 'Turbidity', value: readings?.turbidity ?? 1.2, unit: 'NTU' },
    { icon: 'fas fa-thermometer-half', colorClass: 'red', label: 'Temperature', value: readings?.temperature ?? 25.4, unit: '°C' },
  ]

  return (
    <div className="card" id="water-quality">
      <div className="card-title">Water Quality</div>
      <div className="metrics-grid">
        {waterQualityMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
    </div>
  )
}
