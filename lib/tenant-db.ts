import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { pgTable, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  image: text("image"),
  category: text("category"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cache connections to prevent connection leaks
const pools = new Map<string, ReturnType<typeof drizzle>>();

export function getTenantDb(dbName: string) {
  if (pools.has(dbName)) {
    return pools.get(dbName)!;
  }

  const baseUri = new URL(process.env.ADMIN_DATABASE_URL!);
  baseUri.pathname = `/${dbName}`;

  const pool = new Pool({ connectionString: baseUri.toString() });
  const db = drizzle(pool, { schema: { products } });

  pools.set(dbName, db);
  return db;
}