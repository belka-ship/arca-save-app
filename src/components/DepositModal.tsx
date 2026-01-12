import React, { useState, useCallback } from 'react'
import { truncateAddress } from '../utils/formatters'

interface DepositModalProps {
  walletAddress: string
  onClose: () => void
}

export const DepositModal: React.FC<DepositModalProps> = ({
  walletAddress,
  onClose,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [walletAddress])

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
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          alignSelf: 'flex-start',
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

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        {/* Coin image placeholder */}
        <div style={{ fontSize: '80px' }}>💰</div>

        {/* Title */}
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: 0,
            color: '#000000',
          }}
        >
          USDC deposit
        </h2>

        {/* Address with copy */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            backgroundColor: '#F5F5F5',
            borderRadius: '12px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#000000',
            }}
          >
            {truncateAddress(walletAddress)}
          </span>
          <button
            onClick={handleCopy}
            style={{
              padding: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: copied ? 'rgb(32 78 65)' : '#666666',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>

        {/* Disclaimers */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              i
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#000000' }}>
              This address is for depositing USDC on Base network only
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '18px',
              }}
            >
              ✕
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#000000' }}>
              Sending tokens on other networks may result in permanent lost
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '18px',
              }}
            >
              ✈️
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#000000' }}>
              Start with a test-send first
            </p>
          </div>
        </div>
      </div>

      {/* Close button at bottom */}
      <button
        onClick={onClose}
        style={{
          width: '100%',
          padding: '18px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#FFFFFF',
          backgroundColor: 'rgb(32 78 65)',
          border: 'none',
          borderRadius: '28px',
          cursor: 'pointer',
          marginTop: '32px',
        }}
      >
        Close
      </button>
    </div>
  )
}
