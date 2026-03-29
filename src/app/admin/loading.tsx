export default function AdminLoading() {
  return (
    <div>
      <div className="mb-6 h-8 w-36 rounded-lg bg-sand-200 animate-pulse" />

      {/* Stats grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-sand-100 animate-pulse shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 rounded bg-sand-100 animate-pulse" />
                <div className="h-7 w-12 rounded bg-sand-200 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
