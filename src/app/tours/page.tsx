import { Suspense } from "react";
import { getFilteredTours } from "@/lib/queries/tours";
import { TourCard } from "@/components/tours/tour-card";
import { FilterControls } from "@/components/tours/filter-controls";
import { FadeIn } from "@/components/motion/fade-in";

interface ToursPageProps {
  searchParams: Promise<{
    sort?: string;
    q?: string;
    difficulty?: string;
    duration?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const { sort = "popularity", q, difficulty, duration, minPrice, maxPrice } =
    await searchParams;

  let allTours: Awaited<ReturnType<typeof getFilteredTours>> = [];

  try {
    allTours = await getFilteredTours({ sort, q, difficulty, duration, minPrice, maxPrice });
  } catch {
    // DB not connected
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-sand-900">All Tours</h1>
          <p className="text-sand-500">
            Find your perfect adventure across Kazakhstan
          </p>
        </div>
      </FadeIn>

      <div className="mb-6">
        <Suspense fallback={<div className="h-12 animate-pulse rounded-xl bg-sand-100" />}>
          <FilterControls />
        </Suspense>
      </div>

      {allTours.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-sand-400">
            {allTours.length} tour{allTours.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allTours.map((tour) => (
              <TourCard
                key={tour.id}
                id={tour.id}
                title={tour.title}
                location={tour.location}
                price={tour.price}
                duration={tour.duration}
                difficulty={tour.difficulty}
                images={tour.images}
                maxGroupSize={tour.maxGroupSize}
                avgRating={tour.avgRating}
                reviewCount={tour.reviewCount}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-sand-500">No tours match your filters.</p>
          <p className="mt-1 text-sm text-sand-400">
            Try adjusting your search or clearing some filters.
          </p>
        </div>
      )}
    </div>
  );
}
