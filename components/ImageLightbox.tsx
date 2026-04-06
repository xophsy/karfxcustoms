"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

export type LightboxImage = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  activeIndex: number | null;
  images: LightboxImage[];
  onClose: () => void;
  onChange: (nextIndex: number) => void;
};

export default function ImageLightbox({
  activeIndex,
  images,
  onClose,
  onChange,
}: ImageLightboxProps) {
  useEffect(() => {
    if (activeIndex === null || images.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images, onChange, onClose]);

  if (activeIndex === null || images.length === 0 || !images[activeIndex]) {
    return null;
  }

  const activeImage = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-6 top-6 z-10 text-white/60 transition hover:text-white"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X size={30} />
      </button>

      <button
        type="button"
        className="absolute left-4 z-10 text-white/40 transition hover:text-white md:left-8"
        onClick={(event) => {
          event.stopPropagation();
          onChange((activeIndex - 1 + images.length) % images.length);
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      <div
        className="relative max-h-[85vh] w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          width={1200}
          height={800}
          className="h-full max-h-[85vh] w-full object-contain"
          priority
        />
      </div>

      <button
        type="button"
        className="absolute right-4 z-10 text-white/40 transition hover:text-white md:right-8"
        onClick={(event) => {
          event.stopPropagation();
          onChange((activeIndex + 1) % images.length);
        }}
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/40">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
