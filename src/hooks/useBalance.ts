import { useState, useCallback } from 'react'
import { publicClient } from '../lib/web3'
import { CONTRACTS, ERC20_ABI, MORPHO_VAULT_ABI } from '../lib/contracts'
import { logError } from '../utils/errorHandler'
import type { Address } from 'viem'

interface BalanceState {
  usdcBalance: bigint
  vaultShares: bigint
  vaultValue: bigint
  totalValueUSD: bigint
  isLoading: boolean
  error: string | null
}

const initialState: BalanceState = {
  usdcBalance: BigInt(0),
  vaultShares: BigInt(0),
  vaultValue: BigInt(0),
  totalValueUSD: BigInt(0),
  isLoading: false,
  error: null,
}

/**
 * Hook to query USDC and Morpho vault balances
 * Returns total value in USD terms
 */
export function useBalance(walletAddress: Address | undefined) {
  const [state, setState] = useState<BalanceState>(initialState)

  const queryBalances = useCallback(async (): Promise<{
    usdcBalance: bigint
    vaultValue: bigint
  }> => {
    if (!walletAddress) {
      return { usdcBalance: BigInt(0), vaultValue: BigInt(0) }
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Query USDC balance and vault shares in parallel
      const [usdcBalance, vaultShares] = await Promise.all([
        publicClient.readContract({
          address: CONTRACTS.USDC,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        }),
        publicClient.readContract({
          address: CONTRACTS.MORPHO_VAULT,
          abi: MORPHO_VAULT_ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        }),
      ])

      // Convert vault shares to underlying asset value
      let vaultValue = BigInt(0)
      if (vaultShares > BigInt(0)) {
        vaultValue = await publicClient.readContract({
          address: CONTRACTS.MORPHO_VAULT,
          abi: MORPHO_VAULT_ABI,
          functionName: 'convertToAssets',
          args: [vaultShares],
        })
      }

      // Calculate total value (USDC + vault value in USDC terms)
      const totalValueUSD = usdcBalance + vaultValue

      setState({
        usdcBalance,
        vaultShares,
        vaultValue,
        totalValueUSD,
        isLoading: false,
        error: null,
      })

      return { usdcBalance, vaultValue }
    } catch (error) {
      logError('queryBalances', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch balance',
      }))
      return { usdcBalance: BigInt(0), vaultValue: BigInt(0) }
    }
  }, [walletAddress])

  const resetBalances = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    ...state,
    queryBalances,
    resetBalances,
  }
}
