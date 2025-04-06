import Image from 'next/image'

export default function GoogleLoginButton() {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
      className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 mt-4 hover:bg-gray-100 text-sm text-gray-700 shadow-sm transition"
    >
      <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
      Continue with Google
    </a>
  )
}
