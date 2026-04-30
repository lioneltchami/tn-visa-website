'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

interface Heading { id: string; text: string; level: number }

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false)

  if (!headings.length) return null

  return (
    <nav className="card p-4 mb-8" aria-label="Table of contents">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <p className="text-sm font-semibold text-fg">On this page</p>
        <ChevronDown className={clsx('w-4 h-4 text-fg-muted transition-transform', open && 'rotate-180')} />
      </button>
      <div className={clsx('transition-all duration-300', open ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 overflow-hidden')}>
        <ul className="space-y-1.5 border-l border-border">
          {headings.map(h => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={e => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }}
                className="block text-sm py-0.5 pl-3 -ml-px border-l-2 border-transparent text-fg-muted hover:text-accent hover:border-accent transition-colors"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
