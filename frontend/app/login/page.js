'use client'

import { useState } from 'react'
import { useUser } from '@/context/UserContext' 
import { login as loginUser } from '@/lib/api'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const { setUser, setToken } = useUser() 

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = await loginUser(formData)
      if (data.token) {
        setToken(data.token)
        setUser(data.user)
        setMessage('Login successful!')
      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('Something went wrong.')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Login</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
