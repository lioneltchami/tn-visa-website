'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const primaryLinks = [
  { href: '/eligibility', label: 'Eligibility' },
  { href: '/professions', label: 'Professions' },
  { href: '/apply', label: 'Apply' },
  { href: '/jobs', label: 'Jobs' },
]

const moreLinks = [
  { href: '/fees', label: 'Fees & Calculator' },
  { href: '/taxes', label: 'Tax Guide' },
  { href: '/compare', label: 'TN vs H-1B' },
  { href: '/companies', label: 'Companies' },
  { href: '/changes', label: 'Policy Updates' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
]

const allLinks = [...primaryLinks, ...moreLinks]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLLIElement>(null)

  // Close dropdowns on route change
  useEffect(() => { setMoreOpen(false); setMobileOpen(false) }, [pathname])

  // Close More dropdown on outside click
  useEffect(() => {
    if (!moreOpen) return
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [moreOpen])

  // Close mobile on Escape
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mobileOpen])

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>('a, button')
    if (!focusable.length) return
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }, [])

  const isActive = (href: string) => pathname === href
  const isMoreActive = moreLinks.some(l => pathname === l.href)
  const linkCls = (active: boolean) => `px-3 py-2 text-sm rounded-md transition-colors ${active ? 'text-accent' : 'text-fg-secondary hover:text-fg'}`

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-lg focus:gradient-bg focus:text-white focus:font-medium">
        Skip to content
      </a>
      <nav className="glass sticky top-0 z-50 border-b border-border" aria-label="Main navigation">
        <div className="container-wide flex items-center justify-between h-14">
          <Link href="/" className="flex flex-col">
            <span className="font-bold text-lg gradient-text"><span className="text-canadian">🍁</span> TN Visa Guide</span>
            <span className="text-[10px] text-fg-muted hidden sm:block">For Canadian Professionals</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {primaryLinks.map(link => (
              <li key={link.href} className="relative">
                <Link href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={linkCls(isActive(link.href))}>
                  {link.label}
                  {isActive(link.href) && <motion.span layoutId="nav-active" className="absolute inset-x-1 -bottom-[9px] h-0.5 bg-accent rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                </Link>
              </li>
            ))}
            {/* More dropdown */}
            <li className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`${linkCls(isMoreActive)} inline-flex items-center gap-1`}
                aria-expanded={moreOpen}
              >
                More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                {isMoreActive && <motion.span layoutId="nav-active" className="absolute inset-x-1 -bottom-[9px] h-0.5 bg-accent rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 card p-2 shadow-xl border border-border">
                  {moreLinks.map(link => (
                    <Link key={link.href} href={link.href} className={`block px-3 py-2 text-sm rounded-md transition-colors ${isActive(link.href) ? 'text-accent bg-bg-secondary' : 'text-fg-secondary hover:text-fg hover:bg-bg-secondary'}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full gradient-bg text-white hover:opacity-90 transition-opacity">
              Sign In
            </Link>
            <button className="lg:hidden p-2 rounded-lg hover:bg-bg-secondary transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div ref={menuRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center" onKeyDown={handleMenuKeyDown}>
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-5">
              {allLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: i * 0.04 }}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)} aria-current={isActive(link.href) ? 'page' : undefined} className={`text-xl font-medium transition-colors ${isActive(link.href) ? 'text-accent' : 'text-fg-secondary hover:text-fg'}`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <button onClick={() => setMobileOpen(false)} className="mt-4 px-6 py-2 rounded-full border border-border text-fg-secondary hover:text-fg text-sm">Close</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
