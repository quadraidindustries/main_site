import React from 'react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="logo-icon-container" style={{ width: 24, height: 24 }}>
        <Logo size={16} color="#ffffff" />
      </div>
      <span className="logo-text">QUADRAID</span>
    </footer>
  )
}
