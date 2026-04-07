import { TourCard } from "@/components/tours/tour-card";
import { Heart } from "lucide-react";
import Link from "next/link";

interface FavoriteTour {
  id: number;
  title: string;
  location: string;
  price: string;
  duration: string;
  difficulty: string;
  images: string[];
  maxGroupSize: number | null;
}

interface FavoritesListProps {
  tours: FavoriteTour[];
}

export function FavoritesList({ tours }: FavoritesListProps) {
  if (tours.length === 0) {
    return (
      <div className="py-12 text-center">
        <Heart className="mx-auto mb-3 h-10 w-10 text-sand-300" />
        <p className="text-sand-500">No favorite tours yet.</p>
        <Link
          href="/tours"
          className="mt-2 inline-block text-sm font-medium text-terracotta-500 hover:text-terracotta-600"
        >
          Explore tours and heart the ones you love
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
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
          isFavorited
          isLoggedIn
        />
      ))}
    </div>
  );
}
