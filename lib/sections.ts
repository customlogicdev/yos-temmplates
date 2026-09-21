import type { FieldDef, Section, SectionType, TemplateCatalogItem } from "./types";

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

interface SectionMeta {
  type: SectionType;
  label: string;
  hint: string;
  fields: FieldDef[];
  defaults: (t: TemplateCatalogItem, brand: string) => Record<string, unknown>;
}

const ALIGN = {
  key: "align",
  label: "Alignment",
  kind: "align" as const,
};

// Helper function to safely get theme colors
function getThemeColors(t: TemplateCatalogItem) {
  const theme = t.themes?.[0];
  return {
    bg: theme?.tokens?.bg || "#ffffff",
    fg: theme?.tokens?.fg || "#111111",
    muted: theme?.tokens?.muted || "#666666",
    accent: theme?.tokens?.accent || "#000000",
    accentFg: theme?.tokens?.accentFg || "#ffffff",
    surface: theme?.tokens?.surface || "#f5f5f5",
    border: theme?.tokens?.border || "#e5e5e5",
  };
}

// Helper function to safely get preview image
function getPreviewImage(t: TemplateCatalogItem) {
  return t.previewImage || t.variants?.[0]?.previewImage || "";
}

export const SECTION_META: SectionMeta[] = [
  {
    type: "header",
    label: "Header",
    hint: "Navigation bar with logo and links",
    fields: [
      { key: "brandText", label: "Brand name", kind: "text" },
      { key: "navLinks", label: "Nav links (comma separated)", kind: "text" },
      { key: "bgColor", label: "Background", kind: "color" },
      { key: "textColor", label: "Text color", kind: "color" },
    ],
    defaults: (t, brand) => {
      const colors = getThemeColors(t);
      return {
        brandText: brand,
        navLinks: "Home, Shop, Categories, About, Contact",
        bgColor: colors.bg,
        textColor: colors.fg,
      };
    },
  },
  {
    type: "hero",
    label: "Hero",
    hint: "Large banner with headline and CTA",
    fields: [
      { key: "heading", label: "Heading", kind: "textarea" },
      { key: "subheading", label: "Subheading", kind: "textarea" },
      { key: "ctaText", label: "Button text", kind: "text" },
      { key: "image", label: "Image URL", kind: "text" },
      { key: "bgColor", label: "Background", kind: "color" },
      { key: "textColor", label: "Text color", kind: "color" },
      ALIGN,
      { key: "height", label: "Height", kind: "range", min: 320, max: 620, step: 10 },
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return {
        heading: "Discover products you'll love.",
        subheading:
          "Thoughtfully curated collections, crafted for everyday life. Free shipping on orders above ₹999.",
        ctaText: "Shop Now",
        image: getPreviewImage(t),
        bgColor: colors.surface,
        textColor: colors.fg,
        align: "left",
        height: 460,
      };
    },
  },
  {
    type: "productGrid",
    label: "Product Grid",
    hint: "Grid of products from your catalog",
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "subtitle", label: "Subtitle", kind: "text" },
      {
        key: "columns",
        label: "Columns",
        kind: "select",
        options: [
          { value: "2", label: "2 columns" },
          { value: "3", label: "3 columns" },
          { value: "4", label: "4 columns" },
        ],
      },
      { key: "bgColor", label: "Background", kind: "color" },
      { key: "padding", label: "Vertical spacing", kind: "range", min: 24, max: 96, step: 4 },
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return {
        title: "Bestsellers",
        subtitle: "Our most-loved pieces this season",
        columns: "4",
        bgColor: colors.bg,
        padding: 64,
      };
    },
  },
  {
    type: "productCarousel",
    label: "Product Carousel",
    hint: "Horizontal scrolling product rail",
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "bgColor", label: "Background", kind: "color" },
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return { 
        title: "New Arrivals", 
        bgColor: colors.bg 
      };
    },
  },
  {
    type: "categories",
    label: "Categories",
    hint: "Shop by category tiles",
    fields: [
      { key: "title", label: "Title", kind: "text" },
      {
        key: "cols",
        label: "Columns",
        kind: "select",
        options: [
          { value: "3", label: "3 columns" },
          { value: "4", label: "4 columns" },
          { value: "6", label: "6 columns" },
        ],
      },
      { key: "bgColor", label: "Background", kind: "color" },
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return { 
        title: "Shop by Category", 
        cols: "4", 
        bgColor: colors.bg 
      };
    },
  },
  {
    type: "banner",
    label: "Banner",
    hint: "Promotional banner with call to action",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "subheading", label: "Subheading", kind: "text" },
      { key: "ctaText", label: "Button text", kind: "text" },
      { key: "bgColor", label: "Background", kind: "color" },
      { key: "textColor", label: "Text color", kind: "color" },
      ALIGN,
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return {
        heading: "The Winter Edit is here",
        subheading: "Up to 40% off selected styles. This week only.",
        ctaText: "Shop the sale",
        bgColor: colors.accent,
        textColor: colors.accentFg,
        align: "center",
      };
    },
  },
  {
    type: "image",
    label: "Image",
    hint: "Full-width image block",
    fields: [
      { key: "image", label: "Image URL", kind: "text" },
      { key: "height", label: "Height", kind: "range", min: 160, max: 560, step: 10 },
      { key: "radius", label: "Corner radius", kind: "range", min: 0, max: 32, step: 2 },
    ],
    defaults: (t) => ({ 
      image: getPreviewImage(t), 
      height: 360, 
      radius: 16 
    }),
  },
  {
    type: "text",
    label: "Text",
    hint: "Heading and body copy",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "body", label: "Body", kind: "textarea" },
      {
        key: "size",
        label: "Size",
        kind: "select",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ],
      },
      { key: "textColor", label: "Text color", kind: "color" },
      ALIGN,
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return {
        heading: "Our story",
        body: "We started with a simple idea — beautiful things should be accessible to everyone. Every piece in our catalog is hand-picked and quality checked before it reaches you.",
        size: "md",
        textColor: colors.fg,
        align: "center",
      };
    },
  },
  {
    type: "testimonials",
    label: "Testimonials",
    hint: "Customer reviews and quotes",
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "bgColor", label: "Background", kind: "color" },
      { key: "textColor", label: "Text color", kind: "color" },
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return { 
        title: "Loved by thousands", 
        bgColor: colors.bg, 
        textColor: colors.fg 
      };
    },
  },
  {
    type: "newsletter",
    label: "Newsletter",
    hint: "Email capture block",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "subheading", label: "Subheading", kind: "text" },
      { key: "buttonText", label: "Button text", kind: "text" },
      { key: "bgColor", label: "Background", kind: "color" },
      { key: "textColor", label: "Text color", kind: "color" },
    ],
    defaults: (t) => {
      const colors = getThemeColors(t);
      return {
        heading: "Join the inner circle",
        subheading: "Early access to drops, members-only pricing and 10% off your first order.",
        buttonText: "Subscribe",
        bgColor: colors.fg,
        textColor: "#FFFFFF",
      };
    },
  },
  {
    type: "footer",
    label: "Footer",
    hint: "Store footer with links",
    fields: [
      { key: "brandText", label: "Brand name", kind: "text" },
      { key: "tagline", label: "Tagline", kind: "textarea" },
      { key: "bgColor", label: "Background", kind: "color" },
      { key: "textColor", label: "Text color", kind: "color" },
    ],
    defaults: (t, brand) => {
      const colors = getThemeColors(t);
      return {
        brandText: brand,
        tagline: "Build your store. Your way.",
        bgColor: colors.fg,
        textColor: "#E8E6DF",
      };
    },
  },
];

