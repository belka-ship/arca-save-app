import { useState, useCallback } from 'react'
import { encodeFunctionData, parseUnits, type Address } from 'viem'
import { publicClient } from '../lib/web3'
import { CONTRACTS, ERC20_ABI, MORPHO_VAULT_ABI } from '../lib/contracts'
import { logError } from '../utils/errorHandler'

interface WithdrawState {
  isWithdrawing: boolean
  error: string | null
}

/**
 * Hook for withdrawing USDC from the Morpho vault to a specified address
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
   * Withdraw USDC from Morpho vault to a specified address
   * 1. Withdraw from Morpho vault (converts shares to USDC, sends to wallet)
   * 2. Transfer USDC to the recipient address
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

        // Get vault share balance
        const vaultShares = await publicClient.readContract({
          address: CONTRACTS.MORPHO_VAULT,
          abi: MORPHO_VAULT_ABI,
          functionName: 'balanceOf',
          args: [walletAddress],
        })

        // Get the USDC value of vault shares
        const vaultAssetsValue = await publicClient.readContract({
          address: CONTRACTS.MORPHO_VAULT,
          abi: MORPHO_VAULT_ABI,
          functionName: 'convertToAssets',
          args: [vaultShares],
        })

        // Check if user has enough balance in vault
        if (vaultAssetsValue < amountInUnits) {
          throw new Error('Insufficient balance')
        }

        // Step 1: Withdraw from Morpho vault using withdraw function
        // This withdraws the specified USDC amount to the wallet
        const withdrawData = encodeFunctionData({
          abi: MORPHO_VAULT_ABI,
          functionName: 'withdraw',
          args: [amountInUnits, walletAddress, walletAddress],
        })

        const { hash: withdrawHash } = await sendTransaction({
          to: CONTRACTS.MORPHO_VAULT,
          data: withdrawData,
        })

        // Wait for vault withdrawal confirmation
        await publicClient.waitForTransactionReceipt({ hash: withdrawHash as `0x${string}` })

        // Step 2: Transfer USDC to the recipient address
        const transferData = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [toAddress as Address, amountInUnits],
        })

        const { hash: transferHash } = await sendTransaction({
          to: CONTRACTS.USDC,
          data: transferData,
        })

        // Wait for transfer confirmation
        await publicClient.waitForTransactionReceipt({ hash: transferHash as `0x${string}` })

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
