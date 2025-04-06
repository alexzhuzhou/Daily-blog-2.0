'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function UserProfilePage() {
  const { username } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/user/username/${username}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load posts.')
        setLoading(false)
      })
  }, [username])

  if (loading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{username}'s Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content?.substring(0, 120)}...</p>
            <a href={`/posts/${post._id}`} className="text-blue-600 hover:underline">
              Read More →
            </a>
          </div>
        ))
      )}
    </div>
  )
}
