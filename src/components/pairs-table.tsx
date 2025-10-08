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

// Mock data - Ethereum pairs
const allPairs = [
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
    name: "LINK/USDC",
    price: "$15.234",
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
    name: "UNI/WETH",
    price: "$6.789",
    priceChange24h: -2.1,
    volume24h: "$890K",
    liquidity: "$2.4M",
    txns24h: { buys: 78, sells: 92 },
    marketCap: "$6.8M",
  },
  {
    id: "6",
    name: "MATIC/USDT",
    price: "$0.834",
    priceChange24h: 42.8,
    volume24h: "$4.5M",
    liquidity: "$9.7M",
    txns24h: { buys: 567, sells: 432 },
    marketCap: "$34.2M",
  },
  {
    id: "7",
    name: "AAVE/WETH",
    price: "$92.45",
    priceChange24h: 15.3,
    volume24h: "$6.2M",
    liquidity: "$15.4M",
    txns24h: { buys: 345, sells: 278 },
    marketCap: "$45.6M",
  },
  {
    id: "8",
    name: "CRV/USDT",
    price: "$0.567",
    priceChange24h: -8.4,
    volume24h: "$1.9M",
    liquidity: "$4.7M",
    txns24h: { buys: 156, sells: 189 },
    marketCap: "$8.3M",
  },
  {
    id: "9",
    name: "MKR/WETH",
    price: "$1456.78",
    priceChange24h: 7.2,
    volume24h: "$3.4M",
    liquidity: "$11.2M",
    txns24h: { buys: 89, sells: 67 },
    marketCap: "$25.8M",
  },
  {
    id: "10",
    name: "SNX/USDC",
    price: "$2.345",
    priceChange24h: -3.7,
    volume24h: "$2.6M",
    liquidity: "$6.8M",
    txns24h: { buys: 234, sells: 267 },
    marketCap: "$14.2M",
  },
  {
    id: "11",
    name: "SUSHI/WETH",
    price: "$0.956",
    priceChange24h: 11.8,
    volume24h: "$1.8M",
    liquidity: "$5.1M",
    txns24h: { buys: 178, sells: 145 },
    marketCap: "$9.7M",
  },
  {
    id: "12",
    name: "COMP/USDT",
    price: "$45.67",
    priceChange24h: -6.2,
    volume24h: "$2.3M",
    liquidity: "$7.9M",
    txns24h: { buys: 123, sells: 156 },
    marketCap: "$19.4M",
  },
  {
    id: "13",
    name: "YFI/WETH",
    price: "$7234.56",
    priceChange24h: 19.5,
    volume24h: "$5.6M",
    liquidity: "$18.3M",
    txns24h: { buys: 67, sells: 45 },
    marketCap: "$38.9M",
  },
  {
    id: "14",
    name: "1INCH/USDC",
    price: "$0.345",
    priceChange24h: -4.8,
    volume24h: "$1.4M",
    liquidity: "$4.2M",
    txns24h: { buys: 189, sells: 212 },
    marketCap: "$7.8M",
  },
  {
    id: "15",
    name: "BAL/WETH",
    price: "$4.567",
    priceChange24h: 8.9,
    volume24h: "$1.1M",
    liquidity: "$3.8M",
    txns24h: { buys: 145, sells: 123 },
    marketCap: "$6.5M",
  },
  {
    id: "16",
    name: "ENS/USDT",
    price: "$12.34",
    priceChange24h: 13.7,
    volume24h: "$2.9M",
    liquidity: "$8.1M",
    txns24h: { buys: 267, sells: 234 },
    marketCap: "$16.3M",
  },
  {
    id: "17",
    name: "LDO/WETH",
    price: "$2.145",
    priceChange24h: -7.3,
    volume24h: "$3.2M",
    liquidity: "$9.4M",
    txns24h: { buys: 198, sells: 245 },
    marketCap: "$12.7M",
  },
  {
    id: "18",
    name: "RPL/USDC",
    price: "$28.90",
    priceChange24h: 16.4,
    volume24h: "$1.7M",
    liquidity: "$5.6M",
    txns24h: { buys: 134, sells: 98 },
    marketCap: "$11.2M",
  },
  {
    id: "19",
    name: "FXS/WETH",
    price: "$5.678",
    priceChange24h: -9.1,
    volume24h: "$890K",
    liquidity: "$3.4M",
    txns24h: { buys: 87, sells: 112 },
    marketCap: "$5.9M",
  },
  {
    id: "20",
    name: "GALA/USDT",
    price: "$0.0234",
    priceChange24h: 22.6,
    volume24h: "$4.1M",
    liquidity: "$10.8M",
    txns24h: { buys: 456, sells: 378 },
    marketCap: "$23.5M",
  },
  {
    id: "21",
    name: "IMX/WETH",
    price: "$1.456",
    priceChange24h: 5.8,
    volume24h: "$2.8M",
    liquidity: "$7.3M",
    txns24h: { buys: 212, sells: 189 },
    marketCap: "$13.9M",
  },
  {
    id: "22",
    name: "APE/USDC",
    price: "$1.234",
    priceChange24h: -12.4,
    volume24h: "$5.9M",
    liquidity: "$14.2M",
    txns24h: { buys: 345, sells: 423 },
    marketCap: "$28.7M",
  },
  {
    id: "23",
    name: "GRT/WETH",
    price: "$0.167",
    priceChange24h: 9.3,
    volume24h: "$1.6M",
    liquidity: "$4.9M",
    txns24h: { buys: 178, sells: 145 },
    marketCap: "$8.4M",
  },
  {
    id: "24",
    name: "FTM/USDT",
    price: "$0.423",
    priceChange24h: -5.6,
    volume24h: "$2.4M",
    liquidity: "$6.7M",
    txns24h: { buys: 234, sells: 267 },
    marketCap: "$11.8M",
  },
  {
    id: "25",
    name: "SAND/WETH",
    price: "$0.345",
    priceChange24h: 14.2,
    volume24h: "$3.7M",
    liquidity: "$9.8M",
    txns24h: { buys: 298, sells: 245 },
    marketCap: "$19.6M",
  },
  {
    id: "26",
    name: "MANA/USDC",
    price: "$0.456",
    priceChange24h: -8.9,
    volume24h: "$2.1M",
    liquidity: "$5.8M",
    txns24h: { buys: 167, sells: 198 },
    marketCap: "$9.3M",
  },
  {
    id: "27",
    name: "CHZ/WETH",
    price: "$0.089",
    priceChange24h: 18.7,
    volume24h: "$1.9M",
    liquidity: "$4.6M",
    txns24h: { buys: 223, sells: 178 },
    marketCap: "$7.2M",
  },
  {
    id: "28",
    name: "AXS/USDT",
    price: "$6.234",
    priceChange24h: -11.3,
    volume24h: "$3.5M",
    liquidity: "$8.9M",
    txns24h: { buys: 189, sells: 234 },
    marketCap: "$15.7M",
  },
  {
    id: "29",
    name: "BLUR/WETH",
    price: "$0.289",
    priceChange24h: 25.4,
    volume24h: "$4.8M",
    liquidity: "$12.3M",
    txns24h: { buys: 378, sells: 298 },
    marketCap: "$21.4M",
  },
  {
    id: "30",
    name: "LRC/USDC",
    price: "$0.234",
    priceChange24h: -6.7,
    volume24h: "$1.3M",
    liquidity: "$3.9M",
    txns24h: { buys: 134, sells: 156 },
    marketCap: "$5.8M",
  },
];

