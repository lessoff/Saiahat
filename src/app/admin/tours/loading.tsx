export default function AdminToursLoading() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-28 rounded-lg bg-sand-200 animate-pulse" />
        <div className="h-9 w-32 rounded-full bg-sand-200 animate-pulse" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
        {/* Table header */}
        <div className="grid grid-cols-4 gap-4 border-b border-sand-100 px-5 py-3">
          {["Tour", "Location", "Price", "Actions"].map((h) => (
            <div key={h} className="h-4 w-16 rounded bg-sand-100 animate-pulse" />
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 border-b border-sand-50 px-5 py-4 last:border-0"
          >
            <div className="h-5 w-36 rounded bg-sand-200 animate-pulse" />
            <div className="h-5 w-24 rounded bg-sand-100 animate-pulse" />
            <div className="h-5 w-20 rounded bg-sand-100 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-7 w-14 rounded-lg bg-sand-100 animate-pulse" />
              <div className="h-7 w-14 rounded-lg bg-sand-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
