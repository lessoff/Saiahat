export default function AboutLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="relative min-h-[65vh] bg-sand-900 flex items-center justify-center">
        <div className="text-center space-y-4 w-full max-w-3xl px-4">
          <div className="h-3 w-20 rounded-full bg-sand-700 animate-pulse mx-auto" />
          <div className="h-14 w-72 rounded-xl bg-sand-700 animate-pulse mx-auto" />
          <div className="h-px w-16 bg-sand-700 mx-auto" />
          <div className="h-5 w-80 rounded bg-sand-700 animate-pulse mx-auto" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sand-50 to-transparent" />
      </div>

      {/* Story section skeleton */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <div className="flex justify-center lg:justify-start">
              <div className="h-48 w-64 rounded-xl bg-sand-100 animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-3 w-24 rounded-full bg-sand-200 animate-pulse" />
              <div className="h-9 w-80 rounded-lg bg-sand-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-sand-100 animate-pulse" />
                <div className="h-4 w-full rounded bg-sand-100 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-sand-100 animate-pulse" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full rounded bg-sand-100 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-sand-100 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="border-y border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-sand-200 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center py-10 gap-2">
                <div className="h-10 w-20 rounded-lg bg-sand-200 animate-pulse" />
                <div className="h-3 w-24 rounded-full bg-sand-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission skeleton */}
      <div className="py-24 bg-terracotta-600">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-4">
          <div className="h-3 w-24 rounded-full bg-terracotta-400 animate-pulse mx-auto" />
          <div className="h-9 w-48 rounded-lg bg-terracotta-400 animate-pulse mx-auto" />
          <div className="space-y-2">
            <div className="h-5 w-full rounded bg-terracotta-400 animate-pulse" />
            <div className="h-5 w-5/6 rounded bg-terracotta-400 animate-pulse mx-auto" />
            <div className="h-5 w-4/5 rounded bg-terracotta-400 animate-pulse mx-auto" />
          </div>
        </div>
      </div>

      {/* Value props skeleton */}
      <div className="py-24 bg-sand-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center space-y-3">
            <div className="h-3 w-32 rounded-full bg-sand-200 animate-pulse mx-auto" />
            <div className="h-8 w-56 rounded-lg bg-sand-200 animate-pulse mx-auto" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-sand-200 bg-white p-6 space-y-3">
                <div className="h-11 w-11 rounded-full bg-sand-100 animate-pulse" />
                <div className="h-5 w-3/4 rounded bg-sand-200 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-3 w-full rounded bg-sand-100 animate-pulse" />
                  <div className="h-3 w-full rounded bg-sand-100 animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-sand-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
