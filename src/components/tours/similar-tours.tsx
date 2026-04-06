import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Star } from "lucide-react";

type SimilarTour = {
  id: number;
  title: string;
  location: string;
  price: string;
  duration: string;
  difficulty: string;
  images: string[];
  avgRating: number | null;
  reviewCount: number;
};

interface SimilarToursProps {
  tours: SimilarTour[];
  difficulty: string;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export function SimilarTours({ tours, difficulty }: SimilarToursProps) {
  if (tours.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-sand-900">
        Similar Tours{" "}
        <span className="text-sand-400 font-normal text-base">
          — also {difficulty}
        </span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => {
          const imageUrl =
            tour.images[0] ||
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";

          return (
            <Link
              key={tour.id}
              href={`/tours/${tour.id}`}
              className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span
                  className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[tour.difficulty] ?? difficultyColors.moderate}`}
                >
                  {tour.difficulty}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sand-900 text-sm line-clamp-1 mb-1">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-sand-500 mb-1.5">
                  <MapPin size={11} />
                  <span className="line-clamp-1">{tour.location}</span>
                </div>
                {tour.avgRating != null && (
                  <div className="flex items-center gap-1 text-xs mb-1.5">
                    <Star size={11} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sand-800">
                      {tour.avgRating.toFixed(1)}
                    </span>
                    <span className="text-sand-400">({tour.reviewCount})</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-sand-100 pt-2 mt-2">
                  <span className="flex items-center gap-1 text-xs text-sand-400">
                    <Clock size={11} />
                    {tour.duration}
                  </span>
                  <span className="text-sm font-bold text-terracotta-600">
                    {Number(tour.price).toLocaleString()} KZT
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
