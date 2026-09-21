// src/lib/template-service.ts
// 🎯 NEW FILE — DB + Code merge service

import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { templateRegistry, templateOverrides } from "@/db/schema";
import { getTemplateCode } from "@/templates/registry";
import type { MergedTemplate } from "./types";
import "server-only";   // 🔒 prevents this file from bundling into client
/**
 * Get single template (DB + Code merged)
 */
export async function getTemplate(id: string): Promise<MergedTemplate | null> {
  const [dbRow] = await db
    .select()
    .from(templateRegistry)
    .where(eq(templateRegistry.id, id))
    .limit(1);

  if (!dbRow) return null;

  const codeEntry = getTemplateCode(id);
  if (!codeEntry) {
    console.warn(`Template ${id} DB mein hai but code registry mein nahi`);
    return null;
  }


  return {
    id: dbRow.id,
    category: dbRow.category,
    name: dbRow.name,
    description: dbRow.description,
    previewImage: dbRow.previewImage,
    theme: dbRow.theme as any,
    pages: dbRow.pages || [],
    isActive: dbRow.isActive,
    isPremium: dbRow.isPremium,
    requiredPlan: dbRow.requiredPlan,
    sortOrder: dbRow.sortOrder,
    version: dbRow.version,
    tags: dbRow.tags || [],
    metadata: dbRow.metadata || {},
    loadTemplate: codeEntry.loadTemplate,
  };
}

/**
 * Get all active templates
 */
export async function getAllActiveTemplates(): Promise<MergedTemplate[]> {
  const dbRows = await db
    .select()
    .from(templateRegistry)
    .orderBy(templateRegistry.sortOrder);

  const merged: MergedTemplate[] = [];

  for (const row of dbRows) {
    const codeEntry = getTemplateCode(row.id);
    if (!codeEntry) continue;

    merged.push({
      id: row.id,
      category: row.category,
      name: row.name,
      description: row.description,
      previewImage: row.previewImage,
      theme: row.theme as any,
      pages: row.pages || [],
      isActive: row.isActive,
      isPremium: row.isPremium,
      requiredPlan: row.requiredPlan,
      sortOrder: row.sortOrder,
      version: row.version,
      tags: row.tags || [],
      metadata: row.metadata || {},
      loadTemplate: codeEntry.loadTemplate,
    });
  }

  return merged;
}

/**
 * Get templates by category
 */
export async function getTemplatesByCategory(
  category: string
): Promise<MergedTemplate[]> {
  const all = await getAllActiveTemplates();
  return all.filter((t) => t.category === category);
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<string[]> {
  const all = await getAllActiveTemplates();
  return Array.from(new Set(all.map((t) => t.category)));
}

/**
 * Get store's template with overrides
 */
export async function getStoreTemplate(
  storeId: string,
  templateId: string
): Promise<MergedTemplate | null> {
  const template = await getTemplate(templateId);
  if (!template) return null;

  const [override] = await db
    .select()
    .from(templateOverrides)
    .where(
      and(
        eq(templateOverrides.storeId, storeId),
        eq(templateOverrides.templateId, templateId)
      )
    )
    .limit(1);

  if (!override) return template;

  return {
    ...template,
    theme: {
      ...template.theme,
      ...(override.themeOverride || {}),
    } as any,
    pages: template.pages.filter(
      (p) => !(override.disabledPages || []).includes(p)
    ),
    metadata: {
      ...template.metadata,
      ...(override.metadata || {}),
    },
  };
}

/**
 * Check if template is available for a plan
 */
export function isTemplateAvailable(
  template: MergedTemplate,
  storePlan: "free" | "pro" | "business"
): boolean {
  if (!template.isActive) return false;
  if (!template.isPremium) return true;

  const planRank = { free: 0, pro: 1, business: 2 };
  const requiredRank =
    planRank[template.requiredPlan as keyof typeof planRank] || 0;
  const storeRank = planRank[storePlan];

  return storeRank >= requiredRank;
}