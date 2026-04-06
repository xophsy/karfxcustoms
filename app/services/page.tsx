import type { Metadata } from "next";
import Image from "next/image";
import CategoryGrid from "@/components/services/CategoryGrid";
import ScrollReveal from "@/components/services/ScrollReveal";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { CATEGORY_IMAGES } from "@/lib/services-images";

export const metadata: Metadata = {
  title: "Services | KAR FX Customs — Raleigh Auto Customization",
  description:
    "Explore KAR FX Customs services: Paint Protection Film, Window Tint, Vehicle Wraps, Chrome Delete, Wheel & Caliper Painting, Starlight Headliner, and Detailing in Raleigh, NC.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <section className="px-5 pb-10 pt-16 md:px-8 md:pb-12 md:pt-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-500/70">
              What We Do
            </p>
            <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Our Services
            </h1>
            <div className="gold-divider mt-5 mb-5" />
            <p className="max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
              Choose a category below to explore everything we offer. Not sure
              where to start?{" "}
              <a
                href="/quote"
                className="text-gold-500 underline-offset-2 hover:underline"
              >
                Get a quote
              </a>{" "}
              and we&apos;ll point you in the right direction.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Category Grid ────────────────────────────────────────────────── */}
      <section
        aria-label="Service categories"
        className="px-5 pb-5 md:px-8 lg:px-16"
      >
        {/* Desktop — horizontal accordion */}
        <div className="hidden md:block">
          <CategoryGrid />
        </div>

        {/* Mobile — 2×2 card grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {SERVICE_CATEGORIES.map((cat) => {
            const img = CATEGORY_IMAGES[cat.slug];
            return (
              <a
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className="group relative aspect-square overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                aria-label={`Explore ${cat.name}`}
              >
                {/* Background */}
                <div
                  className="absolute inset-0"
                  style={{ background: cat.gradient }}
                >
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/82" />
                  {/* Bottom gradient for extra text legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-500/80">
                    {cat.tagline}
                  </p>
                  <h2 className="font-display text-sm font-semibold leading-snug text-white sm:text-base">
                    {cat.name}
                  </h2>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="px-5 pb-20 md:px-8 lg:px-16">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl">
            <div className="border border-gold-500/10 bg-surface-800/30 px-6 py-10 text-center md:px-14 md:py-14">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
                Ready to Start?
              </p>
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                Get a Free Quote
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
                Tell us about your vehicle and what you&apos;re looking to do.
                We&apos;ll get back to you within 24 hours on weekdays.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="/quote" className="btn-gold w-full sm:w-auto">
                  Request a Quote
                </a>
                <a href="tel:+19195260818" className="btn-ghost w-full sm:w-auto">
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
