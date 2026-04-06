import type { Metadata } from "next";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";
import ReviewsSection from "@/components/ReviewsSection";
import RestorFXBand from "@/components/services/RestorFXBand";
import TrustStrip from "@/components/TrustStrip";
import WorkShowcase from "@/components/WorkShowcase";

export const metadata: Metadata = {
  title: "KAR FX Customs | PPF, Wraps, Tint & Detailing in Raleigh, NC",
  description:
    "Raleigh's go-to shop for paint protection film, vehicle wraps, window tint, ceramic coating, and detailing. 5.0 Google rating. Appointment-based at 3215 Wellington Ct, Raleigh NC.",
  alternates: { canonical: "https://karfxcustoms.com" },
  openGraph: {
    title: "KAR FX Customs | Vehicle Protection & Styling in Raleigh, NC",
    description:
      "PPF, wraps, tint, ceramic coating, detailing, and RestorFX paint restoration. Raleigh-based. 5.0 stars from 69 reviews.",
    url: "https://karfxcustoms.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WorkShowcase />
      <ReviewsSection />
      <RestorFXBand />
      <FinalCTA />
    </>
  );
}
