import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Terms & Conditions",
  "Terms governing use of SafeSobati platform and services.",
  "/terms"
);

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Terms and conditions</h1>
      <div className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-200">
        <p>
          By using SafeSobati, you agree to platform rules for rider and driver conduct, fair usage,
          payment completion and legal compliance under applicable Indian laws.
        </p>
        <p>
          Drivers are independent service providers and must maintain valid documentation at all times.
          SafeSobati may suspend accounts for safety, fraud or policy violations.
        </p>
        <p>
          Booking confirmations are subject to driver acceptance, pricing agreement and operational
          availability in selected areas.
        </p>
      </div>
    </div>
  );
}
