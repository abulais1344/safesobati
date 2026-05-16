import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Privacy Policy",
  "How SafeSobati handles personal data, security and usage privacy.",
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Privacy policy</h1>
      <div className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-200">
        <p>
          SafeSobati collects only required profile, booking and operational data to deliver and improve
          services. We apply role-based data access and encryption standards for protection.
        </p>
        <p>
          Location and trip data are used to match rides, provide support and improve safety workflows.
          We do not sell personal data.
        </p>
        <p>
          Users may request data correction or account deletion by contacting our support team through
          official channels.
        </p>
      </div>
    </div>
  );
}
