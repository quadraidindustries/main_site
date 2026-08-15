import React, { useState } from 'react'
import { formatTelemetryTimestamp } from '../lib/formatters'

export default function SettingsPanel({ readings }) {
  const { time: timeStr, date: dateStr } = formatTelemetryTimestamp(readings?.created_at)
  const [activeTab, setActiveTab] = useState('system')

  // Form states
  const [plantName, setPlantName] = useState('Quadraid Water Treatment Plant')
  const [location, setLocation] = useState('Chennai, India')
  const [capacity, setCapacity] = useState('500 m³/day')
  const [systemType, setSystemType] = useState('RO Based Water Treatment')
  const [commissionDate, setCommissionDate] = useState('01 Jan 2025')
  
  const [theme, setTheme] = useState('Light')
  const [language, setLanguage] = useState('English')
  const [dateFormat, setDateFormat] = useState('DD MMM YYYY')
  const [timeFormat, setTimeFormat] = useState('12 Hour')
  const [tempUnit, setTempUnit] = useState('°C')
  const [pressUnit, setPressUnit] = useState('bar')

  const [dataInterval, setDataInterval] = useState('1 min')
  const [dataRetention, setDataRetention] = useState('90 Days')

  const [autoBackup, setAutoBackup] = useState(true)
  const [emailReports, setEmailReports] = useState(true)

  const handleSave = (e) => {
    e.preventDefault()
    alert('Changes saved successfully!')
  }

  const tabs = [
    { id: 'system', label: 'System Settings' },
    { id: 'alert', label: 'Alert Settings' },
    { id: 'user', label: 'User Management' },
    { id: 'general', label: 'General' }
  ]

  return (
    <div className="panel-container animate-fade-in">
      <div className="panel-header">
        <div className="panel-header-left">
          <i className="fas fa-cog panel-header-icon blue-text"></i>
          <h2>Settings</h2>
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
        {/* Settings Tab Selector */}
        <div className="settings-tabs-row">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'system' ? (
          <form onSubmit={handleSave} className="settings-form-layout">
            <div className="two-columns-layout" style={{ marginTop: '0' }}>
              {/* Left Column: System Information */}
              <div className="card left-main-col" style={{ flex: '1' }}>
                <h3 className="card-title">System Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Plant Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={plantName} 
                      onChange={(e) => setPlantName(e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                    />
                  </div>

                  <div className="form-group-row-2col">
                    <div className="form-group">
                      <label className="form-label">Plant Capacity</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={capacity} 
                        onChange={(e) => setCapacity(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">System Type</label>
                      <select 
                        className="form-select" 
                        value={systemType} 
                        onChange={(e) => setSystemType(e.target.value)}
                      >
                        <option value="RO Based Water Treatment">RO Based Water Treatment</option>
                        <option value="UF Filtered Water Treatment">UF Filtered Water Treatment</option>
                        <option value="Multi-Stage Ionized Treatment">Multi-Stage Ionized Treatment</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-row-2col">
                    <div className="form-group">
                      <label className="form-label">Commission Date</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={commissionDate} 
                        onChange={(e) => setCommissionDate(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Software Version</label>
                      <input type="text" className="form-input version-disabled" value="1.0.0" disabled />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Display & Preferences */}
              <div className="card right-sidebar-col" style={{ flex: '1' }}>
                <h3 className="card-title">Display & Preferences</h3>
                <div className="form-grid">
                  <div className="form-group-row-2col">
                    <div className="form-group">
                      <label className="form-label">Theme</label>
                      <select className="form-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-row-2col">
                    <div className="form-group">
                      <label className="form-label">Date Format</label>
                      <select className="form-select" value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                        <option value="DD MMM YYYY">DD MMM YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time Format</label>
                      <select className="form-select" value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)}>
                        <option value="12 Hour">12 Hour</option>
                        <option value="24 Hour">24 Hour</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-row-2col">
                    <div className="form-group">
                      <label className="form-label">Temperature Unit</label>
                      <select className="form-select" value={tempUnit} onChange={(e) => setTempUnit(e.target.value)}>
                        <option value="°C">°C</option>
                        <option value="°F">°F</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pressure Unit</label>
                      <select className="form-select" value={pressUnit} onChange={(e) => setPressUnit(e.target.value)}>
                        <option value="bar">bar</option>
                        <option value="psi">psi</option>
                        <option value="kPa">kPa</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row Form Controls */}
            <div className="two-columns-layout" style={{ marginTop: '0' }}>
              <div className="card left-main-col" style={{ flex: '1' }}>
                <h3 className="card-title">Data & System</h3>
                <div className="form-group-row-2col">
                  <div className="form-group">
                    <label className="form-label">Data Interval</label>
                    <select className="form-select" value={dataInterval} onChange={(e) => setDataInterval(e.target.value)}>
                      <option value="1 min">1 min</option>
                      <option value="5 min">5 min</option>
                      <option value="15 min">15 min</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Data Retention</label>
                    <select className="form-select" value={dataRetention} onChange={(e) => setDataRetention(e.target.value)}>
                      <option value="30 Days">30 Days</option>
                      <option value="90 Days">90 Days</option>
                      <option value="1 Year">1 Year</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="card right-sidebar-col flex-center-y" style={{ flex: '1' }}>
                <div className="toggles-grid">
                  <div className="toggle-item">
                    <span className="toggle-label font-semibold">Auto Backup</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={autoBackup} 
                        onChange={(e) => setAutoBackup(e.target.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <span className="toggle-label font-semibold">Email Reports</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={emailReports} 
                        onChange={(e) => setEmailReports(e.target.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button Row */}
            <div className="settings-actions-footer">
              <button type="submit" className="btn btn-primary btn-save">
                <i className="fas fa-save"></i> Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="card text-center" style={{ padding: '40px' }}>
            <i className="fas fa-circle-info text-primary" style={{ fontSize: '32px', marginBottom: '16px' }}></i>
            <h3>Other settings panel sections coming soon</h3>
            <p className="text-secondary" style={{ marginTop: '8px' }}>
              This tab is reserved for future custom parameters configuration.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
