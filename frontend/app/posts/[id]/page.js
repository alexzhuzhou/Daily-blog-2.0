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
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          By{' '}
          <a href={`/user/${post.author?.username}`} className="text-blue-600 hover:underline">
            {post.author?.username}
          </a>
        </p>
        <div className="prose prose-lg text-gray-800 mb-6 max-w-none">
          {post.content}
        </div>
  
        {isAuthor && (
          <div className="space-x-4">
            <button
              onClick={() => router.push(`/posts/edit/${post._id}`)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
  
}
