import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="container-wide py-10">
        {/* Link grid — compact, 4 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Guide</p>
            <ul className="space-y-1.5">
              {[
                { href: '/eligibility', label: 'Eligibility' },
                { href: '/professions', label: 'Professions' },
                { href: '/apply', label: 'How to Apply' },
                { href: '/fees', label: 'Fees' },
                { href: '/documents', label: 'Documents' },
                { href: '/faq', label: 'FAQ' },
              ].map(l => <li key={l.href}><Link href={l.href} className="text-sm text-fg-secondary hover:text-accent transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Resources</p>
            <ul className="space-y-1.5">
              {[
                { href: '/renewal', label: 'Renewal' },
                { href: '/taxes', label: 'Taxes' },
                { href: '/green-card', label: 'Green Card' },
                { href: '/moving', label: 'Moving to US' },
                { href: '/compare', label: 'TN vs H-1B' },
                { href: '/glossary', label: 'Glossary' },
              ].map(l => <li key={l.href}><Link href={l.href} className="text-sm text-fg-secondary hover:text-accent transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">Tools</p>
            <ul className="space-y-1.5">
              {[
                { href: '/letter-builder', label: 'Letter Builder' },
                { href: '/jobs', label: 'Job Board' },
                { href: '/companies', label: 'Companies' },
                { href: '/experiences', label: 'Community' },
                { href: '/blog', label: 'Blog' },
                { href: '/products', label: 'Products' },
              ].map(l => <li key={l.href}><Link href={l.href} className="text-sm text-fg-secondary hover:text-accent transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-3">For Employers</p>
            <ul className="space-y-1.5">
              {[
                { href: '/employer-guide', label: 'Sponsorship Guide' },
                { href: '/employer-letter', label: 'Letter Guide' },
                { href: '/post-job', label: 'Post a Job' },
              ].map(l => <li key={l.href}><Link href={l.href} className="text-sm text-fg-secondary hover:text-accent transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
        </div>

        {/* Legal — compact */}
        <div className="pt-6 border-t border-border text-xs text-fg-muted space-y-2">
          <p>This website provides general information about TN visas for educational purposes only. It is not legal advice. Consult a qualified immigration attorney for your situation. Some links are affiliate links. <Link href="/disclosure" className="underline hover:text-fg-secondary">Disclosure</Link></p>
          <p>© {new Date().getFullYear()} TN Visa Guide · Built in Canada 🇨🇦 · <a href="https://www.uscis.gov" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary">uscis.gov</a> · <a href="https://www.cbp.gov" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary">cbp.gov</a> · <a href="https://ustr.gov" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary">ustr.gov</a></p>
        </div>
      </div>
    </footer>
  )
}
