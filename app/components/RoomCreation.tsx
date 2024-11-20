'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface RoomCreationProps {
  onRoomCreated: (roomKey: string) => void
}

export function RoomCreation({ onRoomCreated }: RoomCreationProps) {
  const [roomName, setRoomName] = useState('')
  const [createdRoomKey, setCreatedRoomKey] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (roomName.trim()) {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName }),
      })
      const data = await response.json()
      setCreatedRoomKey(data.key)
    }
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(createdRoomKey)
    alert('Ключ комнаты скопирован в буфер обмена')
  }

  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Создать приватную комнату</h2>
      {!createdRoomKey ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Название комнаты"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Создать комнату
          </motion.button>
        </form>
      ) : (
        <div>
          <p className="mb-2 text-gray-700 dark:text-gray-300">Комната создана! Ваш ключ:</p>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={createdRoomKey}
              readOnly
              className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-100 dark:bg-gray-700"
            />
            <motion.button
              onClick={handleCopyKey}
              className="bg-green-500 text-white py-2 px-4 rounded-r-md hover:bg-green-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Копировать
            </motion.button>
          </div>
          <motion.button
            onClick={() => onRoomCreated(createdRoomKey)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Войти в комнату
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}