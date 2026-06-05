import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'data.db')

const db = new Database(DB_PATH)

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    company TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tracking_id TEXT UNIQUE NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    weight TEXT,
    service TEXT,
    status TEXT NOT NULL DEFAULT 'Pickup',
    ship_date TEXT,
    eta TEXT,
    current_step INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`)

// Seed demo data if no users exist
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get()

if (userCount.count === 0) {
  console.log('Seeding demo data...')

  const hashedPassword = bcrypt.hashSync('demo123', 10)

  const insertUser = db.prepare(
    'INSERT INTO users (name, email, password_hash, company) VALUES (?, ?, ?, ?)'
  )

  const insertShipment = db.prepare(`
    INSERT INTO shipments (user_id, tracking_id, origin, destination, weight, service, status, ship_date, eta, current_step)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  // Create demo user
  const result = insertUser.run('Demo User', 'demo@swiftline.com', hashedPassword, 'SwiftLine Demo Corp')
  const demoUserId = result.lastInsertRowid

  // Seed shipments for demo user
  insertShipment.run(demoUserId, 'SWL-2026-78432', 'Shanghai, China', 'New York, USA', '2,400 kg', 'Ocean Freight (FCL)', 'In Transit', 'May 20, 2026', 'June 12, 2026', 2)
  insertShipment.run(demoUserId, 'SWL-2026-91205', 'London, UK', 'Dubai, UAE', '850 kg', 'Air Freight (Express)', 'Delivered', 'May 30, 2026', 'June 2, 2026', 4)
  insertShipment.run(demoUserId, 'SWL-2026-64890', 'Hamburg, Germany', 'Sydney, Australia', '1,800 kg', 'Ocean Freight (LCL)', 'Customs', 'May 15, 2026', 'June 20, 2026', 2)

  console.log('Demo data seeded successfully.')
  console.log('Demo login: demo@swiftline.com / demo123')
}

export default db
