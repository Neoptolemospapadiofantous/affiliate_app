"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flame, TrendingUp, Clock } from "lucide-react";

// Mock data - will be replaced with real API data
const trendingPairs = [
  {
    id: "1",
    name: "PEPE/WETH",
    priceChange: 24.5,
    volume: "2.1M",
    icon: "🐸",
  },
  {
    id: "2",
    name: "SHIB/USDT",
    priceChange: 18.2,
    volume: "5.3M",
    icon: "🐕",
  },
  {
    id: "3",
    name: "DOGE/USDC",
    priceChange: 12.8,
    volume: "3.8M",
    icon: "🐶",
  },
  {
    id: "4",
    name: "FLOKI/WETH",
    priceChange: 9.5,
    volume: "1.2M",
    icon: "🦊",
  },
  {
    id: "5",
    name: "BONK/SOL",
    priceChange: 8.3,
    volume: "890K",
    icon: "🐕",
  },
];

const newPairs = [
  {
    id: "1",
    name: "NEWT/WETH",
    age: "2m ago",
    liquidity: "$125K",
  },
  {
    id: "2",
    name: "MOON/USDT",
    age: "5m ago",
    liquidity: "$89K",
  },
  {
    id: "3",
    name: "STAR/USDC",
    age: "8m ago",
    liquidity: "$156K",
  },
];

export function Sidebar() {
  return (
    <aside className="w-full lg:w-64 space-y-2">
      {/* Logo */}
      <Link href="/app" className="block px-2 py-3">
        <div className="font-bold text-base bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          CryptoTrack
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Affiliate Trading Platform
        </p>
      </Link>

      {/* Trending Pairs */}
      <Card className="p-2">
        <div className="flex items-center gap-1.5 mb-2">
          <Flame className="h-3.5 w-3.5 text-orange-500" />
          <h3 className="font-semibold text-sm">Trending</h3>
        </div>
        <ScrollArea className="h-[240px]">
          <div className="space-y-1.5">
            {trendingPairs.map((pair, index) => (
              <div
                key={pair.id}
                className="flex items-center justify-between p-1.5 rounded hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground w-3">
                    {index + 1}
                  </span>
                  <span className="text-sm">{pair.icon}</span>
                  <div>
                    <p className="font-medium text-xs">{pair.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Vol: {pair.volume}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={pair.priceChange > 0 ? "default" : "destructive"}
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20 text-[10px] px-1 py-0"
                >
                  +{pair.priceChange}%
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Hot Pairs */}
      <Card className="p-2">
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
          <h3 className="font-semibold text-sm">Hot Pairs</h3>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center p-1.5 rounded hover:bg-muted/50 cursor-pointer transition-colors">
            <span className="text-xs font-medium">🔥 Top Gainers</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">24</Badge>
          </div>
          <div className="flex justify-between items-center p-1.5 rounded hover:bg-muted/50 cursor-pointer transition-colors">
            <span className="text-xs font-medium">💎 High Volume</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">18</Badge>
          </div>
          <div className="flex justify-between items-center p-1.5 rounded hover:bg-muted/50 cursor-pointer transition-colors">
            <span className="text-xs font-medium">⚡ Most Active</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">32</Badge>
          </div>
        </div>
      </Card>

      {/* New Pairs */}
      <Card className="p-2">
        <div className="flex items-center gap-1.5 mb-2">
          <Clock className="h-3.5 w-3.5 text-purple-500" />
          <h3 className="font-semibold text-sm">New Pairs</h3>
        </div>
        <div className="space-y-1.5">
          {newPairs.map((pair) => (
            <div
              key={pair.id}
              className="flex items-center justify-between p-1.5 rounded hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-xs">{pair.name}</p>
                <p className="text-[10px] text-muted-foreground">{pair.age}</p>
              </div>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {pair.liquidity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
