import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/booking-form";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";
import { isRazorpayReady } from "@/lib/integrations";

export const metadata: Metadata = buildMetadata(
  "Book Ride",
  "Request ride quotes and complete booking with secure and transparent flow.",
  "/booking"
);

export default function BookingPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-8">
      <div className="lg:col-span-3">
        <h1 className="font-display text-3xl font-semibold">Create your booking request</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Get quotes from verified nearby drivers, compare options and confirm confidently.
        </p>
        <div className="mt-6">
          <BookingForm />
        </div>
      </div>

      <div className="space-y-4 lg:col-span-2">
        <Card>
          <h3 className="font-semibold">How quote booking works</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-slate-600 dark:text-slate-300">
            <li>Submit route and schedule details.</li>
            <li>Receive driver quotes with ETA and ratings.</li>
            <li>Confirm your best option and ride safely.</li>
          </ol>
        </Card>
        <Card>
          <h3 className="font-semibold">Payments</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Razorpay setup status: {isRazorpayReady ? "configured" : "pending environment setup"}.
          </p>
        </Card>
      </div>
    </div>
  );
}
