export default function CommunityLoading() {
  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header skeleton */}
        <div className="mb-8 text-center space-y-3">
          <div className="h-3 w-28 rounded-full bg-sand-200 animate-pulse mx-auto" />
          <div className="h-9 w-48 rounded-lg bg-sand-200 animate-pulse mx-auto" />
          <div className="h-4 w-64 rounded bg-sand-100 animate-pulse mx-auto" />
        </div>

        {/* Create post box skeleton */}
        <div className="mb-6 rounded-2xl border border-sand-200 bg-white p-5 space-y-3">
          <div className="h-3 w-40 rounded-full bg-sand-200 animate-pulse" />
          <div className="h-24 w-full rounded-xl bg-sand-100 animate-pulse" />
          <div className="flex justify-between items-center">
            <div className="h-8 w-36 rounded-lg bg-sand-100 animate-pulse" />
            <div className="h-8 w-16 rounded-full bg-sand-200 animate-pulse" />
          </div>
        </div>

        {/* Post cards skeleton */}
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-sand-200 bg-white p-5 space-y-3">
              {/* Author row */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sand-200 animate-pulse shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-4 w-28 rounded bg-sand-200 animate-pulse" />
                  <div className="h-3 w-16 rounded bg-sand-100 animate-pulse" />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-sand-100 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-sand-100 animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-sand-100 animate-pulse" />
              </div>

              {/* Media (only on some cards) */}
              {i !== 2 && (
                <div className={`grid gap-2 ${i === 0 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {Array.from({ length: i === 0 ? 2 : 1 }).map((_, j) => (
                    <div
                      key={j}
                      className="rounded-xl bg-sand-200 animate-pulse"
                      style={{ height: "180px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
