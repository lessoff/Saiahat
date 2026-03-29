import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-gradient-to-br from-terracotta-500 to-terracotta-700 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Discover Kazakhstan?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-terracotta-100">
            Join thousands of travelers who have found their perfect adventure.
            Your next story starts here.
          </p>
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-terracotta-600 shadow-lg transition-all hover:bg-sand-50 hover:shadow-xl"
          >
            Browse All Tours
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
