import MetricCard from './MetricCard'

const waterQualityMetrics = [
  { icon: 'fas fa-tint', colorClass: 'blue', label: 'TDS (Input)', value: '356', unit: 'ppm' },
  { icon: 'fas fa-tint', colorClass: 'green', label: 'TDS (Output)', value: '28', unit: 'ppm' },
  { icon: 'fas fa-flask', colorClass: 'purple', label: 'pH', value: '7.2', unit: '' },
  { icon: 'fas fa-bolt', colorClass: 'orange', label: 'ORP', value: '620', unit: 'mV' },
  { icon: 'fas fa-water', colorClass: 'teal', label: 'Turbidity', value: '1.2', unit: 'NTU' },
  { icon: 'fas fa-thermometer-half', colorClass: 'red', label: 'Temperature', value: '25.4', unit: '°C' },
]

export default function WaterQuality() {
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
