"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 flex flex-col justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-white">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>

        <div className="text-white space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            CryptoTrack
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Your ultimate crypto trading companion across multiple blockchains.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">🌐</span>
              </div>
              <div>
                <h3 className="font-semibold">Multi-Chain Support</h3>
                <p className="text-sm text-white/80">Trade across 7+ blockchains</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold">Real-Time Data</h3>
                <p className="text-sm text-white/80">Live price updates and analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold">Secure Trading</h3>
                <p className="text-sm text-white/80">Your keys, your crypto</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white/60 text-sm">
          &copy; 2025 CryptoTrack. All rights reserved.
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
