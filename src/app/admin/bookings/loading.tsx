export default function AdminBookingsLoading() {
  return (
    <div>
      <div className="mb-6 h-8 w-36 rounded-lg bg-sand-200 animate-pulse" />

      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 border-b border-sand-100 px-5 py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-16 rounded bg-sand-100 animate-pulse" />
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 border-b border-sand-50 px-5 py-4 last:border-0"
          >
            <div className="h-5 w-28 rounded bg-sand-200 animate-pulse" />
            <div className="h-5 w-32 rounded bg-sand-100 animate-pulse" />
            <div className="h-5 w-20 rounded bg-sand-100 animate-pulse" />
            <div className="h-6 w-20 rounded-full bg-sand-100 animate-pulse" />
            <div className="h-7 w-24 rounded-lg bg-sand-100 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
