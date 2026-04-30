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
Run these SQL files in your Supabase dashboard (SQL Editor):

**a) Main schema** — run `supabase/schema.sql`
- Creates: profiles, companies, documents, work_history tables
- Sets up RLS policies, indexes, triggers
- Creates the documents storage bucket

**b) pgvector for AI chatbot** — run `supabase/migrations/add_embeddings.sql`
- Enables the vector extension
- Creates: content_embeddings table
- Creates: match_content similarity search function

**c) Subscribers table** — already appended to schema.sql, but if you ran schema.sql before the newsletter was added, run this separately:
```sql
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  interests text[] default '{}',
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);
alter table public.subscribers enable row level security;
create policy "Anyone can subscribe" on public.subscribers for insert with check (true);
```

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

### 5. Domain & Deployment
- Buy `tnvisaguide.ca` if not already owned
- Deploy on Vercel:
  ```bash
  git add -A && git commit -m "feat: complete TN visa guide" && git push
  ```
  - Connect repo at vercel.com/new
  - Add ALL env vars from `.env.local` to Vercel project settings
  - Point tnvisaguide.ca DNS to Vercel
  - SSL is automatic

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

d) **Create the actual PDF products:**
   - You need to create 3 PDF files and upload them to Supabase Storage (or any file host):
     - `tn-visa-interview-kit.pdf` — Border Interview Kit ($49)
     - `tn-visa-letter-templates.pdf` — Employer Letter Template Pack ($29)
     - `tn-visa-complete-guide.pdf` — Complete Application Guide ($69)
   - Update the download links in `src/app/api/webhook/route.ts` (DOWNLOAD_LINKS object)
   - The content outline for each product is in ROADMAP.md Phase 3.2

e) **Test the flow:**
   - Use Stripe test mode first (sk_test_ keys)
   - Test card: 4242 4242 4242 4242, any future date, any CVC
   - Verify: checkout → payment → webhook → email with download link
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
The status tracker page and reminder script are built. You need to:

a) **Run the tn_status table SQL** in Supabase dashboard (appended to schema.sql)

b) **Set up the renewal reminder cron job:**
   - Option A: Deploy `scripts/send-renewal-reminders.ts` as a Supabase Edge Function
   - Option B: Use a cron service (cron-job.org, Railway, or GitHub Actions) to run daily:
     ```bash
     npx tsx scripts/send-renewal-reminders.ts
     ```
   - The script checks for TN statuses expiring in 90, 60, or 30 days and sends emails via Resend
   - Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY

c) **Note:** The reminder script joins tn_status with profiles to get email addresses.
   The profiles table must have the user's email for this to work.

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

a) **Run the jobs table SQL** in Supabase dashboard (appended to schema.sql)

b) **Seed initial jobs:**
   - Post a few example jobs yourself to populate the board
   - Reach out to TN-friendly companies (Shopify, Stripe, etc.) to post

c) **Future: Implement paid tiers** (currently all free):
   - Free: 1 active posting per company
   - Standard ($99/mo): 5 active postings
   - Premium ($299/mo): unlimited + featured placement

### 16. Blog System with MDX
- `npm install @next/mdx` and configure
- Prompt in ROADMAP.md Phase 6.1

---

## 📊 CURRENT STATE

| Metric | Value |
|--------|-------|
| Total pages | 102 static + 2 API routes |
| Test files | 8 (41 tests, all passing) |
| Profession pages | 63 individual detail pages |
| Interactive tools | 6 (eligibility checker, fee calculator, SPT calculator, profession finder, letter builder, AI chatbot) |
| Content pages | /denied, /border-interview, /employer-letter, /self-employment, /processing-times, /faq |
| Email capture | Homepage banner + /changes page inline |
| Sitemap URLs | 94 (23 static + 63 professions + 8 companies) |

---

## 📁 KEY FILES

| File | What It Is |
|------|-----------|
| `ROADMAP.md` | Full 6-phase plan with copy-pasteable prompts |
| `STILL-TO-DO.md` | This file — manual tasks |
| `.env.example` | All required environment variables |
| `supabase/schema.sql` | Main database schema + subscribers |
| `supabase/migrations/add_embeddings.sql` | pgvector for AI chatbot |
| `scripts/ingest-content.ts` | Content ingestion for chatbot RAG |
| `src/data/professions.json` | 63 professions with full metadata |
| `src/data/fees.json` | Single source of truth for all fees |
| `src/data/seed-companies.ts` | Seed company data |
| `src/data/airports.json` | Canadian preclearance airports |
