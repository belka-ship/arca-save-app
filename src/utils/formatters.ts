import { USDC_DECIMALS } from '../lib/contracts'

/**
 * Format a balance in USD with 2 decimal places
 * @param amount - Amount in base units (6 decimals for USDC)
 * @returns Formatted string like "$1,234.56"
 */
export function formatUSD(amount: bigint): string {
  const value = Number(amount) / Math.pow(10, USDC_DECIMALS)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format earnings with appropriate decimal places
 * Shows more decimals for small values, fewer for large values
 * @param amount - Amount in base units (6 decimals for USDC)
 * @returns Formatted string like "$0.12" or "$1,234.56"
 */
export function formatEarnings(amount: bigint): string {
  const value = Number(amount) / Math.pow(10, USDC_DECIMALS)
  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  // Determine decimal places based on magnitude
  let decimals = 2
  if (absValue > 0 && absValue < 0.01) {
    decimals = 4
  } else if (absValue >= 0.01 && absValue < 1) {
    decimals = 3
  }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(absValue)

  return sign + formatted
}

/**
 * Truncate an Ethereum address for display
 * @param address - Full address string
 * @returns Truncated string like "0x1234...5678"
 */
export function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
