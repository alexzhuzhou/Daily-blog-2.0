'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'

export default function PostDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const { user, token } = useUser()

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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.ok) {
        router.push('/') 
      } else {
        const data = await res.json()
        alert(data.message || 'Failed to delete post')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    }
  }
  if (error) return <p className="p-6 text-red-500">{error}</p>
  if (!post) return <p className="p-6">Loading post...</p>

  const isAuthor =
  user?.id && post?.author?._id &&
  user.id.toString() === post.author._id.toString()

  console.log("User ID:", user?._id)
  console.log("Post Author ID:", post?.author?._id)



  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-4">By {post.author?.username}</p>
      <p className="whitespace-pre-wrap mb-6">{post.content}</p>

      {isAuthor && (
        <div className="space-x-4">
          <button
            onClick={() => router.push(`/posts/edit/${post._id}`)}
            className="text-blue-600 underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
