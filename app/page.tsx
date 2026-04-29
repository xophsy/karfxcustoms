import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";
import ReviewsSection from "@/components/ReviewsSection";
import CategoryGrid from "@/components/services/CategoryGrid";
import ScrollReveal from "@/components/services/ScrollReveal";
import RestorFXBand from "@/components/services/RestorFXBand";
import TrustStrip from "@/components/TrustStrip";
import WorkShowcase from "@/components/WorkShowcase";

export const metadata: Metadata = {
  title: "KAR FX Customs | PPF, Wraps, Tint & Detailing in Raleigh, NC",
  description:
    "PPF, wraps, tint, ceramic coating & detailing in Raleigh, NC. 5.0 stars from 69 reviews. Appointment-based shop — call or text to book.",
  alternates: { canonical: "https://karfxcustoms.com" },
  openGraph: {
    title: "KAR FX Customs | Vehicle Protection & Styling in Raleigh, NC",
    description:
      "PPF, wraps, tint, ceramic coating, detailing, and RestorFX paint restoration. Raleigh-based. 5.0 stars from 69 reviews.",
    url: "https://karfxcustoms.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />

      {/* ── Services Section ─────────────────────────────────────────────── */}
      <section id="services" className="py-10 bg-black md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">
              What We Do
            </p>
            <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">
              Every Service,
              <br />
              <span className="text-gold-gradient italic">Done with Intent.</span>
            </h2>
            <p className="mt-4 text-base text-white/60 max-w-xl mx-auto">
              Every job is deliberate. Every finish is worth protecting.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <CategoryGrid />
          </ScrollReveal>
        </div>
      </section>

      <WorkShowcase />
      <ReviewsSection />
      <RestorFXBand />
      <FinalCTA />
    </>
  );
}
