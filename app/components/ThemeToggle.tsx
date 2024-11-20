'use client';

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import * as Switch from '@radix-ui/react-switch'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex items-center space-x-2">
      <Switch.Root
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="w-11 h-6 bg-gray-200 rounded-full relative dark:bg-gray-800 transition-colors duration-300 ease-in-out"
      >
        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
      <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
    </div>
  )
}