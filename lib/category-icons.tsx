// src/lib/category-icons.tsx

import {
  Apple,
  Milk,
  Croissant,
  Coffee,
  Cookie,
  Snowflake,
  Sparkles,
  Home,
  Package,
  type LucideIcon,
} from "lucide-react";

export interface CategoryMeta {
  Icon: LucideIcon;
  color: string;
  bg: string;
}

// ✅ ONLY grocery categories — whitelist
export const GROCERY_CATEGORIES: Record<string, CategoryMeta> = {
  "fruits-vegetables": {
    Icon: Apple,
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  dairy: {
    Icon: Milk,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  "dairy-eggs": {
    Icon: Milk,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  bakery: {
    Icon: Croissant,
    color: "#a16207",
    bg: "rgba(161,98,7,0.12)",
  },
  beverages: {
    Icon: Coffee,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
  },
  snacks: {
    Icon: Cookie,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
  },
  frozen: {
    Icon: Snowflake,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
  },
  "frozen-foods": {
    Icon: Snowflake,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
  },
  "personal-care": {
    Icon: Sparkles,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
  },
  household: {
    Icon: Home,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
  },
};

// ✅ Check if category is a valid grocery category
export function isGroceryCategory(slug: string): boolean {
  const normalized = slug.toLowerCase().replace(/\s+/g, "-");
  return normalized in GROCERY_CATEGORIES;
}

// ✅ Get icon meta — default to Package for unknown
export function getCategoryIcon(slug: string): CategoryMeta {
  const normalized = slug.toLowerCase().replace(/\s+/g, "-");
  return (
    GROCERY_CATEGORIES[normalized] || {
      Icon: Package,
      color: "#6b7280",
      bg: "rgba(107,114,128,0.12)",
    }
  );
}