import { NextResponse } from 'next/server'
import { getMessages, addMessage, getRoomByKey } from '@/lib/db'
import { encrypt, decrypt } from '@/lib/encryption'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const roomKey = searchParams.get('roomKey')
  if (!roomKey) {
    return NextResponse.json({ error: 'Room key is required' }, { status: 400 })
  }

  try {
    const room = await getRoomByKey(roomKey)
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }
    const messages = await getMessages(room.id)
    const decryptedMessages = messages.map(msg => ({
      ...msg,
      content: decrypt(msg.content),
    }))
    return NextResponse.json(decryptedMessages)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages', details: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { roomKey, content, sender } = await request.json()
    if (!roomKey || !content || !sender) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const room = await getRoomByKey(roomKey)
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    const encryptedContent = encrypt(content)
    const newMessage = await addMessage(room.id, encryptedContent, sender)

    return NextResponse.json({
      ...newMessage,
      content: decrypt(newMessage.content),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add message', details: error.message }, { status: 500 })
  }
}
