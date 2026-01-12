import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import { privyConfig } from './lib/privy'
import App from './App'
import './polyfills'
import './index.css'

const appId = import.meta.env.VITE_PRIVY_APP_ID

if (!appId) {
  throw new Error('Missing VITE_PRIVY_APP_ID environment variable')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider appId={appId} config={privyConfig}>
      <App />
    </PrivyProvider>
  </StrictMode>,
)
