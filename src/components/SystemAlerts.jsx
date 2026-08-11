export default function SystemAlerts() {
  return (
    <div className="card" id="system-alerts">
      <div className="card-title">System Alerts</div>
      <div className="alert-ok">
        <i className="fas fa-check-circle"></i>
        <span>All Systems Normal</span>
      </div>
      <div className="no-alerts">No Active Alerts</div>
    </div>
  )
}
