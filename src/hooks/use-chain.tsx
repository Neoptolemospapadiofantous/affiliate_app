"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Chain } from "@/types";
import { DEFAULT_CHAIN } from "@/config/chains";

interface ChainContextType {
  selectedChain: Chain;
  setSelectedChain: (chain: Chain) => void;
}

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export function ChainProvider({ children }: { children: ReactNode }) {
  const [selectedChain, setSelectedChain] = useState<Chain>(DEFAULT_CHAIN);

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </ChainContext.Provider>
  );
}

export function useChain() {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
}
