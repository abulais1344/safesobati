"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type VideoMeta = {
  exists: boolean;
  videoUrl: string | null;
  fallbackVideoUrl: string;
  uploadedAt: string | null;
};

export function AdminDriverKitManager() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [meta, setMeta] = useState<VideoMeta | null>(null);

  const loadMeta = async () => {
    const response = await fetch("/api/admin/driver-kit/video-meta");
    const data = (await response.json()) as VideoMeta & { error?: string };

    if (!response.ok) {
      setMessage(data.error ?? "Unable to load current video metadata.");
      return;
    }

    setMeta(data);
  };

  useEffect(() => {
    loadMeta();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Select a video file first.");
      return;
    }

    setBusy(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/driver-kit/upload-video", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage(data.error ?? "Failed to upload onboarding video.");
      return;
    }

    setMessage("Onboarding video uploaded. Open /driver-benefits/video to verify playback.");
    await loadMeta();
  };

  const previewUrl = meta?.videoUrl ?? meta?.fallbackVideoUrl ?? "/driver-kit/onboarding-video.mp4";
  const uploadedAtLabel = meta?.uploadedAt ? new Date(meta.uploadedAt).toLocaleString() : null;

  return (
    <Card className="mt-6 p-5">
      <h3 className="text-lg font-semibold">Driver kit manager</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Upload onboarding video once. New uploads replace the existing video used on the driver benefits video page.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          accept="video/mp4,video/quicktime,video/webm"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <Button onClick={handleUpload} disabled={busy}>
          {busy ? "Uploading..." : "Upload onboarding video"}
        </Button>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
        <p className="text-sm font-medium">Current onboarding video preview</p>
        <video
          controls
          preload="metadata"
          poster="/driver-kit/onboarding-video-poster.svg"
          className="mt-2 w-full rounded-lg border border-slate-200 bg-black/80 dark:border-slate-700"
        >
          <source src={previewUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
        <p className="mt-2 text-xs text-slate-500">
          Source: {meta?.exists ? "Supabase uploaded asset" : "Local fallback asset"}
        </p>
        <p className="text-xs text-slate-500">
          Uploaded at: {uploadedAtLabel ?? "No uploaded file found yet"}
        </p>
      </div>

      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
    </Card>
  );
}
