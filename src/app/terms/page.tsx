import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildMetadata(
  "Terms & Conditions | SafeSobati",
  "Read the terms and conditions governing use of the SafeSobati marketplace platform and ride facilitation services.",
  "/terms"
);

const EFFECTIVE_DATE = "18 May 2026";
const COMPANY_NAME = "SafeSobati Technologies Pvt. Ltd.";

function Section({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-baseline gap-2 text-base font-semibold text-slate-900 dark:text-white">
        <span className="shrink-0 rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
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

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 border-b border-slate-200 pb-8 dark:border-slate-800">
        <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
          Legal
        </span>
        <h1 className="font-display mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Effective: {EFFECTIVE_DATE} &middot; {COMPANY_NAME}
        </p>
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900 dark:border-amber-800/50 dark:bg-amber-900/15 dark:text-amber-200">
          <strong>Marketplace Platform Notice:</strong> SafeSobati is a technology and booking
          facilitation platform. We connect riders with independent, verified transport providers.
          SafeSobati does not own or operate any vehicles, does not employ drivers, and is not a
          transport service provider. By using SafeSobati you agree to these terms in their entirety.
        </div>
      </div>

      <div className="space-y-9">
        <Section num={1} title="Definitions">
          <p>
            <strong>&ldquo;Platform&rdquo;</strong> refers to the SafeSobati website, mobile
            application, and all related services operated by {COMPANY_NAME}.
          </p>
          <p>
            <strong>&ldquo;Rider&rdquo;</strong> means any person who registers on the Platform to
            request ride quotes or make bookings.
          </p>
          <p>
            <strong>&ldquo;Driver&rdquo;</strong> means an independent transport provider registered
            and verified on the Platform.
          </p>
          <p>
            <strong>&ldquo;Booking&rdquo;</strong> means a confirmed ride agreement between a Rider
            and a Driver, facilitated through the Platform.
          </p>
          <p>
            <strong>&ldquo;Quote&rdquo;</strong> means a fare estimate submitted by a Driver in
            response to a Rider&rsquo;s ride request.
          </p>
        </Section>

        <Section num={2} title="Nature of Platform — Marketplace & Facilitation Model">
          <p>
            SafeSobati operates exclusively as a technology marketplace and booking facilitation
            intermediary. The Platform enables Riders to post ride requests and receive quotes from
            independent Drivers. SafeSobati does not provide transport services directly.
          </p>
          <p>
            All transport services are provided solely by independent Drivers who accept bookings at
            their own discretion. SafeSobati does not guarantee the availability, quality,
            reliability, timeliness, or safety of transport services provided by Drivers.
          </p>
          <p>
            The relationship between SafeSobati and Drivers is that of an independent service
            marketplace. SafeSobati does not exercise operational control over Drivers during trips.
          </p>
        </Section>

        <Section num={3} title="Eligibility & Account Registration">
          <p>
            You must be at least 18 years of age and capable of entering into legally binding
            contracts under Indian law to use this Platform.
          </p>
          <p>
            You agree to provide accurate, current, and complete information at registration. You
            are responsible for maintaining the confidentiality of your credentials and all activity
            under your account.
          </p>
          <p>
            SafeSobati reserves the right to decline registration or terminate any account at its
            sole discretion without prior notice.
          </p>
        </Section>

        <Section num={4} title="Driver Independence & No Employer-Employee Relationship">
          <p>
            Drivers on SafeSobati are independent contractors and self-employed transport providers.
            SafeSobati does not employ, control, direct, supervise, or manage any Driver&rsquo;s
            work, schedule, routes, or conduct during trips.
          </p>
          <p>
            Drivers are solely responsible for complying with all applicable laws related to their
            transport services, including but not limited to traffic regulations, commercial permit
            conditions, motor vehicle insurance requirements, pollution compliance norms, and tax
            obligations under Indian law.
          </p>
          <p>
            Nothing in these Terms shall be construed to create an employment, agency, partnership,
            joint venture, or franchise relationship between SafeSobati and any Driver.
          </p>
        </Section>

        <Section num={5} title="Booking & Quote Process">
          <p>
            Ride requests submitted through the Platform are broadcast to eligible Drivers in the
            selected area. Drivers respond with quotes at their discretion. Bookings are confirmed
            only when both the Rider accepts a Driver&rsquo;s quote and the Driver confirms
            availability.
          </p>
          <p>
            SafeSobati does not guarantee that any ride request will receive a response or that any
            confirmed booking will be completed. Operational availability varies by location and
            time.
          </p>
          <p>
            Riders must verify and confirm all booking details — including pickup location,
            destination, scheduled time, and fare — prior to confirmation.
          </p>
        </Section>

        <Section num={6} title="Quote-Based Pricing Disclaimer">
          <p>
            Fares displayed on the Platform are indicative quotes submitted by individual Drivers
            and are not fixed prices set by SafeSobati. Actual fares may vary based on traffic,
            route changes, waiting time, tolls, parking, or additional services requested during
            the trip.
          </p>
          <p>
            SafeSobati is not responsible for any fare disputes arising between Riders and Drivers.
            Riders must agree the final fare with the Driver directly prior to commencing a trip.
          </p>
        </Section>

        <Section num={7} title="Payment Responsibility">
          <p>
            Payment for completed rides is made directly between the Rider and the Driver in the
            agreed mode (cash, UPI, or other). SafeSobati does not presently process or hold
            payments on behalf of any party unless otherwise clearly indicated at checkout.
          </p>
          <p>
            In the event of a payment dispute, Riders and Drivers should attempt resolution
            directly. SafeSobati may, at its discretion, provide limited mediation but accepts no
            financial liability for payment defaults by either party.
          </p>
        </Section>

        <Section num={8} title="Cancellation Policy">
          <p>
            Riders may cancel a confirmed booking through the Platform or by contacting the Driver
            directly. Cancellation terms may vary by Driver and trip type. Riders acknowledge that
            repeated cancellations may result in account restrictions.
          </p>
          <p>
            Drivers are expected to honour confirmed bookings. Repeated unexplained Driver
            cancellations may result in account warnings, suspension, or removal from the Platform.
          </p>
          <p>
            SafeSobati does not guarantee refunds for cancellations where fees have been paid
            directly to a Driver. Riders should clarify cancellation terms with the Driver at
            the time of booking.
          </p>
        </Section>

        <Section num={9} title="Refund Policy">
          <p>
            As SafeSobati currently facilitates direct payment between Riders and Drivers, refund
            requests must be raised directly with the Driver involved. SafeSobati does not act as a
            payment aggregator or escrow service and hence cannot process refunds on behalf of
            Drivers.
          </p>
          <p>
            If a Driver fails to appear for a confirmed booking, the Rider should contact SafeSobati
            support. SafeSobati will investigate and may initiate appropriate action against the
            Driver, but cannot guarantee monetary recovery.
          </p>
        </Section>

        <Section num={10} title="Rider Conduct Policy">
          <p>
            Riders agree to treat Drivers and all platform participants with courtesy and respect.
            Riders must not engage in abusive, threatening, harassing, or discriminatory behaviour
            during any interaction on or off the Platform.
          </p>
          <p>
            Riders must provide accurate pickup and destination information and must be present at
            the agreed pickup point at the scheduled time. Riders are responsible for ensuring all
            passengers in their booking are aware of and comply with these Terms.
          </p>
        </Section>

        <Section num={11} title="Prohibited Activities">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>Using the Platform for any unlawful purpose or in violation of applicable Indian laws.</li>
            <li>Attempting to defraud Drivers, Riders, or SafeSobati through false information, fake bookings, or payment manipulation.</li>
            <li>Impersonating any person or entity or misrepresenting your affiliation.</li>
            <li>Using automated bots, scrapers, or non-human means to access the Platform.</li>
            <li>Harassing, threatening, or defaming any Driver, Rider, or SafeSobati employee.</li>
            <li>Using SafeSobati branding or platform for unauthorised commercial activities.</li>
            <li>Uploading false, fraudulent, or altered documents during registration or verification.</li>
          </ul>
        </Section>

        <Section num={12} title="Account Suspension & Termination">
          <p>
            SafeSobati reserves the right to suspend, restrict, or permanently terminate any user
            account — Rider or Driver — in the event of a violation of these Terms, fraudulent
            activity, reports of misconduct, non-compliance with verification requirements, or at
            SafeSobati&rsquo;s sole discretion for any other reason it determines to be in the
            interests of platform safety.
          </p>
          <p>
            SafeSobati is not liable for any loss suffered as a result of account suspension
            or termination.
          </p>
        </Section>

        <Section num={13} title="WhatsApp Communication & Consent">
          <p>
            By registering on the Platform and providing your mobile number, you expressly consent
            to receive booking confirmations, driver details, safety alerts, support messages, and
            platform notifications via WhatsApp and SMS from SafeSobati and its authorised service
            providers.
          </p>
          <p>
            You may opt out of non-essential WhatsApp communications by contacting support.
            Critical safety and booking messages may continue to be sent even after opt-out.
          </p>
        </Section>

        <Section num={14} title="Third-Party Services & Communication">
          <p>
            The Platform may integrate with or link to third-party services, including but not
            limited to WhatsApp (Meta), mapping providers, and payment gateways. SafeSobati is not
            responsible for the availability, accuracy, privacy practices, or content of any
            third-party service.
          </p>
          <p>
            Use of third-party services is governed by the respective third party&rsquo;s terms
            and privacy policies.
          </p>
        </Section>

        <Section num={15} title="Platform Availability Disclaimer">
          <p>
            SafeSobati makes no warranty that the Platform will be available without interruption,
            delay, or error at all times. The Platform may undergo maintenance, upgrades, or face
            technical disruptions. SafeSobati is not liable for any loss or inconvenience arising
            from Platform unavailability.
          </p>
        </Section>

        <Section num={16} title="Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable Indian law, SafeSobati&rsquo;s total
            liability in connection with any claim arising from your use of the Platform — whether
            in contract, tort, negligence, or otherwise — shall not exceed{" "}
            <strong>INR 5,000 (five thousand rupees)</strong>.
          </p>
          <p>
            SafeSobati shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages, including loss of profits, data, or goodwill, arising from your
            use of or inability to use the Platform or any ride facilitated through the Platform.
          </p>
          <p>
            SafeSobati is not liable for any injury, death, loss, or damage arising from a trip —
            including accidents, Driver misconduct, or vehicle defects — as these are the sole
            responsibility of the Driver providing the transport service.
          </p>
        </Section>

        <Section num={17} title="Dispute Resolution">
          <p>
            In the event of a dispute between a Rider and a Driver, both parties should first
            attempt informal resolution. Either party may then notify SafeSobati support with
            relevant evidence, and SafeSobati may at its discretion facilitate communication
            or mediation.
          </p>
          <p>
            Disputes between you and SafeSobati shall first be attempted to be resolved through
            written communication to our support email. If unresolved within 30 days, either party
            may seek appropriate legal remedies.
          </p>
        </Section>

        <Section num={18} title="Governing Law & Jurisdiction">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India,
            including the Information Technology Act 2000, Consumer Protection Act 2019, and Motor
            Vehicles Act 1988 as applicable.
          </p>
          <p>
            Any disputes arising from these Terms shall be subject to the exclusive jurisdiction
            of courts in <strong>Nanded, Maharashtra, India</strong>.
          </p>
        </Section>

        <Section num={19} title="Force Majeure">
          <p>
            SafeSobati shall not be held liable for any failure or delay in the performance of its
            obligations due to events beyond its reasonable control, including but not limited to
            acts of God, natural disasters, governmental restrictions, curfews, power outages,
            internet service failures, or nationwide emergencies.
          </p>
        </Section>

        <Section num={20} title="Amendments to Terms">
          <p>
            SafeSobati reserves the right to modify these Terms at any time. Updated Terms will be
            posted on the Platform with a revised effective date. Continued use of the Platform
            following such updates constitutes your acceptance of the revised Terms.
          </p>
          <p>
            It is your responsibility to review these Terms periodically. For material changes, we
            will make reasonable efforts to notify registered users via the Platform or SMS.
          </p>
        </Section>

        <Section num={21} title="Contact & Grievance">
          <p>For queries, complaints, or legal notices regarding these Terms, contact:</p>
          <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/60">
            <p className="font-semibold text-slate-900 dark:text-white">{COMPANY_NAME}</p>
            <p className="mt-1">Email: legal@safesobati.com</p>
            <p>WhatsApp Support: Available via Platform</p>
            <p>Jurisdiction: Nanded, Maharashtra, India</p>
          </div>
        </Section>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-800">
        <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/privacy" className="hover:text-orange-600 dark:hover:text-orange-400">Privacy Policy</Link>
          <Link href="/driver-agreement" className="hover:text-orange-600 dark:hover:text-orange-400">Driver Agreement</Link>
          <Link href="/safety" className="hover:text-orange-600 dark:hover:text-orange-400">Safety &amp; Trust</Link>
          <Link href="/contact" className="hover:text-orange-600 dark:hover:text-orange-400">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
