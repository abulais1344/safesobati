import type { Metadata } from "next";
import { Mail, MapPin, MessageCircleMore, PhoneCall } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Contact",
  "Contact SafeSobati support and partnership teams.",
  "/contact"
);

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Contact SafeSobati</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Reach support, driver operations and city partnership teams.
        </p>

        <div className="mt-6 grid gap-3">
          <Card className="flex items-center gap-3">
            <PhoneCall size={16} /> +91 84212 22893
          </Card>
          <Card className="flex items-center gap-3">
            <Mail size={16} /> hello@safesobati.com
          </Card>
          <Card className="flex items-center gap-3">
            <MapPin size={16} /> Nanded, Maharashtra
          </Card>
          <Card className="flex items-center gap-3">
            <MessageCircleMore size={16} /> WhatsApp priority support for active bookings
          </Card>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
