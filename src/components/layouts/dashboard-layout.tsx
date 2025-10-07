"use client";

import { ReactNode, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function DashboardLayout({ children, showSidebar = true }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex">
        {showSidebar && (
          <>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside
              className={`
                fixed lg:sticky top-14 left-0 z-50 h-[calc(100vh-3.5rem)]
                w-64 bg-background border-r transition-transform duration-300
                lg:translate-x-0
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              `}
            >
              <div className="h-full overflow-y-auto p-2">
                <Sidebar />
              </div>
            </aside>

            {/* Mobile Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="fixed bottom-4 right-4 lg:hidden z-40 h-12 w-12 rounded-full shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="px-2 py-2">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
