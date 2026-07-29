# STILL TO DO — Manual Tasks

Everything that requires your accounts, credentials, or decisions. The code is built — these are the steps to make it all live.

---

## 🔴 BEFORE LAUNCH (Required)

### 1. Set Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=sk-your-openai-api-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your-resend-api-key
```

### 2. Supabase Database Setup

Run these in your Supabase dashboard (Dashboard → SQL Editor) **in this exact order:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  SQL EXECUTION ORDER                                                │
├─────────────────────────────────────────────────────────────────────┤
│  1. supabase/schema-clean.sql                                       │
│     → Creates ALL 8 tables, indexes, RLS policies, triggers         │
│                                                                     │
│  2. supabase/migrations/embeddings-clean.sql                        │
│     → Enables pgvector, creates content_embeddings table            │
│     → NOTE: Enable pgvector extension first in Supabase dashboard   │
│       (Database → Extensions → search "vector" → enable)            │
│                                                                     │
│  3. supabase/migrations/add_job_sync_columns.sql                    │
│     → Adds job sync columns (source, external_id, last_synced_at)   │
│     → Creates indexes and constraints for external job sync         │
│                                                                     │
│  4. AFTER ingesting chatbot content (step 3 below), run:            │
│     create index on public.content_embeddings                       │
│       using ivfflat (embedding extensions.vector_cosine_ops)        │
│       with (lists = 10);                                            │
└─────────────────────────────────────────────────────────────────────┘
```

**Important:** Use `schema-clean.sql` NOT `schema.sql`. The clean version fixes duplicate constraints, adds missing RLS policies for unsubscribe, and uses `ON CONFLICT` for the storage bucket.

### 3. Ingest Content for AI Chatbot

After steps 1 and 2:

```bash
npx tsx scripts/ingest-content.ts
```

Reads the TN visa guide, chunks it, generates embeddings, stores in Supabase.
Cost: ~$0.01 in OpenAI credits. Takes ~1-2 minutes.

### 4. Resend Email Setup

- Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
- Get your API key → add as `RESEND_API_KEY` in `.env.local`
- **Verify your sending domain** (tnvisaguide.ca) in Resend dashboard
  - Add the DNS records Resend gives you (SPF, DKIM, DMARC)
  - Until verified, emails send from `onboarding@resend.dev` (fine for testing)

### 5. Domain & Deployment (Cloudflare + Vercel)

**a) Buy your domain:**

- Go to [Cloudflare Registrar](https://dash.cloudflare.com) (cheapest — sells at cost)
- Or use Namecheap/Porkbun
- Buy `tnvisaguide.ca` (and optionally `tnvisaguide.com` as redirect)

**b) Set up Cloudflare (free plan):**

- Add your domain to Cloudflare at dash.cloudflare.com
- Update your domain's nameservers to Cloudflare's (registrar will show you how)
- Wait for DNS propagation (5-30 minutes)
- Set SSL/TLS mode to **"Full (strict)"** (Settings → SSL/TLS)
- Enable **Web Analytics** (free, no JS needed — Analytics → Web Analytics)
- Enable **Bot Fight Mode** (Security → Bots)

**c) Deploy on Vercel:**

- Push your code to GitHub:
  ```bash
  git add -A && git commit -m "feat: complete TN visa guide" && git push
  ```
- Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo
- Add ALL environment variables from `.env.local` to Vercel project settings:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `OPENAI_API_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `STRIPE_SECRET_KEY` (when ready)
  - `STRIPE_WEBHOOK_SECRET` (when ready)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (when ready)
- Deploy (Vercel builds automatically)

**d) Connect domain via Cloudflare DNS:**

- In Cloudflare DNS settings, add these records:
  - Type: `CNAME` | Name: `@` | Target: `cname.vercel-dns.com` | Proxy: ON (orange cloud)
  - Type: `CNAME` | Name: `www` | Target: `cname.vercel-dns.com` | Proxy: ON (orange cloud)
- In Vercel, go to your project → Settings → Domains → Add `tnvisaguide.ca` and `www.tnvisaguide.ca`
- Vercel will verify the domain automatically

**e) Verify everything works:**

- Visit https://tnvisaguide.ca — should load your site
- Check Cloudflare Analytics — should show traffic
- Test the AI chatbot, email signup, and login flows

**What you get for free:**

- Cloudflare: DDoS protection, CDN, Web Analytics, WAF, Bot Management, SSL
- Vercel: Full Next.js hosting, serverless functions, edge middleware, image optimization, 100GB bandwidth

---

## 🟡 AFTER LAUNCH — Monetization Setup

### 6. Affiliate Program Signups

**a) TNVisaExpert (HIGHEST PRIORITY — 20% commission = $360-560/sale)**

- Network: eAffiliatez.com
- Products: $850 assessment, $1,800 Canadian TN, $2,250 Mexican TN, $49-$124 DIY kits
- After approval: add affiliate links to `/employer-letter`, `/denied`, `/border-interview`, `/letter-builder`

**b) WES — World Education Services (10% commission ~$20/eval)**

- Network: CJ Affiliate (cj.com)
- Contact: affiliates@wes.org
- After approval: add links to `/documents`, `/professions/[slug]` pages, `/eligibility`

**c) Wise (up to £50/referral, LIFETIME cookie)**

- Network: Partnerize
- Sign up: wise.com/affiliate-program
- After approval: add links to `/taxes`, `/moving`

### After Getting Approved — Replace Placeholder Links

Affiliate links are already integrated into pages with placeholder URLs. After each program approves you, replace the placeholder URLs with your real affiliate tracking links:

**TNVisaExpert links to replace** (search for `tnvisaexpert.com` in these files):

- `src/app/employer-letter/page.tsx` → replace `https://tnvisaexpert.com/services/` with your affiliate link
- `src/app/denied/page.tsx` → replace `https://tnvisaexpert.com/services/jump-start-basic-tn-visa-support-service/` with your affiliate link
- `src/app/border-interview/page.tsx` → replace `https://tnvisaexpert.com/products/tn-visa-border-interview-kit/` with your affiliate link
- `src/app/letter-builder/page.tsx` → replace `https://tnvisaexpert.com` with your affiliate link

**WES links to replace** (search for `wes.org` in these files):

- `src/app/documents/page.tsx` → replace `https://www.wes.org/evaluations-and-fees/` with your CJ Affiliate tracking link

**Wise links to replace** (search for `wise.com/invite` in these files):

- `src/app/taxes/page.tsx` → replace `https://wise.com/invite/` with your Partnerize tracking link
- `src/app/moving/page.tsx` → replace `https://wise.com/invite/` with your Partnerize tracking link

Tip: Use your editor's find-and-replace across the project to update all links at once.

### 7. Analytics Setup

The Plausible script and event tracking are already integrated into the codebase. You need to:

a) **Sign up for Plausible** at plausible.io ($9/month, 30-day free trial)

- Add your domain: `tnvisaguide.ca`
- No DNS changes needed — the script tag is already in the layout

b) **Verify it works:**

- Deploy the site
- Visit a page
- Check Plausible dashboard — you should see the visit

c) **Custom events already tracked:**

- `eligibility_check_complete` (with result: eligible/not_eligible)
- `fee_calculation` (with method: poe-land/poe-airport/i-129)
- `letter_generated` (with profession name)
- `email_signup` (with variant: inline/banner)
- `affiliate_click` (with provider and href)
- `chat_message` (count only, no content)

d) **Free alternative:** If you prefer free self-hosted analytics:

- Sign up for Umami (umami.is) and deploy on Vercel/Railway
- Replace the Plausible script in `src/app/layout.tsx` with the Umami script
- Update `src/hooks/useAnalytics.ts` to call `umami.track()` instead of `plausible()`

### 8. Stripe Setup (for digital products)

The products page and checkout flow are already built. You need to:

a) **Create a Stripe account** at stripe.com

b) **Get API keys** from Stripe Dashboard → Developers → API Keys:

- Add to `.env.local`:
  - `STRIPE_SECRET_KEY=sk_test_...` (or `sk_live_...` for production)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...` (or `pk_live_...`)

c) **Set up the webhook:**

- Stripe Dashboard → Developers → Webhooks → Add endpoint
- URL: `https://tnvisaguide.ca/api/webhook`
- Events to listen for: `checkout.session.completed`
- Copy the webhook signing secret → add as `STRIPE_WEBHOOK_SECRET` in `.env.local`

d) **Build and publish the PDF products:**

1.  Run `supabase/migrations/product-delivery-and-rate-limits.sql` once in the Supabase
    SQL Editor (creates `purchases`, `rate_limits`, and the private `product-files` bucket)
2.  Set `DOWNLOAD_TOKEN_SECRET` (`openssl rand -hex 32`) in `.env.local` **and** in Vercel.
    Changing it later invalidates download links you already emailed.
3.  Build the PDFs from `products/*.md` and upload them:
    ```bash
    brew install pandoc                       # one time (Chrome is also required)
    npm run build:products -- --skip-upload   # review .products-build/*.pdf
    npm run build:products                    # upload to Supabase Storage
    ```

- Prices, copy and file lists all live in `src/lib/products.ts` — edit there, not in the
  checkout/webhook routes
- Re-run `npm run build:products` after editing the markdown; existing buyer links
  immediately serve the new file

e) **Test the flow:**

