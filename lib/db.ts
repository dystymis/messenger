import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

// Создание комнаты
export async function createRoom(name: string) {
  const key = crypto.randomBytes(16).toString('hex')
  try {
    const room = await prisma.room.create({
      data: {
        name,
        key,
      },
    })
    return { id: room.id, name: room.name, key: room.key }
  } catch (error) {
    console.error('Error creating room:', error)
    throw error
  }
}

// Получение комнаты по ключу
export async function getRoomByKey(key: string) {
  try {
    return await prisma.room.findUnique({
      where: { key },
    })
  } catch (error) {
    console.error('Error getting room by key:', error)
    throw error
  }
}

// Получение сообщений в комнате
export async function getMessages(roomId: number) {
  try {
    return await prisma.message.findMany({
      where: { roomId },
      orderBy: { timestamp: 'asc' },
    })
  } catch (error) {
    console.error('Error getting messages:', error)
    throw error
  }
}

// Добавление сообщения в комнату
export async function addMessage(roomId: number, content: string, sender: string) {
  const id = crypto.randomBytes(16).toString('hex')
  try {
    const newMessage = await prisma.message.create({
      data: {
        id,
        roomId,
        content,
        sender,
      },
    })
    return newMessage
  } catch (error) {
    console.error('Error adding message:', error)
    throw error
  }
}
