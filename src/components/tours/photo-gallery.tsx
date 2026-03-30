"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoGalleryProps {
  images: string[];
  title: string;
}

export function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-2xl bg-sand-200 flex items-center justify-center">
        <p className="text-sand-400">No photos available</p>
      </div>
    );
  }

  const [first, ...rest] = images;

  return (
    <>
      <div className="space-y-2">
        {/* First image — full width */}
        <button
          onClick={() => setLightboxIndex(0)}
          className="relative w-full overflow-hidden rounded-2xl aspect-[16/9]"
        >
          <Image
            src={first}
            alt={`${title} photo 1`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="100vw"
            priority
          />
        </button>

        {/* Remaining images — same total width, equal smaller tiles */}
        {rest.length > 0 && (
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${Math.min(rest.length, 4)}, 1fr)` }}
          >
            {rest.map((img, i) => (
              <button
                key={i + 1}
                onClick={() => setLightboxIndex(i + 1)}
                className="relative overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <Image
                  src={img}
                  alt={`${title} photo ${i + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="25vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 text-white/80 hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + images.length) % images.length
                    );
                  }}
                  className="absolute left-4 text-white/80 hover:text-white"
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % images.length);
                  }}
                  className="absolute right-4 text-white/80 hover:text-white"
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </>
            )}

            <div
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`${title} photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
