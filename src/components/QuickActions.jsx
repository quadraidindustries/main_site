export default function QuickActions() {
  const handleFlush = () => {
    alert('Manual Flush initiated')
  }

  const handleStop = () => {
    if (confirm('Are you sure you want to stop the system?')) {
      alert('System stopping...')
    }
  }

  const handleUV = () => {
    alert('UV Lamp Test started')
  }

  return (
    <div className="card" id="quick-actions">
      <div className="card-title">Quick Actions</div>
      <div className="actions-grid">
        <div className="actions-row">
          <button className="action-btn flush" id="btn-flush" onClick={handleFlush}>
            <i className="fas fa-tint"></i> Manual Flush
          </button>
          <button className="action-btn stop" id="btn-stop" onClick={handleStop}>
            <i className="fas fa-stop-circle"></i> System Stop
          </button>
        </div>
        <div className="actions-row">
          <button className="action-btn uv" id="btn-uv" onClick={handleUV}>
            <i className="fas fa-sun"></i> UV Lamp Test
          </button>
        </div>
      </div>
    </div>
  )
}
