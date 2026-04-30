export default function CompaniesLoading() {
  return (
    <div className="section-padding">
      <div className="container-wide">
        <div className="h-8 w-64 bg-bg-secondary rounded animate-pulse mb-4" />
        <div className="h-4 w-96 bg-bg-secondary rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6 space-y-3">
              <div className="h-5 w-32 bg-bg-secondary rounded animate-pulse" />
              <div className="h-4 w-48 bg-bg-secondary rounded animate-pulse" />
              <div className="h-4 w-full bg-bg-secondary rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
