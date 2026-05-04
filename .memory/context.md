# Project Memory — TN Visa Guide Website

> Read this file at the start of any new session to understand the full project context.

## What This Is

A comprehensive TN visa resource website for Canadian professionals seeking to work in the United States. Built as a content + tools platform that monetises through affiliates, digital products, and a job board.

- **Domain:** tnvisaguide.ca (primary), tnvisaguide.com (redirects to .ca)
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase, Vitest
- **Hosting:** Vercel (app) + Cloudflare (DNS/CDN)
- **Repo:** github.com/lioneltchami/tn-visa-website (private)

## Current State (as of May 2026)

### Stats
- 126+ static pages (63 profession detail pages, 30+ content pages, 6 blog posts, platform pages)
- 55 tests across 11 test files
- 4 API routes (chat, subscribe, checkout, webhook)
- 8 interactive tools (eligibility checker, fee calculator, SPT calculator, profession finder, letter builder, AI chatbot, job board, status tracker)
- 37 components
- 6 data files (professions.json, fees.json, airports.json, border-crossings.json, glossary.json, seed-companies.ts)

### Key Features Built
- 63 individual profession pages with SEO metadata, JSON-LD, Canadian credentials
- AI chatbot (Vercel AI SDK + Supabase pgvector RAG)
- Employer letter builder (5-step wizard)
- Job board with employer posting flow
- Community experiences database with moderation
- TN status tracker with renewal reminders
- Digital products (3 tiers via Stripe: $29/$49/$69)
- Email capture + newsletter (Resend + Supabase)
- Affiliate links (TNVisaExpert 20%, WES 10%, Wise lifetime cookie)
- PWA with offline caching
- Plausible analytics with 6 custom events
- Testimonial carousel with 5 named Canadians
- Province selector for border recommendations

### Canadian Identity
- Red maple leaf SVG favicon (official Canadian flag leaf)
- Nav logo: SVG maple leaf + "TN" in purple + "Visa Guide" in text + "For Canadian Professionals" tagline
- "Working in the USA 🗽" hero with red-white-blue gradient text
- CAD pricing on fee calculator and processing times
- Canadian credential mapping page (/credentials)
- 8 named border crossings grouped by province
- Canadian tax sections (departure tax, RRSP/TFSA, NR73)
- Canadian English spelling (licence, organise, etc.)
- Province selector on border interview page
- hreflang en-CA tag
- "for Canadians" / "from Canada" in page titles

### Design System
- Primary accent: #6366f1 (indigo/purple)
- Canadian red: #C41E3A (maple leaf, partner badges, danger callouts)
- USA gradient: red-to-blue on hero headline
- Dark mode support via CSS custom properties
- Glass morphism, gradient utilities, card components

### Revenue Model
- TNVisaExpert affiliate (20% = $360-560/sale) — placeholder links on 4 pages
- WES affiliate (10% ~$20/eval) — placeholder links on 2 pages
- Wise affiliate (up to £50, lifetime cookie) — placeholder links on 2 pages
- Digital products via Stripe ($29/$49/$69) — checkout working in test mode
- Future: job board paid tiers ($99-299/month)

## Key Files

| File | Purpose |
|------|---------|
| ROADMAP.md | Full 6-phase implementation plan with prompts |
| STILL-TO-DO.md | All manual tasks remaining |
| CANADIAN-IDENTITY-PLAN.md | Canadian identity implementation plan |
| supabase/schema-clean.sql | Clean consolidated SQL (use this, NOT schema.sql) |
| supabase/migrations/embeddings-clean.sql | pgvector for AI chatbot |
| src/data/professions.json | 63 professions with full metadata |
| src/data/fees.json | Single source of truth for all fees |
| src/data/border-crossings.json | 8 Canadian land border crossings |
| src/data/airports.json | 10 Canadian preclearance airports |
| src/data/glossary.json | 20 immigration terms |
| src/lib/currency.ts | USD to CAD conversion (rate: 1.38) |
| src/lib/constants.ts | CURRENT_YEAR and LAST_UPDATED |
| products/*.md | 4 markdown files for digital product PDFs |

## What's NOT Done Yet (Manual Tasks)

See STILL-TO-DO.md for full details. Key items:
1. Set environment variables in Vercel (Supabase, OpenAI, Resend)
2. Run schema-clean.sql in Supabase SQL Editor
3. Run embeddings-clean.sql in Supabase
4. Ingest chatbot content (npx tsx scripts/ingest-content.ts)
5. Set up Resend for emails
6. Create PWA icons (public/icon-192.png, public/icon-512.png)
7. Sign up for affiliate programmes and replace placeholder URLs
8. Create actual PDF products from products/*.md files
9. Set up Plausible analytics ($9/month)
10. Switch Stripe from test to live keys when ready

## Competitors

| Competitor | Positioning | Pricing |
|-----------|-------------|---------|
| TNVisaExpert | Deep content, dated design, San Diego | $850-$2,800 services, $49-$124 kits |
| SimpleTN | Nice design, shallow content, Canadian | $250-$1,299 CAD |
| Manifest Law | Tech-enabled law firm | $2,500-$3,500 |
| Alma | AI + law firm, VC-backed | $2,500-$3,000 |

Our edge: Free interactive tools + 63-profession data + modern tech + .ca domain + Canadian identity. We're the funnel that sends people to service providers.

## Architecture Decisions

- Server components for content pages, client islands for interactive tools
- fees.json as single source of truth (imported by FeeCalculator + fees page + employer guide)
- professions.json powers 63 detail pages + ProfessionFinder + EligibilityChecker + LetterBuilder + job posting
- Supabase for auth, database, storage (8 tables with RLS)
- Stripe checkout via fetch API (not SDK — SDK has connection issues on Vercel serverless)
- ContentLayout component auto-generates BreadcrumbList JSON-LD
- Security headers in next.config.mjs (HSTS, CSP, X-Frame-Options)
- CSP allows: Plausible, Cloudflare Insights, Supabase, OpenAI, Stripe, YouTube, Vimeo
