/**
 * Renewal Reminder Script
 * Run daily via cron: npx tsx scripts/send-renewal-reminders.ts
 * Or deploy as a Supabase Edge Function
 */
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY!)

const REMINDERS = [
  { days: 90, subject: 'Your TN visa expires in 3 months', urgency: 'low' },
  { days: 60, subject: '2 months until your TN visa expires', urgency: 'medium' },
  { days: 30, subject: 'Urgent: Your TN visa expires in 30 days', urgency: 'high' },
] as const

async function main() {
  for (const reminder of REMINDERS) {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + reminder.days)
    const dateStr = targetDate.toISOString().split('T')[0]

    // Find statuses expiring on exactly this date
    const { data: statuses } = await supabase
      .from('tn_status')
      .select('*, profiles!inner(email, full_name)')
      .eq('end_date', dateStr)
      .eq('status', 'active')

    if (!statuses?.length) continue

    for (const s of statuses) {
      const profile = (s as { profiles: { email: string; full_name: string } }).profiles
      console.log(`Sending ${reminder.days}-day reminder to ${profile.email}`)

      await resend.emails.send({
        from: 'TN Visa Guide <hello@tnvisaguide.ca>',
        to: profile.email,
        subject: `${reminder.subject} \u2014 ${s.employer}`,
        html: `
          <h2>${reminder.subject}</h2>
          <p>Hi ${profile.full_name.split(' ')[0]},</p>
          <p>Your TN visa with <strong>${s.employer}</strong> as <strong>${s.profession}</strong> expires on <strong>${s.end_date}</strong>.</p>
          ${reminder.urgency === 'high' ? '<p style="color:red;"><strong>This is urgent. Start your renewal process now.</strong></p>' : ''}
          <p><a href="https://tnvisaguide.ca/renewal">View our renewal guide \u2192</a></p>
          <p><a href="https://tnvisaguide.ca/status">Check your status dashboard \u2192</a></p>
          <hr />
          <p style="font-size:12px;color:#888;">You're receiving this because you track your TN status on tnvisaguide.ca.</p>
        `,
      }).catch(err => console.error(`Failed to send to ${profile.email}:`, err))
    }
  }
  console.log('Done.')
}

main().catch(console.error)
