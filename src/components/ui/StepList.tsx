interface StepListProps {
  steps: { title: string; description: string }[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <div className="my-6">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-muted flex items-center justify-center text-white font-bold text-sm shrink-0">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 bg-gradient-to-b from-accent to-accent-muted" />
            )}
          </div>
          <div className="pb-8">
            <p className="font-semibold text-fg">{step.title}</p>
            <p className="text-fg-secondary text-sm mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
