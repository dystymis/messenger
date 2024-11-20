'use client'

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'

let socket: any;

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  isOwn: boolean
}

interface MessagesContextType {
  messages: Message[]
  addMessage: (content: string) => Promise<void>
  setSearchTerm: (term: string) => void
  error: string | null
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function MessagesProvider({ children, username, roomKey }: { children: ReactNode, username: string, roomKey: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addMessageToState = useCallback((newMessage: Message) => {
    setMessages(prevMessages => {
      // Check if the message already exists
      const messageExists = prevMessages.some(msg => msg.id === newMessage.id)
      if (messageExists) {
        return prevMessages // Don't add the message if it already exists
      }
      return [...prevMessages, newMessage]
    })
  }, [])

  useEffect(() => {
    if (roomKey) {
      socketInitializer()
      fetchMessages()
    }

    return () => {
      if (socket) socket.disconnect()
    }
  }, [roomKey, addMessageToState])

  const socketInitializer = async () => {
    await fetch('/api/socketio')
    socket = io()

    socket.on('new-message', (msg: Message) => {
      const messageWithIsOwn = { ...msg, isOwn: msg.sender === username }
      addMessageToState(messageWithIsOwn)
    })
  }

  const fetchMessages = async () => {
    if (!roomKey) {
      console.error('Room key is undefined')
      setError('Invalid room key')
      return
    }
    try {
      const response = await fetch(`/api/messages?roomKey=${roomKey}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const messagesWithIsOwn = data.map((msg: Message) => ({ ...msg, isOwn: msg.sender === username }))
      setMessages(messagesWithIsOwn)
      setError(null)
    } catch (error) {
      console.error('Error fetching messages:', error)
      setError('Failed to fetch messages. Please try again later.')
    }
  }

  const addMessage = async (content: string) => {
    if (!roomKey) {
      console.error('Room key is undefined')
      setError('Invalid room key')
      return
    }
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomKey, content, sender: username }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      const newMessage = await response.json()
      const messageWithIsOwn = { ...newMessage, isOwn: true }
      addMessageToState(messageWithIsOwn)
      socket.emit('send-message', messageWithIsOwn)
      setError(null)
    } catch (error) {
      console.error('Error adding message:', error)
      setError('Failed to send message. Please try again.')
    }
  }

  const filteredMessages = messages.filter(message => 
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <MessagesContext.Provider value={{ messages: filteredMessages, addMessage, setSearchTerm, error }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessagesContext() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error('useMessagesContext must be used within a MessagesProvider')
  }
  return context
}