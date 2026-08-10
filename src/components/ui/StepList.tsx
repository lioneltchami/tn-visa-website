interface StepListProps {
  steps: { title: string; description: string }[]
}

export function StepList({ steps }: StepListProps) {
  return (
    <ol className="my-6 space-y-6">
      {steps.map((step, i) => (
        <li key={i} className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-4">
          <span className="font-display text-sm font-bold text-accent tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="font-semibold text-fg">{step.title}</p>
            <p className="text-fg-secondary text-sm mt-1">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
