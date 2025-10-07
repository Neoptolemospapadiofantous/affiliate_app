"use client";

import { use } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingViewWidget } from "@/components/tradingview-widget";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  Copy,
} from "lucide-react";
import Link from "next/link";

// Mock token data
const getTokenData = (id: string) => ({
  id,
  symbol: "PEPE",
  name: "Pepe",
  icon: "🐸",
  price: "$0.000001234",
  priceChange24h: 24.5,
  priceChange7d: 45.8,
  volume24h: "$2.1M",
  volumeChange24h: 18.5,
  liquidity: "$5.3M",
  marketCap: "$12.4M",
  holders: "23,456",
  totalSupply: "420,690,000,000,000",
  circulatingSupply: "391,790,000,000,000",
  chain: "Ethereum",
  pairAddress: "0x1234567890abcdef1234567890abcdef12345678",
  dex: "Uniswap V3",
  createdAt: "3 months ago",
});

export default function TokenDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const token = getTokenData(id);

  return (
    <DashboardLayout showSidebar={false}>
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/app">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Markets
          </Button>
        </Link>

        {/* Token Header */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{token.icon}</div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">{token.name}</h1>
                  <Badge variant="outline">{token.symbol}</Badge>
                  <Badge variant="outline">{token.chain}</Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  Trading on {token.dex} • Created {token.createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                Trade Now
              </Button>
            </div>
          </div>

          {/* Price Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="text-2xl font-bold">{token.price}</p>
              <div className="flex items-center gap-1 mt-1">
                <Badge
                  variant="default"
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{token.priceChange24h}%
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-2xl font-bold">{token.marketCap}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Rank #42
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-2xl font-bold">{token.volume24h}</p>
              <div className="flex items-center gap-1 mt-1">
                <Badge
                  variant="default"
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                >
                  +{token.volumeChange24h}%
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
              <p className="text-2xl font-bold">{token.liquidity}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Locked
              </p>
            </div>
          </div>
        </Card>

        {/* Chart and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TradingViewWidget symbol="PEPEUSDT" theme="dark" />
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Token Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">7d Change</span>
                  <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                    +{token.priceChange7d}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Holders</span>
                  <span className="font-medium">{token.holders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Supply</span>
                  <span className="font-medium text-xs">{token.totalSupply}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Circulating</span>
                  <span className="font-medium text-xs">{token.circulatingSupply}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Contract Address</h3>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-muted p-2 rounded flex-1 overflow-hidden text-ellipsis">
                  {token.pairAddress}
                </code>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View on Explorer
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Activity className="h-4 w-4" />
                  View on DexScreener
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Join Community
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Transactions and Info Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Badge variant={i % 2 === 0 ? "default" : "destructive"} className={
                        i % 2 === 0
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }>
                        {i % 2 === 0 ? "BUY" : "SELL"}
                      </Badge>
                      <div>
                        <p className="font-medium">250M {token.symbol}</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$3,085.50</p>
                      <p className="text-xs text-muted-foreground">0x1234...5678</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">About {token.name}</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                  {token.name} ({token.symbol}) is a meme cryptocurrency that has gained significant
                  popularity in the crypto community. The token operates on the {token.chain} blockchain
                  and has developed a strong community following.
                </p>
                <p className="mt-4">
                  With its unique branding and community-driven approach, {token.symbol} has become
                  one of the most traded tokens in the meme coin category.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Technical Analysis</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="font-medium mb-2">Trend Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    The token is currently in a strong uptrend with increasing volume and
                    positive momentum indicators.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="font-medium mb-2">Support & Resistance</p>
                  <p className="text-sm text-muted-foreground">
                    Key support level at $0.000001000 and resistance at $0.000001500
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
