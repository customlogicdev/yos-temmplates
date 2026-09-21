// src/lib/order-queries.ts

import { getTenantDb } from "@/db/tenant-db";
import { orders } from "@/db/tenant-schema";
import { eq, desc } from "drizzle-orm";

export async function getCustomerOrders(
  dbName: string,
  customerEmail: string
) {
  try {
    const db = getTenantDb(dbName);
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));

    return allOrders.filter(
      (o: any) =>
        o.customerEmail?.toLowerCase() === customerEmail.toLowerCase()
    );
  } catch (err) {
    console.error("[getCustomerOrders] Error:", err);
    return [];
  }
}

export async function getOrderById(dbName: string, orderId: string) {
  try {
    const db = getTenantDb(dbName);
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    return order || null;
  } catch (err) {
    console.error("[getOrderById] Error:", err);
    return null;
  }
}