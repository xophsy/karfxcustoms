"use client";

import { BUSINESS_INFO } from "@/lib/business";
import { useInViewOnce } from "@/lib/useInViewOnce";

// ─────────────────────────────────────────────────────────────────────────────
// DATA — real reviews, lightly trimmed for display. Do not alter text.
// ─────────────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    id: "corey-lowe",
    name: "Corey L.",
    stars: 5,
    service: "Wraps & Styling",
    text: "100% Recommend. I asked Mauricio to wrap the roof, a-pillar, door handles, and mirrors on my '25 Tacoma — and the team did an absolutely amazing job bringing that vision to life. The attention to detail and customer service were outstanding.",
  },
  {
    id: "robert-mcrackan",
    name: "Robert M.",
    stars: 5,
    service: "Paint Restoration",
    text: "I brought in a 10-year-old black Avalon that isn't garaged. They returned a new car. My wife was ready to get rid of it. NOT NOW. They explained their service well and were prompt and courteous. Highly recommend.",
  },
  {
    id: "sean-stafford",
    name: "Sean S., Auto Dealership Sales Manager",
    stars: 5,
    service: "Paint Repair",
    text: "As a sales manager at an auto dealership, I've used many paint repair companies — none compare. Mauricio is honest and does outstanding work. I don't just entrust my own cars to them. I refer my customers too.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// STAR RENDERER
// ─────────────────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
        className="text-gold-500"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW CARD
// ─────────────────────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  index,
  sectionInView,
}: {
  review: (typeof REVIEWS)[number];
  index: number;
  sectionInView: boolean;
}) {
  const delay = 0.12 + index * 0.14;

  return (
    <article
      style={{
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
      className="flex flex-col border border-white/5 bg-surface-800/50 p-6 md:p-7"
      aria-label={`Review by ${review.name}`}
    >
      {/* Decorative open-quote */}
      <div
        className="mb-4 font-display text-5xl font-bold leading-none text-gold-500/30 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Review text */}
      <blockquote className="flex-1 text-sm leading-relaxed text-white/65">
        {review.text}
      </blockquote>

      {/* Divider */}
      <div className="my-5 h-px bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent" />

      {/* Reviewer + stars + tag */}
      <footer>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white leading-snug">
              {review.name}
            </p>
            <div className="mt-1.5">
              <Stars count={review.stars} />
            </div>
          </div>

          {/* Service tag */}
          <span className="shrink-0 border border-white/8 bg-surface-700/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            {review.service}
          </span>
        </div>
      </footer>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────

export default function ReviewsSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.15);

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative overflow-hidden bg-surface-900 px-6 py-20 md:py-24"
      aria-label="Customer reviews"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div
          className="mb-12 md:mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
          }}
        >
          {/* Label */}
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-gold-500/40" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500">
              Customer Reviews
            </span>
          </div>

          {/* Headline + intro row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                The Results Speak
                <br />
                <span className="text-gold-gradient">for Themselves.</span>
              </h2>
              <p className="mt-3 text-sm text-white/55">
                Don&apos;t take our word for it.
              </p>
            </div>

            {/* Proof summary — right-aligned on desktop */}
            <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-1">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs font-medium text-white/40">
                {BUSINESS_INFO.reviewSummary}
              </p>
            </div>
          </div>
        </div>

        {/* ── Review cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {REVIEWS.map((review, i) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>


      </div>
    </section>
  );
}
