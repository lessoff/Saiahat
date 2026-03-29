export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Profile header skeleton */}
      <div className="flex items-center gap-5 mb-8">
        <div className="h-20 w-20 rounded-full bg-sand-200 animate-pulse shrink-0" />
        <div className="space-y-2">
          <div className="h-6 w-40 rounded-lg bg-sand-200 animate-pulse" />
          <div className="h-4 w-56 rounded bg-sand-100 animate-pulse" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-1 border-b border-sand-200 mb-6">
        <div className="h-9 w-36 rounded-t-lg bg-sand-200 animate-pulse" />
        <div className="h-9 w-28 rounded-t-lg bg-sand-100 animate-pulse" />
      </div>

      {/* Booking list skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-sand-200 bg-white p-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="h-5 w-48 rounded bg-sand-200 animate-pulse" />
              <div className="h-4 w-32 rounded bg-sand-100 animate-pulse" />
              <div className="h-3 w-24 rounded bg-sand-100 animate-pulse" />
            </div>
            <div className="h-7 w-20 rounded-full bg-sand-100 animate-pulse shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
