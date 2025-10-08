"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp } from "lucide-react";

interface Token {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  price: string;
  chain: string;
  priceChange24h: number;
}

const mockTokens: Token[] = [
  {
    id: "1",
    symbol: "PEPE",
    name: "Pepe",
    icon: "🐸",
    price: "$0.000001234",
    chain: "Ethereum",
    priceChange24h: 24.5,
  },
  {
    id: "2",
    symbol: "SHIB",
    name: "Shiba Inu",
    icon: "🐕",
    price: "$0.00002456",
    chain: "Ethereum",
    priceChange24h: 18.2,
  },
  {
    id: "3",
    symbol: "DOGE",
    name: "Dogecoin",
    icon: "🐶",
    price: "$0.0789",
    chain: "Dogecoin",
    priceChange24h: -5.3,
  },
  {
    id: "4",
    symbol: "BONK",
    name: "Bonk",
    icon: "🐕",
    price: "$0.0000095",
    chain: "Solana",
    priceChange24h: 42.1,
  },
  {
    id: "5",
    symbol: "WIF",
    name: "dogwifhat",
    icon: "🐕",
    price: "$1.234",
    chain: "Solana",
    priceChange24h: 12.8,
  },
];

interface TokenSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TokenSearch({ open, onOpenChange }: TokenSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(mockTokens);

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockTokens.filter(
        (token) =>
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTokens(filtered);
    } else {
      setFilteredTokens(mockTokens);
    }
  }, [searchQuery]);

  const handleSelectToken = (tokenId: string) => {
    router.push(`/token/${tokenId}`);
    onOpenChange(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl">
        <Command className="rounded-lg border-none">
          <CommandInput
            placeholder="Search tokens by name or symbol..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No tokens found.</CommandEmpty>
            <CommandGroup heading="Popular Tokens">
              {filteredTokens.map((token) => (
                <CommandItem
                  key={token.id}
                  value={token.symbol}
                  onSelect={() => handleSelectToken(token.id)}
                  className="flex items-center justify-between p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{token.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{token.symbol}</p>
                        <Badge variant="outline" className="text-xs">
                          {token.chain}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{token.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{token.price}</p>
                    <Badge
                      variant={token.priceChange24h > 0 ? "default" : "destructive"}
                      className={
                        token.priceChange24h > 0
                          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 text-xs"
                          : "bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs"
                      }
                    >
                      {token.priceChange24h > 0 ? "+" : ""}
                      {token.priceChange24h}%
                    </Badge>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="p-2 border-t bg-muted/50 text-xs text-muted-foreground flex items-center justify-center gap-2">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          to open search
        </div>
      </DialogContent>
    </Dialog>
  );
}
