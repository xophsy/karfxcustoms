"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepCategories from "./steps/StepCategories";
import StepServices from "./steps/StepServices";
import StepContact from "./steps/StepContact";
import StepSuccess from "./steps/StepSuccess";
import QuoteProgress from "./QuoteProgress";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES — shared across all quote components
// ─────────────────────────────────────────────────────────────────────────────

export type SelectedService = {
  categorySlug: string;
  categoryName: string;
  serviceSlug: string;
  serviceName: string;
};

export type ContactInfo = {
  name: string;
  phone: string;
  email: string;
  message?: string;
};

export type QuoteStep = "categories" | "services" | "contact" | "success";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION — direction-aware slide transition between steps
// ─────────────────────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 28,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -28,
    transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  preselectedCategory?: string; // from ?category= query param
  preselectedService?: string;  // from ?service= query param
  ref?: string;                 // from ?ref= (e.g. restorfx)
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function QuoteFlow({
  preselectedCategory,
  preselectedService,
}: Props) {
  // ── Step state ─────────────────────────────────────────────────────────────
  const [step, setStep] = useState<QuoteStep>(() => {
    // If a service is pre-selected, jump to services step
    if (preselectedCategory) return "services";
    return "categories";
  });

  // Track direction for slide animation: 1 = forward, -1 = back
  const direction = useRef<1 | -1>(1);

  // ── Service selection state ────────────────────────────────────────────────
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
    preselectedCategory ?? ""
  );

  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    () => {
      // Pre-populate if ?service= was passed
      // Resolved fully in the step components via data lookup
      return [];
    }
  );

  // ── Contact state ──────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Navigation helpers ────────────────────────────────────────────────────

  function goTo(nextStep: QuoteStep, dir: 1 | -1 = 1) {
    direction.current = dir;
    setStep(nextStep);
  }

  function handleCategorySelect(categorySlug: string) {
    setActiveCategorySlug(categorySlug);
    goTo("services", 1);
  }

  function handleAddService(service: SelectedService) {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.serviceSlug === service.serviceSlug);
      if (exists) return prev;
      return [...prev, service];
    });
  }

  function handleRemoveService(serviceSlug: string) {
    setSelectedServices((prev) =>
      prev.filter((s) => s.serviceSlug !== serviceSlug)
    );
  }

  function handleAddAnother() {
    goTo("categories", -1);
  }

  function handleDoneAdding() {
    goTo("contact", 1);
  }

  function handleBackToServices() {
    goTo("services", -1);
  }

  async function handleSubmit(contact: ContactInfo) {
    setIsSubmitting(true);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedServices,
          contact,
        }),
      });
    } catch {
      // Fail silently — show success regardless so we don't lose leads
    } finally {
      setIsSubmitting(false);
      goTo("success", 1);
    }
  }

  // ── Progress mapping ───────────────────────────────────────────────────────
  const progressStep =
    step === "categories" || step === "services" ? 1 : step === "contact" ? 2 : 3;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-20 md:px-8 lg:px-10">

      {/* Progress indicator — hidden on success */}
      {step !== "success" && (
        <QuoteProgress currentStep={progressStep} />
      )}

      {/* Step container with AnimatePresence */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction.current}>
          {step === "categories" && (
            <motion.div
              key="categories"
              custom={direction.current}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <StepCategories
                onSelectCategory={handleCategorySelect}
                selectedServices={selectedServices}
                onRemoveService={handleRemoveService}
              />
            </motion.div>
          )}

          {step === "services" && (
            <motion.div
              key={`services-${activeCategorySlug}`}
              custom={direction.current}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <StepServices
                categorySlug={activeCategorySlug}
                selectedServices={selectedServices}
                preselectedServiceSlug={preselectedService}
                onAddService={handleAddService}
                onRemoveService={handleRemoveService}
                onAddAnother={handleAddAnother}
                onDoneAdding={handleDoneAdding}
              />
            </motion.div>
          )}

          {step === "contact" && (
            <motion.div
              key="contact"
              custom={direction.current}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <StepContact
                selectedServices={selectedServices}
                onRemoveService={handleRemoveService}
                onAddAnother={handleAddAnother}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              custom={direction.current}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <StepSuccess selectedServices={selectedServices} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
