import { AppClientWrapper } from "@/components/app-client-wrapper";
import { Banner } from "@/components/banner";
import { PairsTable } from "@/components/pairs-table";
import { MarketOverview } from "@/components/analytics/market-overview";

export default function AppPage() {
  return (
    <AppClientWrapper>
      <div className="space-y-2">
        {/* Market Overview - Server Component */}
        <MarketOverview />

        {/* Banner Section - Client Component */}
        <Banner />

        {/* Main Content - Client Component */}
        <PairsTable />
      </div>
    </AppClientWrapper>
  );
}
