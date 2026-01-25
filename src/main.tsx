import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import { privyConfig } from './lib/privy'
import App from './App'
import './polyfills'
import './index.css'

const appId = import.meta.env.VITE_PRIVY_APP_ID

const root = createRoot(document.getElementById('root')!)

if (!appId) {
  root.render(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ color: '#c00', marginBottom: '16px' }}>Configuration Error</h1>
      <p>Missing VITE_PRIVY_APP_ID environment variable.</p>
      <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
        Please add this to your Vercel environment variables.
      </p>
    </div>
  )
} else {
  root.render(
    <StrictMode>
      <PrivyProvider appId={appId} config={privyConfig}>
        <App />
      </PrivyProvider>
    </StrictMode>,
  )
}
