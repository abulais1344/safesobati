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

export type FeaturedDriver = {
  name: string;
  city: string;
  rating: number;
  ridesCompleted: number;
  languages: string[];
  responseTime: string;
  profileImage: string;
  vehicleModel: string;
  vehicleImage: string;
  eta: string;
  seats: number;
  ac: boolean;
  whatsapp: string;
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
  { label: "Verified Drivers", value: "2,500+" },
  { label: "Cities In Pipeline", value: "40+" },
  { label: "Avg Pickup Time", value: "7 min" },
  { label: "Rated Safety", value: "4.9/5" },
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
    from: "Ardhapur",
    to: "Nanded City",
    distance: "40 km",
    travelTime: "55 min",
    baseFare: "INR 1,200",
    image:
      "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Hazur Sahib",
    distance: "8 km",
    travelTime: "22 min",
    baseFare: "INR 220",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "DGGMC Hospital",
    distance: "5 km",
    travelTime: "14 min",
    baseFare: "INR 180",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Parbhani",
    distance: "65 km",
    travelTime: "1 hr 22 min",
    baseFare: "INR 2,250",
    image:
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Latur",
    distance: "145 km",
    travelTime: "2 hr 45 min",
    baseFare: "INR 4,900",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    from: "Nanded",
    to: "Hyderabad Airport",
    distance: "280 km",
    travelTime: "5 hr 20 min",
    baseFare: "INR 8,400",
    image:
      "https://images.unsplash.com/photo-1556122071-e404cb6f31dc?auto=format&fit=crop&w=1200&q=80",
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

export const featuredDrivers: FeaturedDriver[] = [
  {
    name: "Imran Shaikh",
    city: "Nanded",
    rating: 4.9,
    ridesCompleted: 1824,
    languages: ["Hindi", "Marathi", "Urdu"],
    responseTime: "1.2 min",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80",
    vehicleModel: "Maruti Dzire 2022",
    vehicleImage:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    eta: "6 min",
    seats: 4,
    ac: true,
    whatsapp: "919876543210",
  },
  {
    name: "Sunita Patil",
    city: "Nanded",
    rating: 4.8,
    ridesCompleted: 1362,
    languages: ["Hindi", "Marathi", "English"],
    responseTime: "1.7 min",
    profileImage:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=480&q=80",
    vehicleModel: "Hyundai Aura 2023",
    vehicleImage:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    eta: "8 min",
    seats: 4,
    ac: true,
    whatsapp: "919876543211",
  },
  {
    name: "Ravi Jadhav",
    city: "Parbhani",
    rating: 4.7,
    ridesCompleted: 955,
    languages: ["Hindi", "Marathi"],
    responseTime: "2.1 min",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=480&q=80",
    vehicleModel: "Tata Tigor EV",
    vehicleImage:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
    eta: "9 min",
    seats: 4,
    ac: true,
    whatsapp: "919876543212",
  },
  {
    name: "Farha Naaz",
    city: "Nanded",
    rating: 4.9,
    ridesCompleted: 1118,
    languages: ["Hindi", "Urdu", "Marathi"],
    responseTime: "1.4 min",
    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=480&q=80",
    vehicleModel: "Toyota Innova",
    vehicleImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    eta: "11 min",
    seats: 6,
    ac: true,
    whatsapp: "919876543213",
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
