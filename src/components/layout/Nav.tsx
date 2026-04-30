'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const links = [
  { href: '/eligibility', label: 'Eligibility' },
  { href: '/professions', label: 'Professions' },
  { href: '/apply', label: 'Apply' },
  { href: '/fees', label: 'Fees' },
  { href: '/companies', label: 'Companies' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/compare', label: 'TN vs H-1B' },
  { href: '/taxes', label: 'Taxes' },
  { href: '/changes', label: 'Updates' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  // Focus trap
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !menuRef.current) return
    const focusable = menuRef.current.querySelectorAll<HTMLElement>('a, button')
    if (focusable.length === 0) return
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

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:rounded-lg focus:gradient-bg focus:text-white focus:font-medium">
        Skip to content
      </a>
      <nav className="glass sticky top-0 z-50 border-b border-border" aria-label="Main navigation">
        <div className="container-wide flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-lg gradient-text">
            🍁 TN Guide
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    pathname === link.href
                      ? 'text-accent'
                      : 'text-fg-secondary hover:text-fg'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-1 -bottom-[9px] h-0.5 bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full gradient-bg text-white hover:opacity-90 transition-opacity">
              Sign In
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-bg-secondary transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center"
            onKeyDown={handleMenuKeyDown}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={`text-2xl font-medium transition-colors ${
                      pathname === link.href ? 'text-accent' : 'text-fg-secondary hover:text-fg'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <button
                onClick={() => setOpen(false)}
                className="mt-4 px-6 py-2 rounded-full border border-border text-fg-secondary hover:text-fg text-sm"
              >
                Close menu
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
