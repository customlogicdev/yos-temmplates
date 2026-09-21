// src/lib/types.ts

import type { ComponentType } from "react";

// ============================================================
// TEMPLATE CATEGORIES
// ============================================================

export type TemplateCategory =
  | "fashion"
  | "footwear"
  | "jewellery"
  | "beauty"
  | "electronics"
  | "furniture"
  | "food"
  | "sports"
  | "healthcare"
  | "grocery"
  | "digital-products";

export type StorefrontPageKey =
  | "home"
  | "products"
  | "product"
  | "collection"
  | "about"
  | "contact"
  | "cart"
  | "search"
  | "appointment"
  | "services"
  | "login"
  | "register"
  | "checkout"
  | "account"
  | "order";

// ============================================================
// LAYOUT TYPES
// ============================================================

export type HeroLayout =
  | "split"
  | "full"
  | "minimal"
  | "magazine"
  | "catalog";

export type ProductGridLayout =
  | "airy"
  | "editorial"
  | "tiles"
  | "dense"
  | "list";

export type HeaderLayout =
  | "centered"
  | "floating"
  | "solid"
  | "transparent"
  | "stacked"
  | "utility";

// ============================================================
// SECTION TYPES
// ============================================================

export type SectionType =
  | "header"
  | "hero"
  | "productGrid"
  | "productCarousel"
  | "categories"
  | "banner"
  | "image"
  | "text"
  | "testimonials"
  | "newsletter"
  | "footer";

export interface FieldDef {
  key: string;
  label: string;
  kind: "text" | "textarea" | "color" | "select" | "range" | "align";
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

// ============================================================
// TEMPLATE THEME
// ============================================================

export interface TemplateTheme {
  id: string;
  name: string;
  tokens: {
    bg: string;
    fg: string;
    muted: string;
    accent: string;
    accentFg: string;
    surface: string;
    border: string;
    fontDisplay: "serif" | "sans-serif";
    fontBody: "serif" | "sans-serif";
    radius: string;
    heroOverlay: string;
  };
}

// ============================================================
// TEMPLATE VARIANT
// ============================================================

export interface TemplateVariant {
  id: string;
  name: string;
  description: string;
  componentKey: string;
  type: string;
  heroLayout: HeroLayout;
  productGrid: ProductGridLayout;
  header: HeaderLayout;
  themeId: string;
  previewImage: string;
}

// ============================================================
// TEMPLATE CATALOG ITEM
// ============================================================

export interface TemplateCatalogItem {
  id: string;
  name: string;
  category: TemplateCategory;
  categoryLabel: string;
  templateType: string;
  componentKey: string;
  description: string;
  previewImage: string;
  defaultVariantId: string;
  defaultThemeId: string;
  variants: TemplateVariant[];
  themes: TemplateTheme[];
  pages: StorefrontPageKey[];
  tags: string[];
  features: string[];
}

// ============================================================
// TEMPLATE RENDER PROPS
// ============================================================

export interface TemplateRenderProps {
  template: TemplateCatalogItem;
  variant: TemplateVariant;
  theme: TemplateTheme;
  storefront: StorefrontData;
  page: StorefrontPageKey;
  navigation: NavigationItem[];
  settings: StorefrontSettings;

  // ✅ Slug (top-level, per-store)
  slug?: string;

  // ✅ Customer (logged-in)
  customer?: any;

  // ✅ Order data
  order?: any;
  orderId?: string;
  orders?: any[];

  // ✅ Product
  product?: any;
  productId?: string | null;

  // Runtime properties
  runtime?: {
    variant?: {
      id?: string;
      name?: string;
    };
    isPreview?: boolean;
    isEditing?: boolean;
  };

  // Data properties
  data?: {
    products: any[];
    featuredProducts?: any[];
    categories?: any[];
    testimonials?: any[];

    // ✅ Store info — id, dbName, slug, address, etc.
    store?: {
      id?: string;
      dbName?: string;
      slug?: string;
      name?: string;
      tagline?: string;
      about?: string;
      address?: string;
      email?: string;
      phone?: string;
      whatsapp?: string;
      social?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        youtube?: string;
      };
      footerNote?: string;
      shippingNote?: string;
      returnNote?: string;
      [key: string]: any;
    };

    basePath?: string;
    slug?: string;

    category?: {
      id?: string;
      name?: string;
      slug?: string;
    } | null;

