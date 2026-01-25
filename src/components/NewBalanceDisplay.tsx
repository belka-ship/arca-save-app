import React, { useState } from 'react'
import { formatUSD, formatEarnings } from '../utils/formatters'
import { useEarningsTicker } from '../hooks/useEarningsTicker'

const RefreshIcon: React.FC<{ spinning?: boolean }> = ({ spinning }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      animation: spinning ? 'spin 1s linear infinite' : 'none',
    }}
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
)

interface NewBalanceDisplayProps {
  totalValueUSD: bigint
  earnedAmount: bigint
  isLoading: boolean
  onDeposit: () => void
  onWithdraw: () => void
  onRefresh: () => Promise<void>
}

export const NewBalanceDisplay: React.FC<NewBalanceDisplayProps> = ({
  totalValueUSD,
  earnedAmount: _earnedAmount,
  isLoading,
  onDeposit,
  onWithdraw,
  onRefresh,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Use live earnings ticker with 7.4% APY
  const liveEarnings = useEarningsTicker(totalValueUSD, 7.4)
  
  // Debug log to see the earnings value
  console.log('NewBalanceDisplay - totalValueUSD:', totalValueUSD.toString(), 'liveEarnings:', liveEarnings.toString())
  
  // Test formatting with a manual small value
  console.log('Test formatEarnings with small value:', formatEarnings(BigInt(1000))) // Should show $0.001

  const handleRefresh = async () => {
    if (isRefreshing || isLoading) return
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        width: '100%',
        maxWidth: '400px',
        padding: '0 20px',
      }}
    >
      {/* Earned amount */}
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '16px', color: '#204E41', fontWeight: 500 }}>
          {formatEarnings(liveEarnings)}
        </span>
        <span style={{ fontSize: '16px', color: '#404040', marginLeft: '4px' }}>
          earned
        </span>
      </div>

      {/* Main balance */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-2px',
              lineHeight: '1',
            }}
          >
            {formatUSD(totalValueUSD)}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '50%',
              cursor: isRefreshing || isLoading ? 'not-allowed' : 'pointer',
              color: '#a8a29e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s, background-color 0.2s',
              marginTop: '8px',
            }}
            onMouseEnter={(e) => {
              if (!isRefreshing && !isLoading) {
                e.currentTarget.style.color = '#204E41'
                e.currentTarget.style.backgroundColor = 'rgba(32, 78, 65, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#a8a29e'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            title="Refresh balance"
          >
            <RefreshIcon spinning={isRefreshing} />
          </button>
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#404040',
            marginTop: '12px',
          }}
        >
          Current rate: <span style={{ fontWeight: 600, color: '#204E41' }}>7.4% APY</span>
        </div>
      </div>


      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          width: '100%',
          marginTop: '16px',
        }}
      >
        <button
          onClick={onWithdraw}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#0A0A0A',
            backgroundColor: '#E8EFE9',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d9e5db')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E8EFE9')}
        >
          Withdraw
        </button>
        <button
          onClick={onDeposit}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#FFFFFF',
            backgroundColor: '#204E41',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a3f35')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#204E41')}
        >
          Deposit
        </button>
      </div>
    </div>
  )
}
