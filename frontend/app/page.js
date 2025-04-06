'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const { user, logout } = useUser()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts:', err))
  }, [])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Daily Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">By {post.author?.username}</p>
            <p>{post.content?.substring(0, 120) || 'No content available.'}</p>
            <a href={`/posts/${post._id}`} className="text-blue-600 hover:underline">
              Read More →
            </a>
          </div>
        ))
      )}
    </div>
    
  )
}