- Use Stripe test mode first (sk_test_ keys)
- Test card: 4242 4242 4242 4242, any future date, any CVC
- Verify: checkout → payment → `/products/success` shows download buttons immediately,
  then the receipt email arrives with a `/products/download?token=…` link
- Access comes from the verified Stripe session, so a slow or failed webhook never
  blocks a buyer
- Switch to live keys when ready

---

## 🟢 CONTENT TO CREATE

### 9. Timely Pages (URGENT — USMCA review is July 2026)

These pages are in ROADMAP.md but not yet built:

- `/usmca-review` — "What Happens to TN Visas if USMCA Ends?" (4 scenarios)
- `/government-shutdown` — "TN Visa During the 2026 DHS Shutdown"

### 10. Blog Posts to Write

Priority order (prompts in ROADMAP.md Phase 6.1):

1. "Can You Get a TN Visa with a Computer Science Degree in 2026?" — #1 search query
2. "TN Visa vs H-1B in 2026: After the $100K Fee"
3. "What Happens to TN Visas if USMCA Ends?"
4. "TN Visa Remote Work Rules in 2026"
5. "Moving to the US from Canada: 2026 Financial Guide" (Wise affiliate opportunity)
6. "TN Visa for Mexican Professionals: 2026 Complete Guide"

### 11. Additional Pages Not Yet Built

- `/glossary` — immigration terms with JSON-LD DefinedTermSet
- `/compare/tn-vs-o1` — TN vs O-1 comparison
- `/compare/tn-vs-l1` — TN vs L-1 comparison
- `/compare/tn-vs-e2` — TN vs E-2 comparison

---

## 🔵 FUTURE FEATURES (Phases 4-6)

### 12. TN Status Tracker & Renewal Reminders

The status tracker page and reminder cron are built. You need to:

a) **Run the tn_status table SQL** in Supabase dashboard (appended to schema.sql)

b) **Run the freshness migration** once (already applied on production):
`supabase/migrations/20260729160000_freshness_pipelines.sql`
(creates `renewal_reminder_sends` ledger + indexes)

c) **Confirm Vercel Cron** includes `/api/renewal-reminders` at `15 6 * * *`
(`vercel.json`). Vercel sends `Authorization: Bearer $CRON_SECRET`.

d) **Manual dry-run / CLI:**

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  "https://tnvisaguide.ca/api/renewal-reminders?dryRun=1"
npm run reminders -- --dry-run
```

Reminders are idempotent via `renewal_reminder_sends` (unique per status + 90/60/30).
Profiles must have email. Vercel does not retry failed cron runs — check Project → Logs.

### 13. Community Experience Database

The experiences page and submit form are built. You need to:

a) **Run the experiences table SQL** in Supabase dashboard (appended to schema.sql)

- Note: experiences have `is_approved` field defaulting to false
- Only approved experiences show publicly (RLS policy)

b) **Set up moderation:**

- In Supabase dashboard, go to Table Editor > experiences
- Review new submissions and set `is_approved = true` for legitimate ones
- Consider building an admin page later for easier moderation

c) **Seed initial data:**

- Submit a few example experiences yourself to populate the page
- This helps encourage others to contribute

### 14. PWA / Offline Access

The PWA is configured and the install prompt is built. You need to:

a) **Create app icons:**

- Create `public/icon-192.png` (192×192 pixels) — your app icon
- Create `public/icon-512.png` (512×512 pixels) — your app icon
- Use a simple maple leaf or TN Guide logo
- Tools: Figma, Canva, or any image editor

b) **Add to .gitignore** (next-pwa generates files in public/):

```
public/sw.js
public/workbox-*.js
```

c) **Test PWA:**

- Deploy to Vercel (PWA requires HTTPS)
- Open in Chrome on mobile
- You should see the install prompt
- After installing, the app works offline for cached pages

### 15. Job Board

The job board is built (/jobs, /jobs/[slug], /post-job). You need to:

a) **Run the SQL migrations** — See Section 2 above for the complete SQL execution order.
Make sure you run all 3 files including `add_job_sync_columns.sql`.

b) **Set up JSearch API (for external job sync):**

- Sign up at [RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
- Subscribe to JSearch API (free tier: 100 requests/month)
- Get your API key from RapidAPI dashboard
- Add to Vercel environment variables:
  - `JSEARCH_API_KEY=your-rapidapi-key`
  - `SYNC_SECRET=<generate with: openssl rand -hex 32>`
  - `CRON_SECRET=<same value as SYNC_SECRET for Vercel Cron>`

c) **Test the sync endpoint locally:**

```bash
curl -X POST http://localhost:3000/api/jobs/sync \
  -H "Authorization: Bearer YOUR_SYNC_SECRET"
