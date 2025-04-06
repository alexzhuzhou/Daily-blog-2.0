import { Suspense } from 'react'
import RegisterPage from './RegisterPage'

export default function RegisterWrapper() {
  return (
    <Suspense fallback={<p>Loading register...</p>}>
      <RegisterPage />
    </Suspense>
  )
}
