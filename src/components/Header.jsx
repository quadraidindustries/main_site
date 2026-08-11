import { useState, useEffect } from 'react'

export default function Header() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' }
      setDate(now.toLocaleDateString('en-GB', dateOptions))
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="header" id="main-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">QI</div>
          <span className="logo-text">QUADRAID</span>
        </div>
      </div>
      <div className="header-center">
        <h1>Smart Water Treatment System</h1>
        <p>Real-time Monitoring Dashboard</p>
      </div>
      <div className="header-right">
        <div className="datetime">
          <div id="current-date">{date}</div>
          <div id="current-time">{time}</div>
        </div>
        <div className="online-status">
          <i className="fas fa-wifi"></i>
          <div className="online-dot"></div>
          <span>Online</span>
        </div>
      </div>
    </header>
  )
}
