import React, { useState } from 'react'

export default function HistoryPanel() {
  const [param, setParam] = useState('all')
  const [dateRange, setDateRange] = useState('18-25')

  const summaryData = [
    { param: 'pH', min: '6.82', max: '7.64', avg: '7.21', unit: '--' },
    { param: 'TDS', min: '312', max: '545', avg: '423', unit: 'mg/L' },
    { param: 'Turbidity', min: '0.21', max: '1.24', avg: '0.63', unit: 'NTU' },
    { param: 'Conductivity', min: '498', max: '812', avg: '645', unit: 'µS/cm' }
  ]

  // Multi-line SVG paths for Historical Trends
  // pH (green), TDS (blue), Turbidity (purple), Conductivity (orange)
  const pathPh = "M 50 120 Q 130 110 210 125 T 370 115 Q 450 130 530 118 T 650 122"
  const pathTds = "M 50 60 Q 130 80 210 50 T 370 70 Q 450 45 530 65 T 650 55"
  const pathTurb = "M 50 150 Q 130 145 210 160 T 370 148 Q 450 155 530 142 T 650 150"
  const pathCond = "M 50 90 Q 130 100 210 85 T 370 95 Q 450 80 530 92 T 650 88"

  const dates = ['18 May', '19 May', '20 May', '21 May', '22 May', '23 May', '24 May', '25 May']

  const handleExport = () => {
    alert('Exporting data as CSV...')
  }

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-history panel-header-icon blue-text"></i>
          <h2>History</h2>
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
                <option value="tds">TDS</option>
                <option value="turbidity">Turbidity</option>
                <option value="conductivity">Conductivity</option>
              </select>
            </div>

            <div className="filter-input-item">
              <label className="filter-label">Date Range</label>
              <select 
                className="custom-select" 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="18-25">18 May 2025 - 25 May 2025</option>
                <option value="11-18">11 May 2025 - 18 May 2025</option>
                <option value="04-11">04 May 2025 - 11 May 2025</option>
              </select>
            </div>

            <button className="btn btn-primary btn-export" onClick={handleExport}>
              <i className="fas fa-file-export"></i> Export Data
            </button>
          </div>
        </div>

        {/* Chart: Historical Trends */}
        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="card-title">Historical Trends</h3>
            <div className="chart-legends multiline-legends">
              <div className="legend-item">
                <span className="legend-line line-ph"></span>
                <span>pH</span>
              </div>
              <div className="legend-item">
                <span className="legend-line line-tds"></span>
                <span>TDS (mg/L)</span>
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
            <svg viewBox="0 0 700 200" width="100%" height="100%" className="line-chart-svg">
              {/* Horizontal grid lines */}
              <line x1="50" y1="30" x2="650" y2="30" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="60" x2="650" y2="60" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="90" x2="650" y2="90" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="120" x2="650" y2="120" stroke="#f0f2f5" strokeWidth="1" />
              <line x1="50" y1="150" x2="650" y2="150" stroke="#f0f2f5" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="34" className="chart-axis-label">1000</text>
              <text x="30" y="64" className="chart-axis-label">750</text>
              <text x="30" y="94" className="chart-axis-label">500</text>
              <text x="30" y="124" className="chart-axis-label">250</text>
              <text x="30" y="154" className="chart-axis-label">0</text>

              {/* Grid Vertical Lines */}
              {[50, 135, 220, 305, 390, 475, 560, 650].map((xVal, idx) => (
                <line key={idx} x1={xVal} y1="30" x2={xVal} y2="165" stroke="#f0f2f5" strokeWidth="1" strokeDasharray="3,3" />
              ))}

              {/* Render lines depending on selector */}
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

              {/* X Axis line */}
              <line x1="50" y1="165" x2="650" y2="165" stroke="#ccc" strokeWidth="1.5" />
            </svg>

            {/* X Labels */}
            <div className="chart-x-labels-row">
              {dates.map((d, index) => (
                <div key={index} className="x-label-item">{d}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Summary Table */}
        <div className="card data-summary-card">
          <h3 className="card-title">Data Summary</h3>
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
