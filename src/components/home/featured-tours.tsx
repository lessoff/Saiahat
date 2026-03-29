import { TourCard } from "@/components/tours/tour-card";
import { FadeIn } from "@/components/motion/fade-in";

interface Tour {
  id: number;
  title: string;
  location: string;
  price: string;
  duration: string;
  difficulty: string;
  images: string[];
  maxGroupSize: number | null;
}

interface FeaturedToursProps {
  tours: Tour[];
}

export function FeaturedTours({ tours }: FeaturedToursProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-sand-900">
              Featured Tours
            </h2>
            <p className="mx-auto max-w-lg text-sand-500">
              Our most popular adventures, handpicked for unforgettable experiences.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
