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
    <div className="w-full space-y-2">
      {/* Logo */}
      <Link href="/app" className="block px-2 py-3 bg-black/80 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
        <div className="font-bold text-base bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
          CryptoTrack ⚡
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5">
          Affiliate Trading Platform
        </p>
      </Link>

      {/* Trending Pairs */}
      <Card className="p-2 border-cyan-500/20 bg-black/80">
        <div className="flex items-center gap-1.5 mb-2">
          <Flame className="h-3.5 w-3.5 text-cyan-400" />
          <h3 className="font-semibold text-sm text-white">Trending 🔥</h3>
        </div>
        <ScrollArea className="h-[240px]">
          <div className="space-y-1.5">
            {trendingPairs.map((pair, index) => (
              <div
                key={pair.id}
                className="flex items-center justify-between p-1.5 rounded hover:bg-cyan-500/10 cursor-pointer transition-colors border border-transparent hover:border-cyan-500/20"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500 w-3">
                    {index + 1}
                  </span>
                  <span className="text-sm">{pair.icon}</span>
                  <div>
                    <p className="font-medium text-xs text-white">{pair.name}</p>
                    <p className="text-[10px] text-gray-400">
                      Vol: {pair.volume}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={pair.priceChange > 0 ? "default" : "destructive"}
                  className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30 text-[10px] px-1 py-0 font-bold"
                >
                  +{pair.priceChange}%
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Hot Pairs */}
      <Card className="p-2 border-cyan-500/20 bg-black/80">
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
          <h3 className="font-semibold text-sm text-white">Hot Pairs 🚀</h3>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center p-1.5 rounded hover:bg-cyan-500/10 cursor-pointer transition-colors border border-transparent hover:border-cyan-500/20">
            <span className="text-xs font-medium text-white">🔥 Top Gainers</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-cyan-500/30 text-cyan-400">24</Badge>
          </div>
          <div className="flex justify-between items-center p-1.5 rounded hover:bg-cyan-500/10 cursor-pointer transition-colors border border-transparent hover:border-cyan-500/20">
            <span className="text-xs font-medium text-white">💎 High Volume</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-cyan-500/30 text-cyan-400">18</Badge>
          </div>
          <div className="flex justify-between items-center p-1.5 rounded hover:bg-cyan-500/10 cursor-pointer transition-colors border border-transparent hover:border-cyan-500/20">
            <span className="text-xs font-medium text-white">⚡ Most Active</span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-cyan-500/30 text-cyan-400">32</Badge>
          </div>
        </div>
      </Card>

      {/* New Pairs */}
      <Card className="p-2 border-cyan-500/20 bg-black/80">
        <div className="flex items-center gap-1.5 mb-2">
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <h3 className="font-semibold text-sm text-white">New Pairs ✨</h3>
        </div>
        <div className="space-y-1.5">
          {newPairs.map((pair) => (
            <div
              key={pair.id}
              className="flex items-center justify-between p-1.5 rounded hover:bg-cyan-500/10 cursor-pointer transition-colors border border-transparent hover:border-cyan-500/20"
            >
              <div>
                <p className="font-medium text-xs text-white">{pair.name}</p>
                <p className="text-[10px] text-gray-400">{pair.age}</p>
              </div>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-cyan-500/30 text-cyan-400">
                {pair.liquidity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
