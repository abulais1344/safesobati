import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp";

type RideRequestCreatePayload = {
  name: string;
  phone: string;
  city: string;
  pickup: string;
  drop: string;
  tripType: "city" | "airport" | "station" | "outstation" | "religious";
  schedule: string;
  notes?: string;
};

async function upsertCustomerUser(payload: RideRequestCreatePayload) {
  const { data: existing, error: existingError } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("phone", payload.phone)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existing) {
    return existing.id as string;
  }

  const { data: created, error: createError } = await supabaseAdmin
    .from("users")
    .insert({
      name: payload.name,
      phone: payload.phone,
      role: "customer",
      city: payload.city,
    })
    .select("id")
    .single();

  if (createError) {
    throw new Error(createError.message);
  }

  return created.id as string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RideRequestCreatePayload;
    const userId = await upsertCustomerUser(body);

    const { data: rideRequest, error: createError } = await supabaseAdmin
      .from("ride_requests")
      .insert({
        user_id: userId,
        pickup: body.pickup,
        drop: body.drop,
        trip_type: body.tripType,
        date: body.schedule,
        city: body.city,
        notes: body.notes ?? null,
      })
      .select("id, city, status, created_at")
      .single();

    if (createError) {
      throw new Error(createError.message);
    }

    const { data: availableDrivers } = await supabaseAdmin
      .from("drivers")
      .select("id, user_id")
      .eq("status", "approved")
      .eq("available", true);

    const userIds = (availableDrivers ?? []).map((driver) => driver.user_id);

    let driverPhones: string[] = [];
    if (userIds.length > 0) {
      const { data: driverUsers } = await supabaseAdmin
        .from("users")
        .select("phone, city")
        .in("id", userIds)
        .eq("city", body.city);
      driverPhones = (driverUsers ?? []).map((user) => user.phone);
    }

    const customerMessage = `SafeSobati: Request ${rideRequest.id} created for ${body.pickup} to ${body.drop}. Drivers are being notified.`;
    const customerDelivery = await sendWhatsAppTextMessage({ to: body.phone, body: customerMessage });

    await supabaseAdmin.from("whatsapp_notifications").insert({
      event_type: "ride_request_created_customer",
      target_phone: body.phone,
      payload: { requestId: rideRequest.id, message: customerMessage },
      delivered: customerDelivery.delivered,
      provider_response: customerDelivery.delivered ? null : String(customerDelivery.reason),
    });

    for (const phone of driverPhones) {
      const driverMessage = `SafeSobati new request ${rideRequest.id}: ${body.pickup} -> ${body.drop}. Open dashboard to quote.`;
      const driverDelivery = await sendWhatsAppTextMessage({ to: phone, body: driverMessage });

      await supabaseAdmin.from("whatsapp_notifications").insert({
        event_type: "ride_request_created_driver",
        target_phone: phone,
        payload: { requestId: rideRequest.id, message: driverMessage },
        delivered: driverDelivery.delivered,
        provider_response: driverDelivery.delivered ? null : String(driverDelivery.reason),
      });
    }

    return NextResponse.json(
      {
        requestId: rideRequest.id,
        status: rideRequest.status,
        notifiedDrivers: driverPhones.length,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create ride request" },
      { status: 400 }
    );
  }
}
