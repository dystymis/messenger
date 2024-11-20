'use client'

import { useState } from 'react'
import { useMessagesContext } from '../contexts/MessagesContext'

export function MessageInput() {
  const [message, setMessage] = useState('')
  const { addMessage, error } = useMessagesContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      await addMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-md"
          placeholder="Введите сообщение..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Отправить
        </button>
      </div>
    </form>
  )
}