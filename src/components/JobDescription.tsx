'use client'

interface JobDescriptionProps {
  text: string
}

export function JobDescription({ text }: JobDescriptionProps) {
  // Clean up text
  const cleaned = text
    .replace(/\r\n/g, '\n')
    .replace(/•\s*/g, '\n• ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // For short descriptions, just show as clean paragraph(s)
  if (cleaned.length < 600) {
    const paragraphs = cleaned.split(/\n\n+/).filter(Boolean)
    return (
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-fg-secondary leading-relaxed">{p.replace(/\n/g, ' ').trim()}</p>
        ))}
      </div>
    )
  }

  // For longer descriptions, parse structure
  const sections = cleaned.split(/\n\n+/)

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const trimmed = section.trim()
        if (!trimmed) return null

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean)
        
        // Check if section has bullets
        const bulletLines = lines.filter(line => /^[•\-\*]/.test(line))
        const isList = bulletLines.length >= 2

        if (isList) {
          const headerLines: string[] = []
          const listItems: string[] = []
          
          for (const line of lines) {
            if (/^[•\-\*]/.test(line)) {
              listItems.push(line.replace(/^[•\-\*]\s*/, ''))
            } else if (listItems.length === 0) {
              headerLines.push(line)
            }
          }

          return (
            <div key={i}>
              {headerLines.length > 0 && (
                <p className="font-medium text-fg mb-2">{headerLines.join(' ')}</p>
              )}
              <ul className="list-disc pl-5 space-y-1">
                {listItems.map((item, j) => (
                  <li key={j} className="text-fg-secondary">{item}</li>
                ))}
              </ul>
            </div>
          )
        }

        // Check if header (short, title-like)
        if (lines.length === 1 && trimmed.length < 60 && /^[A-Z]/.test(trimmed)) {
          return <h3 key={i} className="font-medium text-fg mt-2">{trimmed.replace(/:$/, '')}</h3>
        }

        // Regular paragraph
        return (
          <p key={i} className="text-fg-secondary leading-relaxed">{lines.join(' ')}</p>
        )
      })}
    </div>
  )
}
