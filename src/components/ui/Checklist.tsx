'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface ChecklistProps {
  items: string[];
  title?: string;
}

export function Checklist({ items, title }: ChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>(Array(items.length).fill(false));
  const count = checked.filter(Boolean).length;

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle(i);
    }
  };

  return (
    <div className="card p-6 my-6">
      {title && <h3 className="font-semibold text-fg mb-4">{title}</h3>}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-fg-muted mb-2">
          <span>{count} of {items.length} completed</span>
        </div>
        <div
          className="h-2 rounded-full bg-bg-tertiary overflow-hidden"
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-label={`${count} of ${items.length} items completed`}
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${(count / items.length) * 100}%` }}
          />
        </div>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            role="checkbox"
            aria-checked={checked[i]}
            tabIndex={0}
            onClick={() => toggle(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="flex items-center gap-3 cursor-pointer rounded-md p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div
              aria-hidden="true"
              className={clsx(
                'w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors duration-200 border',
                checked[i] ? 'bg-accent border-accent' : 'border-border'
              )}
            >
              {checked[i] && <Check className="w-3.5 h-3.5 text-accent-fg" />}
            </div>
            <span
              className={clsx(
                'text-sm transition-all duration-200',
                checked[i] ? 'line-through text-fg-muted' : 'text-fg'
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
