export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { and, asc, desc, gte, ilike, lte, or, eq } from "drizzle-orm";
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

function parseDurationDays(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const { sort = "popularity", q, difficulty, duration, minPrice, maxPrice } =
    await searchParams;

  const orderBy =
    sort === "price-asc"
      ? asc(tours.price)
      : sort === "price-desc"
        ? desc(tours.price)
        : desc(tours.popularityScore);

  const conditions = [];

  if (q) {
    conditions.push(
      or(
        ilike(tours.title, `%${q}%`),
        ilike(tours.location, `%${q}%`)
      )
    );
  }

  if (difficulty && ["easy", "moderate", "hard"].includes(difficulty)) {
    conditions.push(eq(tours.difficulty, difficulty as "easy" | "moderate" | "hard"));
  }

  if (minPrice) {
    conditions.push(gte(tours.price, minPrice));
  }

  if (maxPrice) {
    conditions.push(lte(tours.price, maxPrice));
  }

  let allTours: {
    id: number;
    title: string;
    location: string;
    price: string;
    duration: string;
    difficulty: string;
    images: string[];
    maxGroupSize: number | null;
  }[] = [];

  try {
    const query = db
      .select({
        id: tours.id,
        title: tours.title,
        location: tours.location,
        price: tours.price,
        duration: tours.duration,
        difficulty: tours.difficulty,
        images: tours.images,
        maxGroupSize: tours.maxGroupSize,
      })
      .from(tours)
      .orderBy(orderBy);

    const rows = await (conditions.length > 0
      ? query.where(and(...conditions))
      : query);

    // Duration filter: applied in JS since duration is stored as free text
    if (duration) {
      allTours = rows.filter((tour) => {
        const days = parseDurationDays(tour.duration);
        if (duration === "short") return days >= 1 && days <= 3;
        if (duration === "medium") return days >= 4 && days <= 7;
        if (duration === "long") return days >= 8;
        return true;
      });
    } else {
      allTours = rows;
    }
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
