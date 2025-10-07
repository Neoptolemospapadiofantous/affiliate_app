"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, X, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface FilterState {
  minLiquidity: number;
  minVolume: number;
  priceChangeMin: number;
  priceChangeMax: number;
  showGainersOnly: boolean;
  showLosersOnly: boolean;
  minMarketCap: number;
}

interface PairFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export function PairFilters({ onFilterChange }: PairFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minLiquidity: 0,
    minVolume: 0,
    priceChangeMin: -100,
    priceChangeMax: 100,
    showGainersOnly: false,
    showLosersOnly: false,
    minMarketCap: 0,
  });

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "priceChangeMin" && value !== -100) return true;
    if (key === "priceChangeMax" && value !== 100) return true;
    if (typeof value === "boolean" && value === true) return true;
    if (typeof value === "number" && value > 0 && key !== "priceChangeMin" && key !== "priceChangeMax") return true;
    return false;
  }).length;

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      minLiquidity: 0,
      minVolume: 0,
      priceChangeMin: -100,
      priceChangeMax: 100,
      showGainersOnly: false,
      showLosersOnly: false,
      minMarketCap: 0,
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Filter className="h-4 w-4" />
        Filters
        {activeFiltersCount > 0 && (
          <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-12 z-50 w-80 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filter Pairs</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="space-y-2">
              <Label>Quick Filters</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filters.showGainersOnly ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    updateFilter("showGainersOnly", !filters.showGainersOnly);
                    if (!filters.showGainersOnly) {
                      updateFilter("showLosersOnly", false);
                    }
                  }}
                >
                  <TrendingUp className="h-3 w-3" />
                  Gainers
                </Button>
                <Button
                  variant={filters.showLosersOnly ? "destructive" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    updateFilter("showLosersOnly", !filters.showLosersOnly);
                    if (!filters.showLosersOnly) {
                      updateFilter("showGainersOnly", false);
                    }
                  }}
                >
                  <TrendingDown className="h-3 w-3" />
                  Losers
                </Button>
              </div>
            </div>

            {/* Liquidity Filter */}
            <div className="space-y-2">
              <Label htmlFor="min-liquidity">
                Min Liquidity: ${filters.minLiquidity.toLocaleString()}
              </Label>
              <Slider
                id="min-liquidity"
                min={0}
                max={10000000}
                step={100000}
                value={[filters.minLiquidity]}
                onValueChange={(value) => updateFilter("minLiquidity", value[0])}
              />
            </div>

            {/* Volume Filter */}
            <div className="space-y-2">
              <Label htmlFor="min-volume">
                Min 24h Volume: ${filters.minVolume.toLocaleString()}
              </Label>
              <Slider
                id="min-volume"
                min={0}
                max={5000000}
                step={50000}
                value={[filters.minVolume]}
                onValueChange={(value) => updateFilter("minVolume", value[0])}
              />
            </div>

            {/* Market Cap Filter */}
            <div className="space-y-2">
              <Label htmlFor="min-marketcap">
                Min Market Cap: ${filters.minMarketCap.toLocaleString()}
              </Label>
              <Slider
                id="min-marketcap"
                min={0}
                max={50000000}
                step={500000}
                value={[filters.minMarketCap]}
                onValueChange={(value) => updateFilter("minMarketCap", value[0])}
              />
            </div>

            {/* Price Change Range */}
            <div className="space-y-2">
              <Label>
                24h Price Change: {filters.priceChangeMin}% to {filters.priceChangeMax}%
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min %"
                  value={filters.priceChangeMin}
                  onChange={(e) => updateFilter("priceChangeMin", parseFloat(e.target.value) || -100)}
                  className="w-1/2"
                />
                <Input
                  type="number"
                  placeholder="Max %"
                  value={filters.priceChangeMax}
                  onChange={(e) => updateFilter("priceChangeMax", parseFloat(e.target.value) || 100)}
                  className="w-1/2"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="outline"
                className="flex-1"
                onClick={resetFilters}
              >
                Reset
              </Button>
              <Button
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
