import { Suspense } from 'react'
import UnsubscribeForm from './UnsubscribeForm'

export default function UnsubscribePage() {
  return (
    <Suspense fallback={null}>
      <UnsubscribeForm />
    </Suspense>
  )
}
