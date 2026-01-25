import React, { useState } from 'react'

interface WithdrawAddressModalProps {
  amount: string
  onClose: () => void
  onWithdraw: (address: string) => void
  isProcessing: boolean
}

export const WithdrawAddressModal: React.FC<WithdrawAddressModalProps> = ({
  amount,
  onClose,
  onWithdraw,
  isProcessing,
}) => {
  const [address, setAddress] = useState('')

  const handleWithdraw = () => {
    if (address && address.startsWith('0x') && address.length === 42) {
      onWithdraw(address)
    }
  }

  const isValidAddress = address.startsWith('0x') && address.length === 42

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
          disabled={isProcessing}
          style={{
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            fontSize: '24px',
            color: '#0A0A0A',
            opacity: isProcessing ? 0.5 : 1,
          }}
        >
          ✕
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: '#0A0A0A' }}>Withdraw</h2>
        <div style={{ width: '40px' }} />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '32px',
          padding: '20px 0',
        }}
      >
        {/* Amount display */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#404040', marginBottom: '8px' }}>
            Withdrawing
          </div>
          <div style={{ fontSize: '48px', fontWeight: 700, color: '#0A0A0A', letterSpacing: '-1px' }}>
            ${amount}
          </div>
        </div>

        {/* Address input */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#0A0A0A',
              marginBottom: '8px',
            }}
          >
            Recipient address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#0A0A0A',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #D4D4D4',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#204E41')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#D4D4D4')}
          />
          {address && !isValidAddress && (
            <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '8px' }}>
              Please enter a valid Ethereum address
            </div>
          )}
        </div>

        {/* Warning */}
        <div
          style={{
            padding: '16px',
            backgroundColor: '#FEF3C7',
            borderRadius: '12px',
            fontSize: '14px',
            color: '#92400E',
          }}
        >
          ⚠️ Double-check the address. Transactions cannot be reversed.
        </div>
      </div>

      {/* Withdraw button */}
      <button
        onClick={handleWithdraw}
        disabled={!isValidAddress || isProcessing}
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '16px',
          fontWeight: 500,
          color: '#FFFFFF',
          backgroundColor: isValidAddress && !isProcessing ? '#204E41' : '#a8a29e',
          border: 'none',
          borderRadius: '12px',
          cursor: isValidAddress && !isProcessing ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          if (isValidAddress && !isProcessing) e.currentTarget.style.backgroundColor = '#1a3f35'
        }}
        onMouseLeave={(e) => {
          if (isValidAddress && !isProcessing) e.currentTarget.style.backgroundColor = '#204E41'
        }}
      >
        {isProcessing ? 'Processing...' : 'Withdraw'}
      </button>
    </div>
  )
}
