import React, { useState } from 'react'
import { formatTelemetryTimestamp } from '../lib/formatters'

function buildSvgPath(dataArray, minVal, maxVal, width = 600, height = 120, startX = 50, startY = 35) {
  if (!dataArray || dataArray.length < 2) return `M 50 100 L 650 100`
  const range = maxVal - minVal || 1
  const stepX = width / (dataArray.length - 1)
  return dataArray.map((val, i) => {
    const x = startX + i * stepX
    const norm = Math.max(0, Math.min(1, (val - minVal) / range))
    const y = startY + (1 - norm) * height
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

export default function PerformancePanel({ readings, history = [] }) {
  const { time: timeStr, date: dateStr } = formatTelemetryTimestamp(readings?.created_at)
  const [timeFilter, setTimeFilter] = useState('live')

  const chronological = history.length > 0 ? [...history].reverse() : [readings, readings]

  // Dynamic flow, efficiency and recovery rate
  const flowRateM3 = readings?.flow_rate_l_hr ? (readings.flow_rate_l_hr / 1000).toFixed(2) : '0.00'
  const recoveryRateVal = readings?.tds_input && readings?.tds_output && readings?.flow_rate_l_hr > 0
    ? ((1 - readings.tds_output / readings.tds_input) * 81).toFixed(1)
    : '0.0'

  const effVal = readings?.flow_rate_l_hr > 0 ? '91.4%' : '0.0% (Standby)'

  const metrics = [
    { label: 'Purifier Efficiency', value: effVal, status: readings?.flow_rate_l_hr > 0 ? 'Optimal' : 'Standby', icon: 'fas fa-gauge-high', color: '#2e7d32', bg: '#e8f5e9' },
    { label: 'RO Recovery Rate', value: `${recoveryRateVal}%`, status: 'Normal', icon: 'fas fa-arrows-spin', color: '#1a73e8', bg: '#e3f2fd' },
    { label: 'System Uptime', value: '99.4%', status: 'Active', icon: 'fas fa-business-time', color: '#00695c', bg: '#e0f2f1' },
    { label: 'Output Flow Rate', value: `${flowRateM3} m³/h`, status: readings?.flow_rate_l_hr > 0 ? 'Active' : 'Idle', icon: 'fas fa-arrow-trend-up', color: '#e65100', bg: '#fff3e0' }
  ]

  // Extract trend curves
  const efficiencies = chronological.map(r => r?.flow_rate_l_hr > 0 ? 90 + ((r.tds_input - r.tds_output) / 40) : 0)
  const recoveries = chronological.map(r => r?.flow_rate_l_hr > 0 ? ((1 - r.tds_output / (r.tds_input || 1)) * 81) : 0)

  const efficiencyPath = buildSvgPath(efficiencies, 0, 100)
  const recoveryPath = buildSvgPath(recoveries, 0, 100)

  const trendTimes = chronological.length > 0
    ? chronological.filter((_, i) => i % Math.max(1, Math.floor(chronological.length / 5)) === 0).slice(0, 6).map(r => formatTelemetryTimestamp(r.created_at).time)
    : ['T-25m', 'T-20m', 'T-15m', 'T-10m', 'T-5m', 'Now']

  // Calculations for bottom panel
  const todayProdL = readings?.today_production_l ?? 18600
  const treatedM3 = (todayProdL / 1000).toFixed(1)
  const rejectedM3 = (todayProdL * 0.28 / 1000).toFixed(1)
  const systemStatus = readings?.system_status || 'RUNNING'

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-chart-line panel-header-icon blue-text"></i>
          <h2>Water Purifier Performance</h2>
          <span className="live-status-badge">
            <span className="live-status-dot"></span> Live SCADA
          </span>
        </div>
        <div className="panel-header-right">
          <span className="header-time"><i className="far fa-clock"></i> {timeStr}</span>
          <span className="header-date"><i className="far fa-calendar-alt"></i> {dateStr}</span>
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
            <h3 className="card-title">Performance & Recovery Trend</h3>
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
                <option value="live">Live Buffer</option>
                <option value="24h">24 Hours</option>
                <option value="7d">7 Days</option>
              </select>
            </div>
          </div>

          <div className="svg-chart-container">
            <svg viewBox="0 0 700 200" width="100%" height="100%" className="line-chart-svg">
              <line x1="50" y1="30" x2="650" y2="30" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="70" x2="650" y2="70" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="110" x2="650" y2="110" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="150" x2="650" y2="150" stroke="#f0f2f5" strokeWidth="1" />

              <text x="35" y="35" className="chart-axis-label">100%</text>
              <text x="35" y="75" className="chart-axis-label">75%</text>
              <text x="35" y="115" className="chart-axis-label">50%</text>
              <text x="35" y="155" className="chart-axis-label">25%</text>

              {/* Dynamic Paths */}
              <path d={efficiencyPath} fill="none" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" />
              <path d={recoveryPath} fill="none" stroke="#3498db" strokeWidth="3" strokeLinecap="round" />

              <line x1="50" y1="175" x2="650" y2="175" stroke="#ccc" strokeWidth="1.5" />
            </svg>

            <div className="chart-x-labels-row">
              {trendTimes.map((t, index) => (
                <div key={index} className="x-label-item">{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Treated Water, Rejected Water, System Status */}
        <div className="performance-summary-grid">
          <div className="card summary-panel-item">
            <span className="summary-title">Purified Water Produced</span>
            <div className="summary-val-row">
              <span className="summary-value">{treatedM3} m³</span>
              <span className="summary-tag label-today">Today</span>
            </div>
          </div>

          <div className="card summary-panel-item">
            <span className="summary-title">Reject Water (Brine)</span>
            <div className="summary-val-row">
              <span className="summary-value">{rejectedM3} m³</span>
              <span className="summary-tag label-today">Today</span>
            </div>
          </div>

          <div className="card summary-panel-item">
            <span className="summary-title">Chemical Dosing / Antiscalant</span>
            <div className="summary-val-row">
              <span className="summary-value">4.2 ppm</span>
              <span className="summary-tag label-today">Auto Mode</span>
            </div>
          </div>

          <div className="card summary-panel-item">
            <span className="summary-title">Operating State</span>
            <div className="summary-val-row">
              <span className="summary-value text-primary">{systemStatus}</span>
              <span className="summary-tag label-active">SCADA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
