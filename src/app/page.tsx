import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import EmailCapture from '@/components/ui/EmailCapture'
import TestimonialCarousel from '@/components/ui/TestimonialCarousel'
import { withCanonical } from '@/lib/seo'

/* Hallmark · macrostructure: left-bias Long Document / Stat
 * theme: maple-ink · designed-as-app: design.md
 * Fixes: centered hero, AI template, Inter, gradients, aurora, 3-col grids,
 * AI nav/footer (chrome), side-stripe, invented metrics, indigo attractor
 */

export const metadata: Metadata = withCanonical('/', {
  title: 'TN Visa Guide for Canadians | Complete 2026 Resource',
  description:
    'The definitive guide for Canadian professionals seeking TN visa status in the United States. Eligibility checker, fee calculator, and step-by-step application guide.',
  openGraph: {
    title: 'TN Visa Guide for Canadians',
    description:
      'Everything Canadian professionals need to work in the U.S. under USMCA — from eligibility to taxes.',
  },
})

const guideLinks = [
  {
    title: 'Am I eligible?',
    desc: 'Profession and degree check',
    href: '/eligibility',
  },
  { title: 'How to apply', desc: 'Border or mail-in steps', href: '/apply' },
  { title: 'Documents', desc: 'Checklist and templates', href: '/documents' },
  { title: 'Fee calculator', desc: 'Canonical USD amounts', href: '/fees' },
  { title: 'Tax guide', desc: 'U.S. and Canadian obligations', href: '/taxes' },
  { title: 'Moving guide', desc: 'SSN, banking, housing', href: '/moving' },
]

