'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMessagesContext } from '../contexts/MessagesContext'
import { useEffect, useRef } from 'react'

export function MessageList() {
  const { messages, error } = useMessagesContext()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Прокрутка к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 max-h-full"> {/* Ограничение высоты */}
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`mb-4 ${message.isOwn ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.isOwn
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="font-bold">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-50">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} /> {/* Элемент, к которому скроллим */}
    </div>
  )
}
