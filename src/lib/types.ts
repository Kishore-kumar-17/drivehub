export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG";
export type TransmissionType = "Automatic" | "Manual";
export type BodyType = "SUV" | "Sedan" | "Hatchback" | "MUV" | "Coupe";
export type OwnershipType = "1st Owner" | "2nd Owner" | "3rd Owner";

export interface CarFeatures {
  comfort: string[];
  safety: string[];
  technology: string[];
  exterior?: string[];
}

export interface InspectionScores {
  overall: number;
  engine: number;
  exterior: number;
  interior: number;
  tyres: number;
  electrical: number;
  documents: number;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in INR e.g. 1425000
  originalPrice?: number;
  kmDriven: number;
  fuel: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  ownership: string;
  location: string;
  color: string;
  engine: string;
  power: string;
  torque: string;
  mileage: string;
  seatingCapacity: number;
  bootSpace?: string;
  insuranceValid: string;
  registrationYear: number;
  featured: boolean;
  conditionScore: number;
  images: string[];
  features: CarFeatures;
  inspectionScores: InspectionScores;
  description: string;
  isSold?: boolean;
  createdAt: string;
}

export interface CarFilterParams {
  search?: string;
  brand?: string;
  model?: string;
  fuel?: string;
  transmission?: string;
  bodyType?: string;
  ownership?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxKm?: number;
  sort?: "recommended" | "price-asc" | "price-desc" | "year-desc" | "km-asc";
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  carPurchased: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface TestDriveFormData {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  carId?: string;
  carTitle?: string;
  notes?: string;
}

export interface ValuationFormData {
  regNumber: string;
  brand: string;
  model: string;
  year: number;
  kmDriven: number;
  fuel: FuelType;
  transmission: TransmissionType;
  condition: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  name: string;
  phone: string;
  email: string;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  carId?: string;
  carTitle?: string;
  type?: "GENERAL" | "CAR_ENQUIRY" | "FINANCE" | "EXCHANGE";
}
