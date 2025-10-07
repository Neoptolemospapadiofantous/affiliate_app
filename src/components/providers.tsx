"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ChainProvider } from "@/hooks/use-chain";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
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
  );
}
