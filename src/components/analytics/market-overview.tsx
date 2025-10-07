"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

const marketStats = [
  {
    label: "Total Market Cap",
    value: "$2.45T",
    change: "+5.2%",
    positive: true,
    icon: DollarSign,
  },
  {
    label: "24h Volume",
    value: "$98.5B",
    change: "+12.8%",
    positive: true,
    icon: Activity,
  },
  {
    label: "BTC Dominance",
    value: "48.5%",
    change: "-0.5%",
    positive: false,
    icon: TrendingDown,
  },
  {
    label: "Active Pairs",
    value: "45,234",
    change: "+234",
    positive: true,
    icon: TrendingUp,
  },
];

export function MarketOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {marketStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <Badge
                  variant={stat.positive ? "default" : "destructive"}
                  className={`mt-2 ${
                    stat.positive
                      ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                      : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
              <div
                className={`p-1.5 rounded-lg ${
                  stat.positive ? "bg-green-500/10" : "bg-red-500/10"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    stat.positive ? "text-green-500" : "text-red-500"
                  }`}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
