"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface TradingViewWidgetProps {
  symbol?: string;
  interval?: string;
  theme?: "light" | "dark";
}

export function TradingViewWidget({
  symbol = "BTCUSD",
  interval = "D",
  theme = "dark",
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerRef.current?.id || "tradingview_widget",
          hide_side_toolbar: false,
          studies: ["STD;SMA"],
        });
      }
    };

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, interval, theme]);

  return (
    <Card className="w-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chart</h3>
      </div>
      <div
        id="tradingview_widget"
        ref={containerRef}
        className="w-full"
        style={{ minHeight: "500px" }}
      />
    </Card>
  );
}

// Add TypeScript declaration for TradingView
declare global {
  interface Window {
    TradingView: any;
  }
}
