"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCategoryBySlug } from "@/lib/services-data";
import { SERVICE_IMAGES } from "@/lib/services-images";
import { SelectedService } from "../QuoteFlow";
import QuoteServiceCard from "../QuoteServiceCard";
import QuoteChip from "../QuoteChip";

type Props = {
  categorySlug: string;
  selectedServices: SelectedService[];
  preselectedServiceSlug?: string;
  onAddService: (service: SelectedService) => void;
  onRemoveService: (slug: string) => void;
  onAddAnother: () => void;
  onDoneAdding: () => void;
};

export default function StepServices({
  categorySlug,
  selectedServices,
  preselectedServiceSlug,
  onAddService,
  onRemoveService,
  onAddAnother,
  onDoneAdding,
}: Props) {
  const cat = getCategoryBySlug(categorySlug);

  // Auto-add preselected service on mount
  useEffect(() => {
    if (!preselectedServiceSlug || !cat) return;
    const svc = cat.services.find((s) => s.slug === preselectedServiceSlug);
    if (!svc) return;
    const alreadyAdded = selectedServices.some(
      (s) => s.serviceSlug === preselectedServiceSlug
    );
    if (!alreadyAdded) {
      onAddService({
        categorySlug: cat.slug,
        categoryName: cat.name,
        serviceSlug: svc.slug,
        serviceName: svc.name,
      });
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!cat) return null;

  const servicesInThisCategory = selectedServices.filter(
    (s) => s.categorySlug === categorySlug
  );
  const totalSelected = selectedServices.length;

  // Column grid based on service count
  const colClass =
    cat.services.length === 1
      ? "grid-cols-1 sm:max-w-xs mx-auto"
      : cat.services.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      {/* ── Back + Heading ─────────────────────────────────────────────── */}
      <div className="mb-7">
        <button
          type="button"
          onClick={onAddAnother}
          className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30 transition-colors duration-200 hover:text-gold-500"
          aria-label="Go back to categories"
        >
          <ArrowLeft size={13} />
          <span>All Categories</span>
        </button>

        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-500/60">
          {cat.name}
        </p>
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Choose your services
        </h2>
        <p className="mt-2 text-sm text-white/40">
          Add as many as you want. You can always remove them before submitting.
        </p>
      </div>

      {/* ── Service cards grid ─────────────────────────────────────────── */}
      <div className={`grid gap-4 ${colClass}`}>
        {cat.services.map((svc, i) => {
          const isAdded = selectedServices.some(
            (s) => s.serviceSlug === svc.slug
          );
          return (
            <QuoteServiceCard
              key={svc.slug}
              service={svc}
              categorySlug={cat.slug}
              isAdded={isAdded}
              index={i}
              onAdd={() =>
                onAddService({
                  categorySlug: cat.slug,
                  categoryName: cat.name,
                  serviceSlug: svc.slug,
                  serviceName: svc.name,
                })
              }
              onRemove={() => onRemoveService(svc.slug)}
            />
          );
        })}
      </div>

      {/* ── Selected services + actions ────────────────────────────────── */}
      <div className="mt-8 space-y-5 border-t border-white/5 pt-7">

        {/* Selected chips for this category */}
        {servicesInThisCategory.length > 0 && (
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
              Added from {cat.name}
            </p>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {servicesInThisCategory.map((s) => (
                  <QuoteChip
                    key={s.serviceSlug}
                    service={s}
                    onRemove={onRemoveService}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Services from other categories */}
        {selectedServices.filter((s) => s.categorySlug !== categorySlug).length > 0 && (
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
              Also in your request
            </p>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {selectedServices
                  .filter((s) => s.categorySlug !== categorySlug)
                  .map((s) => (
                    <QuoteChip
                      key={s.serviceSlug}
                      service={s}
                      onRemove={onRemoveService}
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onAddAnother}
            className="btn-ghost inline-flex items-center justify-center gap-2"
          >
            <span className="text-base leading-none">+</span>
            Add From Another Category
          </button>

          <button
            type="button"
            onClick={onDoneAdding}
            disabled={totalSelected === 0}
            className="btn-gold inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {totalSelected === 0
              ? "Select a Service to Continue"
              : `Done Adding Services`}
            {totalSelected > 0 && <ArrowRight size={14} />}
          </button>
        </div>

        {totalSelected === 0 && (
          <p className="text-center text-xs text-white/25">
            Add at least one service to continue.
          </p>
        )}
      </div>
    </div>
  );
}
