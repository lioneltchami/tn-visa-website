import type { Metadata } from 'next'
import { Literata, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData'
import ChatAssistant from '@/components/tools/ChatAssistant'
import BackToTop from '@/components/ui/BackToTop'
import InstallPrompt from '@/components/ui/InstallPrompt'

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tnvisaguide.ca'),
  title: {
    default: 'TN Visa Guide for Canadians | 2026',
    template: '%s | TN Visa Guide',
  },
  description:
    'The definitive guide for Canadian professionals seeking TN visa status in the United States under USMCA.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'TN Visa Guide',
  },
  twitter: { card: 'summary_large_image' },
  // Per-page canonicals live on each route via withCanonical() — never set a
  // sitewide homepage canonical here or every URL collapses to `/`.
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteSchema />
        <OrganizationSchema />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#B91C1C" />
        <script defer data-domain="tnvisaguide.ca" src="https://plausible.io/js/script.js" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${literata.variable} ${sourceSans.variable} font-sans antialiased min-h-screen flex flex-col bg-bg text-fg`}
      >
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <InstallPrompt />
        <BackToTop />
        <ChatAssistant />
      </body>
    </html>
  )
}
