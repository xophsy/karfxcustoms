import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  getCategoryBySlug,
} from "@/lib/services-data";
import { CATEGORY_IMAGES } from "@/lib/services-images";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceAccordion from "@/components/services/ServiceAccordion";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import ScrollReveal from "@/components/services/ScrollReveal";

// ── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return {};
  const serviceNames = cat.services.map((s) => s.name).join(", ");
  return {
    title: `${cat.name} | KAR FX Customs — Raleigh`,
    description: `${cat.tagline} Services include: ${serviceNames}. KAR FX Customs, Raleigh NC.`,
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = getCategoryBySlug(params.category);
  if (!cat) notFound();

  const catImg = CATEGORY_IMAGES[cat.slug];

  // Responsive grid columns by service count
  const cardGridClass =
    cat.services.length === 1
      ? "grid-cols-1 sm:max-w-sm"
      : cat.services.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {/* ── CATEGORY HERO ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: cat.gradient }}
        aria-label={`${cat.name} category`}
      >
        {/* Category background image */}
        {catImg && (
          <div className="absolute inset-0">
            <Image
              src={catImg.src}
              alt={catImg.alt}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-900 to-transparent" />
        <div className="pointer-events-none absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-gold-500/4 blur-3xl" />

        {/* Content — slimmer hero than service detail pages */}
        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20 lg:px-16">
          {/* Breadcrumb */}
          <ServiceBreadcrumb
            crumbs={[
              { label: "Services", href: "/services" },
              { label: cat.name },
            ]}
          />

          {/* Heading */}
          <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {cat.name}
          </h1>
          <div className="gold-divider mt-4 mb-5" />
          <p className="max-w-lg text-sm leading-relaxed text-white/55 md:text-base">
            {cat.description}
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS ──────────────────────────────────────────────── */}
      <section
        aria-label={`${cat.name} services`}
        className="px-5 py-12 md:px-8 md:py-16 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">

          {/* Desktop — horizontal accordion */}
          {cat.services.length > 1 && (
            <div className="hidden md:block">
              <ServiceAccordion services={cat.services} categorySlug={cat.slug} />
            </div>
          )}

          {/* Mobile — card grid (always) + desktop fallback for single service */}
          <div className={`${cat.services.length > 1 ? "md:hidden" : ""} grid gap-5 ${cardGridClass}`}>
            {cat.services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                categorySlug={cat.slug}
                index={i}
              />
            ))}
          </div>

          {/* Recovery CTA — undecided customers */}
          <ScrollReveal delay={0.1}>
            <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white/70">
                  Not sure which{" "}
                  <span className="text-white">{cat.name}</span> option is right
                  for you?
                </p>
                <p className="mt-1 text-xs text-white/35">
                  We&apos;re happy to help you figure out the best fit.
                </p>
              </div>
              <a
                href="/contact"
                className="btn-ghost inline-flex shrink-0 items-center gap-2"
              >
                Ask Us
                <ArrowRight size={13} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Back link ──────────────────────────────────────────────────── */}
      <div className="px-5 pb-14 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/25 transition-colors duration-200 hover:text-gold-500"
          >
            <span className="rotate-180 inline-block">→</span>
            All Services
          </a>
        </div>
      </div>
    </>
  );
}
