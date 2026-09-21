// src/lib/template-runtime.ts

import { templateById } from "./templates";
import { getTemplateComponent } from "./template-registry";
import type { StorefrontPageKey } from "./types";

export function createRenderConfig({
  templateId,
  storeData,
  page,
  basePath,
  product,
  category,
  query,
  isPreview = false,
}: {
  templateId: string;
  storeData: any;
  page: string;
  basePath: string;
  product?: any;
  category?: any;
  query?: string;
  isPreview?: boolean;
}) {
  // ✅ Get template catalog
  const catalog = templateById(templateId);
  
  // ✅ Get variant (first one or default)
  const variant = catalog.variants[0] || {
    id: "default",
    name: "Default",
    description: "Default variant",
    componentKey: catalog.componentKey,
    heroLayout: "split",
    productGrid: "airy",
    header: "centered",
    themeId: catalog.defaultThemeId,
    previewImage: catalog.previewImage,
  };
  
  // ✅ Get theme (first one or default)
  const theme = catalog.themes[0] || {
    id: "default",
    name: "Default",
    tokens: {
      bg: "#FFFFFF",
      fg: "#111111",
      muted: "#666666",
      accent: "#000000",
      accentFg: "#FFFFFF",
      surface: "#F5F5F5",
      border: "#E5E5E5",
      fontDisplay: "serif",
      fontBody: "sans-serif",
      radius: "0.5rem",
      heroOverlay: "rgba(0,0,0,0.05)",
    },
  };

  // ✅ Generate CSS variables
  const cssVars = {
    "--store-bg": theme.tokens.bg,
    "--store-fg": theme.tokens.fg,
    "--store-muted": theme.tokens.muted,
    "--store-accent": theme.tokens.accent,
    "--store-accent-fg": theme.tokens.accentFg,
    "--store-surface": theme.tokens.surface,
    "--store-border": theme.tokens.border,
    "--store-display": theme.tokens.fontDisplay,
    "--store-body": theme.tokens.fontBody,
    "--store-radius": theme.tokens.radius,
  };

  // ✅ Build navigation
  const nav = catalog.pages
    .filter((p: string) => ["home", "products", "about", "contact", "cart"].includes(p))
    .map((p: string) => ({
      page: p,
      label: p === "home" ? "Home" : p.charAt(0).toUpperCase() + p.slice(1),
      href: p === "home" ? basePath : `${basePath}/${p}`,
    }));

  // ✅ Runtime object
  const runtime = {
    catalog,
    variant,
    theme,
    componentKey: catalog.componentKey,
    cssVars,
    pages: catalog.pages,
    nav,
  };

  // ✅ Props for template
  const props = {
    page: page as StorefrontPageKey,
    data: storeData,
    runtime,
    product,
    category,
    query,
    basePath,
    isPreview,
  };

  return { runtime, props };
}