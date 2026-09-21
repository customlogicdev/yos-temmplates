// src/lib/templates.ts
import type {
  TemplateCatalogItem,
  TemplateTheme,
  TemplateVariant,
  StorefrontPageKey,
  Section,
} from "./types";

export const TEMPLATE_CATEGORIES = [
  "All",
  "Fashion",
  "Healthcare",
  "Grocery",
  "Beauty",
] as const;

const F = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800`;

const COMMERCE_PAGES: StorefrontPageKey[] = [
  "home",
  "products",
  "product",
  "collection",
  "about",
  "contact",
  "cart",
  "search",
];

function theme(
  id: string,
  name: string,
  tokens: TemplateTheme["tokens"]
): TemplateTheme {
  return { id, name, tokens };
}

function variant(config: TemplateVariant): TemplateVariant {
  return config;
}

// ═══════════════════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════════════════

const BEAUTY_GLOW = theme("beauty.glow", "Glow", {
  bg: "#FFFFFF",
  fg: "#27222A",
  muted: "#746B78",
  accent: "#C084FC",
  accentFg: "#FFFFFF",
  surface: "#F5F3FF",
  border: "#E6DFF2",
  fontDisplay: "serif",
  fontBody: "sans-serif",
  radius: "1rem",
  heroOverlay: "rgba(124,58,237,0.06)",
});

const GROCERY_FRESH = theme("grocery.fresh", "Fresh", {
  bg: "#FFFEFB",
  fg: "#2C2C2C",
  muted: "#686868",
  accent: "#16A34A",
  accentFg: "#FFFFFF",
  surface: "#F0FDF4",
  border: "#D1FAE5",
  fontDisplay: "sans-serif",
  fontBody: "sans-serif",
  radius: "1rem",
  heroOverlay: "rgba(22,163,74,0.06)",
});

const FASHION_ATELIER = theme("fashion.atelier", "Atelier", {
  bg: "#000000",
  fg: "#FFFFFF",
  muted: "#888888",
  accent: "#FFFFFF",
  accentFg: "#000000",
  surface: "#111111",
  border: "#333333",
    fontDisplay: "sans-serif",   // 👈 ye change karo
  fontBody: "sans-serif",      // 👈 ye change karo

  radius: "0px",
  heroOverlay: "rgba(255,255,255,0.05)",
});

const HEALTHCARE_CLINIC = theme("healthcare.clinic", "Clinic", {
  bg: "#FFFFFF",
  fg: "#0F172A",
  muted: "#64748B",
  accent: "#0EA5E9",
  accentFg: "#FFFFFF",
  surface: "#EFF6FF",
  border: "#DCE8F7",
  fontDisplay: "sans-serif",
  fontBody: "sans-serif",
  radius: "0.75rem",
  heroOverlay: "rgba(14,165,233,0.05)",
});

// ═══════════════════════════════════════════════════════
// TEMPLATES CATALOG — 4 templates
// ═══════════════════════════════════════════════════════
export const TEMPLATES: TemplateCatalogItem[] = [
  // ─────────────────────────────────────────────────────
  // 1. BEAUTY — Glow
  // ─────────────────────────────────────────────────────
  {
    id: "beauty.glow",
    name: "Glow",
    category: "beauty",
    categoryLabel: "Beauty",
    templateType: "Glow",
    componentKey: "beauty.glow",
    description: "Soft, feminine beauty template for skincare and cosmetics.",
    previewImage: F(3785147),
    defaultVariantId: "glow",
    defaultThemeId: "beauty.glow",
    variants: [
      variant({
        id: "glow",
        name: "Glow",
        description: "Soft premium beauty presentation.",
        componentKey: "beauty.glow",
        type: "Glow",
        heroLayout: "split",
        productGrid: "airy",
        header: "centered",
        themeId: "beauty.glow",
        previewImage: F(3785147),
      }),
    ],
    themes: [BEAUTY_GLOW],
    pages: COMMERCE_PAGES,
    tags: ["beauty", "skincare", "cosmetics"],
    features: ["Shop by concern", "Reviews", "Wishlist"],
  },

  // ─────────────────────────────────────────────────────
  // 2. GROCERY — Fresh Market
  // ─────────────────────────────────────────────────────
  {
    id: "fresh-market",
    name: "Fresh Market",
    category: "grocery",
    categoryLabel: "Grocery",
    templateType: "Fresh",
    componentKey: "fresh-market",
    description: "Fresh grocery storefront with product-first merchandising.",
    previewImage: F(264636),
    defaultVariantId: "fresh",
    defaultThemeId: "grocery.fresh",
    variants: [
      variant({
        id: "fresh",
        name: "Fresh",
        description: "Bright fresh-market storefront.",
        componentKey: "fresh-market",
        type: "Fresh",
        heroLayout: "split",
        productGrid: "dense",
        header: "centered",
        themeId: "grocery.fresh",
        previewImage: F(264636),
      }),
    ],
    themes: [GROCERY_FRESH],
    pages: COMMERCE_PAGES,
    tags: ["grocery", "fresh", "supermarket"],
    features: ["Dense product grid", "Search", "Stock status"],
  },

  // ─────────────────────────────────────────────────────
  // 3. FASHION — Atelier (NEW) 🎯
  // ─────────────────────────────────────────────────────
  {
    id: "fashion.atelier",
    name: "Atelier",
    category: "fashion",
    categoryLabel: "Fashion",
    templateType: "Streetwear",
    componentKey: "fashion.atelier",
    description: "Bold streetwear-inspired fashion template with dark UI.",
    previewImage: F(30590661),
    defaultVariantId: "atelier",
    defaultThemeId: "fashion.atelier",
    variants: [
      variant({
        id: "atelier",
        name: "Atelier",
        description: "Dark streetwear presentation.",
        componentKey: "fashion.atelier",
        type: "Streetwear",
        heroLayout: "split",
        productGrid: "dense",
        header: "centered",
        themeId: "fashion.atelier",
        previewImage: F(30590661),
      }),
    ],
    themes: [FASHION_ATELIER],
    pages: COMMERCE_PAGES,
    tags: ["fashion", "streetwear", "dark"],
    features: ["Bold typography", "Product grid", "Quick view"],
  },

  // ─────────────────────────────────────────────────────
  // 4. HEALTHCARE — Clinic
  // ─────────────────────────────────────────────────────
  {
    id: "healthcare-clinic",
    name: "Healthcare Clinic",
    category: "healthcare",
    categoryLabel: "Healthcare",
    templateType: "Clinic",
    componentKey: "healthcare.clinic",
    description: "Professional clinic and healthcare storefront.",
    previewImage:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    defaultVariantId: "clinic",
    defaultThemeId: "healthcare.clinic",
    variants: [
      variant({
        id: "clinic",
        name: "Clinic",
        description: "Professional clinic layout.",
        componentKey: "healthcare.clinic",
        type: "Clinic",
        heroLayout: "split",
        productGrid: "airy",
        header: "solid",
        themeId: "healthcare.clinic",
        previewImage:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
      }),
    ],
    themes: [HEALTHCARE_CLINIC],
    pages: COMMERCE_PAGES,
    tags: ["healthcare", "clinic", "wellness"],
    features: ["Appointments", "Services", "Contact"],
  },
];

// ═══════════════════════════════════════════════════════
// LOOKUP HELPERS
// ═══════════════════════════════════════════════════════
export function templateById(
  id: string | null | undefined
): TemplateCatalogItem {
  if (!id) return TEMPLATES[0];
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export function templatesByCategory(category: string): TemplateCatalogItem[] {
  if (!category || category === "All") return TEMPLATES;
  const normalized = category.trim().toLowerCase();
  return TEMPLATES.filter(
    (t) =>
      t.category === normalized ||
      t.categoryLabel.toLowerCase() === normalized
  );
}

export function buildTemplateSections(
  template: TemplateCatalogItem,
  brandName: string
): Section[] {
  const activeTheme =
    template.themes.find((item) => item.id === template.defaultThemeId) ??
    template.themes[0];

  return [
    {
      id: "sec_header",
      type: "header",
      props: {
        brandText: brandName || template.name,
        bgColor: activeTheme?.tokens.bg ?? "#ffffff",
        textColor: activeTheme?.tokens.fg ?? "#111111",
      },
    },
    {
      id: "sec_hero",
      type: "hero",
      props: {
        heading: `Explore the New ${brandName || template.name} Edit`,
        subheading: template.description,
        ctaText: "Explore Collection",
        image: template.previewImage,
        align: "left",
        bgColor: activeTheme?.tokens.surface ?? "#F2EDE3",
        textColor: activeTheme?.tokens.fg ?? "#111111",
      },
    },
    {
      id: "sec_products",
      type: "productGrid",
      props: {
        title: "Curated Bestsellers",
        subtitle: "Authentic stock ready to dispatch.",
        columns: 4,
        bgColor: activeTheme?.tokens.bg ?? "#ffffff",
      },
    },
    {
      id: "sec_testimonials",
      type: "testimonials",
      props: {
        title: "What Our Customers Say",
        bgColor: activeTheme?.tokens.surface ?? "#FAF9F6",
        textColor: activeTheme?.tokens.fg ?? "#1c1e1b",
      },
    },
    {
      id: "sec_footer",
      type: "footer",
      props: {
        brandText: brandName || template.name,
        tagline: "Fine craftsmanship delivered directly to your doorstep.",
        bgColor: activeTheme?.tokens.accent ?? "#111111",
        textColor: "#FFFFFF",
      },
    },
  ];
}

export interface CustomPageDef {
  slug: string;
  title: string;
  type: "catalog" | "article" | "contact" | "home";
  categoryFilter?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  contentHtml?: string;
}

export function buildTemplatePages(
  template: TemplateCatalogItem,
  brandName: string
): CustomPageDef[] {
  const resolvedBrand = brandName || template?.name || "Store";

  return [
    {
      slug: "collections",
      title: "All Products",
      type: "catalog",
      heroHeading: `Welcome to ${resolvedBrand}`,
      heroSubheading: "Explore our latest authentic collections.",
    },
    {
      slug: "about",
      title: "About Us",
      type: "article",
      heroHeading: `The Story of ${resolvedBrand}`,
      heroSubheading:
        "Commitment to uncompromising quality and authentic design.",
      contentHtml: `<p>Welcome to ${resolvedBrand}. We believe in generational craftsmanship, authentic materials, and uncompromising detail.</p>`,
    },
    {
      slug: "contact",
      title: "Contact Us",
      type: "contact",
      heroHeading: "Get in Touch",
      heroSubheading:
        "Reach out to our concierge team for bespoke inquiries and orders.",
    },
  ];
}