export function metaFor(type: SectionType) {
  return SECTION_META.find((m) => m.type === type)!;
}

export function buildDefaultSections(
  t: TemplateCatalogItem, 
  brand: string
): Section[] {
  const pick = (type: SectionType): Record<string, unknown> =>
    metaFor(type).defaults(t, brand);
    
  return [
    { id: uid(), type: "header", props: pick("header") },
    { id: uid(), type: "hero", props: pick("hero") },
    { id: uid(), type: "categories", props: pick("categories") },
    { id: uid(), type: "productGrid", props: pick("productGrid") },
    { id: uid(), type: "banner", props: pick("banner") },
    { id: uid(), type: "productCarousel", props: pick("productCarousel") },
    { id: uid(), type: "testimonials", props: pick("testimonials") },
    { id: uid(), type: "newsletter", props: pick("newsletter") },
    { id: uid(), type: "footer", props: pick("footer") },
  ];
}
// import type { FieldDef, Section, SectionType, TemplateDef } from "./types";

// export function uid() {
//   return Math.random().toString(36).slice(2, 9);
// }

// interface SectionMeta {
//   type: SectionType;
//   label: string;
//   hint: string;
//   fields: FieldDef[];
//   defaults: (t: TemplateDef, brand: string) => Record<string, unknown>;
// }

