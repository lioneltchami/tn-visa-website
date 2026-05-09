import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ChatAssistant from '@/components/tools/ChatAssistant'
import BackToTop from '@/components/ui/BackToTop'
import InstallPrompt from '@/components/ui/InstallPrompt'
import { WebsiteSchema, OrganizationSchema } from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://tnvisaguide.ca'),
  title: { default: 'TN Visa Guide for Canadians | 2026', template: '%s | TN Visa Guide' },
  description: 'The definitive guide for Canadian professionals seeking TN visa status in the United States under USMCA.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'TN Visa Guide',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://tnvisaguide.ca', languages: { 'en-CA': 'https://tnvisaguide.ca' } },
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
        <meta name="theme-color" content="#6366f1" />
        <script defer data-domain="tnvisaguide.ca" src="https://plausible.io/js/script.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-bg text-fg`}>
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <InstallPrompt />
        <BackToTop />
        <ChatAssistant />
      </body>
    </html>
  )
}
