import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import crypto from 'crypto'
import path from 'path'

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null

async function openDb() {
  if (!db) {
    const dbPath = path.resolve(process.cwd(), 'messages.sqlite')
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      })
      await db.exec(`
        CREATE TABLE IF NOT EXISTS rooms (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          key TEXT UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          room_id INTEGER,
          content TEXT,
          sender TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (room_id) REFERENCES rooms(id)
        );
      `)
    } catch (error) {
      console.error('Error opening database:', error)
      throw error
    }
  }
  return db
}

export async function createRoom(name: string) {
  const db = await openDb()
  const key = crypto.randomBytes(16).toString('hex')
  try {
    const result = await db.run('INSERT INTO rooms (name, key) VALUES (?, ?)', [name, key])
    return { id: result.lastID, name, key }
  } catch (error) {
    console.error('Error creating room:', error)
    throw error
  }
}

export async function getRoomByKey(key: string) {
  const db = await openDb()
  try {
    return await db.get('SELECT * FROM rooms WHERE key = ?', [key])
  } catch (error) {
    console.error('Error getting room by key:', error)
    throw error
  }
}

export async function getMessages(roomId: number) {
  const db = await openDb()
  try {
    return await db.all('SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp ASC', [roomId])
  } catch (error) {
    console.error('Error getting messages:', error)
    throw error
  }
}

export async function addMessage(roomId: number, content: string, sender: string) {
  const db = await openDb()
  const id = crypto.randomBytes(16).toString('hex')
  try {
    await db.run(
      'INSERT INTO messages (id, room_id, content, sender) VALUES (?, ?, ?, ?)',
      [id, roomId, content, sender]
    )
    const newMessage = await db.get('SELECT * FROM messages WHERE id = ?', [id])
    return newMessage
  } catch (error) {
    console.error('Error adding message:', error)
    throw error
  }
}