// const ALIGN = {
//   key: "align",
//   label: "Alignment",
//   kind: "align" as const,
// };

// export const SECTION_META: SectionMeta[] = [
//   {
//     type: "header",
//     label: "Header",
//     hint: "Navigation bar with logo and links",
//     fields: [
//       { key: "brandText", label: "Brand name", kind: "text" },
//       { key: "navLinks", label: "Nav links (comma separated)", kind: "text" },
//       { key: "bgColor", label: "Background", kind: "color" },
//       { key: "textColor", label: "Text color", kind: "color" },
//     ],
//     defaults: (t, brand) => ({
//       brandText: brand,
//       navLinks: "Home, Shop, Categories, About, Contact",
//       bgColor: t.palette.bg,
//       textColor: t.palette.ink,
//     }),
//   },
//   {
//     type: "hero",
//     label: "Hero",
//     hint: "Large banner with headline and CTA",
//     fields: [
//       { key: "heading", label: "Heading", kind: "textarea" },
//       { key: "subheading", label: "Subheading", kind: "textarea" },
//       { key: "ctaText", label: "Button text", kind: "text" },
//       { key: "image", label: "Image URL", kind: "text" },
//       { key: "bgColor", label: "Background", kind: "color" },
//       { key: "textColor", label: "Text color", kind: "color" },
//       ALIGN,
//       { key: "height", label: "Height", kind: "range", min: 320, max: 620, step: 10 },
//     ],
//     defaults: (t) => ({
//       heading: "Discover products you'll love.",
//       subheading:
//         "Thoughtfully curated collections, crafted for everyday life. Free shipping on orders above ₹999.",
//       ctaText: "Shop Now",
//       image: t.heroImage,
//       bgColor: t.palette.secondary,
//       textColor: t.palette.ink,
//       align: "left",
//       height: 460,
//     }),
//   },
//   {
//     type: "productGrid",
//     label: "Product Grid",
//     hint: "Grid of products from your catalog",
//     fields: [
//       { key: "title", label: "Title", kind: "text" },
//       { key: "subtitle", label: "Subtitle", kind: "text" },
//       {
//         key: "columns",
//         label: "Columns",
//         kind: "select",
//         options: [
//           { value: "2", label: "2 columns" },
//           { value: "3", label: "3 columns" },
//           { value: "4", label: "4 columns" },
//         ],
//       },
//       { key: "bgColor", label: "Background", kind: "color" },
//       { key: "padding", label: "Vertical spacing", kind: "range", min: 24, max: 96, step: 4 },
//     ],
//     defaults: (t) => ({
//       title: "Bestsellers",
//       subtitle: "Our most-loved pieces this season",
//       columns: "4",
//       bgColor: t.palette.bg,
//       padding: 64,
//     }),
//   },
//   {
//     type: "productCarousel",
//     label: "Product Carousel",
//     hint: "Horizontal scrolling product rail",
//     fields: [
//       { key: "title", label: "Title", kind: "text" },
//       { key: "bgColor", label: "Background", kind: "color" },
//     ],
//     defaults: (t) => ({ title: "New Arrivals", bgColor: t.palette.bg }),
//   },
//   {
//     type: "categories",
//     label: "Categories",
//     hint: "Shop by category tiles",
//     fields: [
//       { key: "title", label: "Title", kind: "text" },
//       {
//         key: "cols",
//         label: "Columns",
//         kind: "select",
//         options: [
//           { value: "3", label: "3 columns" },
//           { value: "4", label: "4 columns" },
//           { value: "6", label: "6 columns" },
//         ],
//       },
//       { key: "bgColor", label: "Background", kind: "color" },
//     ],
//     defaults: (t) => ({ title: "Shop by Category", cols: "4", bgColor: t.palette.bg }),
//   },
//   {
//     type: "banner",
//     label: "Banner",
//     hint: "Promotional banner with call to action",
//     fields: [
//       { key: "heading", label: "Heading", kind: "text" },
//       { key: "subheading", label: "Subheading", kind: "text" },
//       { key: "ctaText", label: "Button text", kind: "text" },
//       { key: "bgColor", label: "Background", kind: "color" },
//       { key: "textColor", label: "Text color", kind: "color" },
//       ALIGN,
//     ],
//     defaults: (t) => ({
//       heading: "The Winter Edit is here",
//       subheading: "Up to 40% off selected styles. This week only.",
//       ctaText: "Shop the sale",
//       bgColor: t.palette.primary,
//       textColor: "#FFFFFF",
//       align: "center",
//     }),
//   },
//   {
//     type: "image",
//     label: "Image",
//     hint: "Full-width image block",
//     fields: [
//       { key: "image", label: "Image URL", kind: "text" },
//       { key: "height", label: "Height", kind: "range", min: 160, max: 560, step: 10 },
//       { key: "radius", label: "Corner radius", kind: "range", min: 0, max: 32, step: 2 },
//     ],
//     defaults: (t) => ({ image: t.heroImage, height: 360, radius: 16 }),
//   },
//   {
//     type: "text",
//     label: "Text",
//     hint: "Heading and body copy",
//     fields: [
//       { key: "heading", label: "Heading", kind: "text" },
//       { key: "body", label: "Body", kind: "textarea" },
//       {
//         key: "size",
//         label: "Size",
//         kind: "select",
//         options: [
//           { value: "sm", label: "Small" },
//           { value: "md", label: "Medium" },
//           { value: "lg", label: "Large" },
//         ],
//       },
//       { key: "textColor", label: "Text color", kind: "color" },
//       ALIGN,
//     ],
//     defaults: (t) => ({
//       heading: "Our story",
//       body: "We started with a simple idea — beautiful things should be accessible to everyone. Every piece in our catalog is hand-picked and quality checked before it reaches you.",
//       size: "md",
//       textColor: t.palette.ink,
//       align: "center",
//     }),
//   },
//   {
//     type: "testimonials",
//     label: "Testimonials",
//     hint: "Customer reviews and quotes",
//     fields: [
//       { key: "title", label: "Title", kind: "text" },
//       { key: "bgColor", label: "Background", kind: "color" },
//       { key: "textColor", label: "Text color", kind: "color" },
//     ],
//     defaults: (t) => ({ title: "Loved by thousands", bgColor: t.palette.bg, textColor: t.palette.ink }),
//   },
//   {
//     type: "newsletter",
//     label: "Newsletter",
//     hint: "Email capture block",
//     fields: [
//       { key: "heading", label: "Heading", kind: "text" },
//       { key: "subheading", label: "Subheading", kind: "text" },
//       { key: "buttonText", label: "Button text", kind: "text" },
//       { key: "bgColor", label: "Background", kind: "color" },
//       { key: "textColor", label: "Text color", kind: "color" },
//     ],
//     defaults: (t) => ({
//       heading: "Join the inner circle",
//       subheading: "Early access to drops, members-only pricing and 10% off your first order.",
//       buttonText: "Subscribe",
//       bgColor: t.palette.ink,
//       textColor: "#FFFFFF",
//     }),
//   },
//   {
//     type: "footer",
//     label: "Footer",
//     hint: "Store footer with links",
//     fields: [
//       { key: "brandText", label: "Brand name", kind: "text" },
//       { key: "tagline", label: "Tagline", kind: "textarea" },
//       { key: "bgColor", label: "Background", kind: "color" },
//       { key: "textColor", label: "Text color", kind: "color" },
//     ],
//     defaults: (t, brand) => ({
//       brandText: brand,
//       tagline: "Build your store. Your way.",
//       bgColor: t.palette.ink,
//       textColor: "#E8E6DF",
//     }),
//   },
// ];

// export function metaFor(type: SectionType) {
//   return SECTION_META.find((m) => m.type === type)!;
// }

// export function buildDefaultSections(t: TemplateDef, brand: string): Section[] {
//   const pick = (type: SectionType): Record<string, unknown> =>
//     metaFor(type).defaults(t, brand);
//   return [
//     { id: uid(), type: "header", props: pick("header") },
//     { id: uid(), type: "hero", props: pick("hero") },
//     { id: uid(), type: "categories", props: pick("categories") },
//     { id: uid(), type: "productGrid", props: pick("productGrid") },
//     { id: uid(), type: "banner", props: pick("banner") },
//     { id: uid(), type: "productCarousel", props: pick("productCarousel") },
//     { id: uid(), type: "testimonials", props: pick("testimonials") },
//     { id: uid(), type: "newsletter", props: pick("newsletter") },
//     { id: uid(), type: "footer", props: pick("footer") },
//   ];
// }
