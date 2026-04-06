"use client";

import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/business";
import { useInViewOnce } from "@/lib/useInViewOnce";

export default function FinalCTA() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.2);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden bg-surface-900 section-padding"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[520px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div
        className="relative mx-auto max-w-3xl text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="block h-px w-8 bg-gold-500/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/60">
            Ready To Start
          </span>
          <span className="block h-px w-8 bg-gold-500/40" />
        </div>

        <h2 className="mb-5 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
          Tell us about the vehicle,
          <br />
          and we&apos;ll point you to the right path.
        </h2>

        <p className="mb-10 text-base leading-relaxed text-white/60">
          Want to see more first, or ready to talk through your vehicle? Use
          whichever path is easier.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/quote"
            className="btn-gold"
          >
            Get a Free Quote
          </Link>
          <a
            href={BUSINESS_INFO.phoneHref}
            className="btn-ghost"
          >
            Call {BUSINESS_INFO.phoneDisplay}
          </a>
        </div>

        <p className="mt-6 text-xs text-white/40">
          {BUSINESS_INFO.serviceAreaMessage} | {BUSINESS_INFO.phoneDisplay}
        </p>
      </div>
    </section>
  );
}
