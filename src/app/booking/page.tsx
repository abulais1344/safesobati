import type { Metadata } from "next";
import { BookingShell } from "./_booking-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Book Ride",
  "Request ride quotes and complete booking with secure and transparent flow.",
  "/booking"
);

export default function BookingPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-5 lg:px-8">
      <BookingShell />
    </div>
  );
}
