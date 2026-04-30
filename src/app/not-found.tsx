import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <p className="text-6xl font-bold gradient-text">404</p>
      <h1 className="text-2xl font-bold text-fg">Page Not Found</h1>
      <p className="text-fg-secondary max-w-md">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <div className="flex gap-3 mt-2">
        <Link href="/" className="px-5 py-2.5 rounded-full gradient-bg text-white font-medium text-sm">Go Home</Link>
        <Link href="/eligibility" className="px-5 py-2.5 rounded-full border border-border text-fg-secondary font-medium text-sm hover:bg-bg-secondary">Check Eligibility</Link>
      </div>
    </div>
  )
}
