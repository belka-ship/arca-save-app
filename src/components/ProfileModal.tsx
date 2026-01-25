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
    { icon: '✉️', label: 'Email us', action: () => window.location.href = 'mailto:v@pikarevskis.com' },
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
        backgroundColor: '#FAFAFA',
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
          color: '#000000',
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
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000000',
          }}
        >
          Profile
        </h1>
        <div style={{ fontSize: '14px', color: '#666666' }}>
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
              borderBottom: index < menuItems.length - 1 ? '1px solid #F0F0F0' : 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#000000',
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontWeight: '500' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
