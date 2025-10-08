"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";

// Mock portfolio data
const portfolioStats = {
  totalValue: "$125,430.50",
  totalChange24h: 8.5,
  totalPnL: "+$9,234.20",
  pnlPercentage: 7.94,
};

const holdings = [
  {
    id: "1",
    symbol: "PEPE",
    name: "Pepe",
    amount: "1,250,000,000",
    value: "$45,234.50",
    change24h: 12.5,
    pnl: "+$5,234.50",
    chain: "Ethereum",
    icon: "🐸",
  },
  {
    id: "2",
    symbol: "SHIB",
    name: "Shiba Inu",
    amount: "500,000,000",
    value: "$32,450.00",
    change24h: -3.2,
    pnl: "-$1,045.00",
    chain: "Ethereum",
    icon: "🐕",
  },
  {
    id: "3",
    symbol: "DOGE",
    name: "Dogecoin",
    amount: "250,000",
    value: "$28,750.00",
    change24h: 5.8,
    pnl: "+$1,580.00",
    chain: "Dogecoin",
    icon: "🐶",
  },
  {
    id: "4",
    symbol: "BONK",
    name: "Bonk",
    amount: "2,000,000,000",
    value: "$18,996.00",
    change24h: 18.9,
    pnl: "+$3,465.00",
    chain: "Solana",
    icon: "🐕",
  },
];

const transactions = [
  {
    id: "1",
    type: "buy",
    symbol: "PEPE",
    amount: "250,000,000",
    price: "$0.000012",
    total: "$3,000.00",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "sell",
    symbol: "SHIB",
    amount: "100,000,000",
    price: "$0.000024",
    total: "$2,400.00",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "buy",
    symbol: "BONK",
    amount: "500,000,000",
    price: "$0.0000095",
    total: "$4,750.00",
    time: "1 day ago",
  },
];

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Track and manage your crypto holdings</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold mt-2">{portfolioStats.totalValue}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Wallet className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Change</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-bold text-green-500">
                    +{portfolioStats.totalChange24h}%
                  </p>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className="text-3xl font-bold mt-2 text-green-500">
                  {portfolioStats.totalPnL}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">P&L Percentage</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-bold text-green-500">
                    +{portfolioStats.pnlPercentage}%
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <ArrowUpRight className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          {/* Holdings Tab */}
          <TabsContent value="holdings" className="space-y-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Holdings</h3>
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div
                      key={holding.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{holding.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{holding.symbol}</p>
                            <Badge variant="outline" className="text-xs">
                              {holding.chain}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {holding.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {holding.amount} {holding.symbol}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg">{holding.value}</p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                          <Badge
                            variant={holding.change24h > 0 ? "default" : "destructive"}
                            className={
                              holding.change24h > 0
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            }
                          >
                            {holding.change24h > 0 ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {holding.change24h > 0 ? "+" : ""}
                            {holding.change24h}%
                          </Badge>
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            holding.pnl.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {holding.pnl}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={tx.type === "buy" ? "default" : "destructive"}
                          className={
                            tx.type === "buy"
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                          }
                        >
                          {tx.type.toUpperCase()}
                        </Badge>
                        <div>
                          <p className="font-medium">{tx.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            {tx.amount} @ {tx.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{tx.total}</p>
                        <p className="text-xs text-muted-foreground">{tx.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
