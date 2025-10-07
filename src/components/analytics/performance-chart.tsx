"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function PerformanceChart() {
  const [timeframe, setTimeframe] = useState("24h");

  // Mock data points
  const mockData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 100000 + Math.random() * 50000,
  }));

  const maxValue = Math.max(...mockData.map((d) => d.value));
  const minValue = Math.min(...mockData.map((d) => d.value));
  const range = maxValue - minValue;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Portfolio Performance</h3>
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="24h">24H</TabsTrigger>
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-muted-foreground">
          <span>${(maxValue / 1000).toFixed(0)}k</span>
          <span>${((maxValue + minValue) / 2000).toFixed(0)}k</span>
          <span>${(minValue / 1000).toFixed(0)}k</span>
        </div>

        {/* Chart area */}
        <div className="ml-16 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full border-t border-muted" />
            ))}
          </div>

          {/* Chart line */}
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path
              d={`M 0 ${((maxValue - mockData[0].value) / range) * 100}%
                ${mockData
                  .map(
                    (d, i) =>
                      `L ${(i / (mockData.length - 1)) * 100}% ${
                        ((maxValue - d.value) / range) * 100
                      }%`
                  )
                  .join(" ")}
                L 100% 100%
                L 0 100%
                Z`}
              fill="url(#gradient)"
            />

            {/* Line */}
            <path
              d={`M 0 ${((maxValue - mockData[0].value) / range) * 100}%
                ${mockData
                  .map(
                    (d, i) =>
                      `L ${(i / (mockData.length - 1)) * 100}% ${
                        ((maxValue - d.value) / range) * 100
                      }%`
                  )
                  .join(" ")}`}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="ml-16 mt-2 flex justify-between text-xs text-muted-foreground">
          <span>0h</span>
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
          <span>24h</span>
        </div>
      </div>
    </Card>
  );
}
