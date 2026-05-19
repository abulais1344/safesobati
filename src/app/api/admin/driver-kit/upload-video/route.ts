import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    const allowedTypes = ["video/mp4", "video/quicktime", "video/webm"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported video type. Use MP4, MOV, or WEBM." }, { status: 400 });
    }

    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: "Video is too large (max 100MB)." }, { status: 400 });
    }

    const bucketName = "driver-kit-assets";
    const objectPath = "onboarding-video.mp4";

    const { data: bucket, error: bucketError } = await supabaseAdmin.storage.getBucket(bucketName);
    if (bucketError || !bucket) {
      const { error: createBucketError } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 100 * 1024 * 1024,
      });

      if (createBucketError && !createBucketError.message.toLowerCase().includes("already exists")) {
        throw new Error(createBucketError.message);
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(objectPath, buffer, {
        upsert: true,
        contentType: "video/mp4",
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      return NextResponse.json(
        {
          warning: "Upload succeeded, but NEXT_PUBLIC_SUPABASE_URL is not configured.",
          playbackPageUrl: "/driver-benefits/video",
        },
        { status: 200 }
      );
    }

    const videoUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${objectPath}`;

    return NextResponse.json({
      ok: true,
      videoUrl,
      playbackPageUrl: "/driver-benefits/video",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload onboarding video" },
      { status: 400 }
    );
  }
}
