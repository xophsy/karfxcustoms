"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";
import { ALL_GALLERY_IMAGES } from "@/lib/gallery";
import { useInViewOnce } from "@/lib/useInViewOnce";

const PORTFOLIO_ARCHIVE_BATCH = 18;

type GalleryImage = {
  src: string;
  alt: string;
};

function GalleryItem({
  image,
  index,
  visible,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square overflow-hidden bg-surface-800 text-left focus:outline-none focus:ring-2 focus:ring-gold-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.96)",
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
      />
      <div className="absolute inset-0 bg-gold-500/0 transition-colors duration-300 group-hover:bg-gold-500/10" />
      <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-gold-500/40" />
    </button>
  );
}

export default function PortfolioPage() {
  const [archiveVisibleCount, setArchiveVisibleCount] = useState(
    PORTFOLIO_ARCHIVE_BATCH
  );
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref: archiveRef, inView: archiveVisible } =
    useInViewOnce<HTMLElement>(0.08);

  const archiveImages: GalleryImage[] = ALL_GALLERY_IMAGES.map((src, index) => ({
    src,
    alt: `Completed vehicle work from the KAR FX Customs gallery ${index + 1}`,
  }));

  const shownArchiveImages = archiveImages.slice(0, archiveVisibleCount);
  const hasMoreArchiveImages = archiveVisibleCount < archiveImages.length;

  function openLightbox(images: GalleryImage[], index: number) {
    setLightboxImages(images.map(({ src, alt }) => ({ src, alt })));
    setLightboxIndex(index);
  }

  return (
    <>
      <section className="bg-surface-900 px-6 pb-16 pt-12 md:px-8 lg:px-16">
        <div className="max-w-4xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/70">
            Portfolio
          </p>
          <h1 className="mb-6 font-display text-5xl font-semibold leading-[1.06] text-white md:text-6xl">
            Real jobs,
            <br />
            real vehicles,
            <br />
            and a wider look at the shop.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/60">
            Browse wraps, PPF, tint, detailing, interior work, and the rest of
            the vehicles that have come through the shop. If you already know
            what you want, the next step is a quote.
          </p>
        </div>
      </section>

      <section ref={archiveRef} className="section-padding bg-surface-900">
        <div className="mx-auto max-w-7xl">
          <div
            id="portfolio-grid"
            className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {shownArchiveImages.map((image, index) => (
              <GalleryItem
                key={image.src}
                image={image}
                index={index}
                visible={archiveVisible}
                onClick={() => openLightbox(archiveImages, index)}
              />
            ))}
          </div>

          {/* Load more + count */}
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/40">
              Showing {shownArchiveImages.length} of {archiveImages.length}{" "}
              gallery images.
            </p>
            {hasMoreArchiveImages && (
              <button
                type="button"
                onClick={() =>
                  setArchiveVisibleCount((count) =>
                    Math.min(count + PORTFOLIO_ARCHIVE_BATCH, archiveImages.length)
                  )
                }
                className="btn-ghost gap-2"
              >
                Load More
                <ChevronDown size={15} />
              </button>
            )}
          </div>

          {/* Conversion CTA — shown after browsing the portfolio */}
          <div className="mt-16 border border-gold-500/10 bg-surface-800/30 px-6 py-10 text-center md:px-14 md:py-14">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
              Ready for Your Vehicle?
            </p>
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Let&apos;s talk about your build.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
              Every project in this gallery started with a quote. Tell us what
              you&apos;re looking to do and we&apos;ll get back to you within 24
              hours on weekdays.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/quote" className="btn-gold inline-flex items-center gap-2">
                Get a Free Quote
                <ArrowRight size={14} />
              </Link>
              <Link href="/services" className="btn-ghost">
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ImageLightbox
        activeIndex={lightboxIndex}
        images={lightboxImages}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}
