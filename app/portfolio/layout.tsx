import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Real Vehicle Work from KAR FX Customs",
  description:
    "Browse wraps, PPF, window tint, ceramic coating, detailing, and interior work completed by KAR FX Customs in Raleigh, NC. 100+ gallery photos from real client vehicles.",
  alternates: { canonical: "https://karfxcustoms.com/portfolio" },
  openGraph: {
    title: "Portfolio | KAR FX Customs — Raleigh Vehicle Wraps & PPF",
    description:
      "Real jobs, real vehicles. Browse completed wraps, PPF, tint, and detailing work from KAR FX Customs in Raleigh, NC.",
    url: "https://karfxcustoms.com/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
