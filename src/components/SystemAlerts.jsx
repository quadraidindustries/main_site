export default function SystemAlerts({ alerts = [] }) {
  const hasAlerts = alerts.length > 0

  return (
    <div className="card" id="system-alerts">
      <div className="card-title">System Alerts</div>
      {!hasAlerts ? (
        <>
          <div className="alert-ok">
            <i className="fas fa-check-circle"></i>
            <span>All Systems Normal</span>
          </div>
          <div className="no-alerts">No Active Alerts</div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '110px', paddingRight: '4px' }}>
          {alerts.slice(0, 3).map((alert, idx) => (
            <div key={alert.id || idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: alert.severity === 'Critical' ? 'rgba(211, 47, 47, 0.08)' : alert.severity === 'Warning' ? 'rgba(245, 124, 0, 0.08)' : 'rgba(25, 118, 210, 0.08)',
              borderLeft: `4px solid ${alert.severity === 'Critical' ? '#d32f2f' : alert.severity === 'Warning' ? '#f57c00' : '#1976d2'}`,
              fontSize: '12px',
              fontWeight: '500'
            }}>
              <i className={`fas ${alert.severity === 'Critical' ? 'fa-triangle-exclamation' : 'fa-circle-exclamation'}`} style={{
                color: alert.severity === 'Critical' ? '#d32f2f' : alert.severity === 'Warning' ? '#f57c00' : '#1976d2'
              }}></i>
              <span style={{ color: 'var(--text-main)', flex: '1', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{alert.message}</span>
            </div>
          ))}
          {alerts.length > 3 && (
            <div className="text-secondary" style={{ fontSize: '11px', textAlign: 'center', marginTop: '2px' }}>
              + {alerts.length - 3} more alert(s) active
            </div>
          )}
        </div>
      )}
    </div>
  )
}
