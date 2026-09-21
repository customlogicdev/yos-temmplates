import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { users, sessions, stores } from "@/db/schema";
import type { User, Store } from "@/db/schema";

const COOKIE = "yos_session";
const STORE_COOKIE = "yos_active_store";

export function hashPassword(pw: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const h = scryptSync(pw, salt, 64);
  const buf = Buffer.from(hash, "hex");
  return h.length === buf.length && timingSafeEqual(h, buf);
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  });

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    await db.delete(sessions).where(eq(sessions.token, token));
  }
  jar.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  jar.set(STORE_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function getSessionUser(): Promise<User | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const rows = await db
    .select({ user: users })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(eq(sessions.token, token))
    .limit(1);
  if (!rows.length) return null;
  const sess = await db.select().from(sessions).where(eq(sessions.token, token)).limit(1);
  if (sess[0] && sess[0].expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.token, token));
    return null;
  }
  return rows[0] ? (rows[0] as { user: User }).user : null;
}

export async function getAllStoresForUser(userId: string): Promise<Store[]> {
  return await db
    .select()
    .from(stores)
    .where(eq(stores.userId, userId))
    .orderBy(desc(stores.createdAt));
}

export async function getStoreForUser(userId: string): Promise<Store | null> {
  const allStores = await getAllStoresForUser(userId);
  if (!allStores.length) return null;

  const jar = await cookies();
  const activeStoreId = jar.get(STORE_COOKIE)?.value;

  if (activeStoreId) {
    const selected = allStores.find((s) => s.id === activeStoreId);
    if (selected) return selected;
  }

  return allStores[0] ?? null;
}

export async function setActiveStoreId(storeId: string) {
  const jar = await cookies();
  jar.set(STORE_COOKIE, storeId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function requireSession(): Promise<{ user: User; store: Store | null; allStores: Store[] }> {
  const user = await getSessionUser();
  if (!user) throw new Error("unauthenticated");
  const allStores = await getAllStoresForUser(user.id);
  const store = await getStoreForUser(user.id);
  return { user, store, allStores };
}