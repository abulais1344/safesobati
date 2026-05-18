import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Driver Onboarding Video",
  "In-app onboarding video briefing for SafeSobati Verified Driver Partner program.",
  "/driver-benefits/video"
);

const uploadedVideoUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/driver-kit-assets/onboarding-video.mp4`
  : null;

export default function DriverBenefitsVideoPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Driver onboarding video</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        This in-app briefing helps new partner drivers understand quality, trust, and response standards.
      </p>

      <Card className="mt-6">
        <video
          controls
          preload="metadata"
          poster="/driver-kit/onboarding-video-poster.svg"
          className="w-full rounded-xl border border-slate-200 bg-black/80 dark:border-slate-700"
        >
          {uploadedVideoUrl ? <source src={uploadedVideoUrl} type="video/mp4" /> : null}
          <source src="/driver-kit/onboarding-video.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
        <p className="mt-3 text-xs text-slate-500">
          Admin uploads are served first. Static fallback: <strong>public/driver-kit/onboarding-video.mp4</strong>.
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold">Quick script (60-90 sec)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Welcome to SafeSobati Verified Driver Partner network.</li>
          <li>Keep vehicle clean, documents valid, and communication professional.</li>
          <li>Respond quickly to ride enquiries for better visibility.</li>
          <li>Focus on trust-first trips: family, airport, and wedding rides.</li>
          <li>Use your badge/sticker to build local customer confidence.</li>
        </ul>
      </Card>
    </div>
  );
}
