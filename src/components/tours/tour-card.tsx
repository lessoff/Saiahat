"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface TourCardProps {
  id: number;
  title: string;
  location: string;
  price: string;
  duration: string;
  difficulty: string;
  images: string[];
  maxGroupSize: number | null;
  isFavorited?: boolean;
  isLoggedIn?: boolean;
  onToggleFavorite?: (tourId: number) => void;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export function TourCard({
  id,
  title,
  location,
  price,
  duration,
  difficulty,
  images,
  maxGroupSize,
  isFavorited = false,
  isLoggedIn = false,
  onToggleFavorite,
}: TourCardProps) {
  const [favorited, setFavorited] = useState(isFavorited);

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setFavorited(!favorited);
    onToggleFavorite?.(id);
  }

  const imageUrl = images[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/tours/${id}`}>
        <div className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Difficulty badge */}
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColors[difficulty] || difficultyColors.moderate}`}
            >
              {difficulty}
            </span>

            {/* Heart button */}
            <button
              onClick={handleFavorite}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
            >
              <Heart
                className={`h-4 w-4 ${
                  favorited
                    ? "fill-terracotta-500 text-terracotta-500"
                    : "text-sand-600"
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="mb-1 text-lg font-semibold text-sand-900 line-clamp-1">
              {title}
            </h3>

            <div className="mb-3 flex items-center gap-1 text-sm text-sand-500">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{location}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-sand-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {duration}
              </span>
              {maxGroupSize && (
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  Up to {maxGroupSize}
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline justify-between border-t border-sand-100 pt-3">
              <span className="text-lg font-bold text-terracotta-600">
                {Number(price).toLocaleString()} KZT
              </span>
              <span className="text-xs text-sand-400">per person</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
