import React from 'react'
import { supabase } from '../lib/supabaseClient'

const navItems = [
  { id: 'nav-dashboard', icon: 'fas fa-home', label: 'Dashboard' },
  { id: 'nav-water-quality', icon: 'fas fa-tint', label: 'Water Quality' },
  { id: 'nav-performance', icon: 'fas fa-chart-line', label: 'Performance' },
  { id: 'nav-energy', icon: 'fas fa-bolt', label: 'Energy' },
  { id: 'nav-alerts', icon: 'fas fa-bell', label: 'Alerts' },
  { id: 'nav-history', icon: 'fas fa-history', label: 'History' },
  { id: 'nav-settings', icon: 'fas fa-cog', label: 'Settings' },
]

export default function Sidebar({ activeId, setActiveId }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="sidebar" id="main-nav">
      <div className="sidebar-brand">
        <div className="logo-icon-container">
          <i className="fas fa-cubes logo-icon-quad"></i>
        </div>
        <span className="logo-text-quad">QUADRAID</span>
      </div>

      <div className="nav-items-container">
        {navItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className={`nav-item${activeId === item.id ? ' active' : ''}`}
            onClick={() => setActiveId(item.id)}
          >
            <i className={item.icon}></i> {item.label}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div 
          className="nav-item" 
          onClick={handleSignOut}
          style={{ marginBottom: '16px', color: '#f87171' }}
        >
          <i className="fas fa-sign-out-alt"></i> Sign Out
        </div>
        <div className="footer-label">Last Updated</div>
        <div className="footer-time">26 May 2025 12:30 PM</div>
      </div>
    </nav>
  )
}
