import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    
    setLoading(false)
  }

  return (
    <div className="premium-auth-container">
      <div className="premium-auth-card">
        
        {/* Left Side: Visual/Branding */}
        <div className="auth-visual-side">
          <div className="auth-visual-overlay"></div>
          <img src="/auth-bg.png" alt="Clean Water Tech" className="auth-visual-image" />
          
          <div className="auth-visual-content">
            <div className="auth-visual-logo">
              <i className="fa-solid fa-cubes"></i> QUADRAID
            </div>
            <h1 className="auth-visual-title">
              Welcome Back.
            </h1>
            <p className="auth-visual-desc">
              Access your intelligent water treatment dashboard to monitor real-time performance and analytics.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>Sign In</h2>
              <p>Enter your details to proceed.</p>
            </div>
            
            {error && <div className="premium-alert error"><i className="fa-solid fa-circle-exclamation"></i> {error}</div>}
            
            <form onSubmit={handleAuth} className="premium-form">
              <div className="premium-input-group">
                <input 
                  type="email" 
                  className="premium-input" 
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="premium-floating-label">Email address</label>
                <div className="input-highlight"></div>
              </div>

              <div className="premium-input-group">
                <input 
                  type="password" 
                  className="premium-input" 
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="premium-floating-label">Password</label>
                <div className="input-highlight"></div>
              </div>

              <div className="auth-options">
                <label className="remember-me">
                  <input type="checkbox" className="premium-checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="premium-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-spinner"></span>
                ) : (
                  <span>Sign In <i className="fa-solid fa-arrow-right"></i></span>
                )}
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  )
}
