import React from 'react'

interface DepositOptionsModalProps {
  onClose: () => void
  onCoinbase: () => void
  onUSDCDeposit: () => void
}

export const DepositOptionsModal: React.FC<DepositOptionsModalProps> = ({
  onClose,
  onCoinbase,
  onUSDCDeposit,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FAFAFA',
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
          gap: '24px',
          maxWidth: '400px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            margin: 0,
            color: '#000000',
            textAlign: 'center',
          }}
        >
          Deposit
        </h2>

        <p
          style={{
            fontSize: '16px',
            color: '#666666',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Choose how you'd like to deposit USDC
        </p>

        {/* Options */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            marginTop: '16px',
          }}
        >
          {/* Coinbase option */}
          <button
            onClick={onCoinbase}
            style={{
              width: '100%',
              padding: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#000000'
              e.currentTarget.style.backgroundColor = '#FAFAFA'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E5E5'
              e.currentTarget.style.backgroundColor = '#FFFFFF'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#0052FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '4px',
                }}
              >
                Coinbase
              </div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                Purchase USDC and transfer
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* USDC deposit option */}
          <button
            onClick={onUSDCDeposit}
            style={{
              width: '100%',
              padding: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#000000'
              e.currentTarget.style.backgroundColor = '#FAFAFA'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E5E5'
              e.currentTarget.style.backgroundColor = '#FFFFFF'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#2775CA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>$</span>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: '4px',
                }}
              >
                USDC deposit
              </div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                If you already own USDC
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
