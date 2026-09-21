// src/lib/store-queries.ts

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { stores } from "@/db/schema";

export async function getStoreBySlug(slug: string) {
  try {
    const [store] = await db
      .select()
      .from(stores)
      .where(eq(stores.slug, slug))
      .limit(1);
    return store || null;
  } catch (err) {
    console.error("[getStoreBySlug] Error:", err);
    return null;
  }
}