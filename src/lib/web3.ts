import { createPublicClient, http } from 'viem'
import { base } from 'viem/chains'

/**
 * Public client for read-only RPC calls on Base network
 */
export const publicClient = createPublicClient({
  chain: base,
  transport: http('https://mainnet.base.org'),
})
