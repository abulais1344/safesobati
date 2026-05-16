import { z } from "zod";

export const searchRideSchema = z.object({
  pickup: z.string().min(2, "Pickup is required"),
  drop: z.string().min(2, "Drop location is required"),
  tripType: z.enum(["city", "airport", "station", "outstation", "religious", "full_day", "half_day", "evening", "hospital"]),
  rideDate: z.string().min(1, "Date is required"),
  passengers: z.number().min(1).max(8),
});

export const driverOnboardingSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  city: z.string().min(2, "City is required"),
  vehicleType: z.enum(["auto", "sedan", "suv", "hatchback", "taxi", "school_bus"]),
  vehicleBrand: z.string().min(1, "Vehicle brand is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  registrationYear: z.number().min(1990).max(new Date().getFullYear() + 1, "Invalid year"),
  vehicleNumber: z.string().min(6, "Vehicle number is required"),
  yearsOfExperience: z.number().min(0).max(40),
  seatCount: z.number().min(1).max(8),
  ac: z.boolean(),
  aadhaarUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  licenseUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  rcUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  photoUrls: z.string().optional(),
  consent: z.boolean().refine((value) => value, "Consent is required"),
});

export const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  pickup: z.string().min(2, "Pickup is required"),
  drop: z.string().min(2, "Drop location is required"),
  tripType: z.enum(["city", "airport", "station", "outstation", "religious", "full_day", "half_day", "evening", "hospital"]),
  schedule: z.string().min(1, "Schedule is required"),
  notes: z.string().max(280).optional(),
  paymentMode: z.enum(["cash", "online", "wallet"]),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  message: z.string().min(8, "Please add more details"),
});

export type SearchRideInput = z.infer<typeof searchRideSchema>;
export type DriverOnboardingInput = z.input<typeof driverOnboardingSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
