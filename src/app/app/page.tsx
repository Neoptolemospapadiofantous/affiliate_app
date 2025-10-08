import { AppClientWrapper } from "@/components/app-client-wrapper";
import { Banner } from "@/components/banner";
import { PairsTable } from "@/components/pairs-table";

export default function AppPage() {
  return (
    <AppClientWrapper>
      <div className="w-full space-y-4">
        {/* Ad Banner - 100% WIDTH */}
        <Banner />

        {/* Main Content - 100% WIDTH - ONLY TABLE SCROLLS */}
        <PairsTable />
      </div>
    </AppClientWrapper>
  );
}
