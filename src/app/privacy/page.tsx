import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildMetadata(
  "Privacy Policy | SafeSobati",
  "Learn how SafeSobati collects, uses, and protects your personal data in compliance with Indian privacy standards.",
  "/privacy"
);

const EFFECTIVE_DATE = "18 May 2026";
const COMPANY_NAME = "SafeSobati Technologies Pvt. Ltd.";

function Section({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-baseline gap-2 text-base font-semibold text-slate-900 dark:text-white">
        <span className="shrink-0 rounded-md bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
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

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 border-b border-slate-200 pb-8 dark:border-slate-800">
        <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
          Privacy
        </span>
        <h1 className="font-display mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Effective: {EFFECTIVE_DATE} &middot; {COMPANY_NAME}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          SafeSobati is committed to protecting your personal data. This policy explains how we
          collect, use, store, and secure your information, and the choices you have regarding your
          data. Our practices are designed to align with Indian data protection standards, including
          the{" "}
          <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong>.
        </p>
      </div>

      <div className="space-y-9">
        <Section num={1} title="Data Controller">
          <p>
            {COMPANY_NAME} is the data controller responsible for your personal data collected
            through the Platform. Contact details for data-related queries are listed in
            Section&nbsp;14.
          </p>
        </Section>

        <Section num={2} title="Data We Collect">
          <p>
            <strong>Account &amp; Identity Data:</strong> Your full name, phone number, email
            address, and city of residence when you register on the Platform.
          </p>
          <p>
            <strong>Driver Verification Documents:</strong> For Driver accounts — Aadhaar card,
            driving licence, Vehicle Registration Certificate (RC), pollution certificate, and
            commercial permit documents. Collected solely for identity and compliance verification.
          </p>
          <p>
            <strong>Location Data:</strong> Approximate or precise location when you use the
            Platform to search for rides, set pickup points, or for Driver availability detection.
            Used for ride matching and safety purposes only.
          </p>
          <p>
            <strong>Ride &amp; Booking Data:</strong> Pickup and drop locations, trip type, fare
            agreed, booking timestamps, and trip feedback.
          </p>
          <p>
            <strong>Device &amp; Usage Data:</strong> Browser type, IP address, device identifiers,
            pages visited, and interaction patterns — collected to operate, improve, and secure
            the Platform.
          </p>
          <p>
            <strong>Communication Records:</strong> Logs of support requests, WhatsApp messages
            sent through the Platform, and any written communication with SafeSobati.
          </p>
        </Section>

        <Section num={3} title="How We Use Your Data">
          <ul className="list-disc space-y-1.5 pl-4">
            <li>To create and manage your account and provide access to Platform features.</li>
            <li>To match Riders with available verified Drivers in the requested area.</li>
            <li>To verify Driver identities and validate transport compliance documents.</li>
            <li>To send booking confirmations, driver details, safety alerts, and support notifications.</li>
            <li>To facilitate WhatsApp communications between Riders and Drivers as part of the booking workflow.</li>
            <li>To detect and prevent fraud, abuse, and policy violations.</li>
            <li>To improve Platform features, analyse usage patterns, and conduct internal research.</li>
            <li>To comply with applicable Indian legal obligations and law enforcement requests.</li>
          </ul>
        </Section>

        <Section num={4} title="Driver Document Data">
          <p>
            Documents uploaded by Drivers (Aadhaar, Licence, RC etc.) are stored securely in
            encrypted cloud storage and accessed only by authorised SafeSobati verification
            personnel. These documents are used exclusively for identity verification and
            compliance checks.
          </p>
          <p>
            Driver documents are not shared with Riders except for limited, non-sensitive
            verification status indicators (e.g., &ldquo;KYC Verified&rdquo; badge). Raw document
            images are never displayed to Riders.
          </p>
          <p>
            Original document data will be retained for the duration of active driver registration
            and for a minimum of <strong>3 years</strong> post account closure to meet legal and
            audit obligations.
          </p>
        </Section>

        <Section num={5} title="Location Data">
          <p>
            Location data for Riders is requested only during active ride search and booking. For
            Drivers, location may be tracked while the Driver is in &ldquo;available&rdquo; mode on
            the Platform to facilitate ride matching.
          </p>
          <p>
            We do not track your location when you are not actively using the Platform for
            ride-related functions.
          </p>
        </Section>

        <Section num={6} title="Cookies & Session Usage">
          <p>
            The Platform uses essential cookies for session management, authentication, and Platform
            security. We may use analytics cookies (anonymised usage tracking) to understand how
            users interact with the Platform.
          </p>
          <p>
            You may disable non-essential cookies through your browser settings. Disabling
            essential cookies may affect Platform functionality.
          </p>
        </Section>

        <Section num={7} title="Analytics">
          <p>
            We use anonymised, aggregated analytics to understand Platform usage patterns, popular
            routes, and feature performance. Analytics data does not identify individual users and
            is used solely to improve the Platform experience.
          </p>
        </Section>

        <Section num={8} title="Data Retention">
          <p>
            Account data is retained for the duration of your active account plus a minimum
            <strong> 2-year</strong> post-closure period for dispute resolution and legal compliance.
          </p>
          <p>
            Ride data, booking logs, and communication records are retained for{" "}
            <strong>3 years</strong>. Driver verification documents are retained per
            Section&nbsp;4.
          </p>
          <p>
            You may request deletion of your data by contacting support. We will action deletion
            requests within 30 days except where retention is required by law.
          </p>
        </Section>

        <Section num={9} title="Data Security">
          <p>
            We implement industry-standard security measures including encrypted data transit
            (HTTPS/TLS), encrypted storage, role-based access controls, and periodic security
            audits to protect your personal data.
          </p>
          <p>
            Access to sensitive data — particularly Driver verification documents — is restricted
            to authorised personnel through identity-verified admin access controls.
          </p>
          <p>
            No method of electronic transmission or storage is 100% secure. While we take all
            commercially reasonable steps to protect your data, we cannot guarantee absolute
            security.
          </p>
        </Section>

        <Section num={10} title="Third-Party Integrations">
          <p>
            <strong>Supabase:</strong> Used for database, authentication, and file storage.
            Supabase operates under its own privacy and security policies with SOC&nbsp;2
            compliance.
          </p>
          <p>
            <strong>WhatsApp (Meta):</strong> Used to send booking notifications and facilitate
            Driver-Rider communication. Meta&rsquo;s data handling is governed by its own privacy
            policy.
          </p>
          <p>
            <strong>Mapping &amp; Geolocation Services:</strong> Used to suggest routes, validate
            pickup/drop coordinates, and display maps. Third-party mapping providers operate under
            their own privacy policies.
          </p>
          <p>We do not sell your personal data to any third party for commercial purposes.</p>
        </Section>

        <Section num={11} title="Your Rights">
          <p>
            Under applicable Indian data protection law, you have the following rights with respect
            to your personal data:
          </p>
          <ul className="list-disc space-y-1.5 pl-4">
            <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal retention obligations).</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for specific data uses where consent is the processing basis.</li>
            <li><strong>Right to Grievance:</strong> Lodge a complaint with SafeSobati&rsquo;s grievance officer.</li>
          </ul>
          <p>To exercise any of these rights, contact us at the address in Section&nbsp;14.</p>
        </Section>

        <Section num={12} title="WhatsApp Communication Consent">
          <p>
            By providing your mobile number and using the Platform, you consent to receiving
            booking-related, safety, and support communications via WhatsApp. This consent is
            part of the service workflow and is required for time-sensitive booking and safety
            notifications.
          </p>
          <p>
            You may opt out of non-essential marketing communications at any time by notifying
            SafeSobati support.
          </p>
        </Section>

        <Section num={13} title="Children's Privacy">
          <p>
            The Platform is not intended for use by individuals under 18 years of age. We do not
            knowingly collect personal data from minors. If we become aware that we have collected
            data from a minor without parental consent, we will delete it promptly.
          </p>
        </Section>

        <Section num={14} title="Amendments">
          <p>
            We may update this Privacy Policy from time to time. The revised effective date will
            appear at the top of this page. Continued use of the Platform after a policy update
            constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section num={15} title="Contact & Grievance Officer">
          <p>For privacy queries, data requests, or complaints:</p>
          <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900/60">
            <p className="font-semibold text-slate-900 dark:text-white">
              Grievance Officer &mdash; {COMPANY_NAME}
            </p>
            <p className="mt-1">Email: privacy@safesobati.com</p>
            <p>Response time: Within 30 days of receipt</p>
            <p>Jurisdiction: Nanded, Maharashtra, India</p>
          </div>
        </Section>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-800">
        <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/terms" className="hover:text-teal-600 dark:hover:text-teal-400">Terms &amp; Conditions</Link>
          <Link href="/driver-agreement" className="hover:text-teal-600 dark:hover:text-teal-400">Driver Agreement</Link>
          <Link href="/safety" className="hover:text-teal-600 dark:hover:text-teal-400">Safety &amp; Trust</Link>
          <Link href="/contact" className="hover:text-teal-600 dark:hover:text-teal-400">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
