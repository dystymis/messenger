'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { MessagesProvider } from './contexts/MessagesContext'

interface ProvidersProps {
  children: ReactNode
  username: string
  roomKey: string
}

export function Providers({ children, username, roomKey }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class">
      <MessagesProvider username={username} roomKey={roomKey}>
        {children}
      </MessagesProvider>
    </ThemeProvider>
  )
}
