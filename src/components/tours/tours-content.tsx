"use client";

import { useState } from "react";
import { LayoutGrid, Map } from "lucide-react";
import { TourCard } from "./tour-card";
import { ToursMap } from "./tours-map";
import type { MapTour } from "./leaflet-map";

type Tour = {
  id: number;
  title: string;
  location: string;
  price: string;
  duration: string;
  difficulty: string;
  images: string[];
  maxGroupSize: number | null;
  avgRating: number | null;
  reviewCount: number;
};

interface ToursContentProps {
  tours: Tour[];
}

export function ToursContent({ tours }: ToursContentProps) {
  const [view, setView] = useState<"grid" | "map">("grid");

  const mapTours: MapTour[] = tours.map((t) => ({
    id: t.id,
    title: t.title,
    location: t.location,
    price: t.price,
    difficulty: t.difficulty,
    images: t.images,
  }));

  return (
    <>
      {/* Count + view toggle */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-sand-400">
          {tours.length} tour{tours.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex items-center gap-1 rounded-xl border border-sand-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              view === "grid"
                ? "bg-terracotta-600 text-white"
                : "text-sand-500 hover:text-sand-800"
            }`}
          >
            <LayoutGrid size={13} />
            Grid
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              view === "map"
                ? "bg-terracotta-600 text-white"
                : "text-sand-500 hover:text-sand-800"
            }`}
          >
            <Map size={13} />
            Map
          </button>
        </div>
      </div>

      {view === "grid" ? (
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
              avgRating={tour.avgRating}
              reviewCount={tour.reviewCount}
            />
          ))}
        </div>
      ) : (
        <ToursMap tours={mapTours} />
      )}
    </>
  );
}
