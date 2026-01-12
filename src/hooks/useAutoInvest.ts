import { useState, useCallback, useRef } from 'react'
import { encodeFunctionData, type Address } from 'viem'
import { publicClient } from '../lib/web3'
import { CONTRACTS, ERC20_ABI, MORPHO_VAULT_ABI, MAX_UINT256 } from '../lib/contracts'
import { logError, isNetworkError } from '../utils/errorHandler'

interface AutoInvestState {
  isInvesting: boolean
  error: string | null
}

/**
 * Hook for automatic USDC investment into Morpho vault
 * Handles approval and deposit in a single flow
 */
export function useAutoInvest(
  walletAddress: Address | undefined,
  sendTransaction: (params: { to: string; data: string }) => Promise<{ hash: string }>
) {
  const [state, setState] = useState<AutoInvestState>({
    isInvesting: false,
    error: null,
  })
  
  // Prevent duplicate investments
  const isInvestingRef = useRef(false)

  /**
   * Check if vault has sufficient USDC allowance
   */
  const checkAllowance = useCallback(async (): Promise<bigint> => {
    if (!walletAddress) return BigInt(0)

    try {
      const allowance = await publicClient.readContract({
        address: CONTRACTS.USDC,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [walletAddress, CONTRACTS.MORPHO_VAULT],
      })
      return allowance
    } catch (error) {
      logError('checkAllowance', error)
      return BigInt(0)
    }
  }, [walletAddress])

  /**
   * Approve vault to spend USDC (max approval)
   */
  const approveVault = useCallback(async (): Promise<boolean> => {
    if (!walletAddress) return false

    try {
      const data = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACTS.MORPHO_VAULT, MAX_UINT256],
      })

      const { hash } = await sendTransaction({
        to: CONTRACTS.USDC,
        data,
      })

      // Wait for transaction confirmation
      await publicClient.waitForTransactionReceipt({ hash: hash as `0x${string}` })
      return true
    } catch (error) {
      logError('approveVault', error)
      return false
    }
  }, [walletAddress, sendTransaction])

  /**
   * Deposit USDC into Morpho vault
   */
  const depositToVault = useCallback(async (amount: bigint): Promise<boolean> => {
    if (!walletAddress || amount <= BigInt(0)) return false

    try {
      const data = encodeFunctionData({
        abi: MORPHO_VAULT_ABI,
        functionName: 'deposit',
        args: [amount, walletAddress],
      })

      const { hash } = await sendTransaction({
        to: CONTRACTS.MORPHO_VAULT,
        data,
      })

      // Wait for transaction confirmation
      await publicClient.waitForTransactionReceipt({ hash: hash as `0x${string}` })
      return true
    } catch (error) {
      logError('depositToVault', error)
      return false
    }
  }, [walletAddress, sendTransaction])

  /**
   * Execute full investment flow: check allowance -> approve if needed -> deposit
   * @param usdcBalance - Current USDC balance to invest
   * @returns true if investment succeeded
   */
  const investAll = useCallback(async (usdcBalance: bigint): Promise<boolean> => {
    // Prevent duplicate calls
    if (isInvestingRef.current || !walletAddress || usdcBalance <= BigInt(0)) {
      return false
    }

    isInvestingRef.current = true
    setState({ isInvesting: true, error: null })

    let retryCount = 0
    const maxRetries = 1

    const attemptInvest = async (): Promise<boolean> => {
      try {
        // Step 1: Check current allowance
        const allowance = await checkAllowance()

        // Step 2: Approve if needed
        if (allowance < usdcBalance) {
          const approved = await approveVault()
          if (!approved) {
            throw new Error('Approval failed')
          }
        }

        // Step 3: Get fresh USDC balance (might have changed)
        const currentBalance = await publicClient.readContract({
          address: CONTRACTS.USDC,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        })

        if (currentBalance <= BigInt(0)) {
          return true // Nothing to invest
        }

        // Step 4: Deposit all USDC
        const deposited = await depositToVault(currentBalance)
        if (!deposited) {
          throw new Error('Deposit failed')
        }

        return true
      } catch (error) {
        // Retry once for network errors
        if (isNetworkError(error) && retryCount < maxRetries) {
          retryCount++
          return attemptInvest()
        }
        throw error
      }
    }

    try {
      const result = await attemptInvest()
      setState({ isInvesting: false, error: null })
      return result
    } catch (error) {
      logError('investAll', error)
      setState({ isInvesting: false, error: 'Investment failed' })
      return false
    } finally {
      isInvestingRef.current = false
    }
  }, [walletAddress, checkAllowance, approveVault, depositToVault])

  return {
    ...state,
    investAll,
  }
}
