import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/**
 * Honest social proof — no fabricated quotes.
 * Points to the live /experiences board (user-submitted border stories).
 */
export default function TestimonialCarousel() {
  return (
    <div className="max-w-2xl border border-border bg-bg p-6 sm:p-8 rounded">
      <p className="text-fg text-lg text-pretty mb-4">
        Applicants share port-of-entry outcomes, wait times, and tips on the experiences board —
        real submissions, not invented quotes.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/experiences" className="btn-primary">
          Browse experiences
        </Link>
        <Link href="/experiences/submit" className="btn-secondary inline-flex items-center gap-1">
          Share yours <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
