export default function ToursLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-2 h-8 w-48 animate-pulse rounded-lg bg-sand-200" />
        <div className="h-5 w-72 animate-pulse rounded-lg bg-sand-100" />
      </div>
      <div className="mb-6 h-9 w-80 animate-pulse rounded-full bg-sand-100" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-sand-200 bg-white"
          >
            <div className="aspect-[4/3] animate-pulse bg-sand-200" />
            <div className="p-4 space-y-2">
              <div className="h-5 w-3/4 animate-pulse rounded bg-sand-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-sand-100" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-sand-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
