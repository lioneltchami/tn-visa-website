import clsx from 'clsx';

interface ComparisonTableProps {
  headers: string[];
  rows: { label: string; values: string[] }[];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="card overflow-hidden my-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={clsx(
                    'p-4 text-left font-semibold uppercase tracking-wide text-fg-secondary',
                    i === 0 && 'sticky left-0 bg-bg-secondary z-10'
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={clsx(
                  'border-b border-border',
                  i % 2 === 0 ? 'bg-bg' : 'bg-bg-secondary/50'
                )}
              >
                <td className="p-4 font-medium text-fg sticky left-0 bg-inherit z-10">
                  {row.label}
                </td>
                {row.values.map((val, j) => (
                  <td key={j} className="p-4 text-fg-secondary">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
