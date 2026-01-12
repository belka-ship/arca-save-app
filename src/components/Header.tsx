import React from 'react'

interface HeaderProps {
  email: string | undefined
  onLogout: () => void
}

/**
 * Header component with user email and logout button
 */
export const Header: React.FC<HeaderProps> = React.memo(({ email, onLogout }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* User email */}
      <span
        style={{
          color: '#808080',
          fontSize: '14px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 50px)',
        }}
      >
        {email || ''}
      </span>

      {/* Logout button */}
      <button
        onClick={onLogout}
        style={{
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#808080',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
        aria-label="Logout"
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
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </header>
  )
})

Header.displayName = 'Header'
