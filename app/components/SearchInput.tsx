'use client'

import { useMessagesContext } from '../contexts/MessagesContext'

export function SearchInput() {
  const { setSearchTerm } = useMessagesContext()

  return (
    <input
      type="text"
      placeholder="Поиск сообщений..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
    />
  )
}