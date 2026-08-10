'use client'

import clsx from 'clsx'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

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
        'fixed bottom-20 right-6 z-40 w-10 h-10 rounded border border-border bg-bg flex items-center justify-center transition-opacity duration-200',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <ArrowUp className="w-4 h-4 text-fg-secondary" />
    </button>
  )
}
