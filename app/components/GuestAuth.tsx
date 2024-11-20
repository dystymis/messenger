'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoomCreation } from './RoomCreation'

interface GuestAuthProps {
  onAuth: (username: string, roomKey: string) => void
}

export function GuestAuth({ onAuth }: GuestAuthProps) {
  const [username, setUsername] = useState('')
  const [roomKey, setRoomKey] = useState('')
  const [showRoomCreation, setShowRoomCreation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && roomKey.trim()) {
      const response = await fetch(`/api/rooms?key=${roomKey}`)
      if (response.ok) {
        onAuth(username.trim(), roomKey.trim())
      } else {
        alert('Неверный ключ комнаты')
      }
    }
  }

  const handleRoomCreated = (key: string) => {
    setRoomKey(key)
    setShowRoomCreation(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      {showRoomCreation ? (
        <RoomCreation onRoomCreated={handleRoomCreated} />
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Войти в комнату</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ваше имя
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Введите ваше имя"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roomKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ключ комнаты
            </label>
            <input
              type="text"
              id="roomKey"
              value={roomKey}
              onChange={(e) => setRoomKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Введите ключ комнаты"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 mb-4"
          >
            Войти
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setShowRoomCreation(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Создать новую комнату
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  )
}