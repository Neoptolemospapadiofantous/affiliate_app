"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Activity, Users } from "lucide-react";
import { useChain } from "@/hooks/use-chain";

export function Banner() {
  const { selectedChain } = useChain();

  // Mock data - will be replaced with real API data
  const stats = {
    totalPairs: "1,234",
    totalVolume24h: "$45.2M",
    totalTransactions: "23.4K",
    activeTrades: "892",
  };

  return (
    <div className="space-y-2">
      {/* Chain Info Banner */}
      <Card className="p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedChain.icon}</div>
            <div>
              <h2 className="text-xl font-bold">{selectedChain.name}</h2>
              <p className="text-muted-foreground">
                Track and trade all {selectedChain.name} pairs
              </p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 text-sm px-4 py-2">
            <Activity className="h-4 w-4 mr-2" />
            Live
          </Badge>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Card className="p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Pairs</p>
              <p className="text-xl font-bold mt-0.5">{stats.totalPairs}</p>
            </div>
            <div className="p-1.5 rounded-lg bg-blue-500/10">
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">24h Volume</p>
              <p className="text-xl font-bold mt-0.5">{stats.totalVolume24h}</p>
            </div>
            <div className="p-1.5 rounded-lg bg-green-500/10">
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Transactions</p>
              <p className="text-xl font-bold mt-0.5">{stats.totalTransactions}</p>
            </div>
            <div className="p-1.5 rounded-lg bg-purple-500/10">
              <Activity className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Active Trades</p>
              <p className="text-xl font-bold mt-0.5">{stats.activeTrades}</p>
            </div>
            <div className="p-1.5 rounded-lg bg-orange-500/10">
              <Users className="h-4 w-4 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
