'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const root = document.documentElement

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      root.classList.add('dark')
      setIsDark(true)
    } else {
      root.classList.remove('dark')
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const newTheme = isDark ? 'light' : 'dark'

    setIsDark(!isDark)
    root.classList.toggle('dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-sm text-gray-600 dark:text-gray-300 border px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {isDark ? '☀ Light' : '🌙 Dark'}
    </button>
  )
}