    query?: string;

    // ✅ Allow any extra fields
    [key: string]: any;
  };

  // Direct properties
  basePath?: string;

  category?: {
    id?: string;
    name?: string;
    slug?: string;
  } | null;

  query?: string;

  // ✅ Allow any extra top-level properties
  [key: string]: any;
}

// ============================================================
// STOREFRONT DATA
// ============================================================

export interface StorefrontData {
  id: string;
  name: string;
  brandName: string;
  description: string;
  logo?: string;
  templateId: string;
  variantId: string;
  themeId: string;
  products: Product[];
  categories: Category[];
  testimonials: Testimonial[];
  pages: Page[];
  settings: StorefrontSettings;
}

export interface VariantGroup {
  name: string;
  options: string[];
}

export interface OrderItem {
  productId?: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  variant?: string;
}

export interface StorefrontSettings {
  currency: string;
  locale: string;
  contactEmail: string;
  contactPhone?: string;
  socialLinks: SocialLinks;
  shippingPolicy?: string;
  returnPolicy?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

// ============================================================
// PRODUCT TYPES
// ============================================================

export interface Product {
  id: string;
  title: string;
  name?: string;
  slug?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  compareAt?: number;
  images: string[];
  image?: string;
  brand?: string;
  category: string;
  categoryId?: string;
  tags: string[];
  sku: string;
  stock: number;
  inventory?: number;
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  gallery?: string[];
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductVariant {
  id?: string;
  name: string;
  options: string[];
  price?: number;
  sku?: string;
  stock?: number;
}

// ============================================================
// CATEGORY TYPES
// ============================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

// ============================================================
// TESTIMONIAL TYPES
// ============================================================

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  productId?: string;
}

// ============================================================
// PAGE TYPES
// ============================================================

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

// ============================================================
// NAVIGATION TYPES
// ============================================================

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

// ============================================================
// SECTION TYPES (Legacy/Builder)
// ============================================================

export interface Section {
  id: string;
  type: string;
  props: Record<string, any>;
}

// ============================================================
// DISCOUNT TYPES
// ============================================================

export interface Discount {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderValue?: number;
  expiresAt?: string;
  status?: "active" | "inactive" | "expired";  // ← add
  usage?: number;                              // ← add
}

// ============================================================
// RESOLVER TYPES
// ============================================================

export interface ResolvedTemplate {
  component: ComponentType<TemplateRenderProps>;
  template: TemplateCatalogItem;
  variant: TemplateVariant;
  theme: TemplateTheme;
}

// ============================================================
// TEMPLATE DEFINITION (Legacy)
// ============================================================

export interface TemplateDef {
  id: string;
  name: string;
  category: string;
  description: string;
  palette: {
    primary: string;
    secondary: string;
    bg: string;
    ink: string;
    accent: string;
  };
  heroImage: string;
  commerceCategory: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
  phone?: string;
}

// ============================================================
// THEME PROPS (for existing theme components)
// ============================================================

export interface ThemeProps {
  sections: Section[];
  products: Product[];
  slug: string;
  brandName?: string;
  builderMode?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}

// ============================================================
// CART LINE TYPE
// ============================================================

export interface CartLine {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  variant?: string;
}


// further chanages for tempalate iby DB 
// src/lib/types.ts
// ... existing types (same rahenge)

// ═══════════════════════════════════════════════════════════
// 🎯 NEW: MERGED TEMPLATE (DB + Code)
// ═══════════════════════════════════════════════════════════
export interface MergedTemplate {
  id: string;
  category: string;
  name: string;
  description: string | null;
  previewImage: string | null;
  theme: {
    colors: Record<string, string>;
    typography: Record<string, string>;
    layout: Record<string, string>;
  };
  pages: string[];
  isActive: boolean;
  isPremium: boolean;
  requiredPlan: string | null;
  sortOrder: number | null;
  version: string | null;
  tags: string[];
  metadata: Record<string, any>;
  loadTemplate: () => Promise<{ default: ComponentType<any> }>;
}

// ═══════════════════════════════════════════════════════════
// 🎯 NEW: TEMPLATE CODE REGISTRY ENTRY
// ═══════════════════════════════════════════════════════════
export interface TemplateCodeEntry {
  id: string;
  loadTemplate: () => Promise<{ default: ComponentType<any> }>;
}