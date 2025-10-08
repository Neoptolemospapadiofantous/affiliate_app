import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Shield } from "lucide-react";
import { GuestLayout } from "@/components/layouts/guest-layout";

export default function Home() {
  return (
    <GuestLayout>
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Trade Crypto Across
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Multiple Chains
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Track trending pairs, analyze markets, and trade seamlessly across Ethereum, BSC, Polygon, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/app">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Launch App
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="space-y-3 p-6 rounded-lg bg-black/60 border border-cyan-500/20">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Real-Time Data</h3>
              <p className="text-gray-400">
                Get live price updates, volume tracking, and market insights across all supported chains.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg bg-black/60 border border-cyan-500/20">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
              <p className="text-gray-400">
                Optimized for speed with instant chain switching and responsive mobile design.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg bg-black/60 border border-cyan-500/20">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Secure Trading</h3>
              <p className="text-gray-400">
                Connect your wallet securely and trade with confidence on decentralized exchanges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
