'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0, backgroundColor: '#0a0a0a', color: '#fafafa' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Something went wrong</h1>
          <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error.message || 'An unexpected error occurred.'}</p>
          <button onClick={reset} style={{ padding: '0.5rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #333', background: 'transparent', color: '#fafafa', cursor: 'pointer', fontSize: '0.875rem' }}>Try again</button>
        </div>
      </body>
    </html>
  )
}
