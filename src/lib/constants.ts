import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Car,
  Clock3,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Star,
  Timer,
  UserRoundCheck,
  Wallet,
} from "lucide-react";

export type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type RouteCard = {
  from: string;
  to: string;
  distance: string;
  baseFare: string;
  image: string;
  travelTime: string;
};

export type RecentBooking = {
  rider: string;
  route: string;
  fare: string;
  bookedAgo: string;
};

export const navItems = [
  { label: "Search Rides", href: "/search" },
  { label: "Driver Registration", href: "/driver/register" },
  { label: "Sign In", href: "/auth/sign-in" },
  { label: "Safety", href: "/safety" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const heroStats = [
  { label: "Verified Drivers", value: "148" },
  { label: "Active Nearby", value: "63" },
  { label: "Avg Response", value: "1.6 min" },
  { label: "Rated Safety", value: "4.8/5" },
];

export const trustFeatures: FeatureCard[] = [
  {
    title: "KYC Verified Drivers",
    description:
      "Every captain passes document, police and vehicle checks before going live.",
    icon: UserRoundCheck,
  },
  {
    title: "SOS & Live Trip Sharing",
    description:
      "One tap emergency actions and family trip sharing designed for safer local travel.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden surprises. Quotes are clear, and riders approve before booking.",
    icon: Wallet,
  },
  {
    title: "Fast Local Support",
    description:
      "Human support tuned for tier-2 and tier-3 routes, language and cultural needs.",
    icon: HeartHandshake,
  },
];

export const productHighlights: FeatureCard[] = [
  {
    title: "Quote-first booking",
    description: "Get multiple offers from trusted local drivers in seconds.",
    icon: Clock3,
  },
  {
    title: "Full day & half day hire",
    description: "Book a car for the whole day, half day, or an evening round trip for weddings, shopping and events.",
    icon: Car,
  },
  {
    title: "Hospital & medical trips",
    description: "Reliable rides for hospital visits — Nanded DGGMC, AIIMS and local clinics across Nanded district.",
    icon: MapPin,
  },
  {
    title: "Hyderabad airport transfers",
    description: "Affordable drops and pickups from Nanded and Ardhapur to Rajiv Gandhi International Airport, Hyderabad.",
    icon: BadgeCheck,
  },
];

export const popularRoutes: RouteCard[] = [
  {
    from: "Nanded",
    to: "Hyderabad Airport",
    distance: "280 km",
    travelTime: "5 hr 20 min",
    baseFare: "INR 8,400",
    image:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Hazur Sahib",
    distance: "8 km",
    travelTime: "22 min",
    baseFare: "INR 220",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Pune",
    distance: "520 km",
    travelTime: "9 hr 10 min",
    baseFare: "INR 14,500",
    image:
      "https://images.unsplash.com/photo-1533473359331-35acda7ce3c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Aurangabad",
    distance: "265 km",
    travelTime: "4 hr 50 min",
    baseFare: "INR 7,900",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Ardhapur",
    to: "Nanded",
    distance: "22 km",
    travelTime: "38 min",
    baseFare: "INR 780",
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Pusad",
    distance: "170 km",
    travelTime: "3 hr 20 min",
    baseFare: "INR 4,950",
    image:
      "https://images.unsplash.com/photo-1488070537510-e21cc028cb29?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Bangalore",
    distance: "690 km",
    travelTime: "12 hr 20 min",
    baseFare: "INR 18,900",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  },
];

export const testimonials = [
  {
    name: "Shreya Kulkarni",
    role: "Frequent commuter, Nanded",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=480&q=80",
    quote:
      "SafeSobati feels premium and local at the same time. I can trust the drivers and always get quick pickups.",
    rating: 5,
  },
  {
    name: "Amanpreet Singh",
    role: "Pilgrim travel organizer",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=480&q=80",
    quote:
      "The quote system is perfect for family groups visiting Hazur Sahib. Drivers are polite and verified.",
    rating: 5,
  },
  {
    name: "Nazia Shaikh",
    role: "Working professional",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80",
    quote:
      "The WhatsApp connect plus clear fares removed all stress. It is now my default ride app.",
    rating: 5,
  },
];

export const recentBookings: RecentBooking[] = [
  {
    rider: "Anjali W.",
    route: "Ardhapur to DGGMC Hospital, Nanded",
    fare: "INR 1,150",
    bookedAgo: "2 min ago",
  },
  {
    rider: "Suresh P.",
    route: "Nanded to Hyderabad Airport",
    fare: "INR 8,200",
    bookedAgo: "5 min ago",
  },
  {
    rider: "Fatima K.",
    route: "Full Day – Wedding at Nanded City",
    fare: "INR 2,800",
    bookedAgo: "9 min ago",
  },
  {
    rider: "Harpreet K.",
    route: "Hazur Sahib to Nanded Bus Stand",
    fare: "INR 180",
    bookedAgo: "13 min ago",
  },
];

export const faqs = [
  {
    question: "Do you offer full day or half day car hire?",
    answer:
      "Yes. You can book a car for a full day (8–10 hrs), half day (4–5 hrs), or an evening round trip. This is popular for weddings, shopping trips and family outings in and around Nanded.",
  },
  {
    question: "Can I book a cab from Nanded or Ardhapur to Hyderabad Airport?",
    answer:
      "Yes. We have drivers covering the Nanded / Ardhapur to Rajiv Gandhi International Airport (RGIA) route. The trip takes around 5–5.5 hours. You can request a quote and confirm directly with your driver on WhatsApp.",
  },
  {
    question: "Can I book a ride to a hospital or for a medical appointment?",
    answer:
      "Absolutely. Hospital and medical trips are one of our most common use cases. Drivers are available for DGGMC, AIIMS Nanded and other clinics across Nanded district, including early morning and late night slots.",
  },
  {
    question: "How does SafeSobati verify drivers?",
    answer:
      "Drivers must complete KYC, vehicle documents, and identity checks. Admin verification is mandatory before profile activation.",
  },
  {
    question: "Is this available only in Nanded?",
    answer:
      "Nanded city and Ardhapur taluka are our launch areas. We are actively onboarding drivers across the Nanded district and extending to neighbouring routes including Parbhani, Latur and outstation corridors.",
  },
  {
    question: "Do you support outstation and return trips?",
    answer:
      "Yes. You can request one-way, round-trip, and multi-stop intercity rides. Full-day and two-day packages are available for longer trips.",
  },
];

export const dashboardMetrics = [
  { title: "Total Bookings", value: "1,284", trend: "+12.4%" },
  { title: "Verified Drivers", value: "318", trend: "+6.1%" },
  { title: "Pending Verification", value: "24", trend: "-8.7%" },
  { title: "Avg Rider Rating", value: "4.8", trend: "+0.2" },
];

export const safetyPillars = [
  {
    title: "Driver Identity Assurance",
    description: "AADHAR/PAN checks, profile review and periodic revalidation.",
    icon: UserRoundCheck,
  },
  {
    title: "Trip Intelligence",
    description: "Route monitoring, anomaly detection and support escalation paths.",
    icon: Timer,
  },
  {
    title: "Community Trust Signals",
    description: "Ratings, report workflows and transparent accountability.",
    icon: Star,
  },
];

export const cityLaunchNote =
  "Built for Nanded and Ardhapur first — serving local trips, weddings, hospital visits and Hyderabad airport transfers, with plans to scale across Maharashtra's underserved mobility corridors.";
