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

  const handleNumberClick = (num: string) => {
    if (num === '.' && amount.includes('.')) return
    if (amount.split('.')[1]?.length >= 2) return
    setAmount(amount + num)
  }

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1))
  }

  const handleContinue = () => {
    if (amount && parseFloat(amount) > 0) {
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
            color: '#000000',
          }}
        >
          ✕
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0, color: '#000000' }}>Withdraw</h2>
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
            fontWeight: 'bold',
            color: '#000000',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          ${amount || '0'}
        </div>
        <div style={{ fontSize: '14px', color: '#666666' }}>
          Available: {formatUSD(maxBalance)}
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
              fontWeight: '500',
              color: '#000000',
              backgroundColor: '#F5F5F5',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!amount || parseFloat(amount) <= 0}
        style={{
          width: '100%',
          padding: '18px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#FFFFFF',
          backgroundColor: amount && parseFloat(amount) > 0 ? 'rgb(32 78 65)' : '#E5E5E5',
          border: 'none',
          borderRadius: '28px',
          cursor: amount && parseFloat(amount) > 0 ? 'pointer' : 'not-allowed',
        }}
      >
        Continue
      </button>
    </div>
  )
}
