// src/lib/fashion-icons.tsx

import {
  Shirt,
  Footprints,
  Gem,
  ShoppingBag,
  Sparkles,
  Glasses,
  Crown,
  Watch,
  Scissors,
  type LucideIcon,
} from "lucide-react";

export interface FashionCategoryMeta {
  Icon: LucideIcon;
  color: string;
  bg: string;
}

export const FASHION_CATEGORY_ICONS: Record<string, FashionCategoryMeta> = {
  "evening-gowns": { Icon: Sparkles, color: "#8b5cf6", bg: "rgba(139,92,246,0.10)" },
  "cocktail-dresses": { Icon: Sparkles, color: "#ec4899", bg: "rgba(236,72,153,0.10)" },
  essentials: { Icon: Shirt, color: "#6b7280", bg: "rgba(107,114,128,0.10)" },
  denim: { Icon: Shirt, color: "#3b82f6", bg: "rgba(59,130,246,0.10)" },
  "day-to-night": { Icon: Sparkles, color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
  "signature-black": { Icon: Crown, color: "#111827", bg: "rgba(17,24,39,0.10)" },
  footwear: { Icon: Footprints, color: "#ef4444", bg: "rgba(239,68,68,0.10)" },
  jewellery: { Icon: Gem, color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
  accessories: { Icon: Glasses, color: "#06b6d4", bg: "rgba(6,182,212,0.10)" },
  watches: { Icon: Watch, color: "#8b5cf6", bg: "rgba(139,92,246,0.10)" },
  tailoring: { Icon: Scissors, color: "#a16207", bg: "rgba(161,98,7,0.10)" },
};

export function getFashionCategoryIcon(slug: string): FashionCategoryMeta {
  const normalized = slug.toLowerCase().replace(/\s+/g, "-");
  return (
    FASHION_CATEGORY_ICONS[normalized] || {
      Icon: ShoppingBag,
      color: "#6b7280",
      bg: "rgba(107,114,128,0.10)",
    }
  );
}