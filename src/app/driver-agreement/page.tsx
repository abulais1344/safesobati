import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildMetadata(
  "Driver Agreement | SafeSobati",
  "Understand your rights and responsibilities as an independent transport provider on the SafeSobati platform.",
  "/driver-agreement"
);

const EFFECTIVE_DATE = "18 May 2026";
const COMPANY_NAME = "SafeSobati Technologies Pvt. Ltd.";

function Section({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-baseline gap-2 text-base font-semibold text-slate-900 dark:text-white">
        <span className="shrink-0 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          {num}
        </span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}

export default function DriverAgreementPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 border-b border-slate-200 pb-8 dark:border-slate-800">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          Driver Agreement
        </span>
        <h1 className="font-display mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Driver Agreement
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Effective: {EFFECTIVE_DATE} &middot; {COMPANY_NAME}
        </p>
        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-relaxed text-blue-900 dark:border-blue-800/50 dark:bg-blue-900/15 dark:text-blue-200">
          <strong>Important:</strong> By registering as a Driver on SafeSobati, you acknowledge
          that you are an <strong>independent transport service provider</strong>, not an employee
          of SafeSobati. This Agreement governs your use of the SafeSobati platform and your
          responsibilities as a registered Driver.
        </div>
      </div>

      <div className="space-y-9">
        <Section num={1} title="Nature of Relationship — Independent Contractor">
          <p>
            You register on SafeSobati as an independent, self-employed transport service provider
            (&ldquo;Driver&rdquo;). SafeSobati acts solely as a technology intermediary and booking
            facilitation service — it does not direct, control, employ, or manage your transport
            activities.
          </p>
          <p>
            No employer-employee, principal-agent, or partnership relationship exists between
            SafeSobati and any Driver. SafeSobati does not set your working hours, routes, or rates
            (except minimum standards where applicable). You are free to accept or decline any
            booking at your own discretion.
          </p>
          <p>
            You are solely responsible for your own tax obligations, provident fund contributions,
            applicable insurance, and all other statutory obligations applicable to self-employed
            individuals under Indian law.
          </p>
        </Section>

        <Section num={2} title="Mandatory Compliance Documents">
          <p>
            As a registered Driver, you must at all times maintain the following valid, current,
            and legally compliant documentation:
          </p>
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              <strong>Commercial / Contract Carriage Permit</strong> appropriate to your vehicle
              category and route under the Motor Vehicles Act, 1988.
            </li>
            <li>
              <strong>Motor Vehicle Insurance</strong> covering commercial/passenger use —
              including third-party liability and own-damage cover as required.
            </li>
            <li>
              <strong>Pollution Under Control (PUC) Certificate</strong> as mandated by relevant
              transport authorities.
            </li>
            <li>
              <strong>Vehicle Registration Certificate (RC)</strong> — valid and current.
            </li>
            <li>
              <strong>Driving Licence</strong> valid for your vehicle category, including any
              transport endorsement required.
            </li>
            <li>
              <strong>Fitness Certificate</strong> where applicable for vehicles over a prescribed
              age.
            </li>
          </ul>
          <p>
            SafeSobati&rsquo;s review of uploaded documents is a platform compliance check only and
            does not constitute legal certification or guarantee of document authenticity. You
            remain fully responsible for the legal validity of all your documents.
          </p>
        </Section>

        <Section num={3} title="SafeSobati's Role as Facilitator Only">
          <p>
            SafeSobati provides a digital platform for Drivers to receive ride requests, submit
            fare quotes, and manage bookings. The Platform does not transport passengers, own
            vehicles, guarantee passenger leads, or set ride fares beyond platform recommendations.
          </p>
          <p>
            SafeSobati is not a party to the transport contract formed between you and a Rider.
            The transport service agreement is solely between you and the Rider.
          </p>
        </Section>

        <Section num={4} title="Driver Payout Terms">
          <p>
            Drivers receive fares directly from Riders in the agreed payment mode (cash, UPI, or
            other). SafeSobati does not currently intermediate payments between Riders and Drivers.
          </p>
          <p>
            Where SafeSobati introduces a platform commission or subscription model, such terms
            will be communicated in advance with a <strong>minimum 14-day notice period</strong>{" "}
            and will require your affirmative acceptance before taking effect.
          </p>
          <p>
            You are responsible for maintaining your own payout records, issuing fare receipts,
            and maintaining trip income accounts for tax compliance under Indian law.
          </p>
        </Section>

        <Section num={5} title="Account Suspension & Deactivation">
          <p>
            SafeSobati reserves the right to suspend, restrict, or permanently deactivate a Driver
            account in the following circumstances:
          </p>
          <ul className="list-disc space-y-1.5 pl-4">
            <li>Submission of fraudulent, altered, or expired documents.</li>
            <li>
              Failure to maintain required legal documents or compliances after a warning
              notice period.
            </li>
            <li>
              Verified complaints of serious misconduct — including harassment, threatening
              behaviour, or endangering passenger safety.
            </li>
            <li>Repeated unexplained cancellations of confirmed bookings.</li>
            <li>
              Violation of any provision of this Agreement or SafeSobati&rsquo;s Platform
              Terms &amp; Conditions.
            </li>
            <li>
              Account fraud, manipulation of ratings, or gaming of booking systems.
            </li>
          </ul>
          <p>
            Where possible, SafeSobati will issue a notice and allow a response period before
            permanent deactivation. In cases of immediate safety risk, suspension may be immediate.
          </p>
        </Section>

        <Section num={6} title="Fraud Prevention">
          <p>
            Drivers must not submit fake bookings, manipulate ratings, provide false trip reports,
            or engage in any activity that defrauds Riders, SafeSobati, or other platform
            participants.
          </p>
          <p>
            Drivers found engaging in fraudulent activity will be permanently deactivated and may
            be reported to relevant law enforcement authorities.
          </p>
        </Section>

        <Section num={7} title="Cancellation Handling">
          <p>
            Once a booking is confirmed, you are expected to complete the trip as agreed unless
            prevented by genuine safety concerns, vehicle breakdown, or emergency. Cancellations
            must be communicated to the Rider immediately with a clear reason.
          </p>
          <p>
            Repeated cancellations without valid reason will result in account warnings.
            Three or more unjustified cancellations within a 30-day period may result in
            temporary suspension.
          </p>
        </Section>

        <Section num={8} title="Driver Conduct Expectations">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              Maintain professional, respectful behaviour with all Riders and platform support
              personnel at all times.
            </li>
            <li>
              Follow all applicable traffic laws, speed limits, and road safety regulations
              during trips.
            </li>
            <li>
              Keep the vehicle clean, roadworthy, and compliant with safety standards at all times.
            </li>
            <li>
              Never operate the vehicle under the influence of alcohol, drugs, or any substance
              that impairs driving ability.
            </li>
            <li>
              Not use a mobile phone while driving, except through a hands-free device.
            </li>
            <li>
              Provide Riders with an accurate fare at the start of the trip and not deviate
              from the agreed quote without prior Rider consent.
            </li>
            <li>
              Not carry additional passengers beyond the booked party without Rider consent.
            </li>
          </ul>
        </Section>

        <Section num={9} title="Rider Safety Responsibilities">
          <p>
            You are responsible for passenger safety during the trip. This includes ensuring
            passengers are safely seated before commencing, following traffic regulations, taking
            safe routes, and promptly addressing any safety concerns raised by Riders during trips.
          </p>
          <p>
            In the event of an accident or emergency, you must immediately ensure Rider safety,
            contact emergency services if required, and notify SafeSobati support as soon as
            possible.
          </p>
        </Section>

        <Section num={10} title="Platform Branding Permission">
          <p>
            SafeSobati grants you a limited, non-exclusive, revocable licence to identify yourself
            as a &ldquo;SafeSobati verified driver&rdquo; to Riders in the context of confirmed
            bookings facilitated through this Platform.
          </p>
          <p>
            You may not use SafeSobati&rsquo;s name, logo, or branding for any other commercial
            purpose, partnership claim, or marketing activity without prior written consent from
            SafeSobati.
          </p>
        </Section>

        <Section num={11} title="Dispute Clause">
          <p>
            Disputes between you and a Rider regarding fares, conduct, or service quality should
            first be raised directly between the parties. Both parties may then escalate to
            SafeSobati support with evidence. SafeSobati may facilitate communication but accepts
            no liability for the outcome of Driver-Rider disputes.
          </p>
          <p>
            Disputes between you and SafeSobati regarding this Agreement shall be governed by the
            laws of India, with jurisdiction in Nanded, Maharashtra.
          </p>
        </Section>

        <Section num={12} title="Amendments">
          <p>
            SafeSobati may update this Driver Agreement from time to time. Updated agreements
            will be posted on the Platform. Continued use of the Platform after the updated
            agreement is posted constitutes acceptance. Material changes will be communicated
            via the Platform or registered phone number with a minimum{" "}
            <strong>7-day advance notice</strong>.
          </p>
        </Section>

        <Section num={13} title="Contact">
          <p>Driver support and compliance queries:</p>
          <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/60">
            <p className="font-semibold text-slate-900 dark:text-white">{COMPANY_NAME}</p>
            <p className="mt-1">Email: hello@safesobati.com</p>
            <p>WhatsApp: +91 84212 22893</p>
            <p>Jurisdiction: Nanded, Maharashtra, India</p>
          </div>
        </Section>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500 dark:text-slate-400">
          <Link
            href="/driver/register"
            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            → Register as a Driver
          </Link>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms &amp; Conditions</Link>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
          <Link href="/safety" className="hover:text-blue-600 dark:hover:text-blue-400">Safety &amp; Trust</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
