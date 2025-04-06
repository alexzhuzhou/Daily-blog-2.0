'use client'

import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  const { user, logout } = useUser()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm px-6 py-4 flex flex-wrap justify-between items-center">

      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold text-lg text-gray-900">
          Daily Blog
        </Link>
        <Link href="/" className="text-sm text-gray-600 hover:text-black">
          Home
        </Link>
        {user && (
          <Link href="/compose" className="text-sm text-gray-600 hover:text-black">
            Compose
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4 text-sm">
        {user ? (
          <>
            <span className="text-gray-600">Hi, {user.username}</span>
            <button onClick={handleLogout} className="text-red-600 hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-black">
              Login
            </Link>
            <Link href="/register" className="text-gray-600 hover:text-black">
              Register
            </Link>
          </>
        )}
        <DarkModeToggle /> 
      </div>
    </nav>
  )
}
