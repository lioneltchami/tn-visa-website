/**
 * Scheduled kick: enqueue the long-running job-sync-background function.
 * Scheduled functions are capped at ~30s; the sync route can take longer.
 */
export default async () => {
  const base = process.env.URL || process.env.DEPLOY_PRIME_URL
  const secret = process.env.CRON_SECRET || process.env.SYNC_SECRET

  if (!base) {
    console.error('[job-sync] Missing URL / DEPLOY_PRIME_URL')
    return
  }
  if (!secret) {
    console.error('[job-sync] Missing CRON_SECRET / SYNC_SECRET')
    return
  }

  const target = `${base}/.netlify/functions/job-sync-background`
  const res = await fetch(target, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}` },
  })

  console.log(`[job-sync] kicked background status=${res.status}`)
}

export const config = {
  schedule: '0 6 * * *',
}
