'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

/* Hallmark · nav: edge masthead (not AI SaaS sticky glass) */

const primaryLinks = [
  { href: '/eligibility', label: 'Eligibility' },
  { href: '/professions', label: 'Professions' },
  { href: '/apply', label: 'Apply' },
  { href: '/fees', label: 'Fees' },
  { href: '/jobs', label: 'Jobs' },
]

const moreLinks = [
  { href: '/taxes', label: 'Tax Guide' },
  { href: '/compare', label: 'TN vs H-1B' },
  { href: '/companies', label: 'Companies' },
  { href: '/changes', label: 'Policy Updates' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
]

const allLinks = [...primaryLinks, ...moreLinks]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    setMoreOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!moreOpen) return
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [moreOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mobileOpen])

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>('a, button')
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const isActive = (href: string) => pathname === href
  const isMoreActive = moreLinks.some((l) => pathname === l.href)

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded focus:bg-accent focus:text-accent-fg focus:font-medium"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-bg sticky top-0 z-50" aria-label="Site header">
        <div className="container-wide py-4 sm:py-5">
          <div className="flex items-end justify-between gap-4">
            <Link href="/" className="min-w-0 group">
              <span className="font-display text-xl sm:text-2xl font-bold text-fg tracking-tight block">
                TN Visa Guide
              </span>
              <span className="text-xs text-fg-muted mt-0.5 block">
                Canadian &amp; Mexican professionals · USMCA
              </span>
            </Link>

            <div className="flex items-center gap-3 shrink-0">
              <ThemeToggle />
              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm font-semibold text-fg border-b border-transparent hover:border-fg transition-colors"
              >
                Sign in
              </Link>
              <button
                className="lg:hidden p-2 rounded hover:bg-bg-secondary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          <nav
            className="hidden lg:block mt-4 pt-3 border-t border-border"
            aria-label="Main navigation"
          >
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`text-sm transition-colors ${
                      isActive(link.href)
                        ? 'text-accent font-semibold'
                        : 'text-fg-secondary hover:text-fg'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`text-sm transition-colors inline-flex items-center gap-1 ${
                    isMoreActive ? 'text-accent font-semibold' : 'text-fg-secondary hover:text-fg'
                  }`}
                  aria-expanded={moreOpen}
                >
                  More
                </button>
                {moreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 border border-border bg-bg p-2 z-50">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3 py-2 text-sm rounded transition-colors ${
                          isActive(link.href)
                            ? 'text-accent bg-bg-secondary'
                            : 'text-fg-secondary hover:text-fg hover:bg-bg-secondary'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-bg lg:hidden flex flex-col"
            onKeyDown={handleMenuKeyDown}
          >
            <div className="container-wide py-4 flex justify-end">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded hover:bg-bg-secondary"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 px-6 pb-10 overflow-y-auto"
            >
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`py-3 text-lg border-b border-border ${
                    isActive(link.href) ? 'text-accent font-semibold' : 'text-fg'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-6 btn-primary text-center"
              >
                Sign in
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
