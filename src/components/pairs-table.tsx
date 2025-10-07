"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ExternalLink, Star } from "lucide-react";
import { useChain } from "@/hooks/use-chain";
import { PairFilters } from "@/components/filters/pair-filters";
import Link from "next/link";

// Mock data - will be replaced with real API data
const mockPairs = [
  {
    id: "1",
    name: "PEPE/WETH",
    price: "$0.000001234",
    priceChange24h: 24.5,
    volume24h: "$2.1M",
    liquidity: "$5.3M",
    txns24h: { buys: 234, sells: 189 },
    marketCap: "$12.4M",
  },
  {
    id: "2",
    name: "SHIB/USDT",
    price: "$0.00002456",
    priceChange24h: 18.2,
    volume24h: "$5.3M",
    liquidity: "$12.8M",
    txns24h: { buys: 456, sells: 321 },
    marketCap: "$28.9M",
  },
  {
    id: "3",
    name: "DOGE/USDC",
    price: "$0.0789",
    priceChange24h: -5.3,
    volume24h: "$3.8M",
    liquidity: "$8.2M",
    txns24h: { buys: 189, sells: 234 },
    marketCap: "$18.7M",
  },
  {
    id: "4",
    name: "FLOKI/WETH",
    price: "$0.000345",
    priceChange24h: 9.5,
    volume24h: "$1.2M",
    liquidity: "$3.1M",
    txns24h: { buys: 123, sells: 98 },
    marketCap: "$9.2M",
  },
  {
    id: "5",
    name: "BONK/SOL",
    price: "$0.0000678",
    priceChange24h: -2.1,
    volume24h: "$890K",
    liquidity: "$2.4M",
    txns24h: { buys: 78, sells: 92 },
    marketCap: "$6.8M",
  },
  {
    id: "6",
    name: "WIF/USDT",
    price: "$1.234",
    priceChange24h: 42.8,
    volume24h: "$4.5M",
    liquidity: "$9.7M",
    txns24h: { buys: 567, sells: 432 },
    marketCap: "$34.2M",
  },
];

type SortKey = "name" | "price" | "priceChange24h" | "volume24h" | "liquidity";

export function PairsTable() {
  const { selectedChain } = useChain();
  const [pairs] = useState(mockPairs);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const toggleWatchlist = (pairId: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(pairId)) {
      newWatchlist.delete(pairId);
    } else {
      newWatchlist.add(pairId);
    }
    setWatchlist(newWatchlist);
  };

  return (
    <Card className="w-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {selectedChain.name} Pairs
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{pairs.length} pairs</Badge>
            <PairFilters />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-8 px-2"
                >
                  Pair
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price")}
                  className="h-8 px-2"
                >
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("priceChange24h")}
                  className="h-8 px-2"
                >
                  24h %
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("volume24h")}
                  className="h-8 px-2"
                >
                  Volume 24h
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("liquidity")}
                  className="h-8 px-2"
                >
                  Liquidity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Txns 24h</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pairs.map((pair) => (
              <TableRow key={pair.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleWatchlist(pair.id)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        watchlist.has(pair.id)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{pair.name}</TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {pair.price}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={pair.priceChange24h > 0 ? "default" : "destructive"}
                    className={
                      pair.priceChange24h > 0
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    }
                  >
                    {pair.priceChange24h > 0 ? "+" : ""}
                    {pair.priceChange24h}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {pair.volume24h}
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {pair.liquidity}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="text-green-500">{pair.txns24h.buys}B</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-red-500">{pair.txns24h.sells}S</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {pair.marketCap}
                </TableCell>
                <TableCell>
                  <Link href={`/token/${pair.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {pairs.map((pair) => (
          <Card key={pair.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleWatchlist(pair.id)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      watchlist.has(pair.id)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <div>
                  <p className="font-semibold">{pair.name}</p>
                  <p className="text-sm font-mono text-muted-foreground">
                    {pair.price}
                  </p>
                </div>
              </div>
              <Badge
                variant={pair.priceChange24h > 0 ? "default" : "destructive"}
                className={
                  pair.priceChange24h > 0
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }
              >
                {pair.priceChange24h > 0 ? "+" : ""}
                {pair.priceChange24h}%
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Volume 24h</p>
                <p className="font-mono">{pair.volume24h}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Liquidity</p>
                <p className="font-mono">{pair.liquidity}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Txns 24h</p>
                <p className="text-xs">
                  <span className="text-green-500">{pair.txns24h.buys}B</span>
                  <span className="text-muted-foreground"> / </span>
                  <span className="text-red-500">{pair.txns24h.sells}S</span>
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Market Cap</p>
                <p className="font-mono">{pair.marketCap}</p>
              </div>
            </div>

            <Link href={`/token/${pair.id}`}>
              <Button variant="outline" className="w-full" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </Card>
  );
}
