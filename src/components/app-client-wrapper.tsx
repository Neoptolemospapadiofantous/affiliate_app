"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { ReactNode } from "react";

export function AppClientWrapper({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
