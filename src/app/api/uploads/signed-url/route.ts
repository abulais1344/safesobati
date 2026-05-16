import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type SignedUrlPayload = {
  fileName: string;
  fileType: "aadhaar" | "license" | "rc" | "vehicle";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignedUrlPayload;
    const bucketName = "driver-documents";
    const path = `${body.fileType}/${crypto.randomUUID()}-${body.fileName}`;

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
