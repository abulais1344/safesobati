import type { Metadata } from "next";
import { cityLaunchNote } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "About",
  "Learn about SafeSobati vision, mission and expansion strategy for underserved cities.",
  "/about"
);

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">About SafeSobati</h1>
      <p className="mt-4 text-base text-slate-700 dark:text-slate-200">
        SafeSobati is a trust-first mobility marketplace crafted for India&apos;s tier-2 and tier-3 cities.
        We combine startup-grade product experience with local operational depth to make ride booking
        safer, simpler and more reliable.
      </p>
      <p className="mt-3 text-base text-slate-700 dark:text-slate-200">{cityLaunchNote}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/70 p-5 dark:bg-slate-900/70">
          <p className="text-xl font-semibold">Vision</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Become Bharat&apos;s most trusted local mobility brand.
          </p>
        </div>
        <div className="rounded-2xl bg-white/70 p-5 dark:bg-slate-900/70">
          <p className="text-xl font-semibold">Mission</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Connect riders and verified drivers through transparent and premium experiences.
          </p>
        </div>
        <div className="rounded-2xl bg-white/70 p-5 dark:bg-slate-900/70">
          <p className="text-xl font-semibold">Values</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Safety, trust, local empathy, and operational excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
