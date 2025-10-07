# CryptoTrack - Crypto Affiliate Trading Platform

A professional cryptocurrency tracking and trading platform built with Next.js 15, featuring real-time price data, multi-chain support, and TradingView integration.

## Features

- 🌐 **Multi-Chain Support** - Track pairs across Ethereum, BSC, Polygon, Arbitrum, Base, Solana, and Avalanche
- 📊 **Real-Time Data** - Live price updates, volume tracking, and market insights
- 📱 **Mobile-First Design** - Fully responsive interface optimized for mobile devices
- 🎨 **Dark/Light Theme** - Beautiful UI with dark mode as default
- 🔍 **Advanced Filtering** - Sort and filter pairs by price, volume, liquidity, and more
- ⭐ **Watchlist** - Save your favorite pairs for quick access
- 📈 **TradingView Charts** - Professional charting with TradingView widgets
- 🔗 **Wallet Integration** - Connect wallet support (MetaMask, WalletConnect)

## Tech Stack

- **Framework**: Next.js 15.5.4 with React 19
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Theme**: next-themes
- **Icons**: Lucide React
- **Database**: Amazon RDS (PostgreSQL)
- **Hosting**: Vercel

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── pairs/         # Pairs data endpoint
│   │   └── trending/      # Trending pairs endpoint
│   ├── app/               # Main application
│   │   └── page.tsx       # App page with all components
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Header with chain selector
│   ├── footer.tsx        # Footer component
│   ├── sidebar.tsx       # Sidebar with trending pairs
│   ├── banner.tsx        # Banner with stats
│   ├── pairs-table.tsx   # Main pairs table
│   ├── tradingview-widget.tsx  # TradingView integration
│   └── theme-provider.tsx      # Theme provider
├── hooks/                # Custom React hooks
│   └── use-chain.tsx     # Chain context and hook
├── types/                # TypeScript type definitions
│   └── index.ts          # Main types (Chain, Pair, Token, etc.)
├── config/               # Configuration files
│   └── chains.ts         # Supported chains configuration
└── lib/                  # Utilities
    └── utils.ts          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd affiliate-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

### Environment Variables

See `.env.example` for required environment variables.

## API Integration

The app currently uses mock data. To integrate real data:

1. **DexScreener API**: Update `src/app/api/pairs/route.ts`
2. **CoinGecko API**: Add endpoints for additional market data
3. **Custom Backend**: Connect to your Amazon RDS database

Example API integration:

```typescript
// src/app/api/pairs/route.ts
const response = await fetch(
  `https://api.dexscreener.com/latest/dex/pairs/${chainId}`
);
const data = await response.json();
```

## Database Setup (Amazon RDS)

1. Create a PostgreSQL instance on Amazon RDS
2. Update `DATABASE_URL` in `.env.local`
3. Run migrations (if using Prisma or similar ORM)

## Customization

### Adding New Chains

Edit `src/config/chains.ts`:

```typescript
export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: "your-chain",
    name: "Your Chain",
    icon: "🔗",
    rpcUrl: "https://rpc.yourchain.com",
    explorerUrl: "https://explorer.yourchain.com",
    nativeCurrency: {
      name: "Token",
      symbol: "TKN",
      decimals: 18,
    },
  },
];
```

### Styling

- Modify theme colors in `src/app/globals.css`
- Update Tailwind config in `tailwind.config.ts`
- Customize components in `src/components/`

## Features Roadmap

- [ ] Real-time price updates via WebSocket
- [ ] User authentication and profiles
- [ ] Portfolio tracking
- [ ] Price alerts
- [ ] Advanced charting tools
- [ ] Social trading features
- [ ] Affiliate tracking system
- [ ] API access for developers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for the crypto community
