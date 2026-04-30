'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import clsx from 'clsx'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={clsx(
        'fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full border border-border bg-bg shadow-lg flex items-center justify-center transition-all duration-300',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="w-4 h-4 text-fg-secondary" />
    </button>
  )
}
