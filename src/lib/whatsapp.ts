import { DEALERSHIP_CONFIG } from "./config";
import { formatPriceLakh } from "./formatters";
import { Car } from "./types";

/**
 * Build WhatsApp click to chat URL
 */
export function buildWhatsAppLink(message: string, phone: string = DEALERSHIP_CONFIG.whatsappNumber): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Specific message for an individual car listing
 */
export function getCarWhatsAppLink(car: Pick<Car, "brand" | "model" | "variant" | "year" | "price">): string {
  const priceFormatted = formatPriceLakh(car.price);
  const message = `Hi DRIVEHUB, I'm interested in the ${car.brand} ${car.model} ${car.variant} (${car.year}) listed at ${priceFormatted}. Is it available?`;
  return buildWhatsAppLink(message);
}

/**
 * Message for test drive booking
 */
export function getTestDriveWhatsAppLink(carTitle: string): string {
  const message = `Hi DRIVEHUB, I would like to schedule a test drive for the ${carTitle}. Please let me know available slots.`;
  return buildWhatsAppLink(message);
}

/**
 * Message for valuation
 */
export function getValuationWhatsAppLink(regNumber?: string, carDetails?: string): string {
  const details = carDetails ? ` (${carDetails})` : "";
  const reg = regNumber ? ` Reg No: ${regNumber}` : "";
  const message = `Hi DRIVEHUB, I would like an estimated valuation to sell my car${details}.${reg}`;
  return buildWhatsAppLink(message);
}

/**
 * General dealer inquiry
 */
export function getGeneralWhatsAppLink(): string {
  const message = "Hi DRIVEHUB, I am exploring your verified pre-owned car inventory and would like some assistance.";
  return buildWhatsAppLink(message);
}
