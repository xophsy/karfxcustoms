"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  currentStep: 1 | 2 | 3;
};

const STEPS = [
  { n: 1, label: "Services" },
  { n: 2, label: "Your Info" },
];

export default function QuoteProgress({ currentStep }: Props) {
  return (
    <div className="mb-10 flex items-center justify-center gap-0 pt-8 md:mb-12 md:pt-10">
      {STEPS.map((s, i) => {
        const isActive = currentStep >= s.n;
        const isLast = i === STEPS.length - 1;

        return (
          <div key={s.n} className="flex items-center gap-0">
            {/* Step dot + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-400",
                  isActive
                    ? "border-gold-500 bg-gold-500 text-surface-900"
                    : "border-white/15 bg-transparent text-white/25"
                )}
              >
                {isActive && currentStep > s.n ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1.5"
                      stroke="#0a0a0a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  s.n
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300",
                  isActive ? "text-gold-500" : "text-white/25"
                )}
              >
                {s.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="relative mx-3 mb-5 h-px w-16 bg-white/10 sm:w-24">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold-500"
                  initial={{ width: 0 }}
                  animate={{ width: currentStep > s.n ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
