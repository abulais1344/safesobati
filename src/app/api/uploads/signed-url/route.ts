import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type SignedUrlPayload = {
  fileName: string;
  fileType: "aadhaar" | "license" | "rc" | "vehicle" | "insurance" | "puc";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignedUrlPayload;
    const bucketName = "driver-documents";
    const safeFileName = body.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${body.fileType}/${crypto.randomUUID()}-${safeFileName}`;

    // Ensure bucket exists so onboarding works in fresh environments.
    const { data: bucket, error: bucketError } = await supabaseAdmin.storage.getBucket(bucketName);

    if (bucketError || !bucket) {
      const { error: createBucketError } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10 * 1024 * 1024,
      });

      if (createBucketError && !createBucketError.message.toLowerCase().includes("already exists")) {
        throw new Error(createBucketError.message);
      }
    }

    const { data, error } = await supabaseAdmin.storage.from(bucketName).createSignedUploadUrl(path);

    if (error || !data) {
      throw new Error(error?.message ?? "Failed to create signed upload URL");
    }

    return NextResponse.json({
      bucket: bucketName,
      path,
      token: data.token,
      signedUrl: data.signedUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create upload URL" },
      { status: 400 }
    );
  }
}
