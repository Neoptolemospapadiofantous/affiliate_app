"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Settings, Moon, Sun, ChevronDown, Menu, X, BarChart3, User } from "lucide-react";
import { useChain } from "@/hooks/use-chain";
import { SUPPORTED_CHAINS } from "@/config/chains";
import { useTheme } from "next-themes";
import { TokenSearch } from "@/components/search/token-search";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { WalletLoginModal } from "@/components/wallet-login-modal";

export function Header() {
  const { selectedChain, setSelectedChain } = useChain();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-3">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/app" className="flex items-center space-x-2">
            <div className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              CryptoTrack ⚡
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
            {/* Chain Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-[120px] justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span>{selectedChain.icon}</span>
                    <span>{selectedChain.name}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[140px]">
                {SUPPORTED_CHAINS.map((chain) => (
                  <DropdownMenuItem
                    key={chain.id}
                    onClick={() => setSelectedChain(chain)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{chain.icon}</span>
                    <span>{chain.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Bar */}
            <Button
              variant="outline"
              size="sm"
              className="flex-1 justify-start text-muted-foreground text-xs"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              Search pairs, tokens...
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Navigation Links */}
            <Link href="/portfolio">
              <Button variant="ghost" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Portfolio
              </Button>
            </Link>
            {/* Notifications */}
            <NotificationCenter />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <WalletLoginModal />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search pairs, tokens..."
                className="pl-10 w-full"
              />
            </div>

            {/* Mobile Chain Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <span>{selectedChain.icon}</span>
                    <span>{selectedChain.name}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)]">
                {SUPPORTED_CHAINS.map((chain) => (
                  <DropdownMenuItem
                    key={chain.id}
                    onClick={() => {
                      setSelectedChain(chain);
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{chain.icon}</span>
                    <span>{chain.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex-1"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button variant="outline" size="icon" className="flex-1">
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            <WalletLoginModal />
          </div>
        )}
      </div>

      {/* Token Search Dialog */}
      <TokenSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
