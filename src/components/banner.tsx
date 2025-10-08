"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function Banner() {
  return (
    <Card className="w-full p-4 bg-black/80 border-cyan-500/30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600">
            <Sparkles className="h-5 w-5 text-black" />
          </div>
          <div>
            <p className="font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Join CryptoTrack Pro ⚡
            </p>
            <p className="text-xs text-gray-400">
              Get premium features, advanced analytics & early access to new pairs
            </p>
          </div>
        </div>
        <Button size="sm" className="gap-2 whitespace-nowrap bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-semibold">
          Upgrade Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
