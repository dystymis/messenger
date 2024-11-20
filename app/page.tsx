'use client'

import { useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import { MessageList } from './components/MessageList'
import { MessageInput } from './components/MessageInput'
import { TypingIndicator } from './components/TypingIndicator'
import { SearchInput } from './components/SearchInput'
import { MessagesProvider } from './contexts/MessagesContext'
import { GuestAuth } from './components/GuestAuth'
import { motion } from 'framer-motion'

export default function Home() {
  const [username, setUsername] = useState<string | null>(null)
  const [roomKey, setRoomKey] = useState<string | null>(null)

  const handleAuth = (name: string, key: string) => {
    setUsername(name)
    setRoomKey(key)
  }

  if (!username || !roomKey) {
    return <GuestAuth onAuth={handleAuth} />
  }

  return (
    <MessagesProvider username={username} roomKey={roomKey}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
        >
          <div className='flex items-center'>
          <svg className='fill-black dark:fill-white'
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  width="30"
  height="30"
  viewBox="0 0 4001 4001"
  fill="currentColor"
>
  <path
    fillRule="nonzero"
    d="M 2000.859375 2441.828125 C 2196.699219 2441.828125 2378.25 2393.460938 2528.75 2310.519531 C 2669.339844 2233.050781 2782.539062 2125.800781 2854.371094 2000.269531 C 2782.539062 1874.730469 2669.339844 1767.480469 2528.75 1690.011719 C 2378.25 1607.070312 2196.699219 1558.699219 2000.859375 1558.699219 C 1805.019531 1558.699219 1623.480469 1607.070312 1472.96875 1690.011719 C 1332.378906 1767.480469 1219.179688 1874.730469 1147.351562 2000.269531 C 1219.179688 2125.800781 1332.378906 2233.050781 1472.96875 2310.519531 C 1623.46875 2393.460938 1805.019531 2441.828125 2000.859375 2441.828125 Z M 2601.941406 2443.800781 C 2429.609375 2538.761719 2222.828125 2594.160156 2000.859375 2594.160156 C 1778.890625 2594.160156 1572.109375 2538.761719 1399.78125 2443.800781 C 1220.171875 2344.828125 1077.640625 2202.421875 993.507812 2034.179688 L 976.546875 2000.269531 L 993.507812 1966.351562 C 1077.640625 1798.109375 1220.171875 1655.710938 1399.78125 1556.730469 C 1572.109375 1461.769531 1778.890625 1406.371094 2000.859375 1406.371094 C 2222.828125 1406.371094 2429.609375 1461.769531 2601.941406 1556.730469 C 2781.550781 1655.710938 2924.078125 1798.109375 3008.210938 1966.351562 L 3025.171875 2000.269531 L 3008.210938 2034.179688 C 2924.078125 2202.421875 2781.550781 2344.828125 2601.941406 2443.800781 "
  />
  <path
    fillRule="evenodd"
    d="M 2000.859375 1659.429688 C 2189.101562 1659.429688 2341.699219 1812.03125 2341.699219 2000.261719 C 2341.699219 2188.5 2189.101562 2341.101562 2000.859375 2341.101562 C 1812.621094 2341.101562 1660.019531 2188.5 1660.019531 2000.261719 C 1660.019531 1812.03125 1812.621094 1659.429688 2000.859375 1659.429688 "
  />
  <path
    fillRule="evenodd"
    d="M 2160.890625 1701.449219 C 2227.671875 1701.449219 2281.800781 1755.578125 2281.800781 1822.359375 C 2281.800781 1889.128906 2227.671875 1943.261719 2160.890625 1943.261719 C 2094.121094 1943.261719 2039.988281 1889.128906 2039.988281 1822.359375 C 2039.988281 1755.578125 2094.121094 1701.449219 2160.890625 1701.449219 "
  />
  <path
    fillRule="nonzero"
    d="M 2000.859375 755.46875 C 2344.589844 755.46875 2655.789062 894.800781 2881.058594 1120.058594 C 3106.328125 1345.328125 3245.660156 1656.53125 3245.660156 2000.261719 C 3245.660156 2344 3106.328125 2655.199219 2881.058594 2880.46875 C 2655.789062 3105.730469 2344.589844 3245.0625 2000.859375 3245.0625 C 1657.128906 3245.0625 1345.929688 3105.730469 1120.660156 2880.46875 C 895.394531 2655.199219 756.0625 2344 756.0625 2000.261719 C 756.0625 1656.53125 895.394531 1345.328125 1120.660156 1120.058594 C 1345.929688 894.800781 1657.128906 755.46875 2000.859375 755.46875 Z M 2803.339844 1197.789062 C 2597.96875 992.421875 2314.25 865.398438 2000.859375 865.398438 C 1687.46875 865.398438 1403.75 992.421875 1198.378906 1197.789062 C 993.015625 1403.160156 865.992188 1686.871094 865.992188 2000.261719 C 865.992188 2313.660156 993.015625 2597.371094 1198.378906 2802.738281 C 1403.75 3008.109375 1687.46875 3135.132812 2000.859375 3135.132812 C 2314.25 3135.132812 2597.96875 3008.109375 2803.339844 2802.738281 C 3008.699219 2597.371094 3135.730469 2313.660156 3135.730469 2000.261719 C 3135.730469 1686.871094 3008.699219 1403.160156 2803.339844 1197.789062 "
  />
</svg>


          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ZhidoBrateMessenger</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Привет, {username}!</span>
            <ThemeToggle />
          </div>
        </motion.header>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 mb-10"
        >
          <SearchInput />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-grow overflow-hidden"
        >
          <MessageList />   
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
        >
          <TypingIndicator />
          <MessageInput/>
        </motion.div>
      </motion.main>
    </MessagesProvider>
  )
}