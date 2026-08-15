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

export default function HistoryPanel({ readings, history = [] }) {
  const { time: timeStr, date: dateStr } = formatTelemetryTimestamp(readings?.created_at)
  const [param, setParam] = useState('all')
  const [timeFilter, setTimeFilter] = useState('live')

  // Chronological order (oldest to newest)
  const chronological = history.length > 0 ? [...history].reverse() : [readings, readings]

  const phs = chronological.map(r => r?.ph ?? 7.2)
  const tdsOutputs = chronological.map(r => r?.tds_output ?? 28)
  const turbidities = chronological.map(r => r?.turbidity ?? 0.6)
  const conductivities = chronological.map(r => r?.conductivity ?? 650)

  const calcStats = (arr, decimals = 2) => {
    if (!arr || arr.length === 0) return { min: '0', max: '0', avg: '0' }
    const min = Math.min(...arr).toFixed(decimals)
    const max = Math.max(...arr).toFixed(decimals)
    const avg = (arr.reduce((acc, v) => acc + v, 0) / arr.length).toFixed(decimals)
    return { min, max, avg }
  }

  const phStats = calcStats(phs, 2)
  const tdsStats = calcStats(tdsOutputs, 0)
  const turbStats = calcStats(turbidities, 2)
  const condStats = calcStats(conductivities, 0)

  const summaryData = [
    { param: 'pH', ...phStats, unit: '--' },
    { param: 'TDS (Output)', ...tdsStats, unit: 'ppm' },
    { param: 'Turbidity', ...turbStats, unit: 'NTU' },
    { param: 'Conductivity', ...condStats, unit: 'µS/cm' }
  ]

  // Dynamic SVG paths calculated from real telemetry
  const pathPh = buildSvgPath(phs, 6.0, 8.5)
  const pathTds = buildSvgPath(tdsOutputs, 0, 100)
  const pathTurb = buildSvgPath(turbidities, 0, 3.0)
  const pathCond = buildSvgPath(conductivities, 400, 900)

  // Real timestamps from history
  const timeLabels = chronological.length > 0
    ? chronological.filter((_, i) => i % Math.max(1, Math.floor(chronological.length / 6)) === 0).slice(0, 7).map(r => formatTelemetryTimestamp(r.created_at).time)
    : ['T-30m', 'T-25m', 'T-20m', 'T-15m', 'T-10m', 'T-5m', 'Now']

  const handleExport = () => {
    if (!history || history.length === 0) {
      alert('No history records available to export yet.')
      return
    }
    const headers = Object.keys(history[0]).join(',')
    const rows = history.map(row => Object.values(row).join(',')).join('\n')
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + '\n' + rows)
    const link = document.createElement('a')
    link.setAttribute('href', csvContent)
    link.setAttribute('download', `water_purifier_telemetry_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-history panel-header-icon blue-text"></i>
          <h2>Telemetry History & Analytics</h2>
          <span className="live-status-badge">
            <span className="live-status-dot"></span> Auto Streaming
          </span>
        </div>
        <div className="panel-header-right">
          <span className="header-time"><i className="far fa-clock"></i> {timeStr}</span>
          <span className="header-date"><i className="far fa-calendar-alt"></i> {dateStr}</span>
        </div>
      </div>

      <div className="panel-content">
        {/* Filters Row */}
        <div className="card filters-card">
          <div className="filter-group-row">
            <div className="filter-input-item">
              <label className="filter-label">Select Parameter</label>
              <select 
                className="custom-select" 
                value={param} 
                onChange={(e) => setParam(e.target.value)}
              >
                <option value="all">All Parameters</option>
                <option value="ph">pH</option>
                <option value="tds">TDS Output</option>
                <option value="turbidity">Turbidity</option>
                <option value="conductivity">Conductivity</option>
              </select>
            </div>

            <div className="filter-input-item">
              <label className="filter-label">Data Window</label>
              <select 
                className="custom-select" 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="live">Live Streaming Buffer ({history.length} cycles)</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>

            <button className="btn btn-primary btn-export" onClick={handleExport}>
              <i className="fas fa-file-export"></i> Export CSV
            </button>
          </div>
        </div>

        {/* Chart: Historical Trends */}
        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="card-title">Real-Time Sensor Trends</h3>
            <div className="chart-legends multiline-legends">
              <div className="legend-item">
                <span className="legend-line line-ph"></span>
                <span>pH</span>
              </div>
              <div className="legend-item">
                <span className="legend-line line-tds"></span>
                <span>TDS (ppm)</span>
              </div>
              <div className="legend-item">
                <span className="legend-line line-turb"></span>
                <span>Turbidity (NTU)</span>
              </div>
              <div className="legend-item">
                <span className="legend-line line-cond"></span>
                <span>Conductivity (µS/cm)</span>
              </div>
            </div>
          </div>

          <div className="svg-chart-container">
            <svg viewBox="0 0 700 190" width="100%" height="100%" className="line-chart-svg">
              {/* Horizontal Grid */}
              <line x1="50" y1="35" x2="650" y2="35" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="75" x2="650" y2="75" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="115" x2="650" y2="115" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="155" x2="650" y2="155" stroke="#f0f2f5" strokeWidth="1" />

              {/* Vertical Lines */}
              {[50, 150, 250, 350, 450, 550, 650].map((xVal, idx) => (
                <line key={idx} x1={xVal} y1="30" x2={xVal} y2="160" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              ))}

              {/* Live SVG Curves from Supabase */}
              {(param === 'all' || param === 'ph') && (
                <path d={pathPh} fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" />
              )}
              {(param === 'all' || param === 'tds') && (
                <path d={pathTds} fill="none" stroke="#3498db" strokeWidth="2.5" strokeLinecap="round" />
              )}
              {(param === 'all' || param === 'conductivity') && (
                <path d={pathCond} fill="none" stroke="#e67e22" strokeWidth="2.5" strokeLinecap="round" />
              )}
              {(param === 'all' || param === 'turbidity') && (
                <path d={pathTurb} fill="none" stroke="#9b59b6" strokeWidth="2.5" strokeLinecap="round" />
              )}

              <line x1="50" y1="160" x2="650" y2="160" stroke="#ccc" strokeWidth="1.5" />
            </svg>

            {/* Live X Labels */}
            <div className="chart-x-labels-row">
              {timeLabels.map((d, index) => (
                <div key={index} className="x-label-item">{d}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Summary Table */}
        <div className="card data-summary-card">
          <h3 className="card-title">Automated Telemetry Summary</h3>
          <table className="custom-table select-none">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Min</th>
                <th>Max</th>
                <th>Average</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((row, idx) => (
                <tr key={idx}>
                  <td className="font-semibold">{row.param}</td>
                  <td className="font-semibold text-danger">{row.min}</td>
                  <td className="font-semibold text-success">{row.max}</td>
                  <td className="font-semibold text-primary">{row.avg}</td>
                  <td className="text-secondary">{row.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
