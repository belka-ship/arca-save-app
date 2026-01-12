import React from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { WalletInterface } from './components/WalletInterface'
import { LoadingSpinner } from './components/LoadingSpinner'

/**
 * Main App component
 * Handles authentication state and renders appropriate UI
 */
const App: React.FC = () => {
  const { ready, authenticated, login } = usePrivy()

  // Show loading while Privy initializes
  if (!ready) {
    return (
      <div style={styles.container}>
        <LoadingSpinner size="large" />
      </div>
    )
  }

  // Show login screen if not authenticated
  if (!authenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.loginContainer}>
          <h1 style={styles.title}>StableSave</h1>
          <p style={styles.subtitle}>
            Automatic USDC savings on Base
          </p>
          <button
            onClick={login}
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(25 65 53)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(32 78 65)'
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  // Show wallet interface when authenticated
  return <WalletInterface />
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFBF0',
    padding: '20px',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000000',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666666',
    margin: 0,
    maxWidth: '280px',
  },
  loginButton: {
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: 'rgb(32 78 65)',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '8px',
  },
}

export default App
