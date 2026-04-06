"use client";

import Link from "next/link";
import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-surface-900 text-white">
        <div className="min-h-screen px-6 py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/90">
              Temporary Issue
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              The site needs a quick reset.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
              This is the full-app fallback, so the safest move is to retry once
              or jump back to the homepage.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="btn-gold"
              >
                Reload App
              </button>
              <Link
                href="/"
                className="btn-ghost"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
