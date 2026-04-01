import { notFound } from "next/navigation";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { getTourById } from "@/lib/queries/tours";
import { getUser } from "@/lib/auth/get-user";
import { PhotoGallery } from "@/components/tours/photo-gallery";
import { TourInfo } from "@/components/tours/tour-info";
import { BookingForm } from "@/components/tours/booking-form";
import { ReviewsSection } from "@/components/tours/reviews-section";
import type { Metadata } from "next";

interface TourDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const allTours = await db.select({ id: tours.id }).from(tours);
  return allTours.map((t) => ({ id: String(t.id) }));
}

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getTourById(parseInt(id));

  if (!result) return { title: "Tour Not Found" };

  return {
    title: `${result.tour.title} — Saiahat`,
    description: result.tour.description.slice(0, 160),
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { id } = await params;
  const tourId = parseInt(id);

  if (isNaN(tourId)) notFound();

  const result = await getTourById(tourId);

  if (!result) notFound();

  const { tour, reviews: tourReviews } = result;

  let currentUser = null;
  try {
    currentUser = await getUser();
  } catch {
    // not logged in
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column: gallery + info + reviews */}
        <div className="space-y-8 lg:col-span-2">
          <PhotoGallery images={tour.images} title={tour.title} />
          <TourInfo
            title={tour.title}
            description={tour.description}
            price={tour.price}
            location={tour.location}
            duration={tour.duration}
            difficulty={tour.difficulty}
            maxGroupSize={tour.maxGroupSize}
          />
          <ReviewsSection
            tourId={tour.id}
            reviews={tourReviews}
            isLoggedIn={!!currentUser}
          />
        </div>

        {/* Right column: booking form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <BookingForm
            tourId={tour.id}
            tourTitle={tour.title}
            isLoggedIn={!!currentUser}
          />
        </div>
      </div>
    </div>
  );
}
