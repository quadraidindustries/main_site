import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function QuickActions({ readings }) {
  const [loading, setLoading] = useState(false)
  const isRunning = readings?.system_status !== 'STOPPED'

  const handleToggleSystem = async () => {
    const action = isRunning ? 'STOP' : 'START'
    const confirmMsg = isRunning
      ? 'Are you sure you want to stop the system?'
      : 'Are you sure you want to start the system?'

    if (!confirm(confirmMsg)) return

    try {
      setLoading(true)

      // Broadcast command to simulator / physical machine
      const channel = supabase.channel('system-commands')
      await channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.send({
            type: 'broadcast',
            event: 'command',
            payload: { action }
          })
          supabase.removeChannel(channel)
        }
      })

    } catch (err) {
      console.error('Error sending system command:', err)
      alert('Failed to send command to machine: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFlush = () => {
    alert('Manual Flush cycle initiated')
  }

  const handleUV = () => {
    alert('UV Lamp Diagnostic Test started')
  }

  return (
    <div className="card" id="quick-actions">
      <div className="card-title">Quick Actions</div>
      <div className="actions-grid">
        <div className="actions-row">
          <button className="action-btn flush" id="btn-flush" onClick={handleFlush}>
            <i className="fas fa-tint"></i> Manual Flush
          </button>
          
          <button 
            className={`action-btn ${isRunning ? 'stop' : 'start-btn'}`} 
            id="btn-stop" 
            onClick={handleToggleSystem}
            disabled={loading}
            style={!isRunning ? { backgroundColor: '#10b981', color: '#fff' } : {}}
          >
            <i className={`fas ${isRunning ? 'fa-stop-circle' : 'fa-play-circle'}`}></i>
            {loading ? ' Sending...' : isRunning ? ' System Stop' : ' Start System'}
          </button>
        </div>
        <div className="actions-row">
          <button className="action-btn uv" id="btn-uv" onClick={handleUV}>
            <i className="fas fa-sun"></i> UV Lamp Test
          </button>
        </div>
      </div>
    </div>
  )
}
