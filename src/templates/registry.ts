// src/templates/registry.ts
import type { TemplateCodeEntry } from "@/lib/types";

export const TEMPLATE_CODE_REGISTRY: Record<string, TemplateCodeEntry> = {
  // BEAUTY — Glow
  "beauty.glow": {
    id: "beauty.glow",
    loadTemplate: () =>
      import("./beauty/glow").then((m) => ({ default: m.BeautyGlowTemplate })),
  },

  // BEAUTY — Lumière (NEW) 🎯
  "beauty.lumiere": {
    id: "beauty.lumiere",
    loadTemplate: () =>
      import("./beauty/lumiere").then((m) => ({
        default: m.BeautyLumiereTemplate,
      })),
  },

  // GROCERY
  "fresh-market": {
    id: "fresh-market",
    loadTemplate: () =>
      import("./grocery/fresh/Template").then((m) => ({
        default: m.GroceryFreshTemplate,
      })),
  },

  // FASHION — LUXE
  "nova-fashion": {
    id: "nova-fashion",
    loadTemplate: () =>
      import("./fashion/luxe/Template").then((m) => ({
        default: m.FashionLuxeTemplate,
      })),
  },

  // FASHION — EDITORIAL
  "fashion.editorial": {
    id: "fashion.editorial",
    loadTemplate: () =>
      import("./fashion/editorial/Template").then((m) => ({
        default: m.FashionEditorialTemplate,
      })),
  },

  // FASHION — ATELIER
  "fashion.atelier": {
    id: "fashion.atelier",
    loadTemplate: () =>
      import("./fashion/atelier/Template").then((m) => ({
        default: m.FashionAtelierTemplate,
      })),
  },
};

export function getTemplateCode(id: string): TemplateCodeEntry | null {
  return TEMPLATE_CODE_REGISTRY[id] || null;
}

export function getAllTemplateCodes(): TemplateCodeEntry[] {
  return Object.values(TEMPLATE_CODE_REGISTRY);
}

// // src/templates/registry.ts
// // 🎯 Code component registry

// import type { TemplateCodeEntry } from "@/lib/types";

// export const TEMPLATE_CODE_REGISTRY: Record<string, TemplateCodeEntry> = {
//   // ═══════════════════════════════════════════════════════
//   // BEAUTY
//   // ═══════════════════════════════════════════════════════
//   "beauty.glow": {
//     id: "beauty.glow",
//     loadTemplate: () =>
//       import("./beauty/glow").then((m) => ({ default: m.BeautyGlowTemplate })),
//   },

//   // ═══════════════════════════════════════════════════════
//   // GROCERY
//   // ═══════════════════════════════════════════════════════
//   "fresh-market": {
//     id: "fresh-market",
//     loadTemplate: () =>
//       import("./grocery/fresh/Template").then((m) => ({
//         default: m.GroceryFreshTemplate,
//       })),
//   },

//   // ═══════════════════════════════════════════════════════
//   // FASHION — LUXE (Warm / Editorial)
//   // ═══════════════════════════════════════════════════════
//   "nova-fashion": {
//     id: "nova-fashion",
//     loadTemplate: () =>
//       import("./fashion/luxe/Template").then((m) => ({
//         default: m.FashionLuxeTemplate,
//       })),
//   },

//   // ═══════════════════════════════════════════════════════
//   // FASHION — EDITORIAL (Magazine)
//   // ═══════════════════════════════════════════════════════
//   "fashion.editorial": {
//     id: "fashion.editorial",
//     loadTemplate: () =>
//       import("./fashion/editorial/Template").then((m) => ({
//         default: m.FashionEditorialTemplate,
//       })),
//   },

//   // ═══════════════════════════════════════════════════════
//   // FASHION — ATELIER (NEW — Dark / Streetwear) 🎯
//   // ═══════════════════════════════════════════════════════
//   "fashion.atelier": {
//     id: "fashion.atelier",
//     loadTemplate: () =>
//       import("./fashion/atelier/Template").then((m) => ({
//         default: m.FashionAtelierTemplate,
//       })),
//   },
// };

// export function getTemplateCode(id: string): TemplateCodeEntry | null {
//   return TEMPLATE_CODE_REGISTRY[id] || null;
// }

// export function getAllTemplateCodes(): TemplateCodeEntry[] {
//   return Object.values(TEMPLATE_CODE_REGISTRY);
// }