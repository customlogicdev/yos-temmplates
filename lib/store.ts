// src/lib/store.ts
import { db } from "@/db";
import { stores } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getTenantDb } from "@/db/tenant-db";
import { products } from "@/db/tenant-schema";

export async function getStoreBySlug(slug: string) {
  const res = await db.select().from(stores).where(eq(stores.slug, slug)).limit(1);
  return res[0] ?? null;
}

export async function getStoreProducts(storeId: string) {
  const store = await db.select().from(stores).where(eq(stores.id, storeId)).limit(1);
  if (!store.length || !store[0].dbName) return [];

  try {
    const tenantDb = getTenantDb(store[0].dbName);
    const tenantProducts = await tenantDb.select().from(products);
    return tenantProducts;
  } catch (err) {
    console.error("Failed to query tenant products:", err);
    return [];
  }
}