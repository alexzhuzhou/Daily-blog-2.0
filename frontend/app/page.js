'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import PostCard from '@/components/PostCard'


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
        <PostCard key={post._id} post={post} />
      ))

      )}
    </div>
    
  )
}