type SortKey = "name" | "price" | "priceChange24h" | "volume24h" | "liquidity";

const PAIRS_PER_PAGE = 10;

export function PairsTable() {
  const { selectedChain } = useChain();
  const [displayCount, setDisplayCount] = useState(PAIRS_PER_PAGE);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  const pairs = allPairs.slice(0, displayCount);
  const hasMore = displayCount < allPairs.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + PAIRS_PER_PAGE, allPairs.length));
  };

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
    <Card className="w-full border-cyan-500/20 bg-black/80">
      <div className="p-3 border-b border-cyan-500/20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">
            {selectedChain.name} Pairs 📊
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 font-semibold">
              Showing {pairs.length} of {allPairs.length}
            </Badge>
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
              <TableRow key={pair.id} className="hover:bg-cyan-500/10 cursor-pointer border-cyan-500/10">
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
                <TableCell className="font-medium text-white">{pair.name}</TableCell>
                <TableCell className="text-right font-mono text-sm text-gray-300">
                  {pair.price}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={pair.priceChange24h > 0 ? "default" : "destructive"}
                    className={
                      pair.priceChange24h > 0
                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30 font-bold"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 font-bold"
                    }
                  >
                    {pair.priceChange24h > 0 ? "+" : ""}
                    {pair.priceChange24h}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-gray-300">
                  {pair.volume24h}
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-gray-300">
                  {pair.liquidity}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="text-emerald-400 font-bold">{pair.txns24h.buys}B</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-red-400 font-bold">{pair.txns24h.sells}S</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-gray-300">
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
          <Card key={pair.id} className="p-4 space-y-3 bg-black/60 border-cyan-500/20">
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
                        : "text-gray-400"
                    }`}
                  />
                </Button>
                <div>
                  <p className="font-semibold text-white">{pair.name}</p>
                  <p className="text-sm font-mono text-gray-400">
                    {pair.price}
                  </p>
                </div>
              </div>
              <Badge
                variant={pair.priceChange24h > 0 ? "default" : "destructive"}
                className={
                  pair.priceChange24h > 0
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold"
                    : "bg-red-500/20 text-red-400 border-red-500/30 font-bold"
                }
              >
                {pair.priceChange24h > 0 ? "+" : ""}
                {pair.priceChange24h}%
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Volume 24h</p>
                <p className="font-mono text-white">{pair.volume24h}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Liquidity</p>
                <p className="font-mono text-white">{pair.liquidity}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Txns 24h</p>
                <p className="text-xs">
                  <span className="text-emerald-400 font-bold">{pair.txns24h.buys}B</span>
                  <span className="text-gray-500"> / </span>
                  <span className="text-red-400 font-bold">{pair.txns24h.sells}S</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Market Cap</p>
                <p className="font-mono text-white">{pair.marketCap}</p>
              </div>
            </div>

            <Link href={`/token/${pair.id}`}>
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="p-4 border-t border-cyan-500/20">
          <Button
            variant="outline"
            className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50 font-semibold"
            onClick={loadMore}
          >
            Load More Pairs ({allPairs.length - displayCount} remaining) 👇
          </Button>
        </div>
      )}
    </Card>
  );
}
