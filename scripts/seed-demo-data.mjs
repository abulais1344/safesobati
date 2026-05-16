import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const cities = [
  "Nanded",
  "Parbhani",
  "Latur",
  "Hingoli",
  "Nizamabad",
  "Purna",
  "Degloor",
  "Mukhed",
];

const driverBlueprints = [
  { name: "Rakesh Kale", city: "Nanded", type: "auto", brand: "Bajaj", model: "RE", seats: 3, ac: false },
  { name: "Nazia Shaikh", city: "Nanded", type: "sedan", brand: "Maruti", model: "Dzire", seats: 4, ac: true },
  { name: "Aman Jadhav", city: "Nanded", type: "hatchback", brand: "Hyundai", model: "i20", seats: 4, ac: true },
  { name: "Priya Patil", city: "Parbhani", type: "sedan", brand: "Honda", model: "Amaze", seats: 4, ac: true },
  { name: "Imran Khan", city: "Latur", type: "suv", brand: "Mahindra", model: "XUV300", seats: 6, ac: true },
  { name: "Suhas More", city: "Hingoli", type: "taxi", brand: "Toyota", model: "Etios", seats: 4, ac: true },
  { name: "Farheen M", city: "Nizamabad", type: "hatchback", brand: "Tata", model: "Altroz", seats: 4, ac: true },
  { name: "Datta Raut", city: "Purna", type: "auto", brand: "Bajaj", model: "Compact", seats: 3, ac: false },
  { name: "Kishor Mali", city: "Degloor", type: "sedan", brand: "Hyundai", model: "Aura", seats: 4, ac: true },
  { name: "Anjali Deshmukh", city: "Mukhed", type: "suv", brand: "Kia", model: "Sonet", seats: 5, ac: true },
];

const customerNames = [
  "Shreya Kulkarni",
  "Harshad Pawar",
  "Bhavna Joshi",
  "Rohit Bansode",
  "Amina S",
  "Vijay T",
  "Sunita Gaikwad",
  "Manish R",
  "Aarti D",
  "Rahul G",
  "Tasneem K",
  "Gurpreet S",
];

const routes = [
  { city: "Nanded", pickup: "Nanded Station", drop: "Hazur Sahib", tripType: "religious", distanceKm: 8, baseFare: 220 },
  { city: "Nanded", pickup: "Vazirabad", drop: "Nanded Airport", tripType: "airport", distanceKm: 7, baseFare: 260 },
  { city: "Nanded", pickup: "CIDCO", drop: "Basar", tripType: "outstation", distanceKm: 35, baseFare: 1350 },
  { city: "Nanded", pickup: "Shivaji Nagar", drop: "Parbhani", tripType: "outstation", distanceKm: 65, baseFare: 2250 },
  { city: "Nanded", pickup: "Nanded Station", drop: "Latur", tripType: "outstation", distanceKm: 145, baseFare: 4900 },
  { city: "Nanded", pickup: "Sarafa", drop: "Hyderabad", tripType: "outstation", distanceKm: 280, baseFare: 8400 },
  { city: "Parbhani", pickup: "Parbhani Bus Stand", drop: "Nanded Station", tripType: "station", distanceKm: 64, baseFare: 2150 },
  { city: "Parbhani", pickup: "Jintur Road", drop: "Aundha Nagnath", tripType: "religious", distanceKm: 39, baseFare: 1480 },
  { city: "Latur", pickup: "Latur MIDC", drop: "Udgir", tripType: "city", distanceKm: 28, baseFare: 920 },
  { city: "Latur", pickup: "Latur Stand", drop: "Nanded", tripType: "outstation", distanceKm: 143, baseFare: 4790 },
  { city: "Hingoli", pickup: "Hingoli Chowk", drop: "Nanded", tripType: "outstation", distanceKm: 74, baseFare: 2590 },
  { city: "Nizamabad", pickup: "Bodhan Road", drop: "Nanded", tripType: "outstation", distanceKm: 112, baseFare: 3560 },
  { city: "Purna", pickup: "Purna Junction", drop: "Nanded Station", tripType: "station", distanceKm: 28, baseFare: 870 },
  { city: "Degloor", pickup: "Degloor Stand", drop: "Nanded City", tripType: "city", distanceKm: 52, baseFare: 1770 },
  { city: "Mukhed", pickup: "Mukhed Main", drop: "Hazur Sahib", tripType: "religious", distanceKm: 95, baseFare: 3110 },
  { city: "Nanded", pickup: "Itwara", drop: "SGGS College", tripType: "city", distanceKm: 6, baseFare: 180 },
  { city: "Nanded", pickup: "Taroda", drop: "Railway Station", tripType: "station", distanceKm: 9, baseFare: 240 },
  { city: "Parbhani", pickup: "Parbhani Court", drop: "Purna Junction", tripType: "station", distanceKm: 34, baseFare: 1140 },
  { city: "Latur", pickup: "Ausa Road", drop: "Airport Latur", tripType: "airport", distanceKm: 12, baseFare: 330 },
  { city: "Nizamabad", pickup: "Railway Station", drop: "Bodhan", tripType: "city", distanceKm: 18, baseFare: 520 },
];

