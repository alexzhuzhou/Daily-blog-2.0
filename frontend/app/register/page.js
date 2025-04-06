'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { register as registerUser } from '@/lib/api'
import GoogleLoginButton from '@/components/GoogleLoginButton'

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const { setUser, setToken } = useUser()

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')

    if (token && user) {
      setToken(token)
      setUser(JSON.parse(user))
      localStorage.setItem('token', token)
      router.push('/')
    }
  }, [searchParams])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await registerUser(formData)
      if (data.token) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        setMessage('Registration successful!')
        router.push('/')
      } else {
        setMessage(data.message || 'Registration failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('Something went wrong.')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2">
          Register
        </button>
      </form>

      <GoogleLoginButton />

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
