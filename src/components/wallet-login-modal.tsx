"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wallet, Smartphone, QrCode, ArrowRight } from "lucide-react";

interface WalletOption {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const walletOptions: WalletOption[] = [
  {
    name: "MetaMask",
    description: "Browser extension wallet",
    icon: Wallet,
  },
  {
    name: "WalletConnect",
    description: "Scan QR code from your mobile wallet",
    icon: QrCode,
  },
  {
    name: "Coinbase Wallet",
    description: "Mobile wallet by Coinbase",
    icon: Smartphone,
  },
];

export function WalletLoginModal() {
  const [open, setOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleSelect = (walletName: string) => {
    setSelectedWallet(walletName);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>
              Choose a wallet provider to sign in and manage your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <Button
                key={wallet.name}
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleSelect(wallet.name)}
              >
                <span className="flex items-center gap-3">
                  <wallet.icon className="h-4 w-4" />
                  <span className="text-left">
                    <span className="block font-medium">{wallet.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {wallet.description}
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            You will be prompted in your wallet to authorize the connection. We do not
            store your private keys.
          </p>
        </DialogContent>
      </Dialog>
      {selectedWallet && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <Badge variant="outline">{selectedWallet}</Badge>
          ready to connect
        </div>
      )}
    </div>
  );
}
