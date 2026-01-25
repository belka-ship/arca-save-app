import React from 'react'

interface ProfileModalProps {
  email: string | undefined
  onClose: () => void
  onLogout: () => void
  onUSDCAddress: () => void
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  email,
  onClose,
  onLogout,
  onUSDCAddress,
}) => {
  const menuItems = [
    { icon: '💵', label: 'USDC address', action: onUSDCAddress },
    { icon: '✉️', label: 'Email us', action: () => window.location.href = 'mailto:vpikarevskis@gmail.com' },
    { icon: '🚪', label: 'Logout', action: onLogout },
  ]

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
        overflowY: 'auto',
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
          marginBottom: '20px',
        }}
      >
        ✕
      </button>

      {/* Profile header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            margin: '0 0 8px 0',
            color: '#0A0A0A',
            letterSpacing: '-1px',
          }}
        >
          Profile
        </h1>
        <div style={{ fontSize: '14px', color: '#404040' }}>
          {email || 'user@example.com'} · v1.0.36
        </div>
      </div>

      {/* Menu items */}
      <div>
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              background: 'none',
              border: 'none',
              borderBottom: index < menuItems.length - 1 ? '1px solid #E8EFE9' : 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#0A0A0A',
              textAlign: 'left',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#204E41')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#0A0A0A')}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontWeight: 500 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
