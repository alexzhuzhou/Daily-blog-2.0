'use client'

import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, logout } = useUser()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <nav className="bg-gray-100 px-6 py-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link href="/" className="font-semibold text-lg">Daily Blog</Link>
        <Link href="/">Home</Link>
        {user && <Link href="/compose">Compose</Link>}
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
