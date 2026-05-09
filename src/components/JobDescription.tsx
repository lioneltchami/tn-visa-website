'use client'

interface JobDescriptionProps {
  text: string
}

export function JobDescription({ text }: JobDescriptionProps) {
  // Normalize bullet points and line breaks
  const normalized = text
    .replace(/\r\n/g, '\n')
    .replace(/•\s*/g, '\n• ')  // Put bullets on new lines
    .replace(/\n{3,}/g, '\n\n') // Max 2 newlines
    .trim()

  // Split into sections
  const sections = normalized.split(/\n\n+/)

  return (
    <div className="space-y-4">
      {sections.map((section, i) => {
        const trimmed = section.trim()
        if (!trimmed) return null

        const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean)
        
        // Check if section is a bullet list
        const bulletLines = lines.filter(line => /^[•\-\*]/.test(line))
        const isList = bulletLines.length > 0 && bulletLines.length >= lines.length * 0.5

        if (isList) {
          // Separate header (if any) from list items
          const headerLines: string[] = []
          const listItems: string[] = []
          
          for (const line of lines) {
            if (/^[•\-\*]/.test(line)) {
              listItems.push(line.replace(/^[•\-\*]\s*/, ''))
            } else if (listItems.length === 0) {
              headerLines.push(line)
            } else {
              // Text after list starts - append to last item
              listItems[listItems.length - 1] += ' ' + line
            }
          }

          return (
            <div key={i}>
              {headerLines.length > 0 && (
                <p className="font-semibold text-fg mb-2">
                  {headerLines.join(' ').replace(/:$/, '')}
                </p>
              )}
              <ul className="list-disc pl-6 space-y-1">
                {listItems.map((item, j) => (
                  <li key={j} className="text-fg-secondary">{item}</li>
                ))}
              </ul>
            </div>
          )
        }

        // Check if it's a header (short, possibly ends with colon)
        const isHeader = (
          lines.length === 1 &&
          trimmed.length < 80 &&
          !trimmed.includes('. ') &&
          (/[A-Z]/.test(trimmed[0]) || trimmed.endsWith(':'))
        )

        if (isHeader) {
          return (
            <h3 key={i} className="font-semibold text-fg mt-2">
              {trimmed.replace(/:$/, '')}
            </h3>
          )
        }

        // Regular paragraph
        return (
          <p key={i} className="text-fg-secondary leading-relaxed">
            {lines.join(' ')}
          </p>
        )
      })}
    </div>
  )
}
