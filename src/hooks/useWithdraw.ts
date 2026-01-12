import { useState, useCallback } from 'react'
import { encodeFunctionData, parseUnits, type Address } from 'viem'
import { publicClient } from '../lib/web3'
import { CONTRACTS, ERC20_ABI } from '../lib/contracts'
import { logError } from '../utils/errorHandler'

interface WithdrawState {
  isWithdrawing: boolean
  error: string | null
}

/**
 * Hook for withdrawing USDC from the wallet
 */
export function useWithdraw(
  walletAddress: Address | undefined,
  sendTransaction: (params: { to: string; data: string }) => Promise<{ hash: string }>
) {
  const [state, setState] = useState<WithdrawState>({
    isWithdrawing: false,
    error: null,
  })

  /**
   * Withdraw USDC to a specified address
   * @param amount - Amount in USD (e.g., "10.50")
   * @param toAddress - Recipient address
   */
  const withdraw = useCallback(
    async (amount: string, toAddress: string): Promise<boolean> => {
      if (!walletAddress) return false

      setState({ isWithdrawing: true, error: null })

      try {
        // Convert amount to USDC units (6 decimals)
        const amountInUnits = parseUnits(amount, 6)

        // Check if user has enough balance
        const balance = await publicClient.readContract({
          address: CONTRACTS.USDC,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        })

        if (balance < amountInUnits) {
          throw new Error('Insufficient balance')
        }

        // Encode transfer function call
        const data = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [toAddress as Address, amountInUnits],
        })

        // Send transaction
        const { hash } = await sendTransaction({
          to: CONTRACTS.USDC,
          data,
        })

        // Wait for confirmation
        await publicClient.waitForTransactionReceipt({ hash: hash as `0x${string}` })

        setState({ isWithdrawing: false, error: null })
        return true
      } catch (error) {
        logError('withdraw', error)
        setState({ isWithdrawing: false, error: 'Withdrawal failed' })
        return false
      }
    },
    [walletAddress, sendTransaction]
  )

  return {
    ...state,
    withdraw,
  }
}
