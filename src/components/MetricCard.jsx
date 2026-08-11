export default function MetricCard({ icon, colorClass, label, value, unit }) {
  return (
    <div className="metric-item">
      <div className={`metric-icon ${colorClass}`}>
        <i className={icon}></i>
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-unit">{unit}</div>
    </div>
  )
}
