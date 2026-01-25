import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      // Stub out Solana optional peer dependencies (not needed for Base/Ethereum)
      '@solana-program/system': '/dev/null',
      '@solana-program/token': '/dev/null',
      '@solana-program/compute-budget': '/dev/null',
      '@solana/web3.js': '/dev/null',
    },
  },
  optimizeDeps: {
    include: ['@privy-io/react-auth'],
    exclude: ['@solana-program/system', '@solana-program/token', '@solana-program/compute-budget', '@solana/web3.js'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      external: [
        '@solana-program/system',
        '@solana-program/token',
        '@solana-program/compute-budget',
        '@solana/web3.js',
      ],
    },
  },
})
