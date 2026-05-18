import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { safetyPillars } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { LegalDisclaimer } from "@/components/legal/legal-disclaimer";
import {
  BadgeCheck,
  ClipboardCheck,
  FileSearch,
  HeartHandshake,
  MessageCircle,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = buildMetadata(
  "Safety & Trust | SafeSobati",
  "How SafeSobati verifies drivers, protects riders, and builds real trust through KYC, SOS support, and local accountability.",
  "/safety"
);

const kycSteps = [
  {
    step: "01",
    title: "Application Submitted",
    desc: "Driver submits registration with personal details, vehicle info, and all required documents.",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Document Review",
    desc: "SafeSobati team reviews Aadhaar, driving licence, RC book, insurance, and commercial permit for validity and authenticity.",
    icon: FileSearch,
  },
  {
    step: "03",
    title: "Background Check",
    desc: "Driver profile is cross-checked against records. Any complaints or flags trigger rejection or escalation.",
    icon: ShieldAlert,
  },
  {
    step: "04",
    title: "KYC Approved",
    desc: "Verified driver receives the SafeSobati KYC badge and becomes visible to riders. Profile goes live only after approval.",
    icon: BadgeCheck,
  },
];

export default function SafetyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          Safety &amp; Trust
        </span>
        <h1 className="font-display mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          How we protect every ride
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Trust is the foundation of SafeSobati. Every driver on our platform goes through a
          structured identity and compliance verification process before they can accept bookings.
          We combine document checks, community accountability, and local support to reduce
          risk in every trip.
        </p>
      </div>

      {/* KYC Verification Process */}
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
          Driver verification process
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kycSteps.map((s) => (
            <div
              key={s.step}
              className="relative rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-900/60"
            >
              <span className="mb-3 inline-block text-3xl font-black leading-none text-orange-100 dark:text-orange-900">
                {s.step}
              </span>
              <s.icon className="-mt-6 mb-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Pillars */}
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
          Platform safety pillars
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {safetyPillars.map((pillar) => (
            <Card key={pillar.title}>
              <div className="mb-3 inline-flex rounded-lg bg-brand/10 p-2 text-brand-dark">
                <pillar.icon size={18} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Two-column: SOS + WhatsApp Sharing */}
      <section className="mb-12 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="mb-3 inline-flex rounded-lg bg-rose-100 p-2 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
            <Phone size={18} />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">SOS &amp; Emergency Support</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Riders and Drivers can trigger an emergency escalation from within the Platform. Our
            support team prioritises safety incidents with immediate human response and priority
            callback protocols.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <li className="flex items-start gap-1.5"><ShieldCheck size={12} className="mt-0.5 shrink-0 text-emerald-500" /> Trip-level logging to support incident investigation</li>
            <li className="flex items-start gap-1.5"><ShieldCheck size={12} className="mt-0.5 shrink-0 text-emerald-500" /> Emergency callback within platform support hours</li>
            <li className="flex items-start gap-1.5"><ShieldCheck size={12} className="mt-0.5 shrink-0 text-emerald-500" /> Repeat offender and fraud account controls</li>
          </ul>
        </Card>

        <Card>
          <div className="mb-3 inline-flex rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <MessageCircle size={18} />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">WhatsApp Ride Sharing</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Share your complete trip details — driver name, vehicle number, and route — directly
            with family or trusted contacts via WhatsApp before your trip begins.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <li className="flex items-start gap-1.5"><ShieldCheck size={12} className="mt-0.5 shrink-0 text-emerald-500" /> One-tap share with contacts from booking screen</li>
            <li className="flex items-start gap-1.5"><ShieldCheck size={12} className="mt-0.5 shrink-0 text-emerald-500" /> Includes verified driver photo and vehicle details</li>
            <li className="flex items-start gap-1.5"><ShieldCheck size={12} className="mt-0.5 shrink-0 text-emerald-500" /> Trip confirmation directly to family on WhatsApp</li>
          </ul>
        </Card>
      </section>

      {/* Women & Family Safety */}
      <section className="mb-12">
        <Card className="border-pink-200 bg-pink-50/60 dark:border-pink-900/30 dark:bg-pink-900/10">
          <div className="flex items-start gap-4">
            <div className="inline-flex rounded-lg bg-pink-100 p-2 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400">
              <Users size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Women &amp; family safety commitment
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                SafeSobati is designed with women and family riders in mind. Every displayed driver
                is identity-verified, profile-reviewed, and carries a KYC badge — so you know
                exactly who is picking you up before you step into the vehicle.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <li className="flex items-start gap-1.5">
                  <ShieldCheck size={12} className="mt-0.5 shrink-0 text-pink-500" />
                  Real driver photos and names visible before booking confirmation
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck size={12} className="mt-0.5 shrink-0 text-pink-500" />
                  WhatsApp trip-share lets you alert family the moment a ride is confirmed
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck size={12} className="mt-0.5 shrink-0 text-pink-500" />
                  Community rating system holds Drivers accountable post-trip
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck size={12} className="mt-0.5 shrink-0 text-pink-500" />
                  Support team accessible via WhatsApp for any ride concern
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Document Checks */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
          Documents we check
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            "Aadhaar Card",
            "Driving Licence",
            "Vehicle RC Book",
            "Commercial Permit",
            "Motor Insurance",
            "PUC Certificate",
          ].map((doc) => (
            <div
              key={doc}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/50 px-3 py-2.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
            >
              <BadgeCheck size={13} className="shrink-0 text-emerald-500" />
              {doc}
            </div>
          ))}
        </div>
      </section>

      {/* Local Support */}
      <section className="mb-12">
        <Card>
          <div className="flex items-start gap-4">
            <div className="inline-flex rounded-lg bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <HeartHandshake size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Local support you can actually reach
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Unlike national aggregators, SafeSobati&rsquo;s support team is built for
                tier-2 and tier-3 India. We understand Nanded, Ardhapur, Parbhani, and the
                routes and communities you travel in. Support is available in Hindi, Marathi,
                and Urdu via WhatsApp.
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Contact support → WhatsApp via Platform &middot; Email: support@safesobati.com
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Legal Disclaimer */}
      <LegalDisclaimer />
    </div>
  );
}
