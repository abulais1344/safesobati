import type { Metadata } from "next";
import { BookingShell } from "./_booking-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Book Ride",
  "Request ride quotes and complete booking with secure and transparent flow.",
  "/booking"
);

export default function BookingPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-8">
      <div className="lg:col-span-3">
        <BookingShell />
      </div>

      <div className="hidden lg:col-span-2 lg:block">
        <div className="space-y-3 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface)] p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Why SafeSobati {/* TODO: add to i18n */}
          </p>
          {[
            "Every driver is KYC-verified before listing.",
            "Real photos, ratings, and response times.",
            "Cash payment directly to driver — no hidden fees.",
            "WhatsApp confirmation for every booking.",
          ].map((point) => (
            <div key={point} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="mt-0.5 text-brand">✓</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
