'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function UnsubscribePage() {
  const params = useSearchParams()
  const email = params.get('email') || ''
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleUnsubscribe() {
    setStatus('loading')
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('subscribers')
        .update({ unsubscribed_at: new Date().toISOString() })
        .eq('email', email)
      if (error) throw error
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
      {status === 'done' ? (
        <>
          <p className="text-2xl font-bold text-fg">Unsubscribed</p>
          <p className="text-fg-secondary">You won&apos;t receive any more emails from us.</p>
        </>
      ) : (
        <>
          <p className="text-2xl font-bold text-fg">Unsubscribe</p>
          <p className="text-fg-secondary">Unsubscribe <strong>{email}</strong> from TN Visa Guide emails?</p>
          <button
            onClick={handleUnsubscribe}
            disabled={!email || status === 'loading'}
            className="px-6 py-2.5 rounded bg-accent text-accent-fg font-medium disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : 'Confirm Unsubscribe'}
          </button>
          {status === 'error' && <p className="text-danger text-sm">Something went wrong. Please try again.</p>}
        </>
      )}
    </div>
  )
}
