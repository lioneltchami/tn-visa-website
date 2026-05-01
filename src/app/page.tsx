import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import JsonLd from '@/components/JsonLd'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal'
import EmailCapture from '@/components/ui/EmailCapture'
import TestimonialCarousel from '@/components/ui/TestimonialCarousel'
import {
  Shield,
  Clock,
  Infinity,
  FileText,
  Calculator,
  MapPin,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Globe,
  Briefcase,
  GraduationCap,
  Scale,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'TN Visa Guide for Canadians | Complete 2026 Resource',
  description: 'The definitive guide for Canadian professionals seeking TN visa status in the United States. Eligibility checker, fee calculator, and step-by-step application guide.',
  openGraph: {
    title: 'TN Visa Guide for Canadians',
    description: 'Everything Canadian professionals need to work in the U.S. under USMCA — from eligibility to taxes.',
  },
}

export default function Home() {
  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "TN Visa Guide",
        "url": "https://tnvisaguide.ca",
        "description": "The definitive guide for Canadian professionals seeking TN visa status in the United States under USMCA.",
        "publisher": { "@type": "Organization", "name": "TN Visa Guide" }
      }} />
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format"
            alt=""
            fill
            className="object-cover opacity-[0.07] dark:opacity-[0.04]"
            priority
          />
        </div>
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-muted) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 50%, var(--accent-muted) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 20% 80%, var(--accent-muted) 0%, transparent 50%)
            `,
          }}
        />
        <div className="container-tight text-center py-20">
          <Reveal variant="fadeUp">
            <span className="badge inline-block mb-6"><span className="text-canadian">🍁</span> The #1 TN Visa Resource for Canadians</span>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Your Complete Guide to{' '}
              <span className="usa-text">Working in the USA</span> 🗽
            </h1>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.2}>
            <p className="text-lg md:text-xl text-[var(--fg-secondary)] max-w-2xl mx-auto mb-4">
              Everything Canadian professionals need to work in the United States — from eligibility to taxes. Based on official USCIS sources, updated for 2026.
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.25}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Engineers', 'Accountants', 'Nurses', 'Consultants', 'Designers', 'Architects'].map(p => (
                <span key={p} className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-sm text-[var(--fg-secondary)]">{p}</span>
              ))}
              <span className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-sm text-[var(--accent)]">+ 57 more</span>
            </div>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/eligibility"
                className="gradient-bg text-white rounded-full px-8 py-4 font-semibold hover:scale-105 transition-transform"
              >
                Check Your Eligibility
              </Link>
              <a
                href="#guide"
                className="border border-[var(--border)] rounded-full px-8 py-4 font-semibold hover:bg-[var(--bg-secondary)] transition-colors"
              >
                Explore the Guide
              </a>
            </div>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.4}>
            <p className="text-sm text-[var(--fg-muted)]">🍁 Trusted by 50,000+ Canadian professionals</p>
          </Reveal>
        </div>
      </section>

      {/* KEY STATS — Bento Grid */}
      <section className="section-padding">
        <div className="container-tight">
          <Reveal variant="fadeUp">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why <span className="gradient-text">TN Visa</span>?
            </h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StaggerItem className="card p-8 col-span-2 md:col-span-2">
              <Shield className="w-8 h-8 text-[var(--accent)] mb-4" />
              <p className="text-4xl font-bold mb-2">63 Professions</p>
              <p className="text-[var(--fg-secondary)]">Eligible occupations under USMCA — no lottery, no annual cap</p>
            </StaggerItem>
            <StaggerItem className="card p-8">
              <Clock className="w-8 h-8 text-[var(--accent)] mb-4" />
              <p className="text-4xl font-bold mb-2">Same Day</p>
              <p className="text-[var(--fg-secondary)]">Apply at the border, approved in hours</p>
            </StaggerItem>
            <StaggerItem className="card p-8">
              <Infinity className="w-8 h-8 text-[var(--accent)] mb-4" />
              <p className="text-4xl font-bold mb-2">3-Year Stays</p>
              <p className="text-[var(--fg-secondary)]">Renewable indefinitely, no maximum</p>
            </StaggerItem>
            <StaggerItem className="card p-8 col-span-2 md:col-span-1">
              <DollarSign className="w-8 h-8 text-[var(--accent)] mb-4" />
              <p className="text-4xl font-bold mb-2">From $50</p>
              <p className="text-[var(--fg-secondary)]">Total cost at airport preclearance</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* QUICK NAVIGATION */}
      <section id="guide" className="section-padding">
        <div className="container-tight">
          <Reveal variant="fadeUp">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Everything You Need</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: GraduationCap, title: 'Am I Eligible?', desc: 'Check if your profession qualifies', href: '/eligibility' },
              { icon: Briefcase, title: 'How to Apply', desc: 'Step-by-step at the border or by mail', href: '/apply' },
              { icon: FileText, title: 'Documents', desc: 'Complete checklist with templates', href: '/documents' },
              { icon: Calculator, title: 'Fee Calculator', desc: 'Calculate your exact costs', href: '/fees' },
              { icon: Scale, title: 'Tax Guide', desc: 'U.S. and Canadian obligations', href: '/taxes' },
              { icon: MapPin, title: 'Moving Guide', desc: 'SSN, banking, housing, and more', href: '/moving' },
            ].map((item) => (
              <StaggerItem key={item.href}>
                <Link href={item.href} className="card card-interactive p-6 flex flex-col h-full group">
                  <item.icon className="w-6 h-6 text-[var(--accent)] mb-3" />
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-[var(--fg-secondary)] text-sm flex-1">{item.desc}</p>
                  <ArrowRight className="w-4 h-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding">
        <div className="container-tight">
          <Reveal variant="fadeUp">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Check Your Eligibility', desc: 'Use our free tool to see if your profession and degree qualify for TN status under USMCA.' },
              { step: '2', title: 'Prepare Your Application', desc: 'Build your employer letter, organise documents, and prepare for the border interview.' },
              { step: '3', title: 'Apply & Get Approved 🗽', desc: 'Apply at the border for same-day approval, or file I-129 with USCIS by mail.' },
            ].map(item => (
              <StaggerItem key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full gradient-bg text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-[var(--fg-secondary)] text-sm">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ALERT BANNER */}
      <section className="section-padding">
        <div className="container-tight">
          <Reveal variant="fadeIn">
            <div className="glass p-6 md:p-8 border-l-4 border-l-amber-500 rounded-xl">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-warning shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg mb-1">June 2025 USCIS Policy Update</h3>
                  <p className="text-[var(--fg-secondary)] mb-3">
                    Major changes to Engineer, Economist, and self-employment rules. These affect thousands of Canadian tech workers.
                  </p>
                  <Link href="/changes" className="text-[var(--accent)] font-medium hover:underline inline-flex items-center gap-1">
                    Read the full breakdown <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="section-padding">
        <div className="container-tight">
          <EmailCapture variant="banner" title="Get TN Visa Policy Alerts" description="Be the first to know when USCIS changes TN visa rules. Free, no spam, unsubscribe anytime." />
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16">
        <div className="container-tight">
          <Reveal variant="fadeUp">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-8">Built on Official Sources</h2>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--fg-muted)] mb-8">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> USCIS Policy Manual
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Updated April 2026
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> 63 Professions Covered
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> 100+ Pages of Guides
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-[var(--fg-muted)]">
                <a href="https://www.uscis.gov" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">uscis.gov</a>
                <span>·</span>
                <a href="https://www.cbp.gov" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">cbp.gov</a>
                <span>·</span>
                <a href="https://ustr.gov" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">ustr.gov</a>
                <span>·</span>
                <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">travel.state.gov</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="section-padding overflow-hidden">
        <div className="container-tight">
          <Reveal variant="fadeUp">
            <h2 className="text-2xl font-bold text-center mb-8">What Canadians Are Saying</h2>
          </Reveal>
          <TestimonialCarousel />
        </div>
      </section>

    </main>
  )
}
