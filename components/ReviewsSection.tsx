"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/business";
import { useInViewOnce } from "@/lib/useInViewOnce";

// ─────────────────────────────────────────────────────────────────────────────
// DATA — real reviews, lightly trimmed for display. Do not alter text.
// ─────────────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    id: "cassey-valerio",
    name: "Cassey V.",
    initials: "CV",
    stars: 5,
    service: "Paint Restoration",
    text: "Carlos done an amazing job on my Rav 4! I wish I would have taken a before and after picture. The difference is night and day! He made my car look like a new car! 10/10",
  },
  {
    id: "paulo",
    name: "Paulo",
    initials: "PA",
    stars: 5,
    service: "Headlight Restoration",
    text: "Carlos did an amazing job restoring my headlights! He is very professional and extremely particular about the small details. My car is 14 years old with 14 years of headlight oxidation. He saved me from having to buy a new pair!",
  },
  {
    id: "toya",
    name: "Toya",
    initials: "T.",
    stars: 5,
    service: "Wraps & Styling",
    text: "My car was serviced here a few months ago and still looks great. The paint on my car was faded pretty badly although I had it repainted about 3 years ago. Carlos took a look at it and recommended a customized package — and my car still looks amazing.",
  },
  {
    id: "kevin-nunez",
    name: "Kevin N.",
    initials: "KN",
    stars: 5,
    service: "Paint Reconditioning",
    text: "We use RestorFX on a weekly basis for all of our vehicles that require deep reconditioning — removing swirls or even deep scratches. Somehow they find a way to remove them without repaint, and as always they come back looking brand new.",
  },
  {
    id: "yesenia-terrell",
    name: "Yesenia T.",
    initials: "YT",
    stars: 5,
    service: "Headlight Restoration",
    text: "I came across RestorFX while searching for a shop that offers headlight restoration, and I'm very glad I did. The service was quick and efficient, and my headlights look brand new when the job was finished. I'm extremely happy with the results.",
  },
  {
    id: "jessica-waters",
    name: "Jessica W.",
    initials: "JW",
    stars: 5,
    service: "Headlight Restoration",
    text: "I attempted many DIY kits as well as a previous local detailing business and none could get the job done. They let me take a look after they were done to make sure they were to my liking. It took under two hours. They are also reasonably priced. I will be back for future needs.",
  },
  {
    id: "daniel-bar",
    name: "Daniel B.",
    initials: "DB",
    stars: 5,
    service: "Paint Detail",
    text: "They did an amazing job on my X3M. The attention to detail was on point! They have a great team and have gained a lifetime customer. 10/10 recommend.",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-gold-500" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────

export default function ReviewsSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.15);
  const [current, setCurrent] = useState(0);
  const paused = useRef(false);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % REVIEWS.length), []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setCurrent((c) => (c + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const review = REVIEWS[current];

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative overflow-hidden bg-surface-800 px-6 py-20 md:py-28"
      aria-label="Customer reviews"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/3 opacity-25"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div
          className="mb-14 flex flex-col items-center text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s",
          }}
        >
          {/* Label with side bars */}
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-px w-8 bg-gold-500/40" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500">
              Customer Reviews
            </span>
            <span className="block h-px w-8 bg-gold-500/40" aria-hidden="true" />
          </div>

          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            What They{" "}
            <em className="text-gold-gradient not-italic font-bold">Say.</em>
          </h2>

          {/* Proof summary */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-xs font-medium text-white/40">
              {BUSINESS_INFO.reviewSummary}
            </p>
          </div>
        </div>

        {/* ── Carousel ─────────────────────────────────────────────────── */}
        <div
          className="relative"
          style={{
            perspective: "1400px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center border border-white/10 bg-surface-900/60 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors duration-200"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next button */}
          <button
            onClick={next}
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center border border-white/10 bg-surface-900/60 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors duration-200"
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>

          {/* Glass card */}
          <article
            key={review.id}
            className="relative overflow-hidden border border-gold-500/10 p-8 md:p-10"
            style={{
              background: "hsla(0,0%,100%,.03)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            aria-label={`Review by ${review.name}`}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => { paused.current = false; }}
          >
            {/* Quote icon */}
            <Quote
              size={36}
              className="mb-6 text-gold-500/20"
              aria-hidden="true"
            />

            {/* Review text */}
            <blockquote className="mb-8 font-display text-xl font-medium italic leading-relaxed text-white/80 md:text-2xl">
              &ldquo;{review.text}&rdquo;
            </blockquote>

            {/* Divider */}
            <div className="mb-6 h-px bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent" />

            {/* Footer */}
            <footer className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Initials avatar */}
                <div
                  className="flex w-12 h-12 shrink-0 items-center justify-center text-sm font-bold text-surface-900 select-none"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #C9A84C 100%)",
                  }}
                  aria-hidden="true"
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug text-white">
                    {review.name}
                  </p>
                  <div className="mt-1">
                    <Stars count={review.stars} />
                  </div>
                </div>
              </div>

              {/* Service tag */}
              <span className="shrink-0 text-xs font-medium tracking-widest uppercase text-gold-500/70">
                {review.service}
              </span>
            </footer>
          </article>

          {/* Mobile nav */}
          <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
            <button
              onClick={prev}
              className="flex w-9 h-9 items-center justify-center border border-white/10 text-white/40 hover:text-white/70 transition-colors duration-200"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="flex w-9 h-9 items-center justify-center border border-white/10 text-white/40 hover:text-white/70 transition-colors duration-200"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Review indicators">
            {REVIEWS.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setCurrent(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to review ${i + 1}`}
                className={`h-[3px] rounded transition-all duration-300 ${
                  i === current ? "w-8 bg-gold-500" : "w-2 bg-white/[0.12] hover:bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
