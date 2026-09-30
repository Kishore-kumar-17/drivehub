import { MOCK_CARS } from "@/data/cars";
import { Car, CarFilterParams } from "@/lib/types";

/**
 * Repository layer: reads from mock data by default,
 * ready to plug into Prisma PostgreSQL queries if DATABASE_URL is set.
 */
export async function getCars(params: CarFilterParams = {}): Promise<Car[]> {
  let list = [...MOCK_CARS];

  // Search query (keyword across brand, model, variant, location)
  if (params.search && params.search.trim()) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.variant.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.year.toString().includes(q)
    );
  }

  // Brand
  if (params.brand && params.brand !== "all") {
    list = list.filter(
      (c) => c.brand.toLowerCase() === params.brand?.toLowerCase()
    );
  }

  // Model
  if (params.model && params.model !== "all") {
    list = list.filter(
      (c) => c.model.toLowerCase() === params.model?.toLowerCase()
    );
  }

  // Fuel Type
  if (params.fuel && params.fuel !== "all") {
    list = list.filter(
      (c) => c.fuel.toLowerCase() === params.fuel?.toLowerCase()
    );
  }

  // Transmission
  if (params.transmission && params.transmission !== "all") {
    list = list.filter(
      (c) => c.transmission.toLowerCase() === params.transmission?.toLowerCase()
    );
  }

  // Body Type
  if (params.bodyType && params.bodyType !== "all") {
    list = list.filter(
      (c) => c.bodyType.toLowerCase() === params.bodyType?.toLowerCase()
    );
  }

  // Ownership
  if (params.ownership && params.ownership !== "all") {
    list = list.filter(
      (c) => c.ownership.toLowerCase() === params.ownership?.toLowerCase()
    );
  }

  // Location
  if (params.location && params.location !== "all") {
    list = list.filter(
      (c) => c.location.toLowerCase() === params.location?.toLowerCase()
    );
  }

  // Price range
  if (params.minPrice !== undefined && params.minPrice > 0) {
    list = list.filter((c) => c.price >= (params.minPrice ?? 0));
  }
  if (params.maxPrice !== undefined && params.maxPrice > 0) {
    list = list.filter((c) => c.price <= (params.maxPrice ?? Infinity));
  }

  // Year range
  if (params.minYear !== undefined && params.minYear > 0) {
    list = list.filter((c) => c.year >= (params.minYear ?? 0));
  }
  if (params.maxYear !== undefined && params.maxYear > 0) {
    list = list.filter((c) => c.year <= (params.maxYear ?? 9999));
  }

  // KM Driven
  if (params.maxKm !== undefined && params.maxKm > 0) {
    list = list.filter((c) => c.kmDriven <= (params.maxKm ?? Infinity));
  }

  // Sorting
  switch (params.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      list.sort((a, b) => b.year - a.year);
      break;
    case "km-asc":
      list.sort((a, b) => a.kmDriven - b.kmDriven);
      break;
    case "recommended":
    default:
      // Featured first, then newest
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.year - a.year);
      break;
  }

  return list;
}

export async function getFeaturedCars(): Promise<Car[]> {
  return MOCK_CARS.filter((c) => c.featured);
}

export async function getCarBySlug(slug: string): Promise<Car | null> {
  const car = MOCK_CARS.find((c) => c.slug === slug);
  return car || null;
}

export async function getSimilarCars(currentCar: Car, limit: number = 3): Promise<Car[]> {
  return MOCK_CARS.filter(
    (c) =>
      c.id !== currentCar.id &&
      (c.bodyType === currentCar.bodyType || c.brand === currentCar.brand)
  ).slice(0, limit);
}

export function getFilterMetadata() {
  const brands = Array.from(new Set(MOCK_CARS.map((c) => c.brand))).sort();
  const fuels = Array.from(new Set(MOCK_CARS.map((c) => c.fuel))).sort();
  const transmissions = Array.from(
    new Set(MOCK_CARS.map((c) => c.transmission))
  ).sort();
  const bodyTypes = Array.from(new Set(MOCK_CARS.map((c) => c.bodyType))).sort();
  const locations = Array.from(new Set(MOCK_CARS.map((c) => c.location))).sort();

  return {
    brands,
    fuels,
    transmissions,
    bodyTypes,
    locations,
    minPrice: Math.min(...MOCK_CARS.map((c) => c.price)),
    maxPrice: Math.max(...MOCK_CARS.map((c) => c.price)),
  };
}
