import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us | KAR FX Customs — Raleigh",
  description:
    "KAR FX Customs is a Raleigh-based vehicle protection and styling shop built around a team standard of precision, care, and craftsmanship. Learn about Carlos, Mauricio, and the work behind every install.",
};

export default function About() {
  return <AboutPage />;
}
