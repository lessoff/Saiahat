export const dynamic = "force-dynamic";

import { db } from "@/db";
import { tours } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Hero } from "@/components/home/hero";
import { FeaturedTours } from "@/components/home/featured-tours";
import { CtaSection } from "@/components/home/cta-section";

export default async function HomePage() {
  let featuredTours: {
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
    featuredTours = await db
      .select()
      .from(tours)
      .orderBy(desc(tours.popularityScore))
      .limit(4);
  } catch {
    // DB not connected — show empty featured section
  }

  return (
    <>
      <Hero />
      {featuredTours.length > 0 && <FeaturedTours tours={featuredTours} />}
      <CtaSection />
    </>
  );
}
