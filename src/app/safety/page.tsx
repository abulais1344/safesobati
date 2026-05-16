import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { safetyPillars } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Safety & Trust",
  "Understand the safety architecture behind every SafeSobati ride.",
  "/safety"
);

export default function SafetyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Safety and trust architecture</h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
        We treat trust as product infrastructure. SafeSobati combines identity controls,
        operational monitoring and support protocols to reduce risk in every ride.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {safetyPillars.map((pillar) => (
          <Card key={pillar.title}>
            <div className="mb-3 inline-flex rounded-lg bg-brand/10 p-2 text-brand-dark">
              <pillar.icon size={18} />
            </div>
            <h2 className="font-semibold">{pillar.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pillar.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h2 className="font-semibold">Emergency response commitments</h2>
        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-600 dark:text-slate-300">
          <li>Emergency escalation workflows with priority callbacks.</li>
          <li>Trip-level logging support for incident investigation.</li>
          <li>Repeat offender and fraudulent account prevention controls.</li>
        </ul>
      </Card>
    </div>
  );
}
