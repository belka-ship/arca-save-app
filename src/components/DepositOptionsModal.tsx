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
            fontWeight: 700,
            margin: 0,
            color: '#0A0A0A',
            textAlign: 'center',
            letterSpacing: '-0.5px',
          }}
        >
          Deposit
        </h2>

        <p
          style={{
            fontSize: '16px',
            color: '#404040',
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
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #D4D4D4',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#204E41'
              e.currentTarget.style.backgroundColor = '#E8EFE9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#D4D4D4'
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
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
              {/* Coinbase logo */}
              <svg width="24" height="24" viewBox="0 0 1024 1024" fill="none">
                <circle cx="512" cy="512" r="512" fill="#0052FF"/>
                <path d="M512 692C412.72 692 332 611.28 332 512C332 412.72 412.72 332 512 332C601.44 332 675.92 396.24 690.08 480H870.4C854.88 296.32 700.96 152 512 152C313.6 152 152 313.6 152 512C152 710.4 313.6 872 512 872C700.96 872 854.88 727.68 870.4 544H690.08C675.92 627.76 601.44 692 512 692Z" fill="white"/>
              </svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '4px',
                }}
              >
                Coinbase
              </div>
              <div style={{ fontSize: '14px', color: '#404040' }}>
                Purchase USDC and transfer
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a8a29e"
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
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #D4D4D4',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#204E41'
              e.currentTarget.style.backgroundColor = '#E8EFE9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#D4D4D4'
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
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
              {/* USDC logo */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#2775CA"/>
                <path d="M20.5 18.5C20.5 16.25 19 15.5 16 15C13.75 14.625 13.25 14 13.25 13C13.25 12 14 11.375 15.5 11.375C16.875 11.375 17.625 11.875 17.875 12.875C17.9167 13.0417 18.0833 13.125 18.25 13.125H19.375C19.5833 13.125 19.75 12.9583 19.75 12.75V12.625C19.5 11.25 18.375 10.125 16.75 9.875V8.5C16.75 8.29167 16.5833 8.125 16.375 8.125H15.375C15.1667 8.125 15 8.29167 15 8.5V9.875C13 10.125 11.625 11.5 11.625 13.25C11.625 15.375 13 16.25 16 16.75C18 17.125 18.75 17.625 18.75 18.75C18.75 19.875 17.75 20.625 16.25 20.625C14.25 20.625 13.5 19.75 13.25 18.75C13.2083 18.5417 13 18.375 12.7917 18.375H11.625C11.4167 18.375 11.25 18.5417 11.25 18.75V18.875C11.5 20.5 12.75 21.75 15 22.125V23.5C15 23.7083 15.1667 23.875 15.375 23.875H16.375C16.5833 23.875 16.75 23.7083 16.75 23.5V22.125C18.75 21.75 20.5 20.375 20.5 18.5Z" fill="white"/>
                <path d="M12.875 24.625C8.625 23.125 6.375 18.375 7.875 14.125C8.625 12 10.25 10.375 12.375 9.625C12.5833 9.54167 12.75 9.375 12.75 9.125V8.125C12.75 7.91667 12.625 7.75 12.4167 7.70833C12.375 7.70833 12.2917 7.70833 12.25 7.75C7.125 9.375 4.375 14.875 6 20C7 23 9.375 25.375 12.375 26.375C12.5833 26.4583 12.7917 26.375 12.875 26.1667C12.9167 26.0833 12.9167 26.0417 12.9167 25.9583V24.9583C12.9167 24.7917 12.7917 24.625 12.5833 24.5833C12.625 24.625 12.875 24.625 12.875 24.625Z" fill="white"/>
                <path d="M19.75 7.75C19.5417 7.66667 19.3333 7.75 19.25 7.95833C19.2083 8.04167 19.2083 8.08333 19.2083 8.16667V9.16667C19.2083 9.375 19.375 9.54167 19.5417 9.625C23.7917 11.125 26.0417 15.875 24.5417 20.125C23.7917 22.25 22.1667 23.875 20.0417 24.625C19.8333 24.7083 19.6667 24.875 19.6667 25.125V26.125C19.6667 26.3333 19.7917 26.5 20 26.5417C20.0417 26.5417 20.125 26.5417 20.1667 26.5C25.2917 24.875 28.0417 19.375 26.4167 14.25C25.4167 11.125 23 8.75 19.75 7.75Z" fill="white"/>
              </svg>
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  marginBottom: '4px',
                }}
              >
                USDC deposit
              </div>
              <div style={{ fontSize: '14px', color: '#404040' }}>
                If you already own USDC
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a8a29e"
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
