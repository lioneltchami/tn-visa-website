'use client'

import clsx from 'clsx'
import { AlertCircle, Check, Send } from 'lucide-react'
import { useState } from 'react'
import { trackEvent } from '@/hooks/useAnalytics'

interface EmailCaptureProps {
  variant: 'inline' | 'banner'
  title?: string
  description?: string
}

export default function EmailCapture({
  variant,
  title = 'Stay Updated',
  description = 'Get notified about TN visa policy changes and tips.',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe')
      trackEvent('email_signup', { variant })
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={clsx(
          'flex items-center gap-2 text-success',
          variant === 'banner' ? 'justify-center py-6' : 'py-3'
        )}
      >
        <Check className="w-5 h-5" />
        <p className="font-medium text-sm">You&apos;re subscribed! Check your email.</p>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        variant === 'banner' && 'border border-border bg-bg p-6 sm:p-8 my-8 text-left max-w-xl',
        variant === 'inline' && 'my-4'
      )}
    >
      {variant === 'banner' && (
        <>
          <p className="font-display text-lg font-bold text-fg mb-1">{title}</p>
          <p className="text-sm text-fg-secondary mb-4">{description}</p>
        </>
      )}
      {variant === 'inline' && title && (
        <p className="text-sm font-medium text-fg-secondary mb-2">{title}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className={clsx('flex gap-2', variant === 'banner' ? 'max-w-md' : '')}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 rounded border border-border bg-bg text-fg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary disabled:opacity-50 flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="flex items-center gap-1 text-danger text-xs mt-2">
          <AlertCircle className="w-3.5 h-3.5" />
          {errorMsg}
        </p>
      )}
    </div>
  )
}
