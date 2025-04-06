import { Suspense } from 'react'
import LoginPage from './LoginPage'

export default function LoginWrapper() {
  return (
    <Suspense fallback={<p>Loading login...</p>}>
      <LoginPage />
    </Suspense>
  )
}
