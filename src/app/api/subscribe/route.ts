import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const { email, name, interests } = await req.json()

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error: dbError } = await supabase.from('subscribers').insert({
      email,
      name: name || null,
      interests: interests || [],
    })

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json({ error: 'You are already subscribed!' }, { status: 409 })
      }
      throw dbError
    }

    // Send welcome email if Resend is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'TN Visa Guide <hello@tnvisaguide.ca>',
        to: email,
        subject: 'Welcome to TN Visa Guide \u2014 Here\u2019s your free checklist',
        html: `
          <h2>Welcome to TN Visa Guide!</h2>
          <p>Thanks for subscribing${name ? `, ${name}` : ''}. Here's what you'll get:</p>
          <ul>
            <li>\ud83d\udce2 Policy change alerts (USMCA review, USCIS updates)</li>
            <li>\ud83d\udccb TN visa tips and guides</li>
            <li>\ud83d\udcbc New TN-friendly job postings</li>
          </ul>
          <p><strong>Your free checklist:</strong> Visit <a href="https://tnvisaguide.ca/documents">tnvisaguide.ca/documents</a> for the complete TN visa document checklist.</p>
          <p>\u2014 The TN Visa Guide Team</p>
          <hr />
          <p style="font-size:12px;color:#888;">You're receiving this because you subscribed at tnvisaguide.ca. <a href="https://tnvisaguide.ca/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></p>
        `,
      }).catch(console.error)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
