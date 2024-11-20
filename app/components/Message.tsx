'use client'

import * as Avatar from '@radix-ui/react-avatar'
import { useMessagesContext } from '../contexts/MessagesContext'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MessageProps {
  id: number
  content: string
  sender: string
  isOwn: boolean
  reactions?: { emoji: string; count: number }[]
}

const EMOJI_LIST = ['👍', '❤️', '😂', '😮', '😢', '😡']

export function Message({ id, content, sender, isOwn, reactions = [] }: MessageProps) {
  const { addReaction } = useMessagesContext()
  const [showReactions, setShowReactions] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 px-4`}
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[70%]`}>
        <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          <Avatar.Fallback className="text-sm font-medium uppercase">
            {sender[0]}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="mx-2 flex flex-col">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-lg ${
              isOwn
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {content}
          </motion.div>
          <AnimatePresence>
            {showReactions && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-1 flex flex-wrap gap-1"
              >
                {reactions.map(({ emoji, count }) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addReaction(id, emoji)}
                    className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs"
                  >
                    {emoji} {count}
                  </motion.button>
                ))}
                {EMOJI_LIST.map(emoji => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addReaction(id, emoji)}
                    className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}