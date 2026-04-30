'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const TESTIMONIALS = [
  {
    quote: 'Used the eligibility checker and letter builder to prepare my application. Approved at Pearson in 20 minutes.',
    name: 'Priya Sharma',
    role: 'Software Developer',
    location: 'Toronto, ON → San Francisco, CA',
    profession: 'Computer Systems Analyst',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: 'The profession pages helped me understand exactly what CBP looks for. The border interview guide was spot-on.',
    name: 'Marc-André Dupont',
    role: 'Financial Analyst',
    location: 'Montreal, QC → New York, NY',
    profession: 'Economist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: "After the June 2025 changes, I was worried my CS degree wouldn't work. This guide showed me the CSA path.",
    name: 'James Chen',
    role: 'Full-Stack Engineer',
    location: 'Vancouver, BC → Seattle, WA',
    profession: 'Computer Systems Analyst',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: 'The fee calculator saved me from overpaying. I had no idea the costs varied so much by employer size.',
    name: 'Aisha Okafor',
    role: 'Registered Nurse',
    location: 'Calgary, AB → Houston, TX',
    profession: 'Registered Nurse',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: 'Got my TN approved at Peace Bridge using the employer letter template. The whole process took 45 minutes.',
    name: 'Daniel Kowalski',
    role: 'Management Consultant',
    location: 'Toronto, ON → Chicago, IL',
    profession: 'Management Consultant',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0 px-4">
              <div className="card p-8 max-w-2xl mx-auto text-center">
                <p className="text-fg-secondary text-lg mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={48} height={48} className="rounded-full" />
                  <div className="text-left">
                    <p className="font-semibold text-fg">{t.name}</p>
                    <p className="text-xs text-fg-muted">{t.role} · {t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={clsx(
              'w-2 h-2 rounded-full transition-all',
              i === current ? 'bg-accent w-6' : 'bg-bg-tertiary'
            )}
          />
        ))}
      </div>
    </div>
  )
}
