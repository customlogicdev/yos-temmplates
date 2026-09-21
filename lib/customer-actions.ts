// src/lib/customer-actions.ts

"use server";

import { cookies } from "next/headers";
import { eq, and } from "drizzle-orm";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { getTenantDb } from "@/db/tenant-db";
import { customers } from "@/db/tenant-schema";

const SESSION_DAYS = 30;

// ✅ Per-store cookie (isolation)
function getCookieName(slug: string): string {
  return `customer_session_${slug}`;
}

// ============================================================
// PASSWORD HASHING
// ============================================================
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = scryptSync(password, salt, 64);
  const original = Buffer.from(hash, "hex");
  if (test.length !== original.length) return false;
  return timingSafeEqual(test, original);
}

// ============================================================
// REGISTER
// ============================================================
export async function registerCustomerAction(
  dbName: string,
  storeId: string,
  slug: string,
  formData: FormData
) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }
  if (!email.includes("@")) {
    return { error: "Please enter a valid email" };
  }

  try {
    const db = getTenantDb(dbName);

    // Check existing
    const existing = await db
      .select()
      .from(customers)
      .where(and(eq(customers.storeId, storeId), eq(customers.email, email)))
      .limit(1);

    if (existing.length > 0 && existing[0].passwordHash) {
      return { error: "Email already registered. Please login." };
    }

    let customerId: string;

    if (existing.length > 0) {
      // Guest → set password
      await db
        .update(customers)
        .set({ name, passwordHash: hashPassword(password), status: "active" })
        .where(eq(customers.id, existing[0].id));
      customerId = existing[0].id;
    } else {
      // New customer
      const [customer] = await db
        .insert(customers)
        .values({
          storeId,
          name,
          email,
          passwordHash: hashPassword(password),
          status: "active",
        })
        .returning();
      customerId = customer.id;
    }

    await setSessionCookie(slug, customerId);

    return { success: true, customerId };
  } catch (err: any) {
    console.error("[registerCustomerAction]", err?.message);
    return { error: err?.message || "Registration failed" };
  }
}

// ============================================================
// LOGIN
// ============================================================
export async function loginCustomerAction(
  dbName: string,
  storeId: string,
  slug: string,
  formData: FormData
) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password required" };
  }

  try {
    const db = getTenantDb(dbName);

    const [customer] = await db
      .select()
      .from(customers)
      .where(and(eq(customers.storeId, storeId), eq(customers.email, email)))
      .limit(1);

    if (!customer || !customer.passwordHash) {
      return { error: "Invalid email or password" };
    }

    if (!verifyPassword(password, customer.passwordHash)) {
      return { error: "Invalid email or password" };
    }

    await setSessionCookie(slug, customer.id);

    return { success: true, customerId: customer.id };
  } catch (err: any) {
    console.error("[loginCustomerAction]", err?.message);
    return { error: err?.message || "Login failed" };
  }
}

// ============================================================
// LOGOUT
// ============================================================
export async function logoutCustomerAction(slug: string) {
  const cookieStore = await cookies();
  cookieStore.delete(getCookieName(slug));
  return { success: true };
}

// ============================================================
// GET CURRENT CUSTOMER
// ============================================================
export async function getCurrentCustomerAction(
  dbName: string,
  slug: string
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getCookieName(slug))?.value;
    if (!token) return null;

    const [customerId] = token.split(":");
    if (!customerId) return null;

    const db = getTenantDb(dbName);
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, customerId))
      .limit(1);

    if (!customer) return null;

    const { passwordHash, ...safe } = customer;
    return safe;
  } catch {
    return null;
  }
}

// ============================================================
// INTERNAL — Set session cookie
// ============================================================
async function setSessionCookie(slug: string, customerId: string) {
  const token = `${customerId}:${Date.now()}`;
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set(getCookieName(slug), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}