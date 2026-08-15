import React, { useState } from 'react'
import { formatTelemetryTimestamp } from '../lib/formatters'

export default function EnergyPanel({ readings, history = [] }) {
  const { time: timeStr, date: dateStr } = formatTelemetryTimestamp(readings?.created_at)
  const [energyFilter, setEnergyFilter] = useState('today')

  const power = readings?.power ?? 0.82
  const energyToday = readings?.energy_today ?? 8.45
  const todayProdL = readings?.today_production_l ?? 18600
  const specEnergy = todayProdL > 0 ? (energyToday / (todayProdL / 1000)).toFixed(2) : '0.45'

  const metrics = [
    { label: 'Live Power Draw', value: `${power} kW`, icon: 'fas fa-charging-station', color: '#1a73e8', bg: '#e3f2fd' },
    { label: 'Energy Consumed Today', value: `${energyToday} kWh`, icon: 'fas fa-plug-circle-bolt', color: '#2e7d32', bg: '#e8f5e9' },
    { label: 'Specific Energy Index', value: `${specEnergy} kWh/m³`, icon: 'fas fa-circle-nodes', color: '#00695c', bg: '#e0f2f1' },
    { label: 'Grid Voltage / Phase', value: `${readings?.voltage ?? 230} V AC`, icon: 'fas fa-bolt', color: '#e65100', bg: '#fff3e0' }
  ]

  const consumers = [
    { name: 'RO Booster Pump', percentage: 52, kwh: parseFloat((energyToday * 0.52).toFixed(1)), color: '#2ecc71' },
    { name: 'Pre-Filter & UV Lamp', percentage: 24, kwh: parseFloat((energyToday * 0.24).toFixed(1)), color: '#3498db' },
    { name: 'Antiscalant Dosing', percentage: 14, kwh: parseFloat((energyToday * 0.14).toFixed(1)), color: '#9b59b6' },
    { name: 'IoT Gateway & Valves', percentage: 10, kwh: parseFloat((energyToday * 0.10).toFixed(1)), color: '#f1c40f' }
  ]

  const c = 188.5

  // Dynamic bars calculated from recent history powers
  const chronological = history.length > 0 ? [...history].reverse() : [readings]
  const barHeights = chronological.slice(-16).map(r => Math.max(10, Math.min(100, Math.round((r.power || 0.5) * 100))))
  while (barHeights.length < 16) {
    barHeights.unshift(Math.max(15, Math.round((power || 0.8) * 85)))
  }

  const barLabels = chronological.length > 0
    ? chronological.filter((_, i) => i % Math.max(1, Math.floor(chronological.length / 5)) === 0).slice(0, 6).map(r => formatTelemetryTimestamp(r.created_at).time)
    : ['T-25m', 'T-20m', 'T-15m', 'T-10m', 'T-5m', 'Now']

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-bolt panel-header-icon blue-text"></i>
          <h2>Water Purifier Energy & Power</h2>
          <span className="live-status-badge">
            <span className="live-status-dot"></span> Real-time VFD
          </span>
        </div>
        <div className="panel-header-right">
          <span className="header-time"><i className="far fa-clock"></i> {timeStr}</span>
          <span className="header-date"><i className="far fa-calendar-alt"></i> {dateStr}</span>
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

        {/* Charts: Breakdown + Consumption */}
        <div className="two-columns-layout" style={{ marginTop: '0' }}>
          {/* Donut Chart: Energy Distribution */}
          <div className="card chart-card left-main-col" style={{ flex: '1' }}>
            <div className="chart-header">
              <h3 className="card-title">Sub-System Energy Distribution</h3>
            </div>
            
            <div className="donut-chart-wrapper">
              <div className="donut-svg-container">
                <svg viewBox="0 0 100 100" className="donut-svg" width="160" height="160">
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#e0e0e0" strokeWidth="12" />
                  
                  {/* Segment 1: HP Pump 52% */}
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#2ecc71" strokeWidth="12"
                    strokeDasharray={`${(52/100)*c} ${c}`} strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  
                  {/* Segment 2: RO System 24% */}
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#3498db" strokeWidth="12"
                    strokeDasharray={`${(24/100)*c} ${c}`} strokeDashoffset={`${-(52/100)*c}`} transform="rotate(-90 50 50)" />
                  
                  {/* Segment 3: Dosing 14% */}
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#9b59b6" strokeWidth="12"
                    strokeDasharray={`${(14/100)*c} ${c}`} strokeDashoffset={`${-((52+24)/100)*c}`} transform="rotate(-90 50 50)" />
                  
                  {/* Segment 4: Others 10% */}
                  <circle cx="50" cy="50" r="30" fill="transparent" stroke="#f1c40f" strokeWidth="12"
                    strokeDasharray={`${(10/100)*c} ${c}`} strokeDashoffset={`${-((52+24+14)/100)*c}`} transform="rotate(-90 50 50)" />
                </svg>
                <div className="donut-center-text">
                  <span className="donut-center-val">{energyToday}</span>
                  <span className="donut-center-unit">kWh</span>
                </div>
              </div>

              <div className="donut-legends-list">
                {consumers.map((c, i) => (
                  <div key={i} className="donut-legend-row">
                    <span className="legend-bullet" style={{ backgroundColor: c.color }}></span>
                    <span className="legend-label">{c.name}</span>
                    <span className="legend-kwh">{c.kwh} kWh ({c.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart: Hourly Consumption */}
          <div className="card chart-card right-sidebar-col" style={{ flex: '1.2' }}>
            <div className="chart-header">
              <h3 className="card-title">Live Power Profile</h3>
              <div className="chart-controls">
                <select className="custom-select" value={energyFilter} onChange={(e) => setEnergyFilter(e.target.value)}>
                  <option value="today">Today's Cycles</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div className="svg-chart-container">
              <svg viewBox="0 0 450 150" width="100%" height="100%" className="bar-chart-svg">
                {/* Horizontal Grid lines */}
                <line x1="20" y1="20" x2="430" y2="20" stroke="#f0f2f5" strokeWidth="1" />
                <line x1="20" y1="55" x2="430" y2="55" stroke="#f0f2f5" strokeWidth="1" />
                <line x1="20" y1="90" x2="430" y2="90" stroke="#f0f2f5" strokeWidth="1" />
                <line x1="20" y1="125" x2="430" y2="125" stroke="#f0f2f5" strokeWidth="1" />

                {/* Bars */}
                {barHeights.map((h, i) => {
                  const x = 30 + i * 25
                  const barH = (h / 100) * 90
                  const y = 125 - barH
                  return (
                    <rect
                      key={i}
                      x={x}
                      y={y}
                      width="14"
                      height={barH}
                      rx="3"
                      fill="#3498db"
                      opacity="0.85"
                    />
                  )
                })}
              </svg>

              <div className="chart-x-labels-row">
                {barLabels.map((lbl, idx) => (
                  <div key={idx} className="x-label-item">{lbl}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
