import { getFeaturedTours } from "@/lib/queries/tours";
import { Hero } from "@/components/home/hero";
import { FeaturedTours } from "@/components/home/featured-tours";
import { CtaSection } from "@/components/home/cta-section";

export default async function HomePage() {
  let featuredTours: Awaited<ReturnType<typeof getFeaturedTours>> = [];

  try {
    featuredTours = await getFeaturedTours();
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
