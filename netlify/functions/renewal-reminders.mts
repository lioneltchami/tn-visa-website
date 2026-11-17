/**
 * Scheduled kick: enqueue renewal-reminders-background.
 * Scheduled functions are capped at ~30s; reminder fan-out can take longer.
 */
export default async () => {
  const base = process.env.URL || process.env.DEPLOY_PRIME_URL
  const secret = process.env.CRON_SECRET || process.env.SYNC_SECRET

  if (!base) {
    console.error('[renewal-reminders] Missing URL / DEPLOY_PRIME_URL')
    return
  }
  if (!secret) {
    console.error('[renewal-reminders] Missing CRON_SECRET / SYNC_SECRET')
    return
  }

  const target = `${base}/.netlify/functions/renewal-reminders-background`
  const res = await fetch(target, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}` },
  })

  console.log(`[renewal-reminders] kicked background status=${res.status}`)
}

export const config = {
  schedule: '15 6 * * *',
}
