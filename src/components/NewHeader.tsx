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
        padding: '20px',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <button
        onClick={onProfileClick}
        style={{
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Profile"
      >
        <svg
          width="24"
          height="24"
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
      </button>

      <button
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          color: '#000000',
          backgroundColor: '#F5F5F5',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        Earn more
      </button>
    </header>
  )
}
