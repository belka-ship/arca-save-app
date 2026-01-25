import { useState, useEffect, useRef } from 'react'

/**
 * Hook to calculate and display live earnings ticker
 * Updates every 3 seconds with compound interest calculation
 */
export const useEarningsTicker = (
  totalBalance: bigint,
  apyRate: number = 7.4
) => {
  const [earnings, setEarnings] = useState<bigint>(BigInt(0))
  const startTimeRef = useRef<number>(Date.now())
  const initialBalanceRef = useRef<bigint>(totalBalance)

  // Reset when balance changes significantly (new deposit/withdrawal)
  useEffect(() => {
    if (totalBalance !== initialBalanceRef.current) {
      startTimeRef.current = Date.now()
      initialBalanceRef.current = totalBalance
      setEarnings(BigInt(0))
    }
  }, [totalBalance])

  useEffect(() => {
    const calculateEarnings = () => {
      if (totalBalance === BigInt(0)) {
        setEarnings(BigInt(0))
        return
      }

      // Calculate time elapsed in seconds
      const now = Date.now()
      const elapsedSeconds = (now - startTimeRef.current) / 1000

      // Convert APY to per-second rate for compound interest
      // Formula: A = P * (1 + r)^t
      // Where r = (1 + APY)^(1/seconds_per_year) - 1
      const secondsPerYear = 365.25 * 24 * 60 * 60
      const apyDecimal = apyRate / 100
      
      // Calculate compound interest with accelerated display for visibility
      // Using high precision: convert bigint to number for calculation, then back
      const balanceNumber = Number(totalBalance) / 1e6 // Convert from 6 decimals USDC
      
      // Use accelerated time for better visibility (1 second = 1 hour in display)
      const displayElapsedSeconds = elapsedSeconds * 3600 // Accelerate by 3600x
      const compoundFactor = Math.pow(1 + apyDecimal, displayElapsedSeconds / secondsPerYear)
      const newBalance = balanceNumber * compoundFactor
      const earningsNumber = newBalance - balanceNumber
      
      // Convert back to bigint (6 decimals precision)
      // Use Math.round instead of Math.floor to preserve small values
      const earningsBigInt = BigInt(Math.round(earningsNumber * 1e6))
      
      // Debug log for small balances
      if (balanceNumber < 1) {
        console.log('Earnings calculation:', {
          balance: balanceNumber,
          elapsedSeconds,
          compoundFactor,
          earningsNumber,
          earningsBigInt: earningsBigInt.toString()
        })
      }
      
      setEarnings(earningsBigInt)
    }

    // Calculate immediately
    calculateEarnings()

    // Update every 3 seconds
    const interval = setInterval(calculateEarnings, 3000)

    return () => clearInterval(interval)
  }, [totalBalance, apyRate])

  return earnings
}
