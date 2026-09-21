// src/templates/electronics/tech-luxe/sections/Filters.tsx

"use client";

import { formatMoney } from "@/lib/format";
import { useMemo } from "react";

interface ProductFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductFilters({
  categories,
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange,
  searchQuery,
  onSearchChange,
}: ProductFiltersProps) {
  // ✅ FIX: Use stable values - no random numbers for hydration
  const pricePresets = [
    { label: "Under ₹900", min: 0, max: 900 },
    { label: "₹900 – ₹2,475", min: 900, max: 2475 },
    { label: "₹2,475 – ₹3,825", min: 2475, max: 3825 },
    { label: "₹3,825+", min: 3825, max: Infinity },
  ];

  const isPriceSelected = (min: number, max: number) => {
    return priceRange[0] === min && priceRange[1] === max;
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--theme-muted)]">
          Search this store...
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--theme-primary)]"
        />
      </div>

      {/* Categories - ✅ Remove random numbers */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--theme-muted)]">
          Category
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onToggleCategory(category)}
                className="h-4 w-4 rounded border-[var(--theme-border)] accent-[var(--theme-primary)]"
              />
              <span className="text-sm">{category}</span>
              {/* ✅ Remove random count - show static or no count */}
              <span className="ml-auto text-xs text-[var(--theme-muted)]">
                {categories.length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--theme-muted)]">
          Price
        </label>
        <div className="space-y-2">
          {pricePresets.map((preset) => (
            <label key={preset.label} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={isPriceSelected(preset.min, preset.max)}
                onChange={() => onPriceChange([preset.min, preset.max])}
                className="h-4 w-4 accent-[var(--theme-primary)]"
              />
              <span className="text-sm">{preset.label}</span>
            </label>
          ))}
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={priceRange[0] === 0 && priceRange[1] === Infinity}
              onChange={() => onPriceChange([0, Infinity])}
              className="h-4 w-4 accent-[var(--theme-primary)]"
            />
            <span className="text-sm">Any price</span>
          </label>
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Up to</span>
          <span className="text-sm font-bold text-[var(--theme-primary)]">
            {formatMoney(priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-[var(--theme-primary)]"
        />
      </div>
    </div>
  );
}