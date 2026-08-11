import React, { useState } from 'react'

export default function PerformancePanel() {
  const [timeFilter, setTimeFilter] = useState('24h')

  const metrics = [
    { label: 'System Efficiency', value: '88.6%', status: 'Good', icon: 'fas fa-gauge-high', color: '#2e7d32', bg: '#e8f5e9' },
    { label: 'Recovery Rate', value: '75.4%', status: 'Good', icon: 'fas fa-arrows-spin', color: '#1a73e8', bg: '#e3f2fd' },
    { label: 'Uptime', value: '98.7%', status: 'Good', icon: 'fas fa-business-time', color: '#00695c', bg: '#e0f2f1' },
    { label: 'Flow Rate', value: '45.2 m³/h', status: 'Good', icon: 'fas fa-arrow-trend-up', color: '#e65100', bg: '#fff3e0' }
  ]

  // Mock points for SVG line chart
  // viewBox: 0 0 700 200
  // Efficiency points: (50, 60), (160, 45), (270, 50), (380, 40), (490, 55), (600, 35), (650, 40)
  // Recovery Rate points: (50, 110), (160, 130), (270, 105), (380, 115), (490, 95), (600, 108), (650, 98)
  const efficiencyPath = "M 50 60 Q 160 45 270 50 T 490 55 Q 600 35 650 40"
  const recoveryPath = "M 50 110 Q 160 130 270 105 T 490 95 Q 600 108 650 98"

  const trendTimes = ['12:00 AM', '04:00 AM', '08:00 AM', '12:00 PM', '04:00 PM', '08:00 PM']

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-chart-line panel-header-icon blue-text"></i>
          <h2>Performance</h2>
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
        {/* Top 4 Metric Cards */}
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
                <span className="perf-status-badge">
                  <span className="status-dot-green"></span> {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Line Chart: Performance Trend */}
        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="card-title">Performance Trend</h3>
            <div className="chart-controls">
              <div className="chart-legends">
                <div className="legend-item">
                  <span className="legend-line efficiency-legend"></span>
                  <span>Efficiency (%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-line recovery-legend"></span>
                  <span>Recovery Rate (%)</span>
                </div>
              </div>
              <select 
                className="custom-select" 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="24h">24 Hours</option>
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
              </select>
            </div>
          </div>

          <div className="svg-chart-container">
            <svg viewBox="0 0 700 200" width="100%" height="100%" className="line-chart-svg">
              {/* Horizontal Grid lines */}
              <line x1="50" y1="30" x2="650" y2="30" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="70" x2="650" y2="70" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="110" x2="650" y2="110" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="150" x2="650" y2="150" stroke="#f0f2f5" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="35" y="35" className="chart-axis-label">100</text>
              <text x="35" y="75" className="chart-axis-label">75</text>
              <text x="35" y="115" className="chart-axis-label">50</text>
              <text x="35" y="155" className="chart-axis-label">25</text>
              <text x="35" y="190" className="chart-axis-label">0</text>

              {/* Efficiency Line Path */}
              <path d={efficiencyPath} fill="none" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" />
              {/* Recovery Rate Line Path */}
              <path d={recoveryPath} fill="none" stroke="#3498db" strokeWidth="3" strokeLinecap="round" />

              {/* Data points (dots) on paths */}
              {/* Efficiency Dots */}
              <circle cx="50" cy="60" r="4" fill="#2ecc71" stroke="#fff" strokeWidth="2" />
              <circle cx="160" cy="48" r="4" fill="#2ecc71" stroke="#fff" strokeWidth="2" />
              <circle cx="270" cy="51" r="4" fill="#2ecc71" stroke="#fff" strokeWidth="2" />
              <circle cx="380" cy="42" r="4" fill="#2ecc71" stroke="#fff" strokeWidth="2" />
              <circle cx="490" cy="54" r="4" fill="#2ecc71" stroke="#fff" strokeWidth="2" />
              <circle cx="600" cy="36" r="4" fill="#2ecc71" stroke="#fff" strokeWidth="2" />
              <circle cx="650" cy="40" r="4" fill="#2ecc71" stroke="#fff" strokeWidth="2" />

              {/* Recovery Dots */}
              <circle cx="50" cy="110" r="4" fill="#3498db" stroke="#fff" strokeWidth="2" />
              <circle cx="160" cy="126" r="4" fill="#3498db" stroke="#fff" strokeWidth="2" />
              <circle cx="270" cy="107" r="4" fill="#3498db" stroke="#fff" strokeWidth="2" />
              <circle cx="380" cy="113" r="4" fill="#3498db" stroke="#fff" strokeWidth="2" />
              <circle cx="490" cy="97" r="4" fill="#3498db" stroke="#fff" strokeWidth="2" />
              <circle cx="600" cy="106" r="4" fill="#3498db" stroke="#fff" strokeWidth="2" />
              <circle cx="650" cy="98" r="4" fill="#3498db" stroke="#fff" strokeWidth="2" />

              {/* Vertical lines and labels */}
              <line x1="50" y1="30" x2="50" y2="175" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="160" y1="30" x2="160" y2="175" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="270" y1="30" x2="270" y2="175" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="380" y1="30" x2="380" y2="175" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="490" y1="30" x2="490" y2="175" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="600" y1="30" x2="600" y2="175" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="650" y1="30" x2="650" y2="175" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />

              {/* X Axis line */}
              <line x1="50" y1="175" x2="650" y2="175" stroke="#ccc" strokeWidth="1.5" />
            </svg>

            {/* Time labels below SVG to easily align them responsively */}
            <div className="chart-x-labels-row">
              {trendTimes.map((t, index) => (
                <div key={index} className="x-label-item">{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Treated Water, Rejected Water, Chemical Dosing, System Status */}
        <div className="performance-summary-grid">
          <div className="card summary-panel-item">
            <span className="summary-title">Treated Water</span>
            <div className="summary-val-row">
              <span className="summary-value">1,245 m³</span>
              <span className="summary-tag label-today">Today</span>
            </div>
          </div>

          <div className="card summary-panel-item">
            <span className="summary-title">Rejected Water</span>
            <div className="summary-val-row">
              <span className="summary-value">402 m³</span>
              <span className="summary-tag label-today">Today</span>
            </div>
          </div>

          <div className="card summary-panel-item">
            <span className="summary-title">Chemical Dosing</span>
            <div className="summary-val-row">
              <span className="summary-value">98.6%</span>
              <span className="summary-tag label-eff">Efficiency</span>
            </div>
          </div>

          <div className="card summary-panel-item border-left-green">
            <span className="summary-title">System Status</span>
            <div className="summary-val-row">
              <span className="summary-value success-text">Operational</span>
            </div>
            <span className="summary-desc text-secondary">All systems normal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
