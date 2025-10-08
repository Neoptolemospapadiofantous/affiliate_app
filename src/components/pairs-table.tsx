"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ChevronDown } from "lucide-react";
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
    launchDate: "2023-04-15",
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
    launchDate: "2023-03-22",
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
    launchDate: "2023-05-10",
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
    launchDate: "2023-06-01",
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
    launchDate: "2023-02-18",
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
    launchDate: "2023-01-30",
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
    launchDate: "2023-04-05",
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
    launchDate: "2023-03-14",
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
    launchDate: "2023-05-20",
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
    launchDate: "2023-02-28",
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
    launchDate: "2023-06-12",
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
    launchDate: "2023-01-15",
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
    launchDate: "2023-04-20",
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
    launchDate: "2023-03-08",
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
    launchDate: "2023-05-25",
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
    launchDate: "2023-02-10",
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
    launchDate: "2023-06-05",
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
    launchDate: "2023-01-22",
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
    launchDate: "2023-04-18",
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
    launchDate: "2023-03-01",
  },
];

const PAIRS_PER_PAGE = 20;

export function PairsTable() {
  const { selectedChain } = useChain();
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  // Show all pairs - vertical scroll instead of pagination
  const pairs = allPairs;

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
      {/* Header - Collapsible - 100% WIDTH */}
      <div className="w-full p-3 border-b border-cyan-500/20 cursor-pointer hover:bg-cyan-500/5 transition-colors"
        onClick={() => setIsTableVisible(!isTableVisible)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">
              {selectedChain.name} Pairs 📊
            </h2>
            <ChevronDown
              className={`h-5 w-5 text-cyan-400 transition-transform ${
                isTableVisible ? "" : "-rotate-90"
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 font-semibold">
              {pairs.length} pairs
            </Badge>
            <div onClick={(e) => e.stopPropagation()}>
              <PairFilters />
            </div>
          </div>
        </div>
      </div>

      {/* Table Wrapper - 100% WIDTH - ONLY TABLE SCROLLS */}
      {isTableVisible && (
        <div className="w-full overflow-x-auto overflow-y-auto max-h-[600px]" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full min-w-max">
            {/* Table Header - Sticky */}
            <thead className="sticky top-0 z-10 border-b border-cyan-500/20 bg-black/95">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">★</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">Pair</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-400 whitespace-nowrap">Launch Date</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 whitespace-nowrap">Price</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-400 whitespace-nowrap">24h %</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 whitespace-nowrap">Market Cap</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 whitespace-nowrap">Volume 24h</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-gray-400 whitespace-nowrap">Liquidity</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-400 whitespace-nowrap">Txns 24h</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-400 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-cyan-500/10">
                {pairs.map((pair) => (
                  <tr
                    key={pair.id}
                    className="hover:bg-cyan-500/5 transition-colors"
                  >
                    {/* Watchlist Star */}
                    <td className="px-3 py-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleWatchlist(pair.id)}
                      >
                        <Star
                          className={`h-3 w-3 ${
                            watchlist.has(pair.id)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>
                    </td>

                    {/* Pair Name */}
                    <td className="px-3 py-1.5">
                      <p className="font-bold text-white text-xs whitespace-nowrap">{pair.name}</p>
                    </td>

                    {/* Launch Date */}
                    <td className="px-3 py-1.5">
                      <p className="text-xs text-gray-400 whitespace-nowrap">{pair.launchDate}</p>
                    </td>

                    {/* Price */}
                    <td className="px-3 py-1.5 text-right">
                      <p className="font-mono text-white font-semibold text-xs whitespace-nowrap">{pair.price}</p>
                    </td>

                    {/* 24h Change */}
                    <td className="px-3 py-1.5 text-center">
                      <Badge
                        variant={pair.priceChange24h > 0 ? "default" : "destructive"}
                        className={`text-[10px] px-1.5 py-0 ${
                          pair.priceChange24h > 0
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold"
                            : "bg-red-500/20 text-red-400 border-red-500/30 font-bold"
                        }`}
                      >
                        {pair.priceChange24h > 0 ? "+" : ""}
                        {pair.priceChange24h}%
                      </Badge>
                    </td>

                    {/* Market Cap */}
                    <td className="px-3 py-1.5 text-right">
                      <p className="font-mono text-white font-semibold text-xs whitespace-nowrap">{pair.marketCap}</p>
                    </td>

                    {/* Volume 24h */}
                    <td className="px-3 py-1.5 text-right">
                      <p className="font-mono text-white font-semibold text-xs whitespace-nowrap">{pair.volume24h}</p>
                    </td>

                    {/* Liquidity */}
                    <td className="px-3 py-1.5 text-right">
                      <p className="font-mono text-white font-semibold text-xs whitespace-nowrap">{pair.liquidity}</p>
                    </td>

                    {/* Transactions */}
                    <td className="px-3 py-1.5 text-center">
                      <div className="flex items-center justify-center gap-1 text-[10px] whitespace-nowrap">
                        <span className="text-emerald-400 font-bold">{pair.txns24h.buys}B</span>
                        <span className="text-gray-500">/</span>
                        <span className="text-red-400 font-bold">{pair.txns24h.sells}S</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-1.5">
                      <div className="flex gap-1 justify-center whitespace-nowrap">
                        <Link href={`/token/${pair.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 h-6 w-6 p-0"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 h-6 px-2 text-[10px]"
                        >
                          Trade
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
