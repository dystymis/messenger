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
  // Используйте временные значения или данные из контекста/аутентификации
  const username = 'GuestUser' // Здесь должна быть логика получения имени пользователя
  const roomKey = 'defaultRoom' // Здесь должна быть логика получения ключа комнаты

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
