'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid' // Для генерации уникальных ID

let socket: Socket | null = null;

export interface Reaction {
  emoji: string
  count: number
}

export interface Message {
  id: string // Уникальный идентификатор
  content: string
  sender: string
  isOwn: boolean
  reactions: Reaction[]
}

export function useMessages(currentUser: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    socketInitializer()

    return () => {
      if (socket) socket.disconnect()
    }
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socketio')
    socket = io()

    socket.on('new-message', (msg: Message) => {
      setMessages(prev => {
        if (prev.some(message => message.id === msg.id)) {
          return prev // Не добавляем дубликат
        }
        return [...prev, { ...msg, isOwn: msg.sender === currentUser }]
      })
    })
  }

  useEffect(() => {
    fetch('/api/messages')
      .then(response => response.json())
      .then(data => setMessages(
        data.map((msg: Message) => ({ ...msg, isOwn: msg.sender === currentUser }))
      ))
  }, [currentUser])

  const addMessage = useCallback(async (content: string, sender: string) => {
    const newMessage: Message = {
      id: uuidv4(), // Генерация уникального ID
      content,
      sender,
      isOwn: true,
      reactions: [],
    }

    setMessages(prev => [...prev, newMessage]) // Локально добавляем сообщение
    socket.emit('send-message', newMessage) // Отправляем на сервер

    // Отправляем на сервер для сохранения
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    })
  }, [])

  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === messageId
          ? {
              ...message,
              reactions: message.reactions.some(r => r.emoji === emoji)
                ? message.reactions.map(r =>
                    r.emoji === emoji ? { ...r, count: r.count + 1 } : r
                  )
                : [...message.reactions, { emoji, count: 1 }]
            }
          : message
      )
    )
  }, [])

  const filteredMessages = useMemo(
    () =>
      messages.filter(message =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [messages, searchTerm]
  )

  return { messages: filteredMessages, addMessage, addReaction, setSearchTerm }
}
