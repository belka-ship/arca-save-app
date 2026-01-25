import React from 'react'

interface NewHeaderProps {
  onProfileClick: () => void
}

export const NewHeader: React.FC<NewHeaderProps> = ({ onProfileClick }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        width: '100%',
        maxWidth: '500px',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: '20px',
          fontWeight: 600,
          letterSpacing: '-0.5px',
          color: '#0A0A0A',
        }}
      >
        ArcaSave<span style={{ color: '#204E41' }}>.</span>
      </div>

      {/* Profile button */}
      <button
        onClick={onProfileClick}
        style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#0A0A0A',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          border: '1px solid #D4D4D4',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(32, 78, 65, 0.3)'
          e.currentTarget.style.color = '#204E41'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#D4D4D4'
          e.currentTarget.style.color = '#0A0A0A'
        }}
        aria-label="Profile"
      >
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
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Account</span>
      </button>
    </header>
  )
}
