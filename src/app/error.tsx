'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-xl font-bold text-fg">Something went wrong</h2>
      <p className="text-fg-secondary text-sm">{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} className="px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium">
        Try again
      </button>
    </div>
  )
}
