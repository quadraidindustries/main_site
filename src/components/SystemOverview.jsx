const flowSteps = [
  { icon: 'fas fa-tint', label: 'Raw Water' },
  { icon: 'fas fa-filter', label: 'Pre Filtration' },
  { icon: 'fas fa-layer-group', label: 'Membrane' },
  { icon: 'fas fa-shield-alt', label: 'Post Treatment' },
  { icon: 'fas fa-database', label: 'Storage' },
  { icon: 'fas fa-truck', label: 'Distribution' },
]

export default function SystemOverview({ readings }) {
  const statusText = (readings?.system_status || 'RUNNING').toUpperCase()
  const currentRate = readings?.flow_rate_l_hr ?? 1250
  const todayProduction = readings?.today_production_l ?? 18600

  return (
    <div className="system-overview-row">
      <div className="card system-overview-card" id="system-overview">
        <div className="card-title">System Overview</div>
        <div className="flow-diagram">
          {flowSteps.map((step, index) => (
            <div key={step.label} style={{ display: 'contents' }}>
              <div className="flow-step">
                <div className="flow-icon">
                  <i className={step.icon}></i>
                </div>
                <div className="flow-label">{step.label}</div>
              </div>
              {index < flowSteps.length - 1 && (
                <div className="flow-arrow">───→</div>
              )}
            </div>
          ))}
        </div>
        <div className="system-status">
          <i className={`fas ${statusText === 'RUNNING' ? 'fa-check-circle success-text' : 'fa-triangle-exclamation warning-text'}`}></i>
          <span>
            System Status: <strong>{statusText}</strong>
          </span>
        </div>
      </div>

      <div className="card water-production-card" id="water-production">
        <div className="card-title" style={{ color: '#1a73e8' }}>
          Water Production
        </div>
        <div className="production-label">Current Rate</div>
        <div className="production-value">{currentRate}</div>
        <div className="production-unit">L / HR</div>
        <hr className="production-divider" />
        <div className="production-today">
          <div className="production-label">Today's Production</div>
          <div className="production-value">{Number(todayProduction).toLocaleString()}</div>
          <div className="production-unit">L</div>
        </div>
      </div>
    </div>
  )
}
