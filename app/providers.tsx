'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { MessagesProvider } from './contexts/MessagesContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <MessagesProvider>{children}</MessagesProvider>
    </ThemeProvider>
  )
}