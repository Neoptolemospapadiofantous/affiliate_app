export interface Chain {
  id: string
  name: string
  icon: string
  rpcUrl: string
  explorerUrl: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

export interface Token {
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI?: string
  chainId: string
}

export interface Pair {
  id: string
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: Token
  quoteToken: Token
  priceNative: string
  priceUsd: string
  txns: {
    h24: {
      buys: number
      sells: number
    }
  }
  volume: {
    h24: number
  }
  priceChange: {
    h24: number
  }
  liquidity: {
    usd: number
  }
  fdv?: number
  marketCap?: number
  pairCreatedAt?: number
}

export interface TrendingPair extends Pair {
  trending: true
  rank: number
}

export interface WalletState {
  address: string | null
  chainId: string | null
  isConnected: boolean
  isConnecting: boolean
}

export type SortDirection = "asc" | "desc"

export interface SortConfig {
  key: keyof Pair
  direction: SortDirection
}

export interface FilterConfig {
  minLiquidity?: number
  minVolume?: number
  minPriceChange?: number
  maxPriceChange?: number
}
