import type { Metadata } from "next";
import { faqs } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "FAQs",
  "Frequently asked questions for riders, drivers and partners.",
  "/faqs"
);

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Frequently asked questions</h1>
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <summary className="cursor-pointer text-sm font-semibold">{faq.question}</summary>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
