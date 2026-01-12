# StableSave

A minimalist Web3 wallet that automatically invests USDC into Morpho vaults on Base network.

## Features

- **Simple Authentication**: Login with Google or email via Privy
- **Smart Wallet**: Automatic Safe smart wallet creation
- **Gasless Transactions**: All gas fees are sponsored
- **Auto-Invest**: USDC is automatically invested into Morpho vault
- **Unified Balance**: See your total balance in USD

## Setup

1. Clone and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your Privy App ID:
   ```bash
   cp .env.example .env
   ```
   
   Get your Privy App ID from [Privy Dashboard](https://dashboard.privy.io)

3. Configure Privy Dashboard:
   - Enable embedded wallets
   - Enable Safe smart wallet type
   - Enable Base mainnet
   - Configure gas sponsorship for Base

4. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React + TypeScript
- Vite
- Privy SDK (authentication + embedded wallets)
- viem (Web3 library)
- Base mainnet

## Architecture

```
/src
  /components      - UI components
  /hooks           - Custom React hooks
  /lib             - Configuration and contracts
  /utils           - Utility functions
```

## Contract Addresses (Base Mainnet)

- USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- Morpho Steakhouse Prime USDC Vault: `0xBEEFE94c8aD530842bfE7d8B397938fFc1cb83b2`
