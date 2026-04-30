'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <CheckCircle className="w-16 h-16 text-success" />
      <h1 className="text-3xl font-bold text-fg">Thank You!</h1>
      <p className="text-fg-secondary max-w-md">
        Your purchase is complete. A download link has been sent to your email. Check your inbox (and spam folder).
      </p>
      <p className="text-sm text-fg-muted max-w-md">
        If you don&apos;t receive the email within 5 minutes, contact us at hello@tnvisaguide.ca.
      </p>
      <div className="flex gap-3 mt-4">
        <Link href="/products" className="px-5 py-2.5 rounded-full border border-border text-fg-secondary font-medium text-sm hover:bg-bg-secondary">Back to Products</Link>
        <Link href="/" className="px-5 py-2.5 rounded-full gradient-bg text-white font-medium text-sm">Go Home</Link>
      </div>
    </div>
  )
}
