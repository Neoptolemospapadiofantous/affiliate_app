import { NextRequest, NextResponse } from "next/server";

// This is a placeholder API route
// You'll need to replace this with actual API calls to DexScreener, CoinGecko, or your backend
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chainId = searchParams.get("chainId") || "ethereum";

  try {
    // Example: Fetch from DexScreener API
    // const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/${chainId}`);
    // const data = await response.json();

    // Mock response for now
    const mockData = {
      pairs: [
        {
          id: "1",
          chainId: chainId,
          dexId: "uniswap",
          url: "https://dexscreener.com/ethereum/0x123",
          pairAddress: "0x123abc",
          baseToken: {
            address: "0xabc",
            name: "Pepe",
            symbol: "PEPE",
            decimals: 18,
          },
          quoteToken: {
            address: "0xdef",
            name: "Wrapped Ether",
            symbol: "WETH",
            decimals: 18,
          },
          priceNative: "0.000001234",
          priceUsd: "0.0000025",
          txns: {
            h24: {
              buys: 234,
              sells: 189,
            },
          },
          volume: {
            h24: 2100000,
          },
          priceChange: {
            h24: 24.5,
          },
          liquidity: {
            usd: 5300000,
          },
          marketCap: 12400000,
        },
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error("Error fetching pairs:", error);
    return NextResponse.json(
      { error: "Failed to fetch pairs" },
      { status: 500 }
    );
  }
}
