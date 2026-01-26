import type { PrivyClientConfig } from '@privy-io/react-auth'
import { base } from 'viem/chains'

/**
 * Privy configuration for the app
 * - Simple EOA embedded wallets (not smart wallet)
 * - Base network as default
 * - Gas sponsorship via useSendTransaction with sponsor: true
 * - Auto-create wallet on login
 */
export const privyConfig: PrivyClientConfig = {
  // Login methods
  loginMethods: ['email', 'google'],
  
  // Appearance
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
    logo: undefined,
  },
  
  // Embedded wallet configuration - simple EOA wallets
  embeddedWallets: {
    ethereum: {
      createOnLogin: 'all-users',
    },
  },
  
  // Default chain
  defaultChain: base,
  
  // Supported chains
  supportedChains: [base],
}

/**
 * Base network configuration
 */
export const CHAIN_CONFIG = {
  chainId: 8453,
  name: 'Base',
  rpcUrl: 'https://mainnet.base.org',
} as const
