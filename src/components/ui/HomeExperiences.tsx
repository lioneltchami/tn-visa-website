'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type ExperienceQuote = {
  id: string
  profession: string
  story: string
  date: string
}

export default function HomeExperiences() {
  const [quotes, setQuotes] = useState<ExperienceQuote[]>([])

  useEffect(() => {
    async function loadQuotes() {
      const { data } = await createClient()
        .from('experiences')
        .select('id,profession,story,date')
        .eq('is_approved', true)
        .not('story', 'is', null)
        .order('date', { ascending: false })
        .limit(2)

      setQuotes((data || []).filter((quote) => quote.story.trim().length > 0))
    }

    loadQuotes()
  }, [])

  return (
    <section className="py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container-wide">
        <h2 className="font-display text-2xl font-bold text-fg mb-3">Reader experiences</h2>
        {quotes.length > 0 ? (
          <div className="grid gap-4 max-w-3xl mb-8">
            {quotes.map((quote) => (
              <blockquote key={quote.id} className="border border-border bg-bg p-5 sm:p-6 rounded">
                <p className="text-fg text-pretty">&ldquo;{quote.story}&rdquo;</p>
                <footer className="text-sm text-fg-muted mt-3">{quote.profession} · {quote.date}</footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="text-fg-secondary max-w-2xl mb-6">
            Applicants share port-of-entry outcomes, wait times, and tips on the experiences board.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/experiences" className="btn-primary">
            Browse experiences
          </Link>
          <Link href="/experiences/submit" className="btn-secondary inline-flex items-center gap-1">
            Share yours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
