import React from 'react'

interface NewHeaderProps {
  onProfileClick: () => void
}

export const NewHeader: React.FC<NewHeaderProps> = ({ onProfileClick }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px',
        width: '100%',
        maxWidth: '500px',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
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
    </header>
  )
}
