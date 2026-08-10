/**
 * Site identity / E-E-A-T signals used by About, Organization schema, and llms.txt.
 * Keep sameAs empty until real public profiles exist — do not invent social URLs.
 */

export const SITE_NAME = 'TN Visa Guide'
export const SITE_URL = 'https://tnvisaguide.ca'
export const SITE_EMAIL = 'hello@tnvisaguide.ca'
export const SITE_LOGO_URL = `${SITE_URL}/icon-512.png`

export const SITE_DESCRIPTION =
  'Educational guide for Canadian and Mexican professionals seeking TN visa status under USMCA — eligibility, fees, application steps, and tools.'

/** Comma-separated profile URLs via env, e.g. LinkedIn / GitHub / X. */
export function organizationSameAs(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS || ''
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//.test(s))
}

export const EDITORIAL = {
  name: 'TN Visa Guide Editorial Team',
  jobTitle: 'Editors',
  description:
    'We maintain this site as an educational resource. We are not a law firm and do not provide legal advice. Content is researched from public USCIS, CBP, and USMCA materials and updated when fee schedules or policy guidance change.',
  knowsAbout: [
    'TN visa',
    'USMCA Chapter 16',
    'Form I-129',
    'Canadian professionals working in the United States',
  ],
  /** Display byline for blog cards / articles */
  byline: 'TN Visa Guide Editorial Team',
}
