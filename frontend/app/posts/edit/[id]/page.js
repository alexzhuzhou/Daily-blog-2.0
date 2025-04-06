'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()
  const { token, user } = useUser()

  const [formData, setFormData] = useState({ title: '', content: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (user?.id !== data.author?._id) {
          router.push('/') 
        }
        setFormData({ title: data.title, content: data.content })
      })
      .catch(err => {
        console.error(err)
        setMessage('Failed to load post')
      })
  }, [id, user, router])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.ok) {
        router.push(`/posts/${id}`)
      } else {
        setMessage(data.message || 'Failed to update post')
      }
    } catch (err) {
      console.error(err)
      setMessage('Something went wrong.')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
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
        <button type="submit" className="w-full bg-blue-600 text-white p-2">
          Save Changes
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
