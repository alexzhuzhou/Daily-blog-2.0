'use client'

import { useState } from 'react'
import { register as registerUser } from '@/lib/api' 
export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await registerUser(formData)
      if (data.token) {
        localStorage.setItem('token', data.token)
        setMessage('Registration successful!')
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
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Register</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
