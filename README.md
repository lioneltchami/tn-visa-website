# TN Visa Guide (`tnvisaguide.ca`)

Next.js 14 App Router site for Canadian professionals applying for TN status. Production host is **Cloudflare Pages** with `@cloudflare/next-on-pages` + Wrangler (not OpenNext, not Vercel).

## Scripts

```bash
npm run dev           # local Next.js dev server
npm run build         # standard Next.js production build (local `next start` only)
npm start             # Next.js production server (local only)
npm run pages:build   # production compile for Cloudflare Pages
npm run preview       # pages:build + wrangler pages dev
npm run deploy        # pages:build + wrangler pages deploy
npm test
npm run lint
```

`next dev` is unchanged. The Pages adapter runs `next build` internally, then writes a Vercel-format bundle that Wrangler deploys to Pages (`pages_build_output_dir = ".vercel/output/static"`). That directory is adapter output, not Vercel hosting.

`@cloudflare/next-on-pages` is pinned to **1.13.15** (still 1.13.x). 1.13.16 declares a `next >=14.3` peer, which does not exist on the 14.x line; this app stays on Next.js 14.2.

## Environment variables

Copy `.env.example` to `.env.local` for `next dev`. Production and Preview values live in the Cloudflare Pages project settings. Do not add an automatic GitHub production-deploy workflow: Pages Git integration (or `npm run deploy`) is the production path.

Scheduled job sync and renewal reminders run from `.github/workflows/scheduled-jobs.yml`. Set the same `CRON_SECRET` as a **GitHub Actions repository secret** and as a Pages environment variable.
