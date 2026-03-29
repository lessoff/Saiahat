"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/motion/typewriter";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-sand-900">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sand-900/70 via-sand-900/50 to-sand-900/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-300"
        >
          Discover Kazakhstan
        </motion.p>

        <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl whitespace-nowrap">
          <Typewriter
            text="Explore Smarter, Travel Nicer."
            delay={0.8}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-sand-200"
        >
          From the dramatic canyons of the south to the endless steppe,
          discover tours crafted for curious travelers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-terracotta-600 hover:shadow-xl"
          >
            Start Exploring
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sand-50 to-transparent" />
    </section>
  );
}
