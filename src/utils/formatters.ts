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
 * Truncate an Ethereum address for display
 * @param address - Full address string
 * @returns Truncated string like "0x1234...5678"
 */
export function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
