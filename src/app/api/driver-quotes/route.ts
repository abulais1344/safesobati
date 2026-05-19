import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp";

type QuoteCreatePayload = {
  rideRequestId: string;
  driverId: string;
  quoteAmount: number;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteCreatePayload;

    const { data: quote, error: quoteError } = await supabaseAdmin
      .from("driver_quotes")
      .upsert(
        {
          ride_request_id: body.rideRequestId,
          driver_id: body.driverId,
          quote_amount: body.quoteAmount,
          message: body.message ?? null,
          status: "active",
        },
        { onConflict: "ride_request_id,driver_id" }
      )
      .select("id, ride_request_id, quote_amount, status")
      .single();

    if (quoteError) {
      throw new Error(quoteError.message);
    }

    await supabaseAdmin
      .from("ride_requests")
      .update({ status: "responded" })
      .eq("id", body.rideRequestId)
      .in("status", ["pending", "responded", "shortlisted"]);

    const { data: rideRequest } = await supabaseAdmin
      .from("ride_requests")
      .select("id, user_id, pickup, drop")
      .eq("id", body.rideRequestId)
      .single();

    if (rideRequest) {
      const { data: customer } = await supabaseAdmin
        .from("users")
        .select("phone")
        .eq("id", rideRequest.user_id)
        .single();

      if (customer?.phone) {
        const customerMessage = `SafeSobati: New quote received for request ${rideRequest.id}. Open app to review and confirm.`;
        const delivery = await sendWhatsAppTextMessage({ to: customer.phone, body: customerMessage });

        await supabaseAdmin.from("whatsapp_notifications").insert({
          event_type: "driver_quote_created_customer",
          target_phone: customer.phone,
          payload: { requestId: rideRequest.id, quoteId: quote.id, message: customerMessage },
          delivered: delivery.delivered,
          provider_response: delivery.delivered ? null : String(delivery.reason),
        });
      }
    }

    return NextResponse.json({ quoteId: quote.id, status: quote.status }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create quote" },
      { status: 400 }
    );
  }
}
