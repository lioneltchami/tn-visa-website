'use client'

import { ExternalLink } from 'lucide-react'
import { type ReactNode } from 'react'
import { trackEvent } from '@/hooks/useAnalytics'

interface AffiliateLinkProps {
  href: string
  children: ReactNode
  provider: 'tnvisaexpert' | 'wes' | 'wise'
}

export default function AffiliateLink({ href, children, provider }: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      onClick={() => trackEvent('affiliate_click', { provider, href })}
      className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
    >
      {children}
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-canadian/10 text-canadian font-normal">Partner</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  )
}
