/**
 * Format a number as Indian Currency (e.g. ₹14.25 Lakh or ₹7.85 Lakh)
 */
export function formatPriceLakh(priceInRupees: number): string {
  if (!priceInRupees || priceInRupees <= 0) return "₹0";

  if (priceInRupees >= 10000000) {
    const crore = priceInRupees / 10000000;
    return `₹${crore.toFixed(2).replace(/\.00$/, "")} Crore`;
  }

  const lakh = priceInRupees / 100000;
  return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
}

/**
 * Format raw number in Indian comma format (e.g. 14,25,000)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format kilometers (e.g. 32,500 km)
 */
export function formatKM(km: number): string {
  if (typeof km !== "number") return "0 km";
  return `${new Intl.NumberFormat("en-IN").format(km)} km`;
}

/**
 * Standard EMI Calculation
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * @param principal Loan Amount in INR
 * @param annualInterestRate Annual interest rate in percent (e.g. 9.5)
 * @param tenureMonths Loan duration in months (e.g. 60)
 */
export function calculateEMI(
  principal: number,
  annualInterestRate: number = 9.5,
  tenureMonths: number = 60
): {
  monthlyEMI: number;
  totalInterest: number;
  totalPayable: number;
  loanAmount: number;
} {
  if (principal <= 0 || tenureMonths <= 0) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalPayable: 0,
      loanAmount: principal,
    };
  }

  const monthlyRate = annualInterestRate / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyEMI = Math.round(
    (principal * monthlyRate * factor) / (factor - 1)
  );

  const totalPayable = monthlyEMI * tenureMonths;
  const totalInterest = Math.max(0, totalPayable - principal);

  return {
    monthlyEMI,
    totalInterest,
    totalPayable,
    loanAmount: principal,
  };
}

/**
 * Default estimated monthly EMI for a car card
 * Assume 20% down payment (80% loan), 9.5% interest, 5 years (60 months)
 */
export function getEstimatedMonthlyEMI(carPrice: number): number {
  const loanAmount = carPrice * 0.8;
  const { monthlyEMI } = calculateEMI(loanAmount, 9.5, 60);
  return monthlyEMI;
}
