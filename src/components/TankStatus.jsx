export default function TankStatus() {
  return (
    <div className="card" id="tank-status">
      <div className="card-title">Tank Status</div>
      <div className="tank-container">
        <div className="tank-visual">
          <div className="tank-water"></div>
        </div>
        <div className="tank-info">
          <div className="label">Level</div>
          <div className="value">78%</div>
          <div className="status-label">Status</div>
          <div className="status-value">NORMAL</div>
        </div>
      </div>
    </div>
  )
}
