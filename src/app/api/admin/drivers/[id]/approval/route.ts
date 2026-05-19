import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp";
import { buildDriverKitLinks, buildDriverKitWelcomeMessage } from "@/lib/driver-kit";

type ApprovalPayload = {
  status: "approved" | "rejected" | "suspended";
  aadhaarVerified: boolean;
  licenseVerified: boolean;
  rejectionReason?: string;
  approvedBy?: string;
};

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as ApprovalPayload;
    const baseUrl = new URL(request.url).origin;
    const driverKitLinks = buildDriverKitLinks(baseUrl);

    const isNegativeDecision = body.status === "rejected" || body.status === "suspended";
    const rejectionReason = (body.rejectionReason ?? "").trim();

    if (isNegativeDecision && !rejectionReason) {
      return NextResponse.json(
        { error: "Reason is required when rejecting or suspending a driver" },
        { status: 400 }
      );
    }

    const approvedBy = (body.approvedBy ?? "").trim() || null;

    const { data, error } = await supabaseAdmin
      .from("drivers")
      .update({
        status: body.status,
        aadhaar_verified: body.aadhaarVerified,
        license_verified: body.licenseVerified,
        available: body.status === "approved",
        approved_by: approvedBy,
        approved_at: new Date().toISOString(),
        rejection_reason: isNegativeDecision ? rejectionReason : null,
      })
      .eq("id", id)
      .select("id, status, available, approved_by, approved_at, rejection_reason")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }

    // Trigger scalable onboarding kit communication only when driver is approved.
    if (body.status === "approved") {
      const { data: driverWithUser } = await supabaseAdmin
        .from("drivers")
        .select("id, users!drivers_user_id_fkey(name, phone)")
        .eq("id", id)
        .single();

      const userInfo = driverWithUser?.users as { name?: string; phone?: string } | null;
      const phone = userInfo?.phone;
      const name = userInfo?.name ?? "Partner";

      if (phone) {
        const message = buildDriverKitWelcomeMessage(name, driverKitLinks);

        const delivery = await sendWhatsAppTextMessage({ to: phone, body: message });

        await supabaseAdmin.from("whatsapp_notifications").insert({
          event_type: "driver_kit_welcome",
          target_phone: phone,
          payload: {
            driverId: id,
            approvedAt: data.approved_at,
            message,
            links: driverKitLinks,
          },
          delivered: delivery.delivered,
          provider_response: delivery.delivered ? null : String(delivery.reason),
        });
      }
    }

    return NextResponse.json({
      driverId: data.id,
      status: data.status,
      available: data.available,
      approvedBy: data.approved_by,
      approvedAt: data.approved_at,
      rejectionReason: data.rejection_reason,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update driver approval" },
      { status: 400 }
    );
  }
}
