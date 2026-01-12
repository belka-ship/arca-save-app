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
        <span style={{ fontSize: '16px', color: 'rgb(32 78 65)', marginLeft: '4px' }}>
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
            backgroundColor: 'rgb(32 78 65)',
            border: 'none',
            borderRadius: '28px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(25 65 53)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(32 78 65)')}
        >
          Deposit
        </button>
      </div>
    </div>
  )
}
