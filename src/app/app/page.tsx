"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Banner } from "@/components/banner";
import { PairsTable } from "@/components/pairs-table";
import { MarketOverview } from "@/components/analytics/market-overview";
import { ChainProvider } from "@/hooks/use-chain";

export default function AppPage() {
  return (
    <ChainProvider>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Market Overview */}
          <MarketOverview />

          {/* Banner Section */}
          <Banner />

          {/* Main Content */}
          <PairsTable />
        </div>
      </DashboardLayout>
    </ChainProvider>
  );
}
