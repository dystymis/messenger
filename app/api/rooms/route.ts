import { NextResponse } from 'next/server'
import { createRoom, getRoomByKey } from '@/lib/db'

export async function POST(request: Request) {
  const { name } = await request.json()
  const room = await createRoom(name)
  return NextResponse.json(room)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  if (!key) {
    return NextResponse.json({ error: 'Key is required' }, { status: 400 })
  }
  const room = await getRoomByKey(key)
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }
  return NextResponse.json(room)
}