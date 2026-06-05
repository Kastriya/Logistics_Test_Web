import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import db from './database.js'
import { requireAuth, generateToken } from './auth.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// ============================================
// AUTH ROUTES
// ============================================

/**
 * POST /api/auth/register
 * Create a new user account
 */
app.post('/api/auth/register', (req, res) => {
  const { name, email, company, password } = req.body

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  // Check if email already exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase())
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' })
  }

  // Create user
  const passwordHash = bcrypt.hashSync(password, 10)
  const result = db.prepare(
    'INSERT INTO users (name, email, password_hash, company) VALUES (?, ?, ?, ?)'
  ).run(name, email.toLowerCase(), passwordHash, company || null)

  const userId = result.lastInsertRowid
  const token = generateToken(userId)

  const user = db.prepare('SELECT id, name, email, company, created_at FROM users WHERE id = ?').get(userId)

  console.log(`New user registered: ${email}`)

  res.status(201).json({
    token,
    user,
  })
})

/**
 * POST /api/auth/login
 * Authenticate user and return JWT
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase())

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const validPassword = bcrypt.compareSync(password, user.password_hash)
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const token = generateToken(user.id)

  console.log(`User logged in: ${email}`)

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company,
      created_at: user.created_at,
    },
  })
})

/**
 * GET /api/auth/me
 * Get current user profile (requires auth)
 */
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

// ============================================
// SHIPMENT ROUTES
// ============================================

/**
 * GET /api/shipments
 * Get all shipments for the authenticated user
 */
app.get('/api/shipments', requireAuth, (req, res) => {
  const shipments = db.prepare(
    'SELECT id, tracking_id, origin, destination, weight, service, status, ship_date, eta, current_step, created_at FROM shipments WHERE user_id = ? ORDER BY created_at DESC'
  ).all(req.user.id)

  res.json({ shipments })
})

/**
 * GET /api/shipments/:trackingId
 * Get a single shipment with full timeline (requires auth)
 */
app.get('/api/shipments/:trackingId', requireAuth, (req, res) => {
  const { trackingId } = req.params

  const shipment = db.prepare(
    'SELECT * FROM shipments WHERE tracking_id = ? AND user_id = ?'
  ).get(trackingId, req.user.id)

  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found.' })
  }

  // Build timeline steps based on status and current_step
  const stepTemplates = [
    { title: 'Pickup', detail: `Collected from ${shipment.origin}` },
    { title: 'In Transit', detail: 'Shipment is on its way' },
    { title: 'Customs', detail: 'Customs clearance processing' },
    { title: 'Out for Delivery', detail: 'Dispatched for last-mile delivery' },
    { title: 'Delivered', detail: 'Delivery confirmed' },
  ]

  const steps = stepTemplates.map((step, i) => ({
    ...step,
    date: i <= shipment.current_step ? shipment.ship_date : `Est. pending`,
  }))

  res.json({
    shipment: {
      tracking_id: shipment.tracking_id,
      origin: shipment.origin,
      destination: shipment.destination,
      weight: shipment.weight,
      service: shipment.service,
      status: shipment.status,
      ship_date: shipment.ship_date,
      eta: shipment.eta,
      current_step: shipment.current_step,
      steps,
    },
  })
})

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`\n--- SwiftLine API Server ---`)
  console.log(`Running on http://localhost:${PORT}`)
  console.log(`Database: SQLite (server/data.db)\n`)
})
