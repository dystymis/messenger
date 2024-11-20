import { Client } from 'pg'
import crypto from 'crypto'

// Создаём клиент PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Ваша строка подключения из .env
  ssl: { rejectUnauthorized: false }, // Для работы с SSL (если необходимо)
})

// Открываем подключение к базе данных
async function openDb() {
  if (!client._connected) {
    try {
      await client.connect()
      console.log('Connected to PostgreSQL')
    } catch (error) {
      console.error('Error connecting to PostgreSQL:', error)
      throw error
    }
  }
  return client
}

// Создаём комнату
export async function createRoom(name: string) {
  const key = crypto.randomBytes(16).toString('hex')
  await openDb()
  try {
    const result = await client.query(
      'INSERT INTO rooms (name, key) VALUES ($1, $2) RETURNING id, name, key',
      [name, key]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error creating room:', error)
    throw error
  }
}

// Получаем комнату по ключу
export async function getRoomByKey(key: string) {
  await openDb()
  try {
    const result = await client.query('SELECT * FROM rooms WHERE key = $1', [key])
    return result.rows[0]
  } catch (error) {
    console.error('Error getting room by key:', error)
    throw error
  }
}

// Получаем сообщения из комнаты
export async function getMessages(roomId: number) {
  await openDb()
  try {
    const result = await client.query(
      'SELECT * FROM messages WHERE room_id = $1 ORDER BY timestamp ASC',
      [roomId]
    )
    return result.rows
  } catch (error) {
    console.error('Error getting messages:', error)
    throw error
  }
}

// Добавляем новое сообщение
export async function addMessage(roomId: number, content: string, sender: string) {
  const id = crypto.randomBytes(16).toString('hex')
  await openDb()
  try {
    const result = await client.query(
      'INSERT INTO messages (id, room_id, content, sender) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, roomId, content, sender]
    )
    return result.rows[0]
  } catch (error) {
    console.error('Error adding message:', error)
    throw error
  }
}
