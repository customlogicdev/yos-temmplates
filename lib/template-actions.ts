// src/lib/template-actions.ts
"use server";

import { getAllActiveTemplates } from "./template-service";
import { TEMPLATE_CODE_REGISTRY } from "@/templates/registry";

/**
 * 🎯 CLIENT-SAFE TEMPLATE
 * ─────────────────────────────────────
 * Server Action se Client ko bhejne ke liye.
 * Isme function NAHI hai — sirf serializable data.
 */
export interface ClientTemplate {
  id: string;
  category: string;
  name: string;
  description: string | null;
  previewImage: string | null;
  theme: any;
  pages: string[];
  isActive: boolean;
  isPremium: boolean;
  requiredPlan: string | null;
  sortOrder: number | null;
  version: string | null;
  tags: string[];
  metadata: Record<string, any>;
}

export async function fetchActiveTemplatesAction(): Promise<{
  ok: boolean;
  templates: ClientTemplate[];
  error?: string;
}> {
  try {
    const mergedTemplates = await getAllActiveTemplates();

    // 🎯 Strip out loadTemplate function
    const clientTemplates: ClientTemplate[] = mergedTemplates
      .filter((t) => TEMPLATE_CODE_REGISTRY[t.id]) // sirf code mein exist karne wale
      .map((t) => ({
        id: t.id,
        category: t.category,
        name: t.name,
        description: t.description,
        previewImage: t.previewImage,
        theme: t.theme,
        pages: t.pages,
        isActive: t.isActive,
        isPremium: t.isPremium,
        requiredPlan: t.requiredPlan,
        sortOrder: t.sortOrder,
        version: t.version,
        tags: t.tags,
        metadata: t.metadata,
        // ❌ loadTemplate NOT included
      }));

    return { ok: true, templates: clientTemplates };
  } catch (err: any) {
    console.error("[fetchActiveTemplatesAction]", err);
    return { ok: false, templates: [], error: err?.message };
  }
}