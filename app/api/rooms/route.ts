import { NextResponse } from 'next/server'
import { createRoom, getRoomByKey } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    
    if (!name) {
      // Проверка на обязательные поля
      return NextResponse.json({ error: 'Room name is required' }, { status: 400 })
    }

    const room = await createRoom(name)

    // Проверяем, что комната была успешно создана
    if (!room) {
      return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
    }

    // Возвращаем созданную комнату
    return NextResponse.json(room, { status: 201 }) // статус 201 для успешного создания ресурса
  } catch (error) {
    console.error('Error in POST /api/rooms:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const room = await getRoomByKey(key)

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    return NextResponse.json(room, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/rooms:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}
