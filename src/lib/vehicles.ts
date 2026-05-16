export type VehicleBrand = "maruti" | "hyundai" | "tata" | "mahindra" | "toyota" | "force" | "honda" | "school_bus" | "other";

export const vehicleBrands: { value: VehicleBrand; label: string }[] = [
  { value: "maruti", label: "Maruti Suzuki" },
  { value: "hyundai", label: "Hyundai" },
  { value: "tata", label: "Tata" },
  { value: "mahindra", label: "Mahindra" },
  { value: "toyota", label: "Toyota" },
  { value: "force", label: "Force" },
  { value: "honda", label: "Honda" },
  { value: "school_bus", label: "School Bus" },
  { value: "other", label: "Other (not listed)" },
];

export const vehicleModels: Record<VehicleBrand, { value: string; label: string }[]> = {
  maruti: [
    { value: "swift", label: "Swift" },
    { value: "dzire", label: "Dzire" },
    { value: "ertiga", label: "Ertiga" },
    { value: "xl6", label: "XL6" },
    { value: "alto", label: "Alto" },
    { value: "baleno", label: "Baleno" },
    { value: "celerio", label: "Celerio" },
  ],
  hyundai: [
    { value: "aura", label: "Aura" },
    { value: "i10", label: "i10" },
    { value: "i20", label: "i20" },
    { value: "grand_i10", label: "Grand i10" },
    { value: "venue", label: "Venue" },
    { value: "creta", label: "Creta" },
  ],
  tata: [
    { value: "tigor", label: "Tigor" },
    { value: "nexon", label: "Nexon" },
    { value: "harrier", label: "Harrier" },
    { value: "indica", label: "Indica" },
    { value: "altroz", label: "Altroz" },
  ],
  mahindra: [
    { value: "scorpio", label: "Scorpio" },
    { value: "scorpio_classic", label: "Scorpio Classic" },
    { value: "xuv500", label: "XUV500" },
    { value: "bolero", label: "Bolero" },
    { value: "nuvosport", label: "Nuvosport" },
  ],
  toyota: [
    { value: "innova", label: "Innova Crysta" },
    { value: "fortuner", label: "Fortuner" },
    { value: "glanza", label: "Glanza" },
  ],
  force: [
    { value: "cruiser", label: "Cruiser" },
    { value: "gurkha", label: "Gurkha" },
  ],
  honda: [
    { value: "amaze", label: "Amaze" },
    { value: "city", label: "City" },
    { value: "jazz", label: "Jazz" },
  ],
  school_bus: [
    { value: "standard", label: "Standard School Bus" },
  ],
  other: [],
};

export function getModelsByBrand(brand: VehicleBrand) {
  return vehicleModels[brand] || [];
}
