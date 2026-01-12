import React from 'react'
import { formatUSD } from '../utils/formatters'

interface NewBalanceDisplayProps {
  totalValueUSD: bigint
  earnedAmount: bigint
  isLoading: boolean
  onDeposit: () => void
  onWithdraw: () => void
}

export const NewBalanceDisplay: React.FC<NewBalanceDisplayProps> = ({
  totalValueUSD,
  earnedAmount,
  isLoading,
  onDeposit,
  onWithdraw,
}) => {
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
        <span style={{ fontSize: '16px', color: '#4ADE80', marginLeft: '4px' }}>
          earned
        </span>
      </div>

      {/* Main balance */}
      <div style={{ textAlign: 'center' }}>
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
        <div
          style={{
            fontSize: '14px',
            color: '#666666',
            marginTop: '12px',
          }}
        >
          365d avg. rate <strong>7.6% APY</strong>
        </div>
      </div>

      {/* Details button */}
      <button
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          color: '#000000',
          backgroundColor: '#F5F5F5',
          border: 'none',
          borderRadius: '24px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        Details
      </button>

      {/* Promo card */}
      <div
        style={{
          width: '100%',
          padding: '20px',
          backgroundColor: '#F5F5F5',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
            Earn a 30 day 1% APY boost
          </div>
          <div style={{ fontSize: '14px', color: '#666666' }}>
            Deposit $1,000 or more
          </div>
        </div>
        <div style={{ fontSize: '32px' }}>💰</div>
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
            color: '#000000',
            backgroundColor: '#4ADE80',
            border: 'none',
            borderRadius: '28px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3BC970')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4ADE80')}
        >
          Deposit
        </button>
      </div>
    </div>
  )
}
