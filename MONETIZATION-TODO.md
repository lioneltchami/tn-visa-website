# TN Visa Guide — Growth & Monetization TODO

## 🔧 Technical Setup (Do First)

### Google Analytics
- [ ] Go to https://analytics.google.com
- [ ] Create property for tnvisaguide.ca
- [ ] Copy your `G-XXXXXXXXXX` ID
- [ ] Add to Vercel: `vercel env add NEXT_PUBLIC_GA_ID` → paste the ID
- [ ] Redeploy: `vercel --prod`

### Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property `tnvisaguide.ca`
- [ ] Verify via DNS or HTML file
- [ ] Submit sitemap: `https://tnvisaguide.ca/sitemap.xml`

### Bing Webmaster Tools
- [ ] Go to https://www.bing.com/webmasters
- [ ] Add site and verify
- [ ] Submit sitemap

---

## 💰 Monetization

### Tier 1: Easy Money (Start Now)

#### Job Posting Fees
- [ ] Update `/post-job` page with pricing
- [ ] Standard listing: $99/30 days
- [ ] Featured listing: $199/30 days
- [ ] Add Stripe payment integration

#### Google AdSense
- [ ] Apply at https://adsense.google.com (need ~1000 visits/month first)
- [ ] Add ad units to job listings, blog articles, sidebar

#### Affiliate Programs — Sign Up

**Credential Evaluation (High Priority)**
| Company | Link | Commission | Status |
|---------|------|------------|--------|
| WES | partnerships@wes.org | $10–25/referral | [ ] Applied |
| ECE | ece.org/affiliates | $15–30/referral | [ ] Applied |
| IQAS | Contact directly | Varies | [ ] Applied |

**Money Transfer**
| Company | Link | Commission | Status |
|---------|------|------------|--------|
| Wise | wise.com/partnerships | $15–30/signup | [ ] Applied |
| Remitly | remitly.com/affiliates | $10–25/transfer | [ ] Applied |
| OFX | ofx.com/affiliates | $25–50/trade | [ ] Applied |

**Immigration Lawyers**
| Company | Link | Commission | Status |
|---------|------|------------|--------|
| Boundless | boundless.com/partners | $50–100/lead | [ ] Applied |
| SimpleCitizen | Contact directly | $25–75/signup | [ ] Applied |
| Local firms | Reach out | $100–500/client | [ ] Applied |

**Health Insurance**
| Company | Link | Commission | Status |
|---------|------|------------|--------|
| Cigna Global | cignaglobal.com/partners | $50–150/policy | [ ] Applied |
| GeoBlue | geobluetravelinsurance.com/affiliates | $25–75/policy | [ ] Applied |
| IMG Global | imglobal.com/affiliates | $30–100/policy | [ ] Applied |

**Moving & Relocation**
| Company | Link | Commission | Status |
|---------|------|------------|--------|
| U-Pack | upack.com/affiliates | $25–50/booking | [ ] Applied |
| PODS | Contact directly | $50–100/rental | [ ] Applied |
| International Van Lines | internationalvanlines.com/affiliates | $100+/move | [ ] Applied |

**Travel**
| Company | Link | Commission | Status |
|---------|------|------------|--------|
| Wise | wise.com/invite | Instant approval | [ ] Applied |
| Skyscanner | Via Travelpayouts.com | 50% rev share | [ ] Applied |
| Booking.com | booking.com/affiliate | 25–40% | [ ] Applied |

#### Where to Place Affiliate Links
- [ ] `/credentials` — WES, ECE, IQAS links
- [ ] `/moving` — Wise, insurance, moving companies
- [ ] `/taxes` — Cross-border banking (Wise, OFX)
- [ ] `/denied` — Immigration lawyer CTA
- [ ] `/green-card` — Immigration lawyer CTA
- [ ] `/apply/port-of-entry` — Travel booking links
- [ ] Blog articles — Contextual links

### Tier 2: Medium Effort

- [ ] Premium job listings ($100–500/post featured)
- [ ] Employer subscription packages ($500–2000/mo)
- [ ] Sponsored blog content ($200–1000/article)
- [ ] Email newsletter sponsorship ($100–500/send)

### Tier 3: Products (Future)

