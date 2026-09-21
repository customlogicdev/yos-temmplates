
// src/lib/actions.ts

"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { randomInt } from "node:crypto";
import pg from "pg";
const { Client } = pg;

import { db } from "@/db";
import { users, stores, wallets, subscriptions, creditTransactions } from "@/db/schema";
import { getTenantDb } from "@/db/tenant-db";
import { products, orders, customers, campaigns, emailAutomations } from "@/db/tenant-schema";
import { getStoreTemplate } from "./template-service";
import type { Section } from "./types";
import { getDemoData } from "./demo-data";   // 👈 New import

import {
  createSession,
  destroySession,
  getSessionUser,
  getStoreForUser,
  setActiveStoreId,
  hashPassword,
  verifyPassword,
} from "./auth";
import { templateById, buildTemplateSections } from "./templates";
import { seedCommerce } from "./demo";
import { slugify } from "./format";

type Result = { ok?: boolean; error?: string; redirect?: string };

export type UserStoreItem = {
  id: string;
  name: string;
  slug: string;
  plan: string;
  template: string;
};

export type UserWalletInfo = {
  balance: number;
  lifetimeUsed: number;
  plan: string;
  maxStores: number;
  canPublish: boolean;
};

function fd(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

// ============================================================
// 1. Bulletproof Database Provisioner
// ============================================================
export async function provisionTenantDatabase(dbName: string) {
  const baseAdminUrl =
    process.env.ADMIN_DATABASE_URL ||
    process.env.DATABASE_URL ||
    "postgresql://postgres:yourownstore@127.0.0.1:5432/postgres";

  const adminClient = new Client({ connectionString: baseAdminUrl });
  await adminClient.connect();

  try {
    const checkDb = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`[DB] Database "${dbName}" created successfully.`);
    }
  } catch (dbErr: any) {
    console.error("[DB Error] Failed to create database:", dbErr);
    throw new Error(`Failed to create database "${dbName}": ${dbErr?.message}`);
  } finally {
    await adminClient.end();
  }

  let tenantConnString = "";
  try {
    const parsed = new URL(baseAdminUrl);
    parsed.pathname = `/${dbName}`;
    tenantConnString = parsed.toString();
  } catch {
    tenantConnString = `postgresql://postgres:root@127.0.0.1:5432/${dbName}`;
  }

  const tenantClient = new Client({ connectionString: tenantConnString });
  await tenantClient.connect();

  try {
    console.log(`[DB] Initializing schemas inside ${dbName}...`);
    await tenantClient.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS "products" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "store_id" uuid NOT NULL,
        "name" text NOT NULL,
        "description" text DEFAULT '',
        "image" text NOT NULL,
        "price" numeric(10, 2) NOT NULL,
        "compare_at_price" numeric(10, 2),
        "sku" text NOT NULL,
        "inventory" integer DEFAULT 0 NOT NULL,
        "category" text DEFAULT 'General' NOT NULL,
        "tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
        "variants" jsonb DEFAULT '[]'::jsonb NOT NULL,
        "seo_title" text DEFAULT '' NOT NULL,
        "seo_description" text DEFAULT '' NOT NULL,
        "status" text DEFAULT 'active' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "orders" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "store_id" uuid NOT NULL,
        "number" integer NOT NULL,
        "customer_name" text NOT NULL,
        "customer_email" text NOT NULL,
        "items" jsonb DEFAULT '[]'::jsonb NOT NULL,
        "subtotal" numeric(10, 2) NOT NULL,
        "shipping" numeric(10, 2) DEFAULT 0 NOT NULL,
        "discount" numeric(10, 2) DEFAULT 0 NOT NULL,
        "total" numeric(10, 2) NOT NULL,
        "payment_status" text DEFAULT 'paid' NOT NULL,
        "fulfillment_status" text DEFAULT 'processing' NOT NULL,
        "address" jsonb,
        "created_at" timestamp DEFAULT now() NOT NULL
      );

      -- ✅ FIXED: customers table with password_hash + email_verified
      CREATE TABLE IF NOT EXISTS "customers" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "store_id" uuid NOT NULL,
        "name" text NOT NULL,
        "email" text NOT NULL,
        "phone" text DEFAULT '',
        "city" text DEFAULT '',
        "orders_count" integer DEFAULT 0 NOT NULL,
        "total_spent" numeric(10, 2) DEFAULT 0 NOT NULL,
        "last_order_at" timestamp,
        "status" text DEFAULT 'active' NOT NULL,
        "notes" text DEFAULT '',
        "created_at" timestamp DEFAULT now() NOT NULL,
        "password_hash" text DEFAULT '' NOT NULL,
        "email_verified" boolean DEFAULT false NOT NULL
      );

      CREATE UNIQUE INDEX IF NOT EXISTS "idx_customers_store_email" 
        ON "customers" ("store_id", "email");

      CREATE TABLE IF NOT EXISTS "campaigns" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "store_id" uuid NOT NULL,
        "name" text NOT NULL,
        "type" text DEFAULT 'campaign' NOT NULL,
        "subject" text DEFAULT '' NOT NULL,
        "recipients" integer DEFAULT 0 NOT NULL,
        "sent" integer DEFAULT 0 NOT NULL,
        "open_rate" numeric(5, 1) DEFAULT 0 NOT NULL,
        "status" text DEFAULT 'draft' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "email_automations" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "store_id" uuid NOT NULL,
        "type" text NOT NULL,
        "subject" text NOT NULL,
        "headline" text DEFAULT '' NOT NULL,
        "message" text DEFAULT '' NOT NULL,
        "cta_text" text DEFAULT 'Visit Store' NOT NULL,
        "discount_code" text,
        "active" boolean DEFAULT true NOT NULL,
        "show_product_summary" boolean DEFAULT false NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "abandoned_checkouts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "store_id" uuid NOT NULL,
        "customer_email" text NOT NULL,
        "customer_name" text DEFAULT '' NOT NULL,
        "cart_items" jsonb DEFAULT '[]'::jsonb NOT NULL,
        "total" numeric(10, 2) NOT NULL,
        "recovered" boolean DEFAULT false NOT NULL,
        "email_sent" boolean DEFAULT false NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );

      -- ✅ ALTER existing tables (for pre-existing DBs)
      ALTER TABLE "customers" 
        ADD COLUMN IF NOT EXISTS "password_hash" text DEFAULT '' NOT NULL;
      ALTER TABLE "customers" 
        ADD COLUMN IF NOT EXISTS "email_verified" boolean DEFAULT false NOT NULL;
    `);
    console.log(`[DB] All tables created inside ${dbName}!`);
  } catch (schemaErr: any) {
    console.error("[DB Error] Failed to create tables:", schemaErr);
    throw new Error(`Failed to create tables in "${dbName}": ${schemaErr?.message}`);
  } finally {
    await tenantClient.end();
  }
}

// ============================================================
// 2. Fetch User Wallet & Subscription Status
// ============================================================
export async function getUserWalletAction(): Promise<{ error?: string; wallet?: UserWalletInfo }> {
  try {
    const user = await getSessionUser();
    if (!user) return { error: "unauthenticated" };

    const walletRows = await db
      .select({
        balance: wallets.balance,
        lifetimeUsed: wallets.lifetimeUsed,
      })
      .from(wallets)
      .where(eq(wallets.userId, user.id))
      .limit(1);

    const subRows = await db
      .select({
        plan: subscriptions.plan,
        maxStores: subscriptions.maxStores,
        canPublish: subscriptions.canPublish,
      })
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .limit(1);

    return {
      wallet: {
        balance: walletRows[0]?.balance ?? 0,
        lifetimeUsed: walletRows[0]?.lifetimeUsed ?? 0,
        plan: subRows[0]?.plan ?? "free",
        maxStores: subRows[0]?.maxStores ?? 2,
        canPublish: subRows[0]?.canPublish ?? false,
      },
    };
  } catch (err: any) {
    console.error("Failed to fetch wallet:", err);
    return { error: "Failed to load wallet status" };
  }
}

// ============================================================
// 3. Switch Active Store
// ============================================================
export async function switchStoreAction(storeId: string): Promise<Result> {
  try {
    const user = await getSessionUser();
    if (!user) return { error: "unauthenticated" };

    const rows = await db
      .select({ id: stores.id })
      .from(stores)
      .where(sql`${stores.id} = ${storeId} and ${stores.userId} = ${user.id}`)
      .limit(1);

    if (!rows.length) return { error: "Store not found or unauthorized" };

    await setActiveStoreId(storeId);
    revalidatePath("/admin");
    return { ok: true };
  } catch (error) {
    console.error("Failed to switch store:", error);
    return { error: "Failed to switch store" };
  }
}

export async function getUserStoresAction(): Promise<{ error?: string; stores: UserStoreItem[] }> {
  try {
    const user = await getSessionUser();
    if (!user) {
      return { error: "User not authenticated", stores: [] };
    }

    const rows = await db
      .select({
        id: stores.id,
        name: stores.name,
        slug: stores.slug,
        templateId: stores.templateId,
      })
      .from(stores)
      .where(eq(stores.userId, user.id));

    const subRows = await db
      .select({ plan: subscriptions.plan })
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .limit(1);

    const userPlan = subRows[0]?.plan ? subRows[0].plan.toUpperCase() : "FREE";

    const formattedStores: UserStoreItem[] = rows.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      plan: userPlan,
      template: s.templateId || "nova-fashion",
    }));

    return { stores: formattedStores };
  } catch (error) {
    console.error("Failed to fetch user stores:", error);
    return { error: "Database error", stores: [] };
  }
}

export async function loginAction(formData: FormData): Promise<Result> {
  const email = fd(formData, "email").toLowerCase();
  const password = fd(formData, "password");
  if (!email || !password) return { error: "Enter your email and password." };

  if (email === "demo@yournextstore.com" && password === "demo1234") {
    let demoUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!demoUser.length) {
      const demoRes = await db.transaction(async (tx) => {
        const [u] = await tx
          .insert(users)
          .values({
            name: "Demo Merchant",
            email: "demo@yournextstore.com",
            passwordHash: hashPassword("demo1234"),
          })
          .returning();

        await tx.insert(subscriptions).values({
          userId: u.id,
          plan: "free",
          status: "active",
          maxStores: 2,
          canPublish: false,
        });

        const [w] = await tx
          .insert(wallets)
          .values({
            userId: u.id,
            balance: 100,
            lifetimeUsed: 0,
          })
          .returning();

        await tx.insert(creditTransactions).values({
          walletId: w.id,
          userId: u.id,
          amount: 100,
          actionType: "SIGNUP_BONUS",
          balanceAfter: 100,
        });

        return u;
      });
      await createSession(demoRes.id);
      return { ok: true, redirect: "/onboarding" };
    }
  }

  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = rows[0];
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }
  await createSession(user.id);
  return { ok: true, redirect: "/onboarding" };
}

export async function registerAction(formData: FormData): Promise<Result> {
  const name = fd(formData, "name");
  const email = fd(formData, "email").toLowerCase();
  const password = fd(formData, "password");
  const confirm = fd(formData, "confirm");
  const template = fd(formData, "template");

  if (!name || !email || !password) return { error: "All fields are required." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords do not match." };

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing.length) return { error: "An account with this email already exists." };

  const newUser = await db.transaction(async (tx) => {
    const insertedUsers = await tx
      .insert(users)
      .values({
        name,
        email,
        passwordHash: hashPassword(password),
      })
      .returning();

    const u = insertedUsers[0];

    await tx.insert(subscriptions).values({
      userId: u.id,
      plan: "free",
      status: "active",
      maxStores: 2,
      canPublish: false,
    });

    const insertedWallets = await tx
      .insert(wallets)
      .values({
        userId: u.id,
        balance: 100,
        lifetimeUsed: 0,
      })
      .returning();

    const w = insertedWallets[0];

    await tx.insert(creditTransactions).values({
      walletId: w.id,
      userId: u.id,
      amount: 100,
      actionType: "SIGNUP_BONUS",
      balanceAfter: 100,
    });

    return u;
  });

  if (!newUser) return { error: "Registration failed." };

  await createSession(newUser.id);

  return {
    ok: true,
    redirect: template ? `/setup-store?template=${template}` : `/setup-store`,
  };
}

export async function logoutAction(): Promise<Result> {
  await destroySession();
  return { ok: true, redirect: "/" };
}

// ============================================================
// 4. Create Store & Provision Tenant
// ============================================================
export async function createStoreAction(formData: FormData): Promise<Result> {
  try {
    const user = await getSessionUser();
    if (!user) return { error: "Please log in first." };

    const existingStores = await db
      .select({ count: sql<number>`count(*)` })
      .from(stores)
      .where(eq(stores.userId, user.id));

    const currentStoreCount = Number(existingStores[0]?.count || 0);

    const subRows = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .limit(1);

    const maxAllowedStores = subRows[0]?.maxStores ?? 2;
    const currentPlan = subRows[0]?.plan || "free";

    if (currentStoreCount >= maxAllowedStores) {
      return {
        error: `Store limit reached (${currentStoreCount}/${maxAllowedStores}). Upgrade plan to add more stores.`,
      };
    }

    if (currentPlan === "free") {
      const walletRows = await db
        .select({ balance: wallets.balance })
        .from(wallets)
        .where(eq(wallets.userId, user.id))
        .limit(1);

      const balance = walletRows[0]?.balance ?? 0;
      if (balance <= 0) {
        return {
          error: "Wallet balance exhausted (0 credits). Please recharge to create stores.",
        };
      }
    }

    const storeName = fd(formData, "storeName") || "My Store";
    const businessName = fd(formData, "businessName") || storeName;
    const category = fd(formData, "category") || "Fashion";
    const country = fd(formData, "country") || "India";
    const currency = fd(formData, "currency") || "INR";
    const timezone = fd(formData, "timezone") || "Asia/Kolkata";
    const productTypesRaw = fd(formData, "productTypes");
    const productTypes = productTypesRaw ? (JSON.parse(productTypesRaw) as string[]) : ["Physical Products"];
    const templateId = fd(formData, "templateId") || "nova-fashion";
    const slugInput = fd(formData, "storeUrl");
    const brandName = fd(formData, "brandName") || storeName.split(" ")[0] || "Store";

// 🔽 NEW: DB-driven template validation
const dbTemplate = await getStoreTemplate("temp", templateId).catch(() => null);
const t: any = dbTemplate || templateById(templateId);

if (!t) {
  return { error: `Template "${templateId}" not found.` };
}
    const primaryColor =
      fd(formData, "primaryColor") ||
      t.palette?.primary ||
      t.themes?.[0]?.tokens?.accent ||
      "#0E6B54";

    const secondaryColor =
      fd(formData, "secondaryColor") ||
      t.palette?.secondary ||
      t.themes?.[0]?.tokens?.surface ||
      "#F2EDE3";

    let slug = slugify(slugInput || brandName);
    const taken = await db.select({ id: stores.id }).from(stores).where(eq(stores.slug, slug)).limit(1);
    if (taken.length) slug = `${slug}-${Math.floor(Math.random() * 900 + 100)}`;

    const uniqueSuffix = randomInt(1000, 9999);
    const cleanSlug = slug.replace(/[^a-zA-Z0-9_]/g, "_");
    const dbName = `tenant_${cleanSlug}_${uniqueSuffix}`;

    await provisionTenantDatabase(dbName);

    const sections = buildTemplateSections(t, brandName);

    const inserted = await db
      .insert(stores)
      .values({
        userId: user.id,
        name: storeName,
        businessName,
        category,
        country,
        currency,
        timezone,
        productTypes,
        templateId,
        slug,
        brandName,
        primaryColor,
        secondaryColor,
        published: false,
        sections: sections as any,
        connections: {},
        announcement: "Free shipping on orders above ₹999",
        discounts: [
          {
            id: "d1",
            code: "WELCOME10",
            type: "percentage",
            value: 10,
          },
        ],
        dbName,
      })
      .returning();

    const store = inserted[0];
    if (!store) return { error: "Failed to record store in database." };

    await setActiveStoreId(store.id);

try {
  // 🎯 Load demo data from template's own demo-data.ts
  const demo = await getDemoData(templateId);

  const tenantDb = getTenantDb(dbName);

  if (demo.products.length > 0) {
    const seedItems = demo.products.map((sp: any, idx: number) => ({
      storeId: store.id,
      name: sp.name,
      description: sp.description || "",
      image: sp.image,
      price: String(sp.price || "999"),
      compareAtPrice: sp.compareAt ? String(sp.compareAt) : null,
      sku: `SKU-DEMO-${cleanSlug.toUpperCase().slice(0, 3)}-${1000 + idx}`,
      inventory: sp.inventory || 25,
      category: (sp.category || category || "General").toLowerCase(),
      tags: sp.tags || [],
      variants: [],
      metadata: sp.metadata || {},       // 🎯 Template-specific
      isDemo: true,                       // 🎯 MARK AS DEMO
      status: "active",
    }));

    await tenantDb.insert(products).values(seedItems);
    console.log(`[Seed] ${seedItems.length} demo products inserted`);
  }
} catch (seedErr) {
  console.warn("[Seed Warning] Demo seeding skipped:", seedErr);
}

    revalidatePath("/admin");
    revalidatePath("/select-store");

    return { ok: true, redirect: "/admin" };
  } catch (err: any) {
    console.error("[Action Error] createStoreAction failed:", err);
    return { error: err?.message || "Store creation failed. Check database connection." };
  }
}

// ============================================================
// 5. Save Product
// ============================================================
export async function saveProductAction(formData: FormData): Promise<Result> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const store = await getStoreForUser(user.id);
  if (!store || !store.dbName) return { error: "no store" };

  const tenantDb = getTenantDb(store.dbName);
  const id = fd(formData, "id");
  const PRODUCT_COST = 5;

  const variantsRaw = fd(formData, "variants");
  let variants = [];
  try {
    variants = variantsRaw ? JSON.parse(variantsRaw) : [];
  } catch {
    variants = [];
  }

  const values = {
    storeId: store.id,
    name: fd(formData, "name") || "Untitled product",
    description: fd(formData, "description"),
    image:
      fd(formData, "image") ||
      "https://images.pexels.com/photos/9594147/pexels-photo-9594147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    price: fd(formData, "price") || "0",
    compareAtPrice: fd(formData, "compareAtPrice") || null,
    sku: fd(formData, "sku") || `SKU-${Math.floor(Math.random() * 9000 + 1000)}`,
    inventory: parseInt(fd(formData, "inventory") || "0", 10) || 0,
    category: fd(formData, "category") || "General",
    tags: fd(formData, "tags") ? fd(formData, "tags").split(",").map((s) => s.trim()).filter(Boolean) : [],
    variants: variants,
    seoTitle: fd(formData, "seoTitle"),
    seoDescription: fd(formData, "seoDescription"),
    status: fd(formData, "status") || "active",
  };

  if (id) {
    await tenantDb.update(products).set(values).where(eq(products.id, id));
    revalidatePath("/admin/products");
    return { ok: true };
  }

  const subRows = await db
    .select({ plan: subscriptions.plan })
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id))
    .limit(1);

  const currentPlan = subRows[0]?.plan || "free";

  if (currentPlan === "free") {
    const walletRows = await db
      .select({ id: wallets.id, balance: wallets.balance })
      .from(wallets)
      .where(eq(wallets.userId, user.id))
      .limit(1);

    const userWallet = walletRows[0];
    const currentBalance = userWallet?.balance ?? 0;

    if (currentBalance < PRODUCT_COST) {
      return {
        error: `Insufficient credits! Adding a product requires ${PRODUCT_COST} credits. Current balance: ${currentBalance}.`,
      };
    }

    try {
      await tenantDb.insert(products).values(values);

      await db.transaction(async (tx) => {
        const newBal = currentBalance - PRODUCT_COST;

        await tx
          .update(wallets)
          .set({
            balance: newBal,
            lifetimeUsed: sql`${wallets.lifetimeUsed} + ${PRODUCT_COST}`,
          })
          .where(eq(wallets.id, userWallet.id));

        await tx.insert(creditTransactions).values({
          walletId: userWallet.id,
          userId: user.id,
          amount: -PRODUCT_COST,
          actionType: "PRODUCT_CREATED",
          balanceAfter: newBal,
        });
      });
    } catch (err: any) {
      console.error("Failed to deduct credits:", err);
      return { error: "Failed to deduct credits." };
    }
  } else {
    await tenantDb.insert(products).values(values);
  }

  revalidatePath("/admin/products");
  return { ok: true };
}

export async function deleteProductAction(id: string): Promise<Result> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const store = await getStoreForUser(user.id);
  if (!store || !store.dbName) return { error: "no store" };

  const tenantDb = getTenantDb(store.dbName);
  await tenantDb.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function updateOrderStatusAction(id: string, status: string): Promise<Result> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const store = await getStoreForUser(user.id);
  if (!store || !store.dbName) return { error: "no store" };

  const tenantDb = getTenantDb(store.dbName);
  const paymentStatus = status === "cancelled" ? "refunded" : "paid";
  await tenantDb.update(orders).set({ fulfillmentStatus: status, paymentStatus }).where(eq(orders.id, id));
  revalidatePath("/admin/orders");
  return { ok: true };
}

export async function saveBuilderAction(storeId: string, sections: Section[]): Promise<Result> {
  await db.update(stores).set({ sections }).where(eq(stores.id, storeId));
  revalidatePath("/admin/builder");
  return { ok: true };
}

export async function publishStoreAction(storeId: string): Promise<Result> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };

  const subRows = await db
    .select({ canPublish: subscriptions.canPublish })
    .from(subscriptions)
    .where(eq(subscriptions.userId, user.id))
    .limit(1);

  if (!subRows[0]?.canPublish) {
    return {
      error: "Publishing is disabled on the Free tier. Upgrade your subscription to make your store live.",
    };
  }

  await db.update(stores).set({ published: true }).where(eq(stores.id, storeId));
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateSettingsAction(formData: FormData): Promise<Result> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const store = await getStoreForUser(user.id);
  if (!store) return { error: "no store" };
  const set: Partial<typeof stores.$inferInsert> = {};
  const map: Record<string, string> = {
    name: "name",
    businessName: "businessName",
    category: "category",
    country: "country",
    currency: "currency",
    timezone: "timezone",
    brandName: "brandName",
    primaryColor: "primaryColor",
    secondaryColor: "secondaryColor",
    announcement: "announcement",
    slug: "slug",
  };
  for (const [formKey, col] of Object.entries(map)) {
    const v = formData.get(formKey);
    if (v != null && String(v).trim() !== "") (set as Record<string, unknown>)[col] = String(v).trim();
  }
  if (set.slug) set.slug = slugify(set.slug as string);
  await db.update(stores).set(set).where(eq(stores.id, store.id));
  return { ok: true };
}

export async function toggleConnectionAction(storeId: string, key: string): Promise<Result> {
  const rows = await db.select().from(stores).where(eq(stores.id, storeId)).limit(1);
  const store = rows[0];
  if (!store) return { error: "no store" };
  const connections = { ...(store.connections as Record<string, boolean>), [key]: !(store.connections as Record<string, boolean>)?.[key] };
  await db.update(stores).set({ connections }).where(eq(stores.id, storeId));
  return { ok: true };
}

export async function saveDiscountsAction(storeId: string, discountsJson: string): Promise<Result> {
  await db.update(stores).set({ discounts: JSON.parse(discountsJson) }).where(eq(stores.id, storeId));
  return { ok: true };
}

// ============================================================
// 6. Create Campaign Action
// ============================================================
export async function createCampaignAction(formData: FormData): Promise<Result> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const store = await getStoreForUser(user.id);
  if (!store || !store.dbName) return { error: "no store" };

  const tenantDb = getTenantDb(store.dbName);
  await tenantDb.insert(campaigns).values({
    storeId: store.id,
    name: fd(formData, "name") || "Untitled campaign",
    type: "campaign",
    subject: fd(formData, "subject") || "Special update from our store",
    recipients: parseInt(fd(formData, "recipients") || "0", 10) || 0,
    sent: 0,
    openRate: "0",
    status: "draft",
  });
  revalidatePath("/admin/marketing");
  return { ok: true };
}

// ============================================================
// 7. Save / Toggle Email Automations
// ============================================================
export async function saveEmailAutomationAction(data: {
  type: string;
  subject: string;
  headline: string;
  message: string;
  ctaText: string;
  discountCode?: string;
  active: boolean;
}): Promise<Result> {
  try {
    const user = await getSessionUser();
    if (!user) return { error: "unauthenticated" };

    const store = await getStoreForUser(user.id);
    if (!store || !store.dbName) return { error: "no store" };

    const tenantDb = getTenantDb(store.dbName);

    const existing = await tenantDb
      .select()
      .from(emailAutomations)
      .where(sql`${emailAutomations.storeId} = ${store.id} AND ${emailAutomations.type} = ${data.type}`)
      .limit(1);

    if (existing.length > 0) {
      await tenantDb
        .update(emailAutomations)
        .set({
          subject: data.subject,
          headline: data.headline,
          message: data.message,
          ctaText: data.ctaText,
          discountCode: data.discountCode || null,
          active: data.active,
          updatedAt: new Date(),
        })
        .where(eq(emailAutomations.id, existing[0].id));
    } else {
      await tenantDb.insert(emailAutomations).values({
        storeId: store.id,
        type: data.type,
        subject: data.subject,
        headline: data.headline,
        message: data.message,
        ctaText: data.ctaText,
        discountCode: data.discountCode || null,
        active: data.active,
      });
    }

    revalidatePath("/admin/marketing");
    revalidatePath("/admin/email");
    return { ok: true };
  } catch (err: any) {
    console.error("[saveEmailAutomationAction Error]:", err);
    return { error: err?.message || "Failed to save automation" };
  }
}

export async function updateCustomerNotesAction(id: string, notes: string): Promise<Result> {
  const user = await getSessionUser();
  if (!user) return { error: "unauthenticated" };
  const store = await getStoreForUser(user.id);
  if (!store || !store.dbName) return { error: "no store" };

  const tenantDb = getTenantDb(store.dbName);
  await tenantDb.update(customers).set({ notes }).where(eq(customers.id, id));
  revalidatePath("/admin/customers");
  return { ok: true };
}

// ============================================================
// 8. Place Order
// ============================================================
export async function placeOrderAction(formData: FormData): Promise<Result> {
  const slug = fd(formData, "slug");
  const storeRows = await db.select().from(stores).where(eq(stores.slug, slug)).limit(1);
  const store = storeRows[0];
  if (!store || !store.dbName) return { error: "Store not found." };

  const tenantDb = getTenantDb(store.dbName);

  const cart = JSON.parse(fd(formData, "cart") || "[]") as {
    productId: string;
    name: string;
    image: string;
    price: number;
    qty: number;
    variant?: string;
  }[];
  if (!cart.length) return { error: "Your cart is empty." };
  const name = fd(formData, "name");
  const email = fd(formData, "email").toLowerCase();
  if (!name || !email) return { error: "Name and email are required." };

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const maxRows = await tenantDb
    .select({ n: sql<number>`coalesce(max(${orders.number}), 1000)` })
    .from(orders)
    .where(eq(orders.storeId, store.id));
  const nextNumber = Number(maxRows[0]?.n ?? 1000) + 1;

  const inserted = await tenantDb
    .insert(orders)
    .values({
      storeId: store.id,
      number: nextNumber,
      customerName: name,
      customerEmail: email,
      items: cart.map((it) => ({
        productId: it.productId,
        name: it.name,
        image: it.image,
        price: it.price,
        qty: it.qty,
        variant: it.variant,
      })),
      subtotal: String(subtotal),
      shipping: String(shipping),
      discount: "0",
      total: String(total),
      paymentStatus: "paid",
      fulfillmentStatus: "processing",
      address: {
        line1: fd(formData, "line1") || "—",
        city: fd(formData, "city") || "—",
        state: fd(formData, "state") || "—",
        pincode: fd(formData, "pincode") || "—",
        phone: fd(formData, "phone") || "—",
      },
    })
    .returning();

  for (const it of cart) {
    await tenantDb
      .update(products)
      .set({ inventory: sql`greatest(0, ${products.inventory} - ${it.qty})` })
      .where(eq(products.id, it.productId));
  }

  const custRows = await tenantDb
    .select()
    .from(customers)
    .where(sql`${customers.storeId} = ${store.id} and lower(${customers.email}) = ${email}`)
    .limit(1);

  if (custRows.length) {
    const c = custRows[0]!;
    await tenantDb
      .update(customers)
      .set({
        ordersCount: c.ordersCount + 1,
        totalSpent: String(Number(c.totalSpent) + total),
        lastOrderAt: new Date(),
        name,
      })
      .where(eq(customers.id, c.id));
  } else {
    await tenantDb.insert(customers).values({
      storeId: store.id,
      name,
      email,
      phone: fd(formData, "phone"),
      city: fd(formData, "city"),
      ordersCount: 1,
      totalSpent: String(total),
      lastOrderAt: new Date(),
      status: "active",
    });
  }

  const order = inserted[0];
  return { ok: true, redirect: `/store/${slug}/checkout/success?order=${order?.id ?? ""}` };
}