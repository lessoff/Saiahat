export const dynamic = "force-dynamic";

import { db } from "@/db";
import { tours } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import { TourCard } from "@/components/tours/tour-card";
import { SortControls } from "@/components/tours/sort-controls";
import { FadeIn } from "@/components/motion/fade-in";

interface ToursPageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const { sort = "popularity" } = await searchParams;

  const orderBy =
    sort === "price-asc"
      ? asc(tours.price)
      : sort === "price-desc"
        ? desc(tours.price)
        : desc(tours.popularityScore);

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
    allTours = await db.select().from(tours).orderBy(orderBy);
  } catch {
    // DB not connected
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-sand-900">
            All Tours
          </h1>
          <p className="text-sand-500">
            Find your perfect adventure across Kazakhstan
          </p>
        </div>
      </FadeIn>

      <div className="mb-6">
        <SortControls />
      </div>

      {allTours.length > 0 ? (
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
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-sand-500">
            No tours available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