```

- Should return: `{ success: true, inserted: N, skipped: N, failed: 0, errors: [] }`

d) **Deploy and verify Vercel Cron:**

- The `vercel.json` configures daily job sync at 6:00 AM UTC and renewal reminders at 6:15 AM UTC
- After deploy, check Vercel dashboard → Project → Settings → Cron Jobs
- You should see `/api/jobs/sync` and `/api/renewal-reminders`

e) **Seed initial jobs:**

- Post a few example jobs yourself to populate the board
- Reach out to TN-friendly companies (Shopify, Stripe, etc.) to post

f) **Future: Implement paid tiers** (currently all free):

- Free: 1 active posting per company
- Standard ($99/mo): 5 active postings
- Premium ($299/mo): unlimited + featured placement

### 15b. Freshness Pipelines (GitHub Actions)

Already wired in `.github/workflows/`:

a) **PDF rebuild** — `build-products.yml`

- Builds on product markdown changes; upload only via `workflow_dispatch` + `upload=true` against the `production` environment
- Repo secrets: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

b) **Chat ingest** — `ingest-content.yml` (`workflow_dispatch` only)

- Secrets: Supabase + `OPENAI_API_KEY` + `GUIDE_REPO_TOKEN` (PAT that can read `tn-visa-guide`)

c) **Fee drift watch** — `freshness-watch.yml` (Mondays 14:20 UTC)

- Opens/updates a GitHub Issue labeled `freshness` when hardcoded fee literals drift from `src/data/fees.json`
- Never auto-publishes policy content

Local checks:

```bash
npm run check:freshness
npm run reminders -- --dry-run
```

### 16. Blog System with MDX

- `npm install @next/mdx` and configure
- Prompt in ROADMAP.md Phase 6.1

### 17. Employer Email Templates

The employer dashboard is built at /employer. To complete the employer experience:

a) **Welcome email for new employer accounts:**

- Trigger: when a user completes onboarding with role='company'
- Add to the onboarding page's handleSubmit success path
- Send via Resend with employer-specific content (link to /employer-guide, /post-job)

b) **Monthly digest email:**

- Create a script similar to send-renewal-reminders.ts
- Query: company profile views (requires adding a views tracking table)
- Send monthly summary via Resend
- This is a Phase 6 feature — skip for now

---

## 📊 CURRENT STATE

| Metric            | Value                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Total pages       | 102 static + 2 API routes                                                                              |
| Test files        | 8 (41 tests, all passing)                                                                              |
| Profession pages  | 63 individual detail pages                                                                             |
| Interactive tools | 6 (eligibility checker, fee calculator, SPT calculator, profession finder, letter builder, AI chatbot) |
| Content pages     | /denied, /border-interview, /employer-letter, /self-employment, /processing-times, /faq                |
| Email capture     | Homepage banner + /changes page inline                                                                 |
| Sitemap URLs      | 94 (23 static + 63 professions + 8 companies)                                                          |

---

## 🟠 SEO MAINTENANCE (Ongoing)

### Annual Content Refresh

When the year changes (e.g., 2026 → 2027):

1. Update `src/lib/constants.ts` with the new year
2. Update page titles that include the year (search for "2026" across all files)
3. Update `lastModified` in `src/app/sitemap.ts`
4. Review and update fee data in `src/data/fees.json` if USCIS changes fees
5. Update profession data in `src/data/professions.json` if USMCA list changes
6. Write new blog posts targeting "[topic] [year]" keywords

### Monthly Tasks

- Check for USCIS policy updates and update `/changes`
- Review and approve community experiences in Supabase
- Post new jobs or reach out to employers
- Send newsletter via Resend (if subscriber list is growing)

### Quarterly Tasks

- Review analytics (Plausible) for top-performing pages
- Update content on pages with declining traffic
- Add new blog posts targeting trending keywords
- Review affiliate link performance

---

## 📁 KEY FILES

| File                                     | What It Is                                    |
| ---------------------------------------- | --------------------------------------------- |
| `ROADMAP.md`                             | Full 6-phase plan with copy-pasteable prompts |
| `STILL-TO-DO.md`                         | This file — manual tasks                      |
| `.env.example`                           | All required environment variables            |
| `supabase/schema.sql`                    | Main database schema + subscribers            |
| `supabase/migrations/add_embeddings.sql` | pgvector for AI chatbot                       |
| `scripts/ingest-content.ts`              | Content ingestion for chatbot RAG             |
| `src/data/professions.json`              | 63 professions with full metadata             |
| `src/data/fees.json`                     | Single source of truth for all fees           |
| `src/data/seed-companies.ts`             | Seed company data                             |
| `src/data/airports.json`                 | Canadian preclearance airports                |
