import { ReactNode } from 'react';
import { AlertTriangle, Lightbulb, Info, XCircle } from 'lucide-react';
import clsx from 'clsx';

const config = {
  warning: { icon: AlertTriangle, border: 'border-l-warning', text: 'text-warning', bg: 'bg-amber-50/50 dark:bg-amber-950/20' },
  tip: { icon: Lightbulb, border: 'border-l-success', text: 'text-success', bg: 'bg-green-50/50 dark:bg-green-950/20' },
  info: { icon: Info, border: 'border-l-accent', text: 'text-accent', bg: 'bg-blue-50/50 dark:bg-blue-950/20' },
  danger: { icon: XCircle, border: 'border-l-danger', text: 'text-danger', bg: 'bg-red-50/50 dark:bg-red-950/20' },
};

interface CalloutProps {
  type: 'warning' | 'tip' | 'info' | 'danger';
  title?: string;
  children: ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const { icon: Icon, border, text, bg } = config[type];

  return (
    <div className={clsx('rounded-lg border-l-4 p-4 my-6 backdrop-blur-sm', border, bg)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={clsx('w-5 h-5', text)} />
        {title && <span className="font-bold text-fg">{title}</span>}
      </div>
      <div className="text-fg-secondary text-sm">{children}</div>
    </div>
  );
}
