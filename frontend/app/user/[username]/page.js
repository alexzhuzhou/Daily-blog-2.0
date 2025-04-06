'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PostCard from '@/components/PostCard'

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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{`${username}'s Posts`}</h1>

      {posts.length === 0 ? (
        <p>This user hasn't posted anything yet.</p>
      ) : (
        posts.map(post => <PostCard key={post._id} post={post} />)
      )}
    </div>
  )
}
