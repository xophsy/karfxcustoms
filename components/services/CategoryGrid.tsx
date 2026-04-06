"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { CATEGORY_IMAGES } from "@/lib/services-images";

const PANEL_NUMBERS = ["01", "02", "03", "04"];

function ServicePanel({
  index,
  slug,
  name,
  tagline,
  gradient,
  services,
  imgSrc,
  imgAlt,
  isExpanded,
  onHover,
}: {
  index: number;
  slug: string;
  name: string;
  tagline: string;
  gradient: string;
  services: { name: string }[];
  imgSrc?: string;
  imgAlt?: string;
  isExpanded: boolean;
  onHover: () => void;
}) {
  return (
    <motion.a
      href={`/services/${slug}`}
      className="relative h-full overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      animate={{ flexGrow: isExpanded ? 3 : 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={onHover}
      aria-label={`Explore ${name}`}
    >
      {/* ── Background ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: gradient }}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={imgAlt ?? name}
            fill
            className="object-cover transition-all duration-1000 ease-out scale-105"
            sizes="60vw"
          />
        )}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: isExpanded ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.65)" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        />
        {/* Bottom-up dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* ── Gold top-edge accent (expanded only) ─────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Panel number ─────────────────────────────────────────────────── */}
      <span className="absolute top-5 left-5 font-display text-[11px] tracking-[0.4em] text-gold-500 select-none">
        {PANEL_NUMBERS[index]}
      </span>

      {/* ── Collapsed — vertical name ────────────────────────────────────── */}
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

      {/* ── Expanded — full content ──────────────────────────────────────── */}
      {isExpanded && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none" />
          <motion.div
            className="absolute inset-0 flex flex-col justify-end px-10 pb-10 md:px-12 md:pb-12 [filter:drop-shadow(0_1px_6px_rgba(0,0,0,0.9))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.18 }}
          >
            {/* Tagline */}
            <motion.p
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-gold-500"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {tagline}
            </motion.p>

            {/* Category name */}
            <motion.h2
              className="font-display text-4xl font-bold leading-[1.08] text-white mb-2 md:text-5xl"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
              initial={{ x: -32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.3 }}
            >
              {name}
            </motion.h2>

            {/* Sub-text (first service as short descriptor) */}
            <motion.p
              className="mb-5 text-sm font-light text-white/50"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {services[0]?.name && `Starting with ${services[0].name}`}
            </motion.p>

            {/* Service pill tags */}
            <motion.div
              className="mb-6 flex flex-wrap gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.42 },
                },
              }}
            >
              {services.map((s) => (
                <motion.span
                  key={s.name}
                  className="font-body text-[10px] font-medium tracking-wider uppercase text-gold-500/70 border border-gold-500/20 bg-gold-500/[0.05] backdrop-blur-sm px-3 py-1.5 rounded-full"
                  variants={{
                    hidden: { y: 10, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
                  }}
                >
                  {s.name}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="group flex items-center gap-2"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.65 }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-500">
                Explore
              </span>
              <ArrowRight
                size={14}
                className="text-gold-500 transition-transform duration-300 group-hover:translate-x-1"
              />
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
      className="mx-auto flex max-w-7xl overflow-hidden border border-white/5"
      style={{ height: 560 }}
    >
      {SERVICE_CATEGORIES.map((cat, i) => {
        const img = CATEGORY_IMAGES[cat.slug];
        return (
          <ServicePanel
            key={cat.slug}
            index={i}
            slug={cat.slug}
            name={cat.name}
            tagline={cat.tagline}
            gradient={cat.gradient}
            services={cat.services}
            imgSrc={img?.src}
            imgAlt={img?.alt}
            isExpanded={expanded === cat.slug}
            onHover={() => setExpanded(cat.slug)}
          />
        );
      })}
    </div>
  );
}
