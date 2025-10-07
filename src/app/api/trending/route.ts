import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chainId = searchParams.get("chainId") || "ethereum";

  try {
    // Example: Fetch trending pairs from your backend or external API
    // const response = await fetch(`https://api.example.com/trending?chain=${chainId}`);
    // const data = await response.json();

    // Mock response
    const mockData = {
      trending: [
        {
          id: "1",
          name: "PEPE/WETH",
          priceChange: 24.5,
          volume: "2.1M",
          icon: "🐸",
          rank: 1,
        },
        {
          id: "2",
          name: "SHIB/USDT",
          priceChange: 18.2,
          volume: "5.3M",
          icon: "🐕",
          rank: 2,
        },
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error("Error fetching trending pairs:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending pairs" },
      { status: 500 }
    );
  }
}
