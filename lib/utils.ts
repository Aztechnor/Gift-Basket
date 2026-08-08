import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

// Conversion rate (for demonstration purposes)
// In a real app, you would use an API to get current rates
export const USD_TO_KES_RATE = 130

// Convert USD prices to KES
export function convertToKES(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_KES_RATE)
}
