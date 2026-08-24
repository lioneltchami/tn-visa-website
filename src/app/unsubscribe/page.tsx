'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

type Status = 'idle' | 'loading' | 'done' | 'sent' | 'error'

export default function UnsubscribePage() {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const legacyEmail = params.get('email') || ''
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleUnsubscribe() {
    setStatus('loading')
    setError(null)

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const body = (await response.json()) as { error?: string }

      if (!response.ok) throw new Error(body.error || 'Unable to unsubscribe.')
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Unable to unsubscribe.')
    }
  }

  async function requestSecureLink() {
    setStatus('loading')
    setError(null)

    try {
      const response = await fetch('/api/unsubscribe/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: legacyEmail }),
      })
      const body = (await response.json()) as { error?: string }

      if (!response.ok) throw new Error(body.error || 'Unable to process this request.')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Unable to process this request.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
      {status === 'done' ? (
        <>
          <p className="text-2xl font-bold text-fg">Unsubscribed</p>
          <p className="text-fg-secondary">You won&apos;t receive any more emails from us.</p>
        </>
      ) : status === 'sent' ? (
        <>
          <p className="text-2xl font-bold text-fg">Check your email</p>
          <p className="text-fg-secondary">If the address has an active subscription, we sent a secure confirmation link.</p>
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-fg">Unsubscribe</p>
          <p className="text-fg-secondary">Stop receiving TN Visa Guide emails.</p>
          {token ? (
            <button
              onClick={handleUnsubscribe}
              disabled={status === 'loading'}
              className="px-6 py-2.5 rounded bg-accent text-accent-fg font-medium disabled:opacity-50"
            >
              {status === 'loading' ? 'Processing…' : 'Confirm Unsubscribe'}
            </button>
          ) : legacyEmail ? (
            <button
              onClick={requestSecureLink}
              disabled={status === 'loading'}
              className="px-6 py-2.5 rounded bg-accent text-accent-fg font-medium disabled:opacity-50"
            >
              {status === 'loading' ? 'Processing…' : 'Send a secure unsubscribe link'}
            </button>
          ) : (
            <p className="text-danger text-sm">This unsubscribe link is invalid or incomplete.</p>
          )}
          {status === 'error' && <p className="text-danger text-sm">{error}</p>}
        </>
      )}
    </div>
  )
}
