'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => {
        console.error(err)
        setError('Failed to load post')
      })
  }, [id])

  if (error) return <p className="p-6 text-red-500">{error}</p>
  if (!post) return <p className="p-6">Loading post...</p>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">By {post.author?.username}</p>
      <p className="whitespace-pre-wrap">{post.content}</p>
    </div>
  )
}
