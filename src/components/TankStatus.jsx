export default function TankStatus({ readings }) {
  const level = readings?.tank_level ?? 78
  const status = (readings?.tank_status || 'NORMAL').toUpperCase()

  return (
    <div className="card" id="tank-status">
      <div className="card-title">Tank Status</div>
      <div className="tank-container">
        <div className="tank-visual">
          <div className="tank-water" style={{ height: `${level}%` }}></div>
        </div>
        <div className="tank-info">
          <div className="label">Level</div>
          <div className="value">{level}%</div>
          <div className="status-label">Status</div>
          <div className={`status-value ${status === 'NORMAL' ? 'success-text' : 'warning-text'}`}>{status}</div>
        </div>
      </div>
    </div>
  )
}
