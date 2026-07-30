'use client'

import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { trackEvent } from '@/hooks/useAnalytics'
import { type AffiliateOffer, getAffiliateOffer } from '@/lib/affiliates'

interface AffiliateLinkProps {
  children: ReactNode
  offer: AffiliateOffer
}

export default function AffiliateLink({ children, offer }: AffiliateLinkProps) {
  const { provider, url } = getAffiliateOffer(offer)

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored noopener"
      onClick={() => trackEvent('affiliate_click', { provider, offer, destination: url })}
      className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
    >
      {children}
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-canadian/10 text-canadian font-normal">
        Partner
      </span>
      <ExternalLink className="w-3 h-3" />
    </a>
  )
}
