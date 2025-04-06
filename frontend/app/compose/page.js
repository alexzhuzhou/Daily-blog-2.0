'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'

export default function ComposePage() {
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [message, setMessage] = useState('')
  const { token, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login') 
    }
  }, [token, router])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!token) {
      setMessage("You're not logged in.")
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.ok) {
        setMessage('Post created successfully!')
        setFormData({ title: '', content: '' })
      } else {
        setMessage(data.message || 'Failed to create post')
      }
    } catch (err) {
      console.error(err)
      setMessage('Something went wrong.')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <textarea
          name="content"
          placeholder="Content"
          rows="6"
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
