'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import type { AnalyticsParams } from '@/hooks/useAnalytics'
import { trackEvent } from '@/hooks/useAnalytics'

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event?: string
  eventParams?: AnalyticsParams
}

export default function TrackedLink({
  event = 'cta_click',
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventParams)
        onClick?.(e)
      }}
    />
  )
}
