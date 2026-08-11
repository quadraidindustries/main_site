import React from 'react'

export default function WaterQualityPanel() {
  const params = [
    { name: 'pH', value: '7.24', unit: '', status: 'Good', statusClass: 'good-text', color: '#7b1fa2', bg: '#f3e5f5', icon: 'fas fa-flask' },
    { name: 'TDS', value: '452', unit: 'mg/L', status: 'Good', statusClass: 'good-text', color: '#1a73e8', bg: '#e3f2fd', icon: 'fas fa-glass-water' },
    { name: 'Turbidity', value: '0.68', unit: 'NTU', status: 'Good', statusClass: 'good-text', color: '#00695c', bg: '#e0f2f1', icon: 'fas fa-water' },
    { name: 'Temperature', value: '25.4', unit: '°C', status: 'Good', statusClass: 'good-text', color: '#c62828', bg: '#fce4ec', icon: 'fas fa-thermometer-half' },
    { name: 'Conductivity', value: '693', unit: 'µS/cm', status: 'Good', statusClass: 'good-text', color: '#e65100', bg: '#fff3e0', icon: 'fas fa-bolt' },
    { name: 'ORP', value: '162', unit: 'mV', status: 'Good', statusClass: 'good-text', color: '#d84315', bg: '#fbe9e7', icon: 'fas fa-bolt-lightning' },
    { name: 'DO', value: '6.35', unit: 'mg/L', status: 'Good', statusClass: 'good-text', color: '#2e7d32', bg: '#e8f5e9', icon: 'fas fa-circle-nodes' },
    { name: 'Free Chlorine', value: '1.45', unit: 'mg/L', status: 'Good', statusClass: 'good-text', color: '#00838f', bg: '#e0f7fa', icon: 'fas fa-shield-halved' }
  ]

  const tableData = [
    { param: 'pH', val: '7.24', unit: '--', status: 'Good', trend: 'M10,12 Q20,5 30,15 T50,8' },
    { param: 'TDS', val: '452', unit: 'mg/L', status: 'Good', trend: 'M10,15 Q20,18 30,10 T50,5' },
    { param: 'Turbidity', val: '0.68', unit: 'NTU', status: 'Good', trend: 'M10,8 Q20,15 30,5 T50,12' },
    { param: 'Conductivity', val: '693', unit: 'µS/cm', status: 'Good', trend: 'M10,12 Q20,10 30,14 T50,9' },
    { param: 'Temperature', val: '25.4', unit: '°C', status: 'Good', trend: 'M10,10 Q20,10 30,10 T50,10' },
    { param: 'ORP', val: '162', unit: 'mV', status: 'Good', trend: 'M10,14 Q20,8 30,16 T50,6' },
    { param: 'DO', val: '6.35', unit: 'mg/L', status: 'Good', trend: 'M10,6 Q20,12 30,8 T50,14' }
  ]

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-tint panel-header-icon blue-text"></i>
          <h2>Water Quality</h2>
          <span className="live-status-badge">
            <span className="live-status-dot"></span> Live
          </span>
        </div>
        <div className="panel-header-right">
          <span className="header-time"><i className="far fa-clock"></i> 12:30 PM</span>
          <span className="header-date"><i className="far fa-calendar-alt"></i> 26 May 2025</span>
        </div>
      </div>

      <div className="panel-content two-columns-layout">
        {/* Left column: Cards Grid + Table */}
        <div className="left-main-col">
          <div className="parameter-cards-grid">
            {params.map((p, idx) => (
              <div className="param-card" key={idx}>
                <div className="param-card-header">
                  <span className="param-name">{p.name}</span>
                  <div className="param-icon" style={{ backgroundColor: p.bg, color: p.color }}>
                    <i className={p.icon}></i>
                  </div>
                </div>
                <div className="param-card-body">
                  <span className="param-value">{p.value}</span>
                  {p.unit && <span className="param-unit"> {p.unit}</span>}
                </div>
                <div className="param-card-footer">
                  <span className={`param-status-dot ${p.statusClass}`}></span>
                  <span className={`param-status-text ${p.statusClass}`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card parameter-table-card">
            <h3 className="card-title">Parameter Overview</h3>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th>Trend (24h)</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="font-semibold">{row.param}</td>
                    <td>{row.val}</td>
                    <td className="text-secondary">{row.unit}</td>
                    <td>
                      <span className="status-badge status-good">
                        <span className="status-badge-dot"></span> {row.status}
                      </span>
                    </td>
                    <td>
                      <svg width="60" height="20" className="sparkline">
                        <path d={row.trend} fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: Water Quality Index circular meter */}
        <div className="right-sidebar-col">
          <div className="card wqi-card">
            <h3 className="card-title text-center">Water Quality Index</h3>
            <div className="wqi-dial-container">
              <div className="wqi-svg-wrapper">
                <svg width="160" height="160" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#edf2f7" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="url(#wqiGradient)"
                    strokeWidth="8"
                    strokeDasharray="263.89"
                    strokeDashoffset={263.89 - (263.89 * 92) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="wqiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#48bb78" />
                      <stop offset="50%" stopColor="#38b2ac" />
                      <stop offset="100%" stopColor="#3182ce" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="wqi-score-overlay">
                  <span className="wqi-score">92</span>
                  <span className="wqi-grade">Excellent</span>
                  <span className="wqi-label">out of 100</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            <div className="wqi-summary">
              <h4>Overall Status</h4>
              <div className="wqi-status-box success-bg">
                <i className="fas fa-check-circle success-text"></i>
                <p>All parameters are in acceptable range.</p>
              </div>
              <p className="wqi-details text-secondary">
                The water meets all regulatory standards. Membrane filtering is highly efficient with optimal pH and TDS levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
