'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

interface FaqItem { question: string; answer: React.ReactNode }
interface FaqSection { title: string; items: FaqItem[] }

export default function FaqAccordion({ sections }: { sections: FaqSection[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-2xl font-bold text-fg mb-4">{section.title}</h2>
          <div className="space-y-2">
            {section.items.map((item) => {
              const id = item.question
              const isOpen = open === id
              return (
                <div key={id} className="card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-bg-secondary transition-colors"
                  >
                    <span className="font-medium text-fg">{item.question}</span>
                    <ChevronDown className={clsx('w-4 h-4 text-fg-muted shrink-0 transition-transform duration-200', isOpen && 'rotate-180')} />
                  </button>
                  <div className={clsx('transition-[max-height,opacity] duration-300 ease-in-out', isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden')}>
                    <div className="px-4 pb-4 text-sm text-fg-secondary">{item.answer}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
