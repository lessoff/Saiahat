import { Sparkles, Users, Gem, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";

const values = [
  {
    icon: Sparkles,
    title: "Handpicked Curations",
    description:
      "We don't do generic. Every route is personally scouted by our local experts to ensure the finest views, hidden valleys, and off-map gems that no travel aggregator will ever show you.",
  },
  {
    icon: Users,
    title: "Cultural Immersion",
    description:
      "Our tours go beyond sightseeing. Expect authentic encounters — from ancient eagle-hunting traditions on the steppe to intimate culinary masterclasses in a local family's home.",
  },
  {
    icon: Gem,
    title: "Seamless Comfort",
    description:
      "We believe adventure and comfort are not opposites. We arrange high-quality transport and handpicked accommodation so that even deep in the wilderness, you feel completely at ease.",
  },
  {
    icon: Leaf,
    title: "Sustainable Footprint",
    description:
      "We are committed to eco-tourism in every sense. Our itineraries protect wildlife corridors, support local economies, and ensure the landscapes we love today remain pristine for tomorrow's explorers.",
  },
];

const stats = [
  { value: "50+", label: "Curated Routes" },
  { value: "12", label: "Regions Covered" },
  { value: "2,000+", label: "Happy Travelers" },
  { value: "5 yrs", label: "Of Expertise" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden bg-sand-900 px-4 text-center">
        {/* Decorative diagonal gradient accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 110%, rgba(224,104,48,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Thin decorative top line */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-terracotta-500 opacity-60"
        />

        <FadeIn delay={0} className="relative z-10 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-300">
            Our Story
          </p>
          <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
            About Saiahat
          </h1>
          <div
            aria-hidden
            className="mx-auto mb-6 h-px w-16 bg-terracotta-500"
          />
          <p className="text-lg leading-relaxed text-sand-300 sm:text-xl">
            Kazakhstan&apos;s beauty is a world-class secret.
            <br className="hidden sm:block" /> We are its keepers.
          </p>
        </FadeIn>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sand-50 to-transparent"
        />
      </section>

      {/* ─── Our Story ────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            {/* Left — decorative year block */}
            <FadeIn direction="right">
              <div className="relative flex items-center justify-center lg:justify-start">
                <span
                  aria-hidden
                  className="select-none text-[160px] font-bold leading-none text-terracotta-100 sm:text-[200px]"
                >
                  2019
                </span>
                <div className="absolute inset-0 flex flex-col items-center justify-center lg:items-start lg:pl-6">
                  <div className="mb-3 h-px w-12 bg-terracotta-400" />
                  <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-500">
                    Founded
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-sand-500">
                    Born in Almaty from a shared love of Kazakhstan&apos;s wild
                    places and a belief that the world deserved to know about them.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Right — story text */}
            <FadeIn direction="left" delay={0.1}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-500">
                How We Began
              </p>
              <h2 className="mb-6 text-3xl font-bold leading-snug text-sand-900 sm:text-4xl">
                A team of explorers with something to share
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-sand-600">
                <p>
                  Saiahat — meaning <em>"travel"</em> in Kazakh — was founded by a
                  small team of local mountaineers, historians, and hospitality
                  professionals who kept returning from their own expeditions with
                  the same thought: why doesn&apos;t the world know this place exists?
                </p>
                <p>
                  Kazakhstan is home to the Tian Shan and Altai mountain ranges,
                  glacial lakes so still they mirror the sky, sweeping grasslands
                  that have carried nomads for millennia, and cities that juxtapose
                  futurist architecture with bazaars unchanged since the Silk Road.
                  It is a country of extraordinary contrasts — and it has been
                  largely overlooked by international travel.
                </p>
                <p>
                  We set out to change that. We curate premium, seamless travel
                  experiences that respect the land, celebrate its people, and
                  deliver genuine wonder — not a sanitised, hotel-lobby version of
                  it. Every route we offer has been walked, driven, or ridden by a
                  member of our team before a single guest sets foot on it.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────── */}
      <div className="border-y border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-sand-200 lg:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="flex flex-col items-center py-10">
                  <span className="text-4xl font-bold text-terracotta-500 sm:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-sand-500">
                    {s.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Our Mission ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-terracotta-600 to-terracotta-800 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-200">
              What Drives Us
            </p>
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-white/30" />
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Our Mission
              </h2>
              <div className="h-px w-12 bg-white/30" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg leading-relaxed text-terracotta-100 sm:text-xl">
              To provide discerning travelers with authentic, safe, and
              breathtaking encounters with Central Asia — from the futuristic
              skylines of Astana and Almaty to the silent canyons and glaciers
              that have stood for millennia. We handle every detail so that you
              can be fully present for every moment.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-terracotta-200">
              We measure success not in bookings filled, but in stories told —
              the traveler who watched a golden eagle hunt at sunrise over the
              Altai, the family that shared a meal in a yurt on the Kazakh
              steppe, the solo adventurer who stood at a mountain pass and felt,
              for a brief and genuine moment, like the first person to ever see it.
              Those stories are why we exist.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Why Travel With Us ───────────────────────────────────── */}
      <section className="bg-sand-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-500">
              The Saiahat Difference
            </p>
            <h2 className="text-3xl font-bold text-sand-900 sm:text-4xl">
              Why travel with us
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={v.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-50">
                      <Icon className="h-5 w-5 text-terracotta-500" />
                    </div>
                    <h3 className="mb-3 text-base font-semibold text-sand-900">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-sand-500">
                      {v.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <FadeIn>
            <div className="mx-auto mb-6 h-px w-16 bg-sand-200" />
            <h2 className="mb-4 text-3xl font-bold text-sand-900 sm:text-4xl">
              Ready to see it for yourself?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-sand-500">
              Browse our curated routes and let us take care of everything else.
              Your journey through Kazakhstan begins with a single click.
            </p>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-terracotta-600 hover:shadow-xl"
            >
              Explore Tours
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
