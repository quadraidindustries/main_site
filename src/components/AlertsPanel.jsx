import React from 'react'

export default function AlertsPanel() {
  const alertStats = [
    { title: 'Critical', count: 2, bg: '#d32f2f', icon: 'fas fa-triangle-exclamation' },
    { title: 'Warnings', count: 5, bg: '#f57c00', icon: 'fas fa-circle-exclamation' },
    { title: 'Notices', count: 3, bg: '#1976d2', icon: 'fas fa-circle-info' },
    { title: 'Resolved Today', count: 6, bg: '#388e3c', icon: 'fas fa-circle-check' }
  ]

  const activeAlerts = [
    { time: '12:25 PM', msg: 'High TDS Level Detected', severity: 'Critical', severityClass: 'sev-critical', status: 'Active', statusClass: 'status-active' },
    { time: '12:18 PM', msg: 'Low Feed Pressure', severity: 'Critical', severityClass: 'sev-critical', status: 'Active', statusClass: 'status-active' },
    { time: '12:10 PM', msg: 'pH Level High', severity: 'Warning', severityClass: 'sev-warning', status: 'Active', statusClass: 'status-active' },
    { time: '11:58 AM', msg: 'RO Permeate Flow Low', severity: 'Warning', severityClass: 'sev-warning', status: 'Active', statusClass: 'status-active' },
    { time: '11:45 AM', msg: 'Turbidity High in Raw Water', severity: 'Warning', severityClass: 'sev-warning', status: 'Active', statusClass: 'status-active' }
  ]

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
          <span className="header-time"><i className="far fa-clock"></i> 12:30 PM</span>
          <span className="header-date"><i className="far fa-calendar-alt"></i> 26 May 2025</span>
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
                <tr key={idx}>
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
