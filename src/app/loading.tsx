// Home page skeleton
export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="relative min-h-[85vh] bg-sand-200 animate-pulse flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-sand-300/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 w-full space-y-4">
          <div className="h-4 w-32 rounded-full bg-sand-300 mx-auto" />
          <div className="h-12 w-3/4 rounded-xl bg-sand-300 mx-auto" />
          <div className="h-12 w-1/2 rounded-xl bg-sand-300 mx-auto" />
          <div className="h-5 w-96 rounded-lg bg-sand-300 mx-auto" />
          <div className="h-12 w-40 rounded-full bg-sand-300 mx-auto mt-4" />
        </div>
      </div>

      {/* Featured tours skeleton */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center space-y-3">
            <div className="h-8 w-56 rounded-lg bg-sand-200 animate-pulse mx-auto" />
            <div className="h-4 w-80 rounded bg-sand-100 animate-pulse mx-auto" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
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
      </div>

      {/* CTA skeleton */}
      <div className="py-20 bg-sand-200 animate-pulse">
        <div className="mx-auto max-w-2xl px-4 text-center space-y-4">
          <div className="h-8 w-64 rounded-lg bg-sand-300 mx-auto" />
          <div className="h-5 w-96 rounded bg-sand-300 mx-auto" />
          <div className="h-12 w-40 rounded-full bg-sand-300 mx-auto" />
        </div>
      </div>
    </div>
  );
}