function phoneAt(index, prefix = "9198100") {
  const suffix = String(1000 + index).padStart(4, "0");
  return `${prefix}${suffix}`;
}

async function clearPreviousSeed() {
  const { data: seedUsers, error: usersError } = await supabase
    .from("users")
    .select("id")
    .or("phone.like.9198100%,phone.like.9198200%");

  if (usersError) throw usersError;

  const seededUserIds = (seedUsers ?? []).map((user) => user.id);

  if (seededUserIds.length > 0) {
    const { data: seedDrivers } = await supabase
      .from("drivers")
      .select("id")
      .in("user_id", seededUserIds);

    const seededDriverIds = (seedDrivers ?? []).map((driver) => driver.id);

    if (seededDriverIds.length > 0) {
      await supabase.from("driver_quotes").delete().in("driver_id", seededDriverIds);
      await supabase.from("vehicles").delete().in("driver_id", seededDriverIds);
      await supabase.from("drivers").delete().in("id", seededDriverIds);
    }

    await supabase.from("ride_requests").delete().in("user_id", seededUserIds);
    await supabase.from("users").delete().in("id", seededUserIds);
  }

  await supabase
    .from("whatsapp_notifications")
    .delete()
    .in("event_type", ["seed_demo"]) ;
}

async function seedUsersAndDrivers() {
  const insertedDrivers = [];

  for (let index = 0; index < driverBlueprints.length; index += 1) {
    const driver = driverBlueprints[index];

    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({
        name: driver.name,
        phone: phoneAt(index, "9198100"),
        role: "driver",
        city: driver.city,
      })
      .select("id")
      .single();

    if (userError) throw userError;

    const { data: driverRecord, error: driverError } = await supabase
      .from("drivers")
      .insert({
        user_id: user.id,
        aadhaar_verified: true,
        license_verified: true,
        aadhaar_url: `https://seed.local/aadhaar/${index + 1}.pdf`,
        license_url: `https://seed.local/license/${index + 1}.pdf`,
        rc_url: `https://seed.local/rc/${index + 1}.pdf`,
        rating: Number((4.4 + (index % 5) * 0.1).toFixed(1)),
        status: "approved",
        available: true,
      })
      .select("id")
      .single();

    if (driverError) throw driverError;

    const registrationNumber = `MH26SB${String(3100 + index)}`;
    const { error: vehicleError } = await supabase.from("vehicles").insert({
      driver_id: driverRecord.id,
      vehicle_type: driver.type,
      brand: driver.brand,
      model: driver.model,
      seat_count: driver.seats,
      ac: driver.ac,
      registration_number: registrationNumber,
      photos: [`https://seed.local/vehicle/${registrationNumber}.jpg`],
    });

    if (vehicleError) throw vehicleError;

    insertedDrivers.push({ id: driverRecord.id, city: driver.city });
  }

  return insertedDrivers;
}

async function seedCustomers() {
  const customers = [];

  for (let index = 0; index < customerNames.length; index += 1) {
    const city = cities[index % cities.length];
    const { data: customer, error: customerError } = await supabase
      .from("users")
      .insert({
        name: customerNames[index],
        phone: phoneAt(index, "9198200"),
        role: "customer",
        city,
      })
      .select("id, city")
      .single();

    if (customerError) throw customerError;
    customers.push(customer);
  }

  return customers;
}

