import { AppClientWrapper } from "@/components/app-client-wrapper";
import { Banner } from "@/components/banner";
import { PairsTable } from "@/components/pairs-table";

export default function AppPage() {
  return (
    <AppClientWrapper>
      <div className="space-y-4">
        {/* Ad Banner */}
        <Banner />

        {/* Main Content - Client Component */}
        <PairsTable />
      </div>
    </AppClientWrapper>
  );
}
