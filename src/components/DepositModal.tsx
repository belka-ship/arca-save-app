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
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setIsAnimating(true)
      setCopied(true)

      // Reset animation state after the animation completes
      setTimeout(() => setIsAnimating(false), 300)
      // Reset copied state after showing feedback
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
          color: '#0A0A0A',
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
            fontWeight: 700,
            margin: 0,
            color: '#0A0A0A',
            letterSpacing: '-0.5px',
          }}
        >
          USDC deposit
        </h2>

        {/* Address with copy */}
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            backgroundColor: copied ? '#E8F5E9' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: copied ? '1.5px solid #204E41' : '1.5px solid #E5E5E5',
            cursor: 'pointer',
            boxShadow: copied
              ? '0 0 0 4px rgba(32, 78, 65, 0.12)'
              : '0 2px 8px rgba(0, 0, 0, 0.04)',
            transform: isAnimating ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#0A0A0A',
              letterSpacing: '0.5px',
            }}
          >
            {truncateAddress(walletAddress)}
          </span>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: copied ? '#204E41' : '#F5F5F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isAnimating ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            {copied ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: copied ? 'checkmark 0.3s ease-out' : 'none',
                }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#737373"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </div>
        </button>

        {/* CSS keyframes for checkmark animation */}
        <style>
          {`
            @keyframes checkmark {
              0% {
                transform: scale(0) rotate(-45deg);
                opacity: 0;
              }
              50% {
                transform: scale(1.2) rotate(0deg);
              }
              100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
              }
            }
          `}
        </style>

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
                border: '2px solid #204E41',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#204E41',
              }}
            >
              i
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#404040' }}>
              This address is for depositing USDC on Base network only
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '14px',
                color: '#dc2626',
              }}
            >
              ✕
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#404040' }}>
              Sending tokens on other networks may result in permanent loss
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
            <p style={{ margin: 0, fontSize: '14px', color: '#404040' }}>
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
          padding: '16px',
          fontSize: '16px',
          fontWeight: 500,
          color: '#FFFFFF',
          backgroundColor: '#204E41',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          marginTop: '32px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a3f35')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#204E41')}
      >
        Close
      </button>
    </div>
  )
}
