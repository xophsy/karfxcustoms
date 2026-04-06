"use client";

import { Clock3, MapPin, Star } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/business";

const items = [
  {
    icon: Star,
    value: BUSINESS_INFO.reviewRating,
    label: "Google Rating",
    sub: `From ${BUSINESS_INFO.reviewCount} reviews`,
  },
  {
    icon: Clock3,
    value: "24 Hours",
    label: "Quote Response",
    sub: "Weekday goal for new requests",
  },
  {
    icon: MapPin,
    value: "Raleigh, NC",
    label: "Local Shop",
    sub: BUSINESS_INFO.appointmentNote,
  },
];

export default function TrustStrip() {
  return (
    <section
      className="border-y border-white/5 bg-surface-800 px-6 py-5"
      aria-label="Trust indicators"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 md:px-7 first:pl-0 last:pr-0"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-gold-500/20 bg-gold-500/5">
                  <Icon
                    size={18}
                    className="shrink-0 text-gold-500/70"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <span className="font-display text-lg font-bold leading-none text-white">
                      {item.value}
                    </span>
                    <span className="text-xs text-white/40">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/40">
                    {item.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
