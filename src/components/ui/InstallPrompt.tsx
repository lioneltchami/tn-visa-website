'use client'

import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('pwa-dismissed')) return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    setDeferredPrompt(null)
  }

  function handleDismiss() {
    setDismissed(true)
    setDeferredPrompt(null)
    localStorage.setItem('pwa-dismissed', '1')
  }

  if (!deferredPrompt || dismissed) return null

  return (
    <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-24 sm:w-80 z-40 card p-4 shadow-2xl border border-border animate-slide-up">
      <div className="flex items-start gap-3">
        <Download className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-fg text-sm">Install TN Visa Guide</p>
          <p className="text-xs text-fg-muted mt-0.5">Access checklists and guides offline at the border.</p>
          <div className="flex gap-2 mt-2">
            <button onClick={handleInstall} className="px-3 py-1.5 rounded-lg accent-fill text-xs font-medium">Install</button>
            <button onClick={handleDismiss} className="px-3 py-1.5 rounded-lg border border-border text-fg-muted text-xs">Not now</button>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-fg-muted" aria-label="Dismiss"><X className="w-4 h-4" /></button>
      </div>
    </div>
  )
}
