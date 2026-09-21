// src/lib/store-data.ts

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { getTenantDb } from "@/db/tenant-db";
import { products } from "@/db/tenant-schema";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";

export interface StoreCategory {
  slug: string;
  name: string;
  count: number;
}

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  compareAt: number | null;
  image: string;
  category: string;
  categorySlug: string;
  tags: string[];
  description: string;
  status: string;
  inventory: number;
  rating: number;         // ✅ Added
  reviewCount: number;    // ✅ Added
}

function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ✅ Simple deterministic rating generator (based on product ID)
// Yeh consistent rating dega har baar — same product ke liye same rating
function generateRating(productId: string): { rating: number; reviewCount: number } {
  // Hash the product ID to a number
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash << 5) - hash + productId.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  const absHash = Math.abs(hash);

  // Rating between 4.0 and 5.0 (most products look good)
  const rating = 4.0 + (absHash % 11) / 10; // 4.0, 4.1, ..., 5.0

  // Review count between 10 and 500
  const reviewCount = 10 + (absHash % 491);

  return {
    rating: Math.round(rating * 10) / 10, // Round to 1 decimal
    reviewCount,
  };
}

export async function loadStoreData(slug: string) {
  const [store] = await db
    .select()
    .from(stores)
    .where(eq(stores.slug, slug))
    .limit(1);

  if (!store) return null;

  const tenantDb = getTenantDb(store.dbName);
  const allProducts = await tenantDb
    .select()
    .from(products)
    .where(eq(products.storeId, store.id));

  const visibleProducts = allProducts.filter(
    (p) => (p.status || "active") === "active"
  );

  const mappedProducts: StoreProduct[] = visibleProducts.map((p) => {
    const categoryName = (p.category || "General").trim();
    const categorySlug = slugifyCategory(categoryName);
    const productId = String(p.id);

    // ✅ Generate rating + review count
    const { rating, reviewCount } = generateRating(productId);

    return {
      id: productId,
      name: p.name || "Untitled",
      price: Number(p.price || 0),
      compareAt: p.compareAtPrice ? Number(p.compareAtPrice) : null,
      image: p.image || FALLBACK_IMG,
      category: categoryName,
      categorySlug,
      tags: (p.tags as string[]) || [],
      description: p.description || "",
      status: p.status || "active",
      inventory: p.inventory || 0,
      rating,           // ✅ Added
      reviewCount,      // ✅ Added
    };
  });

  // ✅ Group by category
  const categoryMap = new Map<string, StoreCategory>();
  for (const product of mappedProducts) {
    const catSlug = product.categorySlug;

    if (!categoryMap.has(catSlug)) {
      categoryMap.set(catSlug, {
        slug: catSlug,
        name: product.category,
        count: 0,
      });
    }
    categoryMap.get(catSlug)!.count += 1;
  }

  const categories = Array.from(categoryMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  console.log(
    `[store-data] Loaded ${mappedProducts.length} products, ${categories.length} categories`
  );

  return {
    store,
    products: mappedProducts,
    categories,
  };
}