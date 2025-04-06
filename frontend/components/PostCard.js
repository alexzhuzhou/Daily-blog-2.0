'use client'

import Link from 'next/link'

export default function PostCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md rounded-xl p-6 mb-6">

      <h2 className="text-2xl font-semibold text-gray-900 mb-1">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        By{' '}
        <Link href={`/user/${post.author?.username}`} className="text-blue-600 hover:underline">
          {post.author?.username}
        </Link>
      </p>
      <p className="text-gray-700 mb-4">{post.content?.substring(0, 120)}...</p>
      <Link
        href={`/posts/${post._id}`}
        className="text-blue-600 font-medium hover:underline"
      >
        Read More →
      </Link>
    </div>
  )
}
