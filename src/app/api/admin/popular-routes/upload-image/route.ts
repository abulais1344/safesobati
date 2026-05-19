import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const BUCKET_NAME = "popular-routes-images";

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

async function ensureBucketExists() {
  const { data: bucket, error: bucketError } = await supabaseAdmin.storage.getBucket(BUCKET_NAME);

  if (bucketError || !bucket) {
    const { error: createBucketError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 8 * 1024 * 1024,
    });

    if (createBucketError && !createBucketError.message.toLowerCase().includes("already exists")) {
      throw new Error(createBucketError.message);
    }
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    await ensureBucketExists();

    const safeName = sanitizeFileName(file.name || "route-image");
    const filePath = `routes/${crypto.randomUUID()}-${safeName}`;
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: publicUrlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    return NextResponse.json({
      imageUrl: publicUrlData.publicUrl,
      bucket: BUCKET_NAME,
      path: filePath,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload route image" },
      { status: 400 }
    );
  }
}
