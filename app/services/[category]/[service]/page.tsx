import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  getCategoryBySlug,
  getServiceBySlug,
  getRelatedServices,
} from "@/lib/services-data";
import { getServiceImages } from "@/lib/services-images";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceBreadcrumb from "@/components/services/ServiceBreadcrumb";
import FAQAccordion from "@/components/services/FAQAccordion";
import ServiceGallery from "@/components/services/ServiceGallery";
import ScrollReveal from "@/components/services/ScrollReveal";

// ── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((s) => ({ category: cat.slug, service: s.slug }))
  );
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { category: string; service: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.category, params.service);
  if (!service) return {};
  const images = getServiceImages(params.category, params.service);
  return {
    title: `${service.name} | KAR FX Customs — Raleigh`,
    description: `${service.tagline} Professional ${service.name} installation in Raleigh, NC by KAR FX Customs.`,
    openGraph: images?.hero
      ? { images: [{ url: images.hero, alt: images.heroAlt }] }
      : undefined,
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceDetailPage({
  params,
}: {
  params: { category: string; service: string };
}) {
  const cat = getCategoryBySlug(params.category);
  const service = getServiceBySlug(params.category, params.service);
  if (!cat || !service) notFound();

  const images = getServiceImages(params.category, params.service);
  const relatedServices = getRelatedServices(service.relatedSlugs);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: service.heroGradient }}
        aria-label={service.name}
      >
        {/* Hero image */}
        {images?.hero && (
          <div className="absolute inset-0">
            <Image
              src={images.hero}
              alt={images.heroAlt}
              fill
              className="object-cover opacity-25"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_80%_30%,rgba(212,175,55,0.06),transparent_60%)]" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-16 lg:py-28">
          {/* Breadcrumb */}
          <ServiceBreadcrumb
            crumbs={[
              { label: "Services", href: "/services" },
              { label: cat.name, href: `/services/${cat.slug}` },
              { label: service.name },
            ]}
          />

          {/* B2B badge */}
          {service.isB2B && (
            <span className="mt-5 inline-block border border-gold-500/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-500/70">
              For Business
            </span>
          )}

          {/* Service name */}
          <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {service.name}
          </h1>
          <div className="gold-divider mt-5 mb-5" />

          {/* Tagline */}
          <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base md:text-lg">
            {service.tagline}
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`/quote?category=${params.category}&service=${params.service}`}
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              Get a Free Quote
              <ArrowRight size={14} />
            </a>
            <a href="/contact" className="btn-ghost inline-flex justify-center">
              Ask a Question
            </a>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16">

        {/* ── What is it + Benefits ──────────────────────────────────────── */}
        <ScrollReveal>
          <section
            aria-labelledby="about-heading"
            className="py-14 md:py-20"
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">

              {/* Description */}
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
                  About This Service
                </p>
                <h2
                  id="about-heading"
                  className="font-display text-2xl font-semibold text-white md:text-3xl"
                >
                  What Is {service.name}?
                </h2>
                <div className="gold-divider mt-4 mb-6" />
                <div className="space-y-4">
                  {service.description.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-white/55 md:text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
                  Why It&apos;s Worth It
                </p>
                <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                  What You Get
                </h2>
                <div className="gold-divider mt-4 mb-6" />
                <ul className="space-y-4" role="list">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-gold-500"
                        aria-hidden
                      />
                      <span className="text-sm leading-relaxed text-white/60 md:text-[15px]">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ── Gallery ───────────────────────────────────────────────────── */}
        {images && images.gallery.length > 0 && (
          <section aria-labelledby="gallery-heading" className="py-14 md:py-20">
            <ScrollReveal>
              <div className="mb-8">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
                  Our Work
                </p>
                <h2
                  id="gallery-heading"
                  className="font-display text-2xl font-semibold text-white md:text-3xl"
                >
                  {service.name} Gallery
                </h2>
                <div className="gold-divider mt-4" />
              </div>
            </ScrollReveal>

            <ServiceGallery images={images.gallery} serviceName={service.name} />
          </section>
        )}

        {images && images.gallery.length > 0 && (
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        )}

        {/* ── Process Steps ──────────────────────────────────────────────── */}
        <ScrollReveal>
          <section aria-labelledby="process-heading" className="py-14 md:py-20">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
              What to Expect
            </p>
            <h2
              id="process-heading"
              className="font-display text-2xl font-semibold text-white md:text-3xl"
            >
              The Process
            </h2>
            <div className="gold-divider mt-4 mb-10" />

            {/* Steps — horizontal on desktop, stacked on mobile */}
            <div className="grid gap-px bg-white/5 sm:grid-cols-3">
              {service.steps.map((step, i) => (
                <div key={i} className="relative bg-surface-900 p-7 md:p-9">
                  {/* Step number — large background numeral */}
                  <span className="mb-4 block select-none font-display text-6xl font-semibold leading-none text-white/5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2 font-display text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/45">
                    {step.desc}
                  </p>

                  {/* Arrow connector (desktop only) */}
                  {i < service.steps.length - 1 && (
                    <div
                      className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-gold-500/25 sm:block"
                      aria-hidden
                    >
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        {service.faq.length > 0 && (
          <ScrollReveal>
            <section aria-labelledby="faq-heading" className="py-14 md:py-20">
              <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16 xl:grid-cols-[320px_1fr]">
                {/* Left label column */}
                <div className="shrink-0">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
                    Common Questions
                  </p>
                  <h2
                    id="faq-heading"
                    className="font-display text-2xl font-semibold text-white md:text-3xl"
                  >
                    FAQ
                  </h2>
                  <div className="gold-divider mt-4 mb-4" />
                  <p className="text-sm leading-relaxed text-white/40">
                    Have a question we didn&apos;t answer?{" "}
                    <a
                      href="/contact"
                      className="text-gold-500 underline-offset-2 hover:underline"
                    >
                      Get in touch
                    </a>
                    .
                  </p>
                </div>

                {/* Accordion */}
                <div className="border-t border-white/5">
                  <FAQAccordion items={service.faq} />
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <ScrollReveal>
          <section aria-label="Get a quote" className="py-14 md:py-20">
            <div className="border border-gold-500/10 bg-surface-800/30 px-6 py-10 text-center sm:px-10 md:px-14 md:py-16">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
                Ready to Move Forward?
              </p>
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                Get a Quote for {service.name}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
                Tell us about your vehicle and we&apos;ll get back to you within
                24 hours on weekdays with a detailed quote.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href={`/quote?service=${service.slug}`}
                  className="btn-gold inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Request a Quote
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Related Services ─────────────────────────────────────────────── */}
        {relatedServices.length > 0 && (
          <ScrollReveal>
            <section aria-labelledby="related-heading" className="pb-16 md:pb-24">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
                Explore More
              </p>
              <h2
                id="related-heading"
                className="font-display text-xl font-semibold text-white md:text-2xl"
              >
                You Might Also Be Interested In
              </h2>
              <div className="gold-divider mt-4 mb-8" />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.slice(0, 3).map((related, i) => (
                  <ServiceCard
                    key={related.slug}
                    service={related}
                    categorySlug={related.categorySlug}
                    index={i}
                  />
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/30 transition-colors duration-200 hover:text-gold-500"
                >
                  <span className="rotate-180 inline-block">→</span>
                  All Services
                </a>
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
    </>
  );
}
