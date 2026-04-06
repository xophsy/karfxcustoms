"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { CATEGORY_IMAGES } from "@/lib/services-images";

function ServicePanel({
  slug,
  name,
  tagline,
  gradient,
  services,
  imgSrc,
  imgAlt,
  isExpanded,
  onHover,
  onLeave,
}: {
  slug: string;
  name: string;
  tagline: string;
  gradient: string;
  services: { name: string }[];
  imgSrc?: string;
  imgAlt?: string;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.a
      href={`/services/${slug}`}
      className="relative h-full overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      animate={{ flexGrow: isExpanded ? 3 : 1 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-label={`Explore ${name}`}
    >
      {/* ── Background image ──────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: gradient }}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={imgAlt ?? name}
            fill
            className="object-cover"
            sizes="60vw"
          />
        )}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: isExpanded ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.70)" }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* ── Collapsed — vertical name ──────────────────────────────────────── */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <h2
            className="font-display text-xl font-semibold tracking-widest text-white/70 select-none"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {name}
          </h2>
        </motion.div>
      )}

      {/* ── Expanded — full content ────────────────────────────────────────── */}
      {isExpanded && (
        <>
          {/* Left-edge scrim — gives text a dark backing without affecting the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none" />
        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-10 md:px-12 [filter:drop-shadow(0_1px_6px_rgba(0,0,0,0.9))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.18 }}
        >
          {/* Tagline */}
          <motion.p
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 0 12px rgba(0,0,0,0.9)" }}
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {tagline}
          </motion.p>

          {/* Category name */}
          <motion.h2
            className="font-display text-4xl font-semibold text-white mb-5 md:text-5xl"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)" }}
            initial={{ x: -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            {name}
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            className="mb-6 h-[1px] w-10 bg-gradient-to-r from-gold-500 to-gold-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35, delay: 0.38, ease: "easeOut" }}
            style={{ originX: 0 }}
          />

          {/* Sub-services */}
          <motion.div
            className="mb-8 space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.09, delayChildren: 0.42 },
              },
            }}
          >
            {services.map((s) => (
              <motion.div
                key={s.name}
                className="flex items-center gap-3"
                variants={{
                  hidden: { x: -20, opacity: 0 },
                  visible: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
                }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                <span className="text-xl text-white">{s.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA button — gold fill slides in on hover, text turns dark */}
          <motion.div
            className="w-fit"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.65 }}
          >
            <motion.span
              className="group relative inline-flex items-center gap-2 overflow-hidden border-2 border-gold-500 px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
              whileHover="hovered"
            >
              <motion.span
                className="absolute inset-0 z-0 bg-gold-500"
                variants={{ hovered: { x: 0 }, initial: { x: "-100%" } }}
                initial="initial"
                transition={{ duration: 0.28, ease: "easeInOut" }}
              />
              <motion.span
                className="relative z-10 flex items-center gap-2"
                variants={{ hovered: { color: "#0a0a0a" }, initial: { color: "#ffffff" } }}
                initial="initial"
              >
                Explore Services
                <ChevronRight size={18} />
              </motion.span>
            </motion.span>
          </motion.div>
        </motion.div>
        </>
      )}
    </motion.a>
  );
}

export default function CategoryGrid() {
  const [expanded, setExpanded] = useState<string>(SERVICE_CATEGORIES[0].slug);

  return (
    <div
      className="mx-auto flex max-w-7xl border border-white/5 overflow-hidden"
      style={{ height: 560 }}
    >
      {SERVICE_CATEGORIES.map((cat) => {
        const img = CATEGORY_IMAGES[cat.slug];
        return (
          <ServicePanel
            key={cat.slug}
            slug={cat.slug}
            name={cat.name}
            tagline={cat.tagline}
            gradient={cat.gradient}
            services={cat.services}
            imgSrc={img?.src}
            imgAlt={img?.alt}
            isExpanded={expanded === cat.slug}
            onHover={() => setExpanded(cat.slug)}
            onLeave={() => setExpanded(cat.slug)} // keep last hovered open, don't collapse
          />
        );
      })}
    </div>
  );
}
