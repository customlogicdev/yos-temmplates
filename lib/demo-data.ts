// src/lib/demo-data.ts

import { LUMIERE_DEMO } from "@/templates/beauty/lumiere/demo-data";
import { GLOW_DEMO } from "@/templates/beauty/glow/demo-data";
import { ATELIER_DEMO } from "@/templates/fashion/atelier/demo-data";
import { FRESH_DEMO } from "@/templates/grocery/fresh/demo-data";

export interface DemoStore {
  id: string;
  name: string;
  brandName: string;
  tagline: string;
  about: string;
  address: string;
}

export interface DemoProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  compareAt?: number;
  category: string;
  tags: string[];
  rating: number;
  inventory: number;
  metadata?: Record<string, any>;
}

export interface DemoData {
  store: DemoStore;
  products: DemoProduct[];
  categories: { id: string; slug: string; name: string; count: number }[];
}

/**
 * 🎯 Map template ID → demo data
 * Har template apna demo data define karta hai
 */
const DEMO_REGISTRY: Record<string, DemoData> = {
  "beauty.lumiere": LUMIERE_DEMO,
  "beauty.glow": GLOW_DEMO,
  "fashion.atelier": ATELIER_DEMO,
  "fresh-market": FRESH_DEMO,
};

/**
 * Get demo data for a template.
 */
export async function getDemoData(templateId: string): Promise<DemoData> {
  const data = DEMO_REGISTRY[templateId];
  if (data) return data;

  // Generic fallback
  return {
    store: {
      id: "demo",
      name: "Demo Store",
      brandName: "Demo",
      tagline: "Try before you create",
      about: "Preview mode demo.",
      address: "Mumbai, India",
    },
    products: Array.from({ length: 8 }, (_, i) => ({
      id: `demo-${i + 1}`,
      name: `Sample Product ${i + 1}`,
      description: "Preview sample",
      image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=800`,
      price: 999 + i * 100,
      category: "general",
      tags: ["demo"],
      rating: 4.5,
      inventory: 10,
    })),
    categories: [{ id: "general", slug: "general", name: "General", count: 8 }],
  };
}