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
          <h1 style={styles.logo}>ArcaSave<span style={{ color: '#204E41' }}>.</span></h1>
          <h2 style={styles.headline}>
            Earn up to <span style={{ color: '#204E41' }}>7.4%</span> APY
          </h2>
          <p style={styles.subtitle}>
            Zero fees. No minimum deposit. Withdraw anytime.
          </p>
          <button
            onClick={login}
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a3f35'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#204E41'
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
    gap: '16px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    padding: '0 20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#0A0A0A',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  headline: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#0A0A0A',
    margin: '24px 0 0 0',
    letterSpacing: '-1.5px',
    lineHeight: '1.1',
  },
  subtitle: {
    fontSize: '18px',
    color: '#404040',
    margin: '8px 0 0 0',
    maxWidth: '320px',
    lineHeight: '1.5',
  },
  loginButton: {
    padding: '16px 48px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#FFFFFF',
    backgroundColor: '#204E41',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '24px',
    width: '100%',
    maxWidth: '280px',
  },
}

export default App
