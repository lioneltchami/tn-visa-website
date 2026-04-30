'use client'

export function trackEvent(name: string, props?: Record<string, string>) {
  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as unknown as { plausible?: (name: string, opts?: { props: Record<string, string> }) => void }).plausible) {
    ;(window as unknown as { plausible: (name: string, opts?: { props: Record<string, string> }) => void }).plausible(name, props ? { props } : undefined)
  }
}
