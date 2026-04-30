import Link from 'next/link'

const navLinks = [
  { href: '/eligibility', label: 'Eligibility' },
  { href: '/professions', label: 'Professions' },
  { href: '/apply', label: 'Apply' },
  { href: '/documents', label: 'Documents' },
  { href: '/fees', label: 'Fees' },
  { href: '/taxes', label: 'Taxes' },
  { href: '/moving', label: 'Moving' },
  { href: '/compare', label: 'TN vs H-1B' },
]

const resourceLinks = [
  { href: '/renewal', label: 'Renewal' },
  { href: '/dependents', label: 'Dependents' },
  { href: '/employers', label: 'Employers' },
  { href: '/green-card', label: 'Green Card' },
  { href: '/mistakes', label: 'Common Mistakes' },
  { href: '/companies', label: 'TN-Friendly Companies' },
  { href: '/changes', label: 'Policy Updates' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-fg mb-3 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-fg mb-3 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-fg mb-3 text-sm uppercase tracking-wider">Legal</h3>
            <p className="text-sm text-fg-muted mb-3">
              <strong>Disclaimer:</strong> This website provides general information about TN visas for educational purposes only. It is not legal advice and does not create an attorney-client relationship. Immigration laws change frequently. Consult a qualified immigration attorney for advice specific to your situation.
            </p>
            <p className="text-sm text-fg-muted mb-3">
              <strong>Sources:</strong> Information is based on the USCIS Policy Manual, CBP guidelines, USMCA Chapter 16, and official government publications.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <a href="https://www.uscis.gov" target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-accent">uscis.gov</a>
              <span className="text-fg-muted">·</span>
              <a href="https://www.cbp.gov" target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-accent">cbp.gov</a>
              <span className="text-fg-muted">·</span>
              <a href="https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement" target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-accent">ustr.gov</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center space-y-1">
          <p className="text-xs text-fg-muted">Some links on this site are affiliate links. We may earn a commission at no extra cost to you.</p>
          <p className="text-xs text-fg-muted">© {new Date().getFullYear()} TN Visa Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
