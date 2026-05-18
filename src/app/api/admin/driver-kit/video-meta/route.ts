import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const bucketName = "driver-kit-assets";
    const objectPath = "onboarding-video.mp4";

    const { data: fileMeta, error } = await supabaseAdmin
      .from("storage.objects")
      .select("created_at, updated_at")
      .eq("bucket_id", bucketName)
      .eq("name", objectPath)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const uploadedVideoUrl = supabaseUrl
      ? `${supabaseUrl}/storage/v1/object/public/${bucketName}/${objectPath}`
      : null;

    return NextResponse.json({
      exists: Boolean(fileMeta),
      videoUrl: fileMeta ? uploadedVideoUrl : null,
      uploadedAt: fileMeta?.updated_at ?? fileMeta?.created_at ?? null,
      fallbackVideoUrl: "/driver-kit/onboarding-video.mp4",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read driver kit video metadata" },
      { status: 400 }
    );
  }
}
