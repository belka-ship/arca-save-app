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
          <h1 style={styles.logo}>ArcaSave.</h1>
          <h2 style={styles.headline}>Earn up to 7.4% APY</h2>
          <p style={styles.subtitle}>
            Zero fees. No minimum deposit. Withdraw anytime.
          </p>
          <button
            onClick={login}
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000'
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
    backgroundColor: '#FAFAFA',
    padding: '20px',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    padding: '0 20px',
  },
  logo: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#000000',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  headline: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#000000',
    margin: '24px 0 0 0',
    letterSpacing: '-1px',
    lineHeight: '1.1',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666666',
    margin: '8px 0 0 0',
    maxWidth: '320px',
    lineHeight: '1.5',
  },
  loginButton: {
    padding: '16px 48px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#000000',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '24px',
    width: '100%',
    maxWidth: '280px',
  },
}

export default App
