"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ChainProvider } from "@/hooks/use-chain";
import { QueryProvider } from "@/components/query-provider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <ChainProvider>
          {children}
        </ChainProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
