export type UserRole = "customer" | "driver" | "admin";

export type DriverVerificationStatus = "pending" | "under_review" | "approved" | "rejected" | "suspended";

export type DocumentType =
  | "aadhaar"
  | "driving_licence"
  | "vehicle_rc"
  | "puc_certificate"
  | "commercial_permit"
  | "insurance"
  | "fitness_certificate"
  | "profile_photo";

export type DocumentReviewStatus = "pending" | "under_review" | "approved" | "rejected";

export type ConsentType =
  | "terms_accepted"
  | "privacy_accepted"
  | "driver_agreement_accepted"
  | "document_authenticity_confirmed"
  | "whatsapp_communication_opt_in";

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

export type BookingStatus =
  | "pending"
  | "responded"
  | "shortlisted"
  | "confirmed"
  | "completed"
  | "cancelled";

export type Booking = {
  id: string;
  customerName: string;
  driverName: string;
  route: string;
  fare: number;
  status: BookingStatus;
  createdAt: string;
};