async function seedRideRequests(customers) {
  const requestRows = [];

  for (let index = 0; index < 20; index += 1) {
    const route = routes[index % routes.length];
    const customer = customers[index % customers.length];
    const dayOffset = (index % 6) - 2;
    const hourOffset = index % 12;

    const rideDate = new Date();
    rideDate.setDate(rideDate.getDate() + dayOffset);
    rideDate.setHours(8 + hourOffset, 15, 0, 0);

    requestRows.push({
      user_id: customer.id,
      pickup: route.pickup,
      drop: route.drop,
      trip_type: route.tripType,
      date: rideDate.toISOString(),
      city: route.city,
      status: "pending",
      notes: `[seed-demo] distance=${route.distanceKm}km baseFare=${route.baseFare}`,
    });
  }

  const { data: rideRequests, error } = await supabase
    .from("ride_requests")
    .insert(requestRows)
    .select("id, city");

  if (error) throw error;
  return rideRequests ?? [];
}

async function seedQuotes(rideRequests, drivers) {
  let totalQuotes = 0;

  for (let index = 0; index < rideRequests.length; index += 1) {
    const rideRequest = rideRequests[index];
    const cityDrivers = drivers.filter((driver) => driver.city === rideRequest.city);
    const fallbackDrivers = cityDrivers.length > 1 ? cityDrivers : drivers;

    const first = fallbackDrivers[index % fallbackDrivers.length];
    const second = fallbackDrivers[(index + 1) % fallbackDrivers.length];

    const quoteA = 220 + (index % 10) * 140;
    const quoteB = quoteA + 120;

    const quoteRows = [
      {
        ride_request_id: rideRequest.id,
        driver_id: first.id,
        quote_amount: quoteA,
        message: "Fast pickup available. Clean car, verified documents.",
        status: "active",
      },
    ];

    if (second.id !== first.id) {
      quoteRows.push({
        ride_request_id: rideRequest.id,
        driver_id: second.id,
        quote_amount: quoteB,
        message: "Comfort ride option. AC available.",
        status: "active",
      });
    }

    const { data: insertedQuotes, error: quoteError } = await supabase
      .from("driver_quotes")
      .insert(quoteRows)
      .select("id, quote_amount");

    if (quoteError) throw quoteError;

    totalQuotes += insertedQuotes?.length ?? 0;

    if ((index + 1) % 4 === 0 && insertedQuotes && insertedQuotes.length > 0) {
      const acceptedQuote = insertedQuotes.reduce((min, current) =>
        Number(current.quote_amount) < Number(min.quote_amount) ? current : min
      );

      const { data: acceptedQuoteRecord } = await supabase
        .from("driver_quotes")
        .select("id, driver_id")
        .eq("id", acceptedQuote.id)
        .single();

      await supabase
        .from("driver_quotes")
        .update({ status: "rejected" })
        .eq("ride_request_id", rideRequest.id)
        .neq("id", acceptedQuote.id);

      await supabase.from("driver_quotes").update({ status: "accepted" }).eq("id", acceptedQuote.id);

      if (acceptedQuoteRecord) {
        await supabase
          .from("ride_requests")
          .update({
            status: "accepted",
            selected_quote_id: acceptedQuote.id,
            selected_driver_id: acceptedQuoteRecord.driver_id,
          })
          .eq("id", rideRequest.id);
      }
    } else {
      await supabase.from("ride_requests").update({ status: "quoted" }).eq("id", rideRequest.id);
    }
  }

  return totalQuotes;
}

async function main() {
  console.log("Clearing previous seed dataset...");
  await clearPreviousSeed();

  console.log("Seeding drivers and vehicles...");
  const drivers = await seedUsersAndDrivers();

  console.log("Seeding customers...");
  const customers = await seedCustomers();

  console.log("Seeding ride requests...");
  const rideRequests = await seedRideRequests(customers);

  console.log("Seeding quotes and accepted winners...");
  const totalQuotes = await seedQuotes(rideRequests, drivers);

  const { count: driversCount } = await supabase.from("drivers").select("*", { count: "exact", head: true });
  const { count: requestsCount } = await supabase.from("ride_requests").select("*", { count: "exact", head: true });
  const { count: quotesCount } = await supabase.from("driver_quotes").select("*", { count: "exact", head: true });

  console.log("Seed complete.");
  console.log(`Drivers seeded: ${drivers.length}`);
  console.log(`Routes available in seed set: ${routes.length}`);
  console.log(`Ride requests seeded: ${rideRequests.length}`);
  console.log(`Quotes seeded: ${totalQuotes}`);
  console.log(`Current table counts -> drivers=${driversCount ?? 0}, ride_requests=${requestsCount ?? 0}, driver_quotes=${quotesCount ?? 0}`);
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
