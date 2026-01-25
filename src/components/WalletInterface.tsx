import React, { useEffect, useCallback, useRef, useMemo, useState } from 'react'
import { usePrivy, useWallets, useSendTransaction } from '@privy-io/react-auth'
import type { Address } from 'viem'
import { NewHeader } from './NewHeader'
import { NewBalanceDisplay } from './NewBalanceDisplay'
import { DepositModal } from './DepositModal'
import { WithdrawAmountModal } from './WithdrawAmountModal'
import { WithdrawAddressModal } from './WithdrawAddressModal'
import { ProfileModal } from './ProfileModal'
import { LoadingSpinner } from './LoadingSpinner'
import { useBalance } from '../hooks/useBalance'
import { useAutoInvest } from '../hooks/useAutoInvest'
import { useWithdraw } from '../hooks/useWithdraw'
import { CHAIN_CONFIG } from '../lib/privy'

/**
 * Main wallet interface component
 * Handles balance display and automatic USDC investment
 */
export const WalletInterface: React.FC = () => {
  const { user, logout } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()
  
  // Find the embedded wallet
  const embeddedWallet = useMemo(
    () => wallets.find((w) => w.walletClientType === 'privy'),
    [wallets]
  )
  
  const walletAddress = embeddedWallet?.address as Address | undefined

  // Privy's sendTransaction hook with gas sponsorship support
  const { sendTransaction: privySendTransaction } = useSendTransaction()

  // Custom hooks
  const {
    totalValueUSD,
    isLoading: isLoadingBalance,
    queryBalances,
  } = useBalance(walletAddress)

  // Create sponsored sendTransaction wrapper using Privy's native gas sponsorship
  const sendTransaction = useCallback(
    async (params: { to: string; data: string }) => {
      if (!walletAddress) throw new Error('No wallet available')
      
      // Use Privy's sendTransaction with sponsor: true for gas sponsorship
      const receipt = await privySendTransaction(
        {
          to: params.to as `0x${string}`,
          data: params.data as `0x${string}`,
          chainId: CHAIN_CONFIG.chainId,
        },
        {
          address: walletAddress,
          sponsor: true, // Enable gas sponsorship
        }
      )
      
      return { hash: receipt.hash }
    },
    [walletAddress, privySendTransaction]
  )

  const { isInvesting, investAll } = useAutoInvest(walletAddress, sendTransaction)
  const { isWithdrawing, withdraw } = useWithdraw(walletAddress, sendTransaction)

  // Modal states
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdrawAmount, setShowWithdrawAmount] = useState(false)
  const [showWithdrawAddress, setShowWithdrawAddress] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')

  // Track if initial load has happened
  const hasInitialized = useRef(false)

  // Get user email
  const userEmail = user?.email?.address || user?.google?.email

  /**
   * Query balances and auto-invest if USDC detected
   */
  const checkAndInvest = useCallback(async () => {
    if (!walletAddress) return

    const { usdcBalance: balance } = await queryBalances()

    // Auto-invest if USDC is detected
    if (balance > BigInt(0)) {
      const success = await investAll(balance)
      if (success) {
        // Refresh balances after investment
        await queryBalances()
      }
    }
  }, [walletAddress, queryBalances, investAll])

  /**
   * Handle withdraw flow
   */
  const handleWithdrawContinue = useCallback((amount: string) => {
    setWithdrawAmount(amount)
    setShowWithdrawAmount(false)
    setShowWithdrawAddress(true)
  }, [])

  const handleWithdrawSubmit = useCallback(async (address: string) => {
    const success = await withdraw(withdrawAmount, address)
    if (success) {
      setShowWithdrawAddress(false)
      setWithdrawAmount('')
      // Refresh balances
      await queryBalances()
    }
  }, [withdraw, withdrawAmount, queryBalances])

  // Initial balance check when wallet is ready
  useEffect(() => {
    if (walletsReady && walletAddress && !hasInitialized.current) {
      hasInitialized.current = true
      checkAndInvest()
    }
  }, [walletsReady, walletAddress, checkAndInvest])

  // Close modals when navigating back
  const handleCloseWithdraw = useCallback(() => {
    setShowWithdrawAmount(false)
    setShowWithdrawAddress(false)
    setWithdrawAmount('')
  }, [])

  // Show loading while wallets are initializing
  if (!walletsReady || !walletAddress) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: '#FFFBF0',
        }}
      >
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const isLoading = isLoadingBalance || isInvesting || isWithdrawing

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: '#FFFBF0',
          position: 'relative',
        }}
      >
        <NewHeader onProfileClick={() => setShowProfile(true)} />

        <NewBalanceDisplay
          totalValueUSD={totalValueUSD}
          earnedAmount={BigInt(0)}
          isLoading={isLoading}
          onDeposit={() => setShowDeposit(true)}
          onWithdraw={() => setShowWithdrawAmount(true)}
          onRefresh={checkAndInvest}
        />
      </div>

      {/* Modals */}
      {showDeposit && (
        <DepositModal
          walletAddress={walletAddress}
          onClose={() => setShowDeposit(false)}
        />
      )}

      {showWithdrawAmount && (
        <WithdrawAmountModal
          maxBalance={totalValueUSD}
          onClose={handleCloseWithdraw}
          onContinue={handleWithdrawContinue}
        />
      )}

      {showWithdrawAddress && (
        <WithdrawAddressModal
          amount={withdrawAmount}
          onClose={handleCloseWithdraw}
          onWithdraw={handleWithdrawSubmit}
          isProcessing={isWithdrawing}
        />
      )}

      {showProfile && (
        <ProfileModal
          email={userEmail}
          onClose={() => setShowProfile(false)}
          onLogout={logout}
        />
      )}
    </>
  )
}
