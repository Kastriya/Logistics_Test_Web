import jwt from 'jsonwebtoken'
import db from './database.js'

export const JWT_SECRET = process.env.JWT_SECRET || 'swiftline-dev-secret-key-change-in-production'
export const JWT_EXPIRY = '7d'

/**
 * Middleware: Verify JWT and attach user to request
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please sign in.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET)

    const user = db.prepare('SELECT id, name, email, company, created_at FROM users WHERE id = ?').get(payload.userId)

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token. Please sign in again.' })
  }
}

/**
 * Generate JWT token for a user
 */
export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}
