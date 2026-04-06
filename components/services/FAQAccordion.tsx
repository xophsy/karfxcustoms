"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQItem = {
  q: string;
  a: string;
};

type Props = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-white"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold leading-snug text-white/80 transition-colors duration-200 group-hover:text-white">
                {item.q}
              </span>
              <span className="mt-0.5 shrink-0 text-gold-500">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-60 pb-5 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm leading-relaxed text-white/50">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
