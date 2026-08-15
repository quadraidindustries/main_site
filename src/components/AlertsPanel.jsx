import React from 'react'
import { formatTelemetryTimestamp } from '../lib/formatters'

export default function AlertsPanel({ readings, alerts = [] }) {
  const { time: timeStr, date: dateStr } = formatTelemetryTimestamp(readings?.created_at)

  const criticalCount = alerts.filter(a => a.severity === 'Critical').length
  const warningCount = alerts.filter(a => a.severity === 'Warning').length
  const noticeCount = alerts.filter(a => a.severity === 'Notice').length

  const alertStats = [
    { title: 'Critical', count: criticalCount, bg: '#d32f2f', icon: 'fas fa-triangle-exclamation' },
    { title: 'Warnings', count: warningCount, bg: '#f57c00', icon: 'fas fa-circle-exclamation' },
    { title: 'Notices', count: noticeCount, bg: '#1976d2', icon: 'fas fa-circle-info' },
    { title: 'Resolved Today', count: 6, bg: '#388e3c', icon: 'fas fa-circle-check' }
  ]

  const activeAlerts = alerts.map(a => {
    const timeStr = a.created_at 
      ? new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '12:30 PM'

    return {
      id: a.id,
      time: timeStr,
      msg: a.message,
      severity: a.severity,
      severityClass: `sev-${(a.severity || 'warning').toLowerCase()}`,
      status: a.status || 'Active',
      statusClass: `status-${(a.status || 'active').toLowerCase()}`
    }
  })

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-bell panel-header-icon blue-text"></i>
          <h2>Alerts</h2>
          <span className="live-status-badge">
            <span className="live-status-dot"></span> Live
          </span>
        </div>
        <div className="panel-header-right">
          <span className="header-time"><i className="far fa-clock"></i> {timeStr}</span>
          <span className="header-date"><i className="far fa-calendar-alt"></i> {dateStr}</span>
        </div>
      </div>

      <div className="panel-content">
        {/* Banner Cards */}
        <div className="alert-banners-grid">
          {alertStats.map((stat, idx) => (
            <div 
              className="alert-banner-card" 
              key={idx} 
              style={{ backgroundColor: stat.bg }}
            >
              <div className="alert-banner-left">
                <i className={stat.icon}></i>
                <span className="alert-banner-title">{stat.title}</span>
              </div>
              <span className="alert-banner-count">{stat.count}</span>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="card active-alerts-card">
          <h3 className="card-title">Active Alerts</h3>
          {activeAlerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              <i className="fas fa-circle-check" style={{ fontSize: '32px', color: '#2e7d32', marginBottom: '12px' }}></i>
              <p style={{ fontWeight: '600', fontSize: '15px' }}>No Active Alerts</p>
              <p style={{ fontSize: '13px' }}>All machine components are operating within normal parameters.</p>
            </div>
          ) : (
            <table className="custom-table select-none">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Alert</th>
                  <th>Severity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeAlerts.map((alert, idx) => (
                  <tr key={alert.id || idx}>
                    <td className="font-semibold text-secondary">{alert.time}</td>
                    <td className="font-semibold">{alert.msg}</td>
                    <td>
                      <span className={`severity-badge ${alert.severityClass}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td>
                      <span className={`alert-status-badge ${alert.statusClass}`}>
                        <span className="status-badge-dot"></span> {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="alerts-footer-action">
            <button 
              className="btn btn-primary" 
              onClick={() => alert('Viewing historical log of resolved alerts')}
            >
              View All Alerts History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
