import React, { useState } from 'react'
import { formatUSD } from '../utils/formatters'

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
  earnedAmount,
  isLoading,
  onDeposit,
  onWithdraw,
  onRefresh,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

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
        <span style={{ fontSize: '16px', color: '#666666' }}>
          {formatUSD(earnedAmount)}
        </span>
        <span style={{ fontSize: '16px', color: '#000000', marginLeft: '4px' }}>
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
              fontWeight: 'bold',
              color: '#000000',
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
              color: '#666666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s, background-color 0.2s',
              marginTop: '8px',
            }}
            onMouseEnter={(e) => {
              if (!isRefreshing && !isLoading) {
                e.currentTarget.style.color = '#000000'
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666666'
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
            color: '#666666',
            marginTop: '12px',
          }}
        >
          Current rate: <strong>5.5% APY</strong>
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
            padding: '18px',
            fontSize: '18px',
            fontWeight: '600',
            color: '#000000',
            backgroundColor: '#F5F5F5',
            border: 'none',
            borderRadius: '28px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5E5E5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
        >
          Withdraw
        </button>
        <button
          onClick={onDeposit}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '18px',
            fontSize: '18px',
            fontWeight: '600',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            border: 'none',
            borderRadius: '28px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
        >
          Deposit
        </button>
      </div>
    </div>
  )
}
