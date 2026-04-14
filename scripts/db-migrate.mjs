import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'

const databaseUrl = process.env.DATABASE_URL ?? './data/ackmoney.db'
fs.mkdirSync(path.dirname(databaseUrl), { recursive: true })

const db = new Database(databaseUrl)
db.pragma('journal_mode = WAL')

try {
  db.exec('CREATE TABLE IF NOT EXISTS __migrations (id text PRIMARY KEY, applied_at integer NOT NULL)')

  const applied = new Set(
    db.prepare('SELECT id FROM __migrations').all().map((row) => row.id),
  )

  const migrationDir = path.resolve('./drizzle')
  const migrations = fs
    .readdirSync(migrationDir)
    .filter((file) => file.endsWith('.sql') && file !== 'seed.sql')
    .sort()

  for (const migrationName of migrations) {
    if (applied.has(migrationName)) {
      continue
    }

    const sql = fs.readFileSync(path.join(migrationDir, migrationName), 'utf8')
    db.exec('BEGIN')
    try {
      db.exec(sql)
      db.prepare('INSERT INTO __migrations (id, applied_at) VALUES (?, ?)').run(
        migrationName,
        Date.now(),
      )
      db.exec('COMMIT')
      console.log(`Applied migration: ${migrationName}`)
    } catch (error) {
      db.exec('ROLLBACK')
      throw error
    }
  }
} finally {
  db.close()
}
