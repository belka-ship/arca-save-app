import React, { useState } from 'react'
import { formatUSD } from '../utils/formatters'

interface WithdrawAmountModalProps {
  maxBalance: bigint
  onClose: () => void
  onContinue: (amount: string) => void
}

export const WithdrawAmountModal: React.FC<WithdrawAmountModalProps> = ({
  maxBalance,
  onClose,
  onContinue,
}) => {
  const [amount, setAmount] = useState('')

  // Convert maxBalance from bigint (6 decimals) to number
  const maxBalanceNumber = Number(maxBalance) / 1e6
  const amountNumber = parseFloat(amount) || 0
  const exceedsBalance = amountNumber > maxBalanceNumber
  const isValidAmount = amount && amountNumber > 0 && !exceedsBalance

  const handleNumberClick = (num: string) => {
    if (num === '.' && amount.includes('.')) return
    if (amount.split('.')[1]?.length >= 2) return
    setAmount(amount + num)
  }

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1))
  }

  const handleContinue = () => {
    if (isValidAmount) {
      onContinue(amount)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFBF0',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onClose}
          style={{
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: '#0A0A0A',
          }}
        >
          ✕
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: '#0A0A0A' }}>Withdraw</h2>
        <div style={{ width: '40px' }} />
      </div>

      {/* Amount display */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#0A0A0A',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '-2px',
          }}
        >
          ${amount || '0'}
        </div>
        <div style={{ fontSize: '14px', color: exceedsBalance ? '#dc2626' : '#404040' }}>
          {exceedsBalance
            ? `Insufficient balance. Maximum: ${formatUSD(maxBalance)}`
            : `Available: ${formatUSD(maxBalance)}`
          }
        </div>
      </div>

      {/* Numpad */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((key) => (
          <button
            key={key}
            onClick={() => (key === '⌫' ? handleBackspace() : handleNumberClick(key))}
            style={{
              padding: '20px',
              fontSize: '24px',
              fontWeight: 500,
              color: '#0A0A0A',
              backgroundColor: '#E8EFE9',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d9e5db')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E8EFE9')}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!isValidAmount}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '16px',
          fontWeight: 500,
          color: '#FFFFFF',
          backgroundColor: isValidAmount ? '#204E41' : '#a8a29e',
          border: 'none',
          borderRadius: '12px',
          cursor: isValidAmount ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          if (isValidAmount) e.currentTarget.style.backgroundColor = '#1a3f35'
        }}
        onMouseLeave={(e) => {
          if (isValidAmount) e.currentTarget.style.backgroundColor = '#204E41'
        }}
      >
        Continue
      </button>
    </div>
  )
}
