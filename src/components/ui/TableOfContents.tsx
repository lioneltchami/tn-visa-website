'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'

interface Heading { id: string; text: string; level: number }

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav className="hidden lg:block sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto" aria-label="Table of contents">
      <p className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">On this page</p>
      <ul className="space-y-1.5 border-l border-border">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={e => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' }) }}
              className={clsx(
                'block text-sm py-0.5 pl-3 -ml-px border-l-2 transition-colors',
                active === h.id ? 'border-accent text-accent font-medium' : 'border-transparent text-fg-muted hover:text-fg-secondary'
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
