export default function TourDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="aspect-[16/9] animate-pulse rounded-2xl bg-sand-200" />
          <div className="space-y-3">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-sand-200" />
            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-sand-100" />
            <div className="flex gap-2">
              <div className="h-7 w-20 animate-pulse rounded-full bg-sand-100" />
              <div className="h-7 w-20 animate-pulse rounded-full bg-sand-100" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-4 w-full animate-pulse rounded bg-sand-100" />
              <div className="h-4 w-full animate-pulse rounded bg-sand-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-sand-100" />
            </div>
          </div>
        </div>
        <div className="h-80 animate-pulse rounded-2xl bg-sand-200 lg:sticky lg:top-24" />
      </div>
    </div>
  );
}
