import { Providers } from './providers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SPA Messenger',
  description: 'A simple SPA messenger with theme switching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Пример значений (можно заменить на динамическую логику)
  const username = ''
  const roomKey = ''

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers username={username} roomKey={roomKey}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
