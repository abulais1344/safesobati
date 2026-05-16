export type UserRole = "customer" | "driver" | "admin";

export type DriverProfile = {
  id: string;
  slug: string;
  fullName: string;
  city: string;
  vehicleType: "auto" | "sedan" | "suv" | "hatchback";
  rating: number;
  rides: number;
  verified: boolean;
  languages: string[];
};

export type RideRequest = {
  pickup: string;
  drop: string;
  rideType: "city" | "outstation" | "airport" | "station" | "religious";
  date: string;
  passengers: number;
  notes?: string;
};

export type BookingStatus = "pending" | "quoted" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  customerName: string;
  driverName: string;
  route: string;
  fare: number;
  status: BookingStatus;
  createdAt: string;
};
