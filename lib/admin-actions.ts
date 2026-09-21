// src/lib/admin-actions.ts
// 🎯 NEW FILE — Admin panel server actions (template management)

"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { templateRegistry } from "@/db/schema";

// ────────────────────────────────────────────────────────────
// Toggle template active/inactive
// ────────────────────────────────────────────────────────────
export async function toggleTemplateAction(
  templateId: string,
  isActive: boolean
) {
  try {
    await db
      .update(templateRegistry)
      .set({ isActive, updatedAt: new Date() })
      .where(eq(templateRegistry.id, templateId));

    revalidatePath("/admin/templates");
    return { success: true };
  } catch (error) {
    console.error("Toggle template error:", error);
    return { success: false, error: "Failed to toggle" };
  }
}

// ────────────────────────────────────────────────────────────
// Update template (pages, plan, theme, etc.)
// ────────────────────────────────────────────────────────────
export async function updateTemplateAction(
  templateId: string,
  updates: {
    pages?: string[];
    isActive?: boolean;
    isPremium?: boolean;
    requiredPlan?: string;
    theme?: any;
  }
) {
  try {
    await db
      .update(templateRegistry)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(templateRegistry.id, templateId));

    revalidatePath("/admin/templates");
    revalidatePath(`/admin/templates/${templateId}`);
    return { success: true };
  } catch (error) {
    console.error("Update template error:", error);
    return { success: false, error: "Failed to update" };
  }
}