- [ ] TN Visa Document Kit ($29–49)
- [ ] Offer Letter Templates ($19–39)
- [ ] Video Course ($99–299)
- [ ] 1-on-1 Consultation ($100–300/hour)

---

## 📈 Traffic & SEO

### Free Backlink Opportunities

#### Reddit (Do Weekly)
- [ ] r/immigration — Answer questions, link guides
- [ ] r/IWantOut — Help Canadians moving to US
- [ ] r/cscareerquestions — Tech visa questions
- [ ] r/nursing — Nurse TN visa questions

**Example post:**
> "I put together a free guide on TN visa processing times for 2026 — covers border vs consulate vs USCIS mail options. Hope it helps: [link]"

#### Forums
- [ ] Create account on VisaJourney.com
- [ ] Create account on Immigrate.com
- [ ] Create account on ExpatForum.com
- [ ] Add site to forum signatures
- [ ] Answer questions helpfully

#### Q&A Sites
- [ ] Quora — Answer TN visa questions
- [ ] Stack Exchange (Expatriates)

#### Directories
- [ ] Submit to Crunchbase
- [ ] Submit to Product Hunt
- [ ] Submit to AlternativeTo

#### HARO (Help a Reporter Out)
- [ ] Sign up at helpareporter.com
- [ ] Respond to immigration/visa journalist queries

### Guest Posting Outreach

Email template:
```
Hi,

I run tnvisaguide.ca — a free resource for Canadians working in the US on TN visas. 

I'd love to write a guest post for your readers about [topic relevant to their blog]. 

Would you be interested?

[Your name]
```

Target blogs about:
- [ ] Canadian expat life
- [ ] Remote work / digital nomad
- [ ] Career advice for tech/healthcare
- [ ] Immigration topics

### Paid Advertising (When Ready)

#### Google Ads
- Budget: $500–2,000/month to start
- Target keywords:
  - "TN visa jobs"
  - "Canadian nurse jobs USA"
  - "TN visa requirements"
  - "TN visa software engineer"
- Location: Canada
- Start: $20–50/day

#### Reddit Ads
- Budget: $5–10/day minimum
- Target subreddits: r/immigration, r/IWantOut, r/cscareerquestions, r/nursing

#### Facebook/Instagram Ads
- Budget: $10–20/day
- Target: Canadians 25–45, interests in immigration, working abroad
- Job titles: Nurse, Engineer, Accountant

---

## 📊 Tracking & Analytics

### Tools to Use
- [ ] Plausible (already installed): https://plausible.io/tnvisaguide.ca
- [ ] Google Analytics (once set up): https://analytics.google.com
- [ ] Google Search Console: See ranking keywords
- [ ] Ahrefs Free: Check backlinks (ahrefs.com/backlink-checker)
- [ ] Ubersuggest: Keyword research (neilpatel.com/ubersuggest)

### Check Weekly
- [ ] `site:tnvisaguide.ca` on Google — See indexed pages
- [ ] Search Console — Check impressions, clicks, ranking keywords
- [ ] Plausible — Traffic sources, top pages

---

## 📧 Email List (Future)

- [ ] Set up Resend for newsletter sending
- [ ] Add `RESEND_API_KEY` to Vercel
- [ ] Verify domain in Resend dashboard
- [ ] Create welcome email sequence
- [ ] Weekly/monthly newsletter with new jobs, articles

---

## Revenue Projections

| Traffic | Conservative | Optimistic |
|---------|-------------|------------|
| 1,000/mo | $50–100/mo | $150–300/mo |
| 5,000/mo | $250–500/mo | $750–1,500/mo |
| 10,000/mo | $500–1,000/mo | $1,500–3,000/mo |
| 25,000/mo | $1,250–2,500/mo | $3,750–7,500/mo |

---

## Quick Wins Checklist

### Today
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing
- [ ] Sign up for Wise affiliate (instant approval)
- [ ] Post helpful answer on r/immigration with link

### This Week
- [ ] Set up Google Analytics
- [ ] Apply to 3 affiliate programs
- [ ] Write 1 Reddit post per day

### This Month
- [ ] Get 5 affiliate programs approved
- [ ] Add affiliate links to key pages
- [ ] Reach 1,000 monthly visitors
- [ ] Apply for AdSense

---

*Last updated: May 9, 2026*
