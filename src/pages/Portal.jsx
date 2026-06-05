import { useState, useEffect } from 'react'
import { LogIn, UserPlus, Package, FileText, Settings, BarChart3, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import './Portal.css'

// API helper
const api = {
  async request(url, options = {}) {
    const token = localStorage.getItem('swiftline_token')
    const headers = { 'Content-Type': 'application/json', ...options.headers }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(url, { ...options, headers })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong')
    }
    return data
  },

  login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  register(name, email, company, password) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, company, password }),
    })
  },

  getProfile() {
    return this.request('/api/auth/me')
  },

  getShipments() {
    return this.request('/api/shipments')
  },
}

function Portal() {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState(null)
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false })
  const [signupForm, setSignupForm] = useState({ name: '', email: '', company: '', password: '', confirm: '' })

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('swiftline_token')
    if (token) {
      api.getProfile()
        .then((data) => {
          setUser(data.user)
          return api.getShipments()
        })
        .then((data) => setShipments(data.shipments))
        .catch(() => {
          localStorage.removeItem('swiftline_token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const data = await api.login(loginForm.email, loginForm.password)
      localStorage.setItem('swiftline_token', data.token)
      setUser(data.user)

      const shipmentsData = await api.getShipments()
      setShipments(shipmentsData.shipments)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')

    if (signupForm.password !== signupForm.confirm) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      const data = await api.register(signupForm.name, signupForm.email, signupForm.company, signupForm.password)
      localStorage.setItem('swiftline_token', data.token)
      setUser(data.user)
      setShipments([])
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('swiftline_token')
    setUser(null)
    setShipments([])
    setLoginForm({ email: '', password: '', remember: false })
    setSignupForm({ name: '', email: '', company: '', password: '', confirm: '' })
  }

  if (loading) {
    return (
      <div className="portal-page">
        <section className="page-header">
          <div className="container">
            <h1>Client Portal</h1>
            <p>Manage your shipments, documents, and account in one place</p>
          </div>
        </section>
        <section className="section" style={{ textAlign: 'center', padding: '80px 0' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--blue)' }} />
        </section>
      </div>
    )
  }

  return (
    <div className="portal-page">
      <section className="page-header">
        <div className="container">
          <h1>Client Portal</h1>
          <p>Manage your shipments, documents, and account in one place</p>
        </div>
      </section>

      {!user ? (
        <section className="section portal-auth">
          <div className="container">
            <div className="portal-auth__card">
              <div className="portal-auth__tabs">
                <button
                  className={`portal-auth__tab ${isLogin ? 'portal-auth__tab--active' : ''}`}
                  onClick={() => { setIsLogin(true); setError('') }}
                >
                  <LogIn size={16} /> Sign In
                </button>
                <button
                  className={`portal-auth__tab ${!isLogin ? 'portal-auth__tab--active' : ''}`}
                  onClick={() => { setIsLogin(false); setError('') }}
                >
                  <UserPlus size={16} /> Sign Up
                </button>
              </div>

              {error && (
                <div className="portal-error-banner">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {isLogin ? (
                <form className="portal-form" onSubmit={handleLogin}>
                  <h2>Welcome Back</h2>
                  <p className="portal-form__subtitle">Sign in to access your dashboard</p>
                  <div className="portal-form__field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div className="portal-form__field">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div className="portal-form__options">
                    <label className="portal-form__checkbox">
                      <input
                        type="checkbox"
                        checked={loginForm.remember}
                        onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                      />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="portal-form__forgot">Forgot password?</a>
                  </div>
                  <button type="submit" className="btn btn-primary portal-form__submit" disabled={submitting}>
                    {submitting ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</> : <>Sign In <ArrowRight size={16} /></>}
                  </button>
                  <p className="portal-form__hint">Demo: demo@swiftline.com / demo123</p>
                </form>
              ) : (
                <form className="portal-form" onSubmit={handleSignup}>
                  <h2>Create Account</h2>
                  <p className="portal-form__subtitle">Join SwiftLine to manage your logistics</p>
                  <div className="portal-form__field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div className="portal-form__row">
                    <div className="portal-form__field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div className="portal-form__field">
                      <label>Company</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        value={signupForm.company}
                        onChange={(e) => setSignupForm({ ...signupForm, company: e.target.value })}
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <div className="portal-form__row">
                    <div className="portal-form__field">
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="Min. 6 characters"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        required
                        minLength={6}
                        disabled={submitting}
                      />
                    </div>
                    <div className="portal-form__field">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={signupForm.confirm}
                        onChange={(e) => setSignupForm({ ...signupForm, confirm: e.target.value })}
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary portal-form__submit" disabled={submitting}>
                    {submitting ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Creating account...</> : <>Create Account <ArrowRight size={16} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="section portal-dashboard">
          <div className="container">
            <div className="portal-dashboard__header">
              <div>
                <h2>Welcome back, {user.name}</h2>
                <p>{user.company ? `${user.company} — ` : ''}{user.email}</p>
              </div>
              <button className="btn btn-primary" onClick={handleLogout}>
                Sign Out
              </button>
            </div>

            <div className="dashboard-stats">
              <div className="dashboard-stat">
                <Package size={24} />
                <div>
                  <strong>{shipments.filter(s => s.status !== 'Delivered').length}</strong>
                  <span>Active Shipments</span>
                </div>
              </div>
              <div className="dashboard-stat">
                <FileText size={24} />
                <div>
                  <strong>{shipments.length * 4}</strong>
                  <span>Documents</span>
                </div>
              </div>
              <div className="dashboard-stat">
                <BarChart3 size={24} />
                <div>
                  <strong>{shipments.length}</strong>
                  <span>Total Shipments</span>
                </div>
              </div>
              <div className="dashboard-stat">
                <Settings size={24} />
                <div>
                  <strong>{shipments.filter(s => s.status === 'Customs').length}</strong>
                  <span>Pending Actions</span>
                </div>
              </div>
            </div>

            <div className="dashboard-table-card">
              <div className="dashboard-table-card__header">
                <h3>Your Shipments</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                  {shipments.length} shipment{shipments.length !== 1 ? 's' : ''}
                </span>
              </div>
              {shipments.length > 0 ? (
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Tracking ID</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((s) => (
                      <tr key={s.tracking_id}>
                        <td><strong>{s.tracking_id}</strong></td>
                        <td>{s.origin}</td>
                        <td>{s.destination}</td>
                        <td>
                          <span className={`table-status table-status--${s.status === 'Delivered' ? 'delivered' : s.status === 'Customs' ? 'customs' : 'transit'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td>{s.ship_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="dashboard-empty">
                  <Package size={40} />
                  <p>No shipments yet. Your shipment history will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Portal
