'use client'

import * as Avatar from '@radix-ui/react-avatar'
import { motion } from 'framer-motion'

interface MessageProps {
  id: number
  content: string
  sender: string
  isOwn: boolean
}

export function Message({ content, sender, isOwn }: MessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 px-4`}
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
        </div>
      </div>
    </motion.div>
  )
}
