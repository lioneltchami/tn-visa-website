'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import professions from '@/data/professions.json';

const categories = ['All', 'General', 'Medical', 'Scientist', 'Teacher'] as const;

export default function ProfessionFinder() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = professions.filter(p => {
    const matchesCat = category === 'All' || p.category === category;
    const q = search.toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) ||
      p.commonTitles.some(t => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search professions"
          placeholder="Search professions, job titles..."
          className="w-full rounded border border-border bg-bg pl-12 pr-4 py-3.5 text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={clsx(
              'px-4 py-2 rounded text-sm font-medium transition-colors',
              category === cat
                ? 'gradient-bg text-white shadow-sm'
                : 'bg-bg-secondary text-fg-secondary hover:text-fg hover:bg-bg-tertiary'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <span className="badge" aria-live="polite">{filtered.length} profession{filtered.length !== 1 ? 's' : ''} found</span>

      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
              aria-expanded={expanded === p.id}
              className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Link href={`/professions/${p.slug}`} onClick={e => e.stopPropagation()} className="font-semibold text-fg truncate hover:text-accent transition-colors">{p.name}</Link>
                <span className="badge shrink-0">{p.category}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-fg-muted hidden sm:block">{p.minEducation}</span>
                {expanded === p.id ? <ChevronUp className="w-4 h-4 text-fg-muted" /> : <ChevronDown className="w-4 h-4 text-fg-muted" />}
              </div>
            </button>

            <div className={clsx(
              'transition-all duration-300 ease-in-out',
              expanded === p.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            )}>
              <div className="px-4 pb-4 space-y-3 border-t border-border">
                <div className="pt-3">
                  <p className="text-xs font-medium text-fg-muted uppercase tracking-wide mb-2">Common Job Titles</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.commonTitles.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-bg-secondary text-xs text-fg-secondary">{t}</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-fg-secondary"><span className="font-medium">Min. Education:</span> {p.minEducation}</p>
                {p.altCredentials && <p className="text-sm text-fg-secondary"><span className="font-medium">Alt. Credentials:</span> {p.altCredentials}</p>}
                {p.notes && <p className="text-sm text-fg-muted italic">{p.notes}</p>}
                {p.diplomaAlternative && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] text-sm font-medium">
                    ✓ Diploma + 3yr experience accepted
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
