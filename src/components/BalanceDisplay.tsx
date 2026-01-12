import React, { useState, useCallback } from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { formatUSD, truncateAddress } from '../utils/formatters'

interface BalanceDisplayProps {
  totalValueUSD: bigint
  walletAddress: string
  isLoading: boolean
  onRefresh: () => void
}

/**
 * Main balance display component with refresh and copy functionality
 */
export const BalanceDisplay: React.FC<BalanceDisplayProps> = React.memo(
  ({ totalValueUSD, walletAddress, isLoading, onRefresh }) => {
    const [copied, setCopied] = useState(false)

    const handleCopyAddress = useCallback(async () => {
      if (!walletAddress) return

      try {
        await navigator.clipboard.writeText(walletAddress)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy address:', err)
      }
    }, [walletAddress])

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        {/* Balance row with refresh icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Large balance display */}
          <span
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              letterSpacing: '-1px',
            }}
          >
            {formatUSD(totalValueUSD)}
          </span>

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            style={{
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#808080',
              transition: 'color 0.2s',
              opacity: isLoading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
            aria-label="Refresh balance"
          >
            {isLoading ? (
              <LoadingSpinner size="small" />
            ) : (
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
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            )}
          </button>
        </div>

        {/* Wallet address with copy */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              color: '#808080',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            {truncateAddress(walletAddress)}
          </span>

          {/* Copy button */}
          <button
            onClick={handleCopyAddress}
            style={{
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: copied ? '#FFFFFF' : '#808080',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = copied ? '#FFFFFF' : '#808080')
            }
            aria-label="Copy address"
          >
            {copied ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
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
            )}
          </button>
        </div>
      </div>
    )
  }
)

BalanceDisplay.displayName = 'BalanceDisplay'
