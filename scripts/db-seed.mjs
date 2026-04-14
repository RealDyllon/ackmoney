import fs from 'node:fs'
import Database from 'better-sqlite3'

const databaseUrl = process.env.DATABASE_URL ?? './data/ackmoney.db'
const db = new Database(databaseUrl)

try {
  const seedSql = fs.readFileSync('./drizzle/seed.sql', 'utf8')
  db.exec(seedSql)
  console.log('Seed defaults inserted (SG categories + sample accounts).')
} finally {
  db.close()
}
