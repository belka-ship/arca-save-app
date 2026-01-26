import { useState, useEffect, useCallback, useRef } from 'react'
import { publicClient } from '../lib/web3'
import { CONTRACTS, MORPHO_VAULT_ABI } from '../lib/contracts'
import type { Address } from 'viem'

interface EarningsData {
  totalInvested: bigint      // Total USDC deposited into vault
  totalWithdrawn: bigint     // Total USDC withdrawn from vault
  currentValue: bigint       // Current position value in USDC
  netEarnings: bigint        // (currentValue + totalWithdrawn) - totalInvested
  isLoading: boolean
  error: string | null
}

interface BaseScanTransfer {
  from: string
  to: string
  value: string
  tokenSymbol: string
  tokenDecimal: string
  contractAddress: string
}

const BASESCAN_API = 'https://api.basescan.org/api'
const USDC_ADDRESS = CONTRACTS.USDC.toLowerCase()
const VAULT_ADDRESS = CONTRACTS.MORPHO_VAULT.toLowerCase()

// Cache to avoid hitting rate limits
const earningsCache = new Map<string, { data: EarningsData; timestamp: number }>()
const CACHE_TTL = 60000 // 1 minute cache

/**
 * Hook to calculate real PnL from Morpho Vault position
 * Uses BaseScan API to fetch deposit/withdrawal history
 * Formula: Net Earnings = (Current Value + Total Withdrawn) - Total Invested
 */
export function useRealEarnings(walletAddress: Address | undefined): EarningsData & { refresh: () => Promise<void> } {
  const [data, setData] = useState<EarningsData>({
    totalInvested: BigInt(0),
    totalWithdrawn: BigInt(0),
    currentValue: BigInt(0),
    netEarnings: BigInt(0),
    isLoading: true,
    error: null,
  })

  const isFetchingRef = useRef(false)

  const fetchEarnings = useCallback(async (forceRefresh = false) => {
    if (!walletAddress || isFetchingRef.current) return

    const cacheKey = walletAddress.toLowerCase()
    const cached = earningsCache.get(cacheKey)

    // Use cache if fresh and not forcing refresh
    if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setData(cached.data)
      return
    }

    isFetchingRef.current = true
    setData(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Fetch token transfers and current position in parallel
      const [transfers, vaultShares] = await Promise.all([
        fetchTokenTransfers(walletAddress),
        publicClient.readContract({
          address: CONTRACTS.MORPHO_VAULT,
          abi: MORPHO_VAULT_ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        }),
      ])

      // Calculate deposits and withdrawals from transfer history
      let totalInvested = BigInt(0)
      let totalWithdrawn = BigInt(0)

      const userAddress = walletAddress.toLowerCase()

      for (const tx of transfers) {
        const from = tx.from.toLowerCase()
        const to = tx.to.toLowerCase()
        const tokenAddress = tx.contractAddress.toLowerCase()
        const value = BigInt(tx.value)

        // Only process USDC transfers
        if (tokenAddress !== USDC_ADDRESS) continue

        // Deposit: User sends USDC to Vault
        if (from === userAddress && to === VAULT_ADDRESS) {
          totalInvested += value
        }

        // Withdrawal: Vault sends USDC to User
        if (from === VAULT_ADDRESS && to === userAddress) {
          totalWithdrawn += value
        }
      }

      // Get current position value in USDC
      let currentValue = BigInt(0)
      if (vaultShares > BigInt(0)) {
        currentValue = await publicClient.readContract({
          address: CONTRACTS.MORPHO_VAULT,
          abi: MORPHO_VAULT_ABI,
          functionName: 'convertToAssets',
          args: [vaultShares],
        })
      }

      // Calculate net earnings
      // Formula: (Current Value + Total Withdrawn) - Total Invested
      const netEarnings = (currentValue + totalWithdrawn) - totalInvested

      const newData: EarningsData = {
        totalInvested,
        totalWithdrawn,
        currentValue,
        netEarnings,
        isLoading: false,
        error: null,
      }

      // Cache the result
      earningsCache.set(cacheKey, { data: newData, timestamp: Date.now() })
      setData(newData)

    } catch (error) {
      console.error('Failed to fetch earnings:', error)
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch earnings',
      }))
    } finally {
      isFetchingRef.current = false
    }
  }, [walletAddress])

  // Fetch on mount and when wallet changes
  useEffect(() => {
    fetchEarnings()
  }, [fetchEarnings])

  const refresh = useCallback(async () => {
    await fetchEarnings(true)
  }, [fetchEarnings])

  return { ...data, refresh }
}

/**
 * Fetch all ERC20 token transfers for an address from BaseScan
 * Uses the tokentx endpoint which returns all transfers in one request
 */
async function fetchTokenTransfers(address: string): Promise<BaseScanTransfer[]> {
  const url = new URL(BASESCAN_API)
  url.searchParams.set('module', 'account')
  url.searchParams.set('action', 'tokentx')
  url.searchParams.set('address', address)
  url.searchParams.set('startblock', '0')
  url.searchParams.set('endblock', '99999999')
  url.searchParams.set('sort', 'asc')

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`BaseScan API error: ${response.status}`)
  }

  const data = await response.json()

  if (data.status !== '1') {
    // Status 0 with "No transactions found" is not an error
    if (data.message === 'No transactions found') {
      return []
    }
    throw new Error(data.message || 'BaseScan API returned an error')
  }

  return data.result as BaseScanTransfer[]
}
