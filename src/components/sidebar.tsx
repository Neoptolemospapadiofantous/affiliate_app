"use client";

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
    <aside className="w-full lg:w-80 space-y-4">
      {/* Trending Pairs */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold">Trending</h3>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {trendingPairs.map((pair, index) => (
              <div
                key={pair.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4">
                    {index + 1}
                  </span>
                  <span className="text-lg">{pair.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{pair.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Vol: {pair.volume}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={pair.priceChange > 0 ? "default" : "destructive"}
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                >
                  +{pair.priceChange}%
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Hot Pairs */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold">Hot Pairs</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <span className="text-sm font-medium">🔥 Top Gainers</span>
            <Badge variant="outline" className="text-xs">24</Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <span className="text-sm font-medium">💎 High Volume</span>
            <Badge variant="outline" className="text-xs">18</Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <span className="text-sm font-medium">⚡ Most Active</span>
            <Badge variant="outline" className="text-xs">32</Badge>
          </div>
        </div>
      </Card>

      {/* New Pairs */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold">New Pairs</h3>
        </div>
        <div className="space-y-3">
          {newPairs.map((pair) => (
            <div
              key={pair.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-sm">{pair.name}</p>
                <p className="text-xs text-muted-foreground">{pair.age}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {pair.liquidity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