export default function Home() {
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'TN Visa Guide',
          url: 'https://tnvisaguide.ca',
          description:
            'The definitive guide for Canadian professionals seeking TN visa status in the United States under USMCA.',
          publisher: { '@type': 'Organization', name: 'TN Visa Guide' },
        }}
      />

      {/* HERO — content-height, left-bias, no aurora / pills / fake metrics */}
      <section className="border-b border-border">
        <div className="container-wide py-12 sm:py-16 lg:py-20 max-w-3xl">
          <p className="text-sm font-semibold text-accent mb-4">TN status under USMCA · 2026</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-fg text-balance mb-5">
            Your complete guide to working in the United States on a TN visa
          </h1>
          <p className="text-lg text-fg-secondary text-pretty mb-8 max-w-2xl">
            Eligibility, documents, fees, border interviews, and renewals for Canadian and Mexican
            professionals — researched from USCIS, CBP, and USMCA materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/eligibility" className="btn-primary">
              Check eligibility
            </Link>
            <Link href="/fees" className="btn-secondary">
              See fees &amp; sources
            </Link>
          </div>
          <p className="text-sm text-fg-muted">
            Covers all 63 USMCA professions · Same-day border option for many Canadians · Updated
            for 2026 fee schedules
          </p>
        </div>
      </section>

      {/* STATS — typographic row, not icon tiles */}
      <section className="border-b border-border bg-bg-secondary">
        <div className="container-wide py-10 sm:py-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg mb-8 max-w-xl">
            Why TN status
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <div className="border-t border-border pt-4">
              <dt className="font-display text-3xl font-bold text-fg tabular-nums">63</dt>
              <dd className="text-sm text-fg-secondary mt-1">
                Qualifying professions — no H-1B lottery, no annual cap
              </dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="font-display text-3xl font-bold text-fg">Same day</dt>
              <dd className="text-sm text-fg-secondary mt-1">
                Many Canadians apply at a port of entry and leave with status
              </dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="font-display text-3xl font-bold text-fg">3 years</dt>
              <dd className="text-sm text-fg-secondary mt-1">
                Initial stay; renewable indefinitely when the job qualifies
              </dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="font-display text-3xl font-bold text-fg tabular-nums">From $50</dt>
              <dd className="text-sm text-fg-secondary mt-1">
                Airport processing fee baseline — land border adds I-94 (
                <Link href="/fees" className="text-accent hover:underline">
                  full breakdown
                </Link>
                )
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* GUIDE INDEX — list rows, not 3-col cards */}
      <section id="guide" className="border-b border-border">
        <div className="container-wide py-12 sm:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg mb-3">
                Everything you need
              </h2>
              <p className="text-fg-secondary text-sm">
                Start with eligibility, then fees and documents. Tools stay free for core
                immigration info.
              </p>
            </div>
            <ul className="lg:col-span-8 divide-y divide-border border-y border-border">
              {guideLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-baseline justify-between gap-4 py-4 group"
                  >
                    <span>
                      <span className="font-semibold text-fg group-hover:text-accent transition-colors">
                        {item.title}
                      </span>
                      <span className="block text-sm text-fg-secondary mt-0.5">{item.desc}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-fg-muted group-hover:text-accent transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — vertical numbered list */}
      <section className="border-b border-border">
        <div className="container-wide py-8 sm:py-10 max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg mb-8">How it works</h2>
          <ol className="space-y-8">
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <span className="font-display text-sm font-bold text-accent pt-1">01</span>
              <div>
                <h3 className="font-semibold text-lg text-fg mb-1">Check your eligibility</h3>
                <p className="text-sm text-fg-secondary">
                  Confirm your role maps to a USMCA profession and your degree supports that
                  category.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <span className="font-display text-sm font-bold text-accent pt-1">02</span>
              <div>
                <h3 className="font-semibold text-lg text-fg mb-1">Prepare your application</h3>
                <p className="text-sm text-fg-secondary">
                  Employer support letter, credentials, and interview prep — then choose border or
                  mail.
                </p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-4">
              <span className="font-display text-sm font-bold text-accent pt-1">03</span>
              <div>
                <h3 className="font-semibold text-lg text-fg mb-1">Apply and get a decision</h3>
                <p className="text-sm text-fg-secondary">
                  Port of entry for many Canadians; Form I-129 by mail when changing status inside
                  the U.S.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* POLICY NOTE — hairline card, no side stripe */}
      <section className="border-b border-border bg-bg-secondary">
        <div className="container-wide py-10 sm:py-12">
          <div className="max-w-3xl border border-border bg-bg p-6 sm:p-8 rounded">
            <h2 className="font-display text-xl font-bold text-fg mb-2">
              June 2025 USCIS policy update
            </h2>
            <p className="text-fg-secondary mb-4 text-sm sm:text-base">
              Material changes for Engineer, Economist, and self-employment interpretations. Tech
              workers should read the breakdown before applying or renewing.
            </p>
            <Link
              href="/changes"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              Read the policy changes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-wide py-8 sm:py-10">
          <EmailCapture
            variant="banner"
            title="Get TN visa policy alerts"
            description="Updates when fee schedules or adjudication guidance change. Unsubscribe anytime."
          />
        </div>
      </section>

      {/* SOURCES */}
      <section className="border-b border-border">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <h2 className="font-display text-2xl font-bold text-fg mb-4">
            Built on official sources
          </h2>
          <p className="text-sm text-fg-secondary max-w-2xl mb-6">
            Fee amounts are centralized and cited on{' '}
            <Link href="/fees" className="text-accent hover:underline">
              /fees
            </Link>
            . Editorial standards live on{' '}
            <Link href="/about" className="text-accent hover:underline">
              /about
            </Link>
            .
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
            <li>
              <a
                href="https://www.uscis.gov/policy-manual/volume-2-part-p"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                USCIS Policy Manual
              </a>
            </li>
            <li>
              <a
                href="https://www.uscis.gov/g-1055"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                USCIS fee schedule
              </a>
            </li>
            <li>
              <a
                href="https://i94.cbp.dhs.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                CBP I-94
              </a>
            </li>
            <li>
              <a
                href="https://ustr.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                USTR / USMCA
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28 overflow-hidden">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold text-fg mb-8">Reader experiences</h2>
          <TestimonialCarousel />
        </div>
      </section>
    </main>
  )
}
