import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp";
import { buildDriverKitLinks, buildDriverKitWelcomeMessage } from "@/lib/driver-kit";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const baseUrl = new URL(request.url).origin;
    const links = buildDriverKitLinks(baseUrl);

    const { data: driver, error } = await supabaseAdmin
      .from("drivers")
      .select("id, status, users!drivers_user_id_fkey(name, phone)")
      .eq("id", id)
      .single();

    if (error || !driver) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }

    const userInfo = driver.users as { name?: string; phone?: string } | null;
    const phone = userInfo?.phone;
    const name = userInfo?.name ?? "Partner";

    if (!phone) {
      return NextResponse.json({ error: "Driver phone not found" }, { status: 400 });
    }

    const message = buildDriverKitWelcomeMessage(name, links);
    const delivery = await sendWhatsAppTextMessage({ to: phone, body: message });

    await supabaseAdmin.from("whatsapp_notifications").insert({
      event_type: "driver_kit_welcome_manual",
      target_phone: phone,
      payload: {
        driverId: id,
        driverStatus: driver.status,
        message,
        links,
      },
      delivered: delivery.delivered,
      provider_response: delivery.delivered ? null : String(delivery.reason),
    });

    return NextResponse.json({
      ok: true,
      delivered: delivery.delivered,
      reason: delivery.delivered ? null : String(delivery.reason),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send driver kit" },
      { status: 400 }
    );
  }
}
