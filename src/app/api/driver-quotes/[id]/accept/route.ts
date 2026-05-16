import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const { data: selectedQuote, error: selectedQuoteError } = await supabaseAdmin
      .from("driver_quotes")
      .select("id, ride_request_id, driver_id")
      .eq("id", id)
      .single();

    if (selectedQuoteError || !selectedQuote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    await supabaseAdmin
      .from("driver_quotes")
      .update({ status: "rejected" })
      .eq("ride_request_id", selectedQuote.ride_request_id)
      .neq("id", selectedQuote.id);

    await supabaseAdmin.from("driver_quotes").update({ status: "accepted" }).eq("id", selectedQuote.id);

    const { data: rideRequest, error: requestUpdateError } = await supabaseAdmin
      .from("ride_requests")
      .update({
        status: "accepted",
        selected_quote_id: selectedQuote.id,
        selected_driver_id: selectedQuote.driver_id,
      })
      .eq("id", selectedQuote.ride_request_id)
      .select("id, user_id, pickup, drop")
      .single();

    if (requestUpdateError || !rideRequest) {
      throw new Error(requestUpdateError?.message ?? "Ride request update failed");
    }

    const { data: driverUserLink } = await supabaseAdmin
      .from("drivers")
      .select("user_id")
      .eq("id", selectedQuote.driver_id)
      .single();

    const { data: customer } = await supabaseAdmin
      .from("users")
      .select("phone")
      .eq("id", rideRequest.user_id)
      .single();

    if (customer?.phone) {
      const customerMessage = `SafeSobati: Quote accepted. Driver assigned for ${rideRequest.pickup} to ${rideRequest.drop}.`;
      const delivery = await sendWhatsAppTextMessage({ to: customer.phone, body: customerMessage });
      await supabaseAdmin.from("whatsapp_notifications").insert({
        event_type: "quote_accepted_customer",
        target_phone: customer.phone,
        payload: { requestId: rideRequest.id, quoteId: selectedQuote.id, message: customerMessage },
        delivered: delivery.delivered,
        provider_response: delivery.delivered ? null : String(delivery.reason),
      });
    }

    if (driverUserLink?.user_id) {
      const { data: driverUser } = await supabaseAdmin
        .from("users")
        .select("phone")
        .eq("id", driverUserLink.user_id)
        .single();

      if (driverUser?.phone) {
        const driverMessage = `SafeSobati: Your quote ${selectedQuote.id} was accepted. Prepare for pickup.`;
        const delivery = await sendWhatsAppTextMessage({ to: driverUser.phone, body: driverMessage });
        await supabaseAdmin.from("whatsapp_notifications").insert({
          event_type: "quote_accepted_driver",
          target_phone: driverUser.phone,
          payload: { requestId: rideRequest.id, quoteId: selectedQuote.id, message: driverMessage },
          delivered: delivery.delivered,
          provider_response: delivery.delivered ? null : String(delivery.reason),
        });
      }
    }

    return NextResponse.json({ requestId: rideRequest.id, status: "accepted" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to accept quote" },
      { status: 400 }
    );
  }
}
