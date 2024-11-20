import { NextResponse } from 'next/server';
import { getMessages, addMessage, getRoomByKey } from '@/lib/db';
import { encrypt, decrypt } from '@/lib/encryption';

interface Message {
  id: number;
  roomId: number;
  content: string;
  sender: string;
  createdAt: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const roomKey = searchParams.get('roomKey');

  if (!roomKey) {
    console.error('Room key is missing in the request');
    return NextResponse.json({ error: 'Room key is required' }, { status: 400 });
  }

  try {
    const room = await getRoomByKey(roomKey);
    if (!room) {
      console.error(`Room not found for key: ${roomKey}`);
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const messages: Message[] = await getMessages(room.id);
    const decryptedMessages = messages.map((msg) => ({
      ...msg,
      content: decrypt(msg.content),
    }));

    return NextResponse.json(decryptedMessages);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching messages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch messages', details: error.message },
        { status: 500 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { roomKey, content, sender }: { roomKey: string; content: string; sender: string } = await request.json();

    if (!roomKey || !content || !sender) {
      console.error('Missing required fields in the request body');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const room = await getRoomByKey(roomKey);
    if (!room) {
      console.error(`Room not found for key: ${roomKey}`);
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const encryptedContent = encrypt(content);
    const newMessage = await addMessage(room.id, encryptedContent, sender);

    return NextResponse.json({
      ...newMessage,
      content: decrypt(newMessage.content),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding message:', error);
      return NextResponse.json(
        { error: 'Failed to add message', details: error.message },
        { status: 500 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
