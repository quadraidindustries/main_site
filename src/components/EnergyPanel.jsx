import React, { useState } from 'react'

export default function EnergyPanel() {
  const [energyFilter, setEnergyFilter] = useState('today')

  const metrics = [
    { label: 'Total Power', value: '18.6 kW', icon: 'fas fa-charging-station', color: '#1a73e8', bg: '#e3f2fd' },
    { label: 'Energy Today', value: '348.2 kWh', icon: 'fas fa-plug-circle-bolt', color: '#2e7d32', bg: '#e8f5e9' },
    { label: 'Specific Energy', value: '0.28 kWh/m³', icon: 'fas fa-circle-nodes', color: '#00695c', bg: '#e0f2f1' },
    { label: 'Power Factor', value: '0.94 Leading', icon: 'fas fa-bolt', color: '#e65100', bg: '#fff3e0' }
  ]

  const consumers = [
    { name: 'HP Pump', percentage: 48, kwh: 167.1, color: '#2ecc71' },
    { name: 'RO System', percentage: 28, kwh: 97.5, color: '#3498db' },
    { name: 'Dosing Pump', percentage: 12, kwh: 41.8, color: '#9b59b6' },
    { name: 'Others', percentage: 12, kwh: 41.8, color: '#f1c40f' }
  ]

  // Circumference for r=30 is 188.5
  // Segment lengths: 48% = 90.48, 28% = 52.78, 12% = 22.62, 12% = 22.62
  const c = 188.5

  // Hourly consumption data for SVG bar chart (16 bars)
  const barHeights = [40, 36, 42, 50, 68, 76, 82, 70, 65, 72, 78, 86, 80, 75, 72, 68]
  const barLabels = ['12 AM', '04 AM', '08 AM', '12 PM', '04 PM', '08 PM']

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-bolt panel-header-icon blue-text"></i>
          <h2>Energy</h2>
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
        {/* Top Metric Cards */}
        <div className="performance-cards-grid">
          {metrics.map((m, idx) => (
            <div className="card performance-card" key={idx}>
              <div className="perf-card-header">
                <span className="perf-label">{m.label}</span>
                <div className="perf-icon" style={{ backgroundColor: m.bg, color: m.color }}>
                  <i className={m.icon}></i>
                </div>
              </div>
              <div className="perf-card-body">
                <span className="perf-value">{m.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Bar Chart: Energy Consumption */}
        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="card-title">Energy Consumption</h3>
            <div className="chart-controls">
              <span className="chart-unit text-secondary">kWh</span>
              <select 
                className="custom-select" 
                value={energyFilter} 
                onChange={(e) => setEnergyFilter(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>
          </div>

          <div className="svg-chart-container">
            <svg viewBox="0 0 700 150" width="100%" height="100%" className="bar-chart-svg">
              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="660" y2="20" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="40" y1="50" x2="660" y2="50" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="40" y1="80" x2="660" y2="80" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="40" y1="110" x2="660" y2="110" stroke="#f0f2f5" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="25" y="24" className="chart-axis-label">100</text>
              <text x="25" y="54" className="chart-axis-label">80</text>
              <text x="25" y="84" className="chart-axis-label">40</text>
              <text x="25" y="114" className="chart-axis-label">20</text>
              <text x="25" y="134" className="chart-axis-label">0</text>

              {/* X Axis line */}
              <line x1="40" y1="130" x2="660" y2="130" stroke="#ccc" strokeWidth="1" />

              {/* Rendering Bar elements */}
              {barHeights.map((h, i) => {
                const barWidth = 24
                const spacing = 36
                const x = 55 + i * spacing
                const y = 130 - h
                return (
                  <g key={i}>
                    {/* Hover tooltip hint */}
                    <title>{`${h} kWh`}</title>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={h}
                      fill="#2ecc71"
                      rx="3"
                      className="chart-bar"
                    />
                  </g>
                )
              })}
            </svg>
            
            {/* X Labels */}
            <div className="chart-x-labels-row" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              {barLabels.map((lbl, idx) => (
                <div key={idx} className="x-label-item">{lbl}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Energy Distribution (Donut) & Top Energy Consumers */}
        <div className="two-columns-layout" style={{ marginTop: '0' }}>
          <div className="card left-main-col" style={{ flex: '1.2' }}>
            <h3 className="card-title">Energy Distribution</h3>
            <div className="donut-chart-container">
              <svg width="220" height="220" viewBox="0 0 100 100" className="donut-svg">
                {/* Segment 1: HP Pump 48% (Color: #2ecc71) */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#2ecc71"
                  strokeWidth="10"
                  strokeDasharray={`${c * 0.48} ${c * 0.52}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Segment 2: RO System 28% (Color: #3498db) */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#3498db"
                  strokeWidth="10"
                  strokeDasharray={`${c * 0.28} ${c * 0.72}`}
                  strokeDashoffset={-c * 0.48}
                  transform="rotate(-90 50 50)"
                />
                {/* Segment 3: Dosing Pump 12% (Color: #9b59b6) */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#9b59b6"
                  strokeWidth="10"
                  strokeDasharray={`${c * 0.12} ${c * 0.88}`}
                  strokeDashoffset={-c * (0.48 + 0.28)}
                  transform="rotate(-90 50 50)"
                />
                {/* Segment 4: Others 12% (Color: #f1c40f) */}
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  stroke="#f1c40f"
                  strokeWidth="10"
                  strokeDasharray={`${c * 0.12} ${c * 0.88}`}
                  strokeDashoffset={-c * (0.48 + 0.28 + 0.12)}
                  transform="rotate(-90 50 50)"
                />
                {/* Center text overlay */}
                <circle cx="50" cy="50" r="23" fill="#ffffff" />
                <text x="50" y="46" textAnchor="middle" className="donut-center-val">348.2</text>
                <text x="50" y="58" textAnchor="middle" className="donut-center-unit">kWh</text>
              </svg>

              <div className="donut-legend">
                {consumers.map((c_item, i) => (
                  <div className="donut-legend-item" key={i}>
                    <span className="legend-dot" style={{ backgroundColor: c_item.color }}></span>
                    <span className="legend-name">{c_item.name}</span>
                    <span className="legend-pct font-semibold">{c_item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card right-sidebar-col" style={{ flex: '1.2' }}>
            <h3 className="card-title">Top Energy Consumers</h3>
            <table className="custom-table select-none">
              <thead>
                <tr>
                  <th>Consumer</th>
                  <th>Share (%)</th>
                  <th>Energy (kWh)</th>
                </tr>
              </thead>
              <tbody>
                {consumers.map((c_item, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{c_item.name}</td>
                    <td>
                      <div className="table-bar-container">
                        <span className="font-semibold text-small">{c_item.percentage}%</span>
                        <div className="table-progress-bar">
                          <div 
                            className="table-progress-fill" 
                            style={{ width: `${c_item.percentage}%`, backgroundColor: c_item.color }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{c_item.kwh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
