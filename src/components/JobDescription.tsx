'use client'

interface JobDescriptionProps {
  text: string
}

export function JobDescription({ text }: JobDescriptionProps) {
  // Split into paragraphs and process each
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {paragraphs.map((paragraph, i) => {
        const trimmed = paragraph.trim()
        
        // Check if it's a list (lines starting with •, -, *, or numbers)
        const lines = trimmed.split('\n')
        const isList = lines.length > 1 && lines.every(line => 
          /^[\s]*[•\-\*\d\.]+[\s]/.test(line) || line.trim() === ''
        )
        
        if (isList) {
          const items = lines
            .map(line => line.replace(/^[\s]*[•\-\*\d\.]+[\s]*/, '').trim())
            .filter(item => item)
          return (
            <ul key={i} className="list-disc pl-6 space-y-1 my-4">
              {items.map((item, j) => (
                <li key={j} className="text-fg-secondary">{item}</li>
              ))}
            </ul>
          )
        }
        
        // Check if it looks like a header (short, ends with colon, or all caps)
        const isHeader = (
          trimmed.length < 60 && 
          (trimmed.endsWith(':') || trimmed === trimmed.toUpperCase()) &&
          !trimmed.includes('.')
        )
        
        if (isHeader) {
          return (
            <h3 key={i} className="font-semibold text-fg mt-6 mb-2">
              {trimmed.replace(/:$/, '')}
            </h3>
          )
        }
        
        // Regular paragraph - preserve single line breaks within
        return (
          <p key={i} className="text-fg-secondary my-3 leading-relaxed">
            {trimmed.split('\n').map((line, j, arr) => (
              <span key={j}>
                {line}
                {j < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}
