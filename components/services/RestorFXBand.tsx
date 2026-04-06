import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function RestorFXBand() {
  return (
    <section
      aria-label="RestorFX Partner"
      className="relative border-t border-b border-gold-500/10 bg-surface-800/40 px-6 py-14 md:py-16"
    >
      {/* Subtle left gold accent bar */}
      <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />

      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Left: copy + CTAs ─────────────────────────────────────────── */}
          <div className="flex-1">
            {/* Label */}
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
              Trusted Partner
            </p>

            {/* Heading */}
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Paint Restoration by RestorFX
            </h2>

            {/* Gold divider */}
            <div className="gold-divider my-5" />

            {/* Body copy */}
            <p className="max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
              For paint restoration, we proudly work alongside{" "}
              <span className="text-white/80 font-medium">RestorFX</span> — our
              trusted partner for specialized clearcoat repair and restoration.
              Whether your paint needs correction before a wrap or PPF install, or
              you&apos;re dealing with fading and oxidation, RestorFX delivers
              results that standard detailing can&apos;t match.
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="https://restorfx.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2"
                aria-label="Visit RestorFX website (opens in new tab)"
              >
                Visit RestorFX Website
                <ExternalLink size={13} />
              </a>

              <a
                href="/quote?ref=restorfx"
                className="btn-gold inline-flex items-center gap-2"
                aria-label="Book a RestorFX consultation through KAR FX"
              >
                Book Through KAR FX
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* ── Right: award badge ─────────────────────────────────────────── */}
          <div className="flex shrink-0 flex-col items-center gap-3 lg:items-end">
            <div className="relative h-44 w-36 opacity-90 transition-opacity duration-300 hover:opacity-100">
              <Image
                src="/images/services/partners/restorfx/Tarifa comercial.png"
                alt="Best of Business 2025 — Auto Restoration Service, Raleigh NC"
                fill
                className="object-contain drop-shadow-[0_4px_24px_rgba(212,175,55,0.18)]"
                sizes="144px"
              />
            </div>
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-500/50 lg:text-right">
              Best of Business 2025
              <br />
              <span className="text-white/25 normal-case tracking-normal font-normal">
                BusinessRate · Raleigh, NC
              </span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
