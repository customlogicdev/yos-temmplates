// src/lib/seed.ts

import { db } from "@/db";
import { users, stores, templateRegistry } from "@/db/schema";
import { getTenantDb } from "@/db/tenant-db";
import { products } from "@/db/tenant-schema";
import { provisionTenantDatabase } from "@/lib/actions";
import { hashPassword } from "@/lib/auth";
import { eq } from "drizzle-orm";

// ═══════════════════════════════════════════════════════
// 🎯 TEMPLATE REGISTRY — Saare templates
// ═══════════════════════════════════════════════════════
const TEMPLATES = [
  // ─────────────────────────────────────────────────────
  // BEAUTY — GLOW
  // ─────────────────────────────────────────────────────
  {
    id: "beauty.glow",
    category: "beauty",
    name: "Glow",
    description: "Soft, feminine beauty template",
    previewImage: "/templates/beauty-glow.jpg",
    theme: {
      colors: {
        primary: "#EC4899",
        secondary: "#FCE7F3",
        accent: "#2A2438",
        background: "#FDFBF7",
        foreground: "#2A2438",
        surface: "#FFFFFF",
        border: "#FCE7F3",
        muted: "#6B7280",
      },
      typography: {
        displayFont: "Sora, serif",
        bodyFont: "Manrope, sans-serif",
      },
      layout: {
        borderRadius: "1rem",
        maxWidth: "1400px",
      },
    },
    pages: [
      "home", "shop", "product", "collection", "search",
      "cart", "checkout", "about", "contact",
      "account", "account-login", "account-register",
      "orders", "order",
    ],
    isActive: true,
    isPremium: false,
    requiredPlan: "free",
    sortOrder: 1,
    version: "1.0.0",
    tags: ["beauty", "skincare", "pink"],
    metadata: {},
  },

  // ─────────────────────────────────────────────────────
  // BEAUTY — LUMIÈRE (NEW) 🎯
  // ─────────────────────────────────────────────────────
  {
    id: "beauty.lumiere",
    category: "beauty",
    name: "Lumière",
    description: "Glamorous beauty template with modern interactive light UI",
    previewImage: "/templates/beauty-lumiere.jpg",
    theme: {
      colors: {
        primary: "#B76E79",
        secondary: "#FFE5E9",
        accent: "#D4A5A5",
        background: "#FAF7F5",
        foreground: "#1F1B24",
        surface: "#FFFFFF",
        border: "#E8DDD5",
        muted: "#8B7E74",
      },
      typography: {
        displayFont: "Italiana, serif",
        bodyFont: "Inter, sans-serif",
      },
      layout: {
        borderRadius: "1.5rem",
        maxWidth: "1600px",
      },
    },
    pages: [
      "home", "shop", "product", "collection", "search",
      "cart", "checkout", "about", "contact",
      "account", "account-login", "account-register",
      "orders", "order",
    ],
    isActive: true,
    isPremium: false,
    requiredPlan: "free",
    sortOrder: 2,
    version: "1.0.0",
    tags: ["beauty", "glamour", "luxury", "modern"],
    metadata: {},
  },

  // ─────────────────────────────────────────────────────
  // GROCERY
  // ─────────────────────────────────────────────────────
  {
    id: "fresh-market",
    category: "grocery",
    name: "Fresh Market",
    description: "Fresh grocery store template",
    previewImage: "/templates/fresh-market.jpg",
    theme: {
      colors: {
        primary: "#16A34A",
        secondary: "#DCFCE7",
        accent: "#16A34A",
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        surface: "#FFFFFF",
        border: "#E5E5E5",
        muted: "#6B7280",
      },
      typography: {
        displayFont: "Inter, sans-serif",
        bodyFont: "Inter, sans-serif",
      },
      layout: {
        borderRadius: "1rem",
        maxWidth: "1400px",
      },
    },
    pages: [
      "home", "shop", "product", "collection", "search",
      "cart", "checkout", "about", "contact",
      "account", "account-login", "account-register",
      "orders", "order",
    ],
    isActive: true,
    isPremium: false,
    requiredPlan: "free",
    sortOrder: 3,
    version: "1.0.0",
    tags: ["grocery", "fresh"],
    metadata: {},
  },

  // ─────────────────────────────────────────────────────
  // FASHION — LUXE
  // ─────────────────────────────────────────────────────
  {
    id: "nova-fashion",
    category: "fashion",
    name: "Nova Fashion",
    description: "Modern fashion storefront — warm editorial",
    previewImage: "/templates/nova-fashion.jpg",
    theme: {
      colors: {
        primary: "#0E6B54",
        secondary: "#D1FAE5",
        accent: "#0E6B54",
        background: "#FDFBF7",
        foreground: "#1A1A1A",
        surface: "#FFFFFF",
        border: "#E5E5E5",
        muted: "#6B7280",
      },
      typography: {
        displayFont: "Playfair Display, serif",
        bodyFont: "Inter, sans-serif",
      },
      layout: {
        borderRadius: "0.5rem",
        maxWidth: "1400px",
      },
    },
    pages: [
      "home", "shop", "product", "collection", "search",
      "cart", "checkout", "about", "contact",
      "account", "account-login", "account-register",
      "orders", "order",
    ],
    isActive: true,
    isPremium: false,
    requiredPlan: "free",
    sortOrder: 4,
    version: "1.0.0",
    tags: ["fashion", "modern"],
    metadata: {},
  },

  // ─────────────────────────────────────────────────────
  // FASHION — ATELIER
  // ─────────────────────────────────────────────────────
  {
    id: "fashion.atelier",
    category: "fashion",
    name: "Atelier",
    description: "Modern fashion template with interactive light UI",
    previewImage: "/templates/fashion-atelier.jpg",
    theme: {
      colors: {
        primary: "#6366F1",
        secondary: "#EC4899",
        accent: "#8B5CF6",
        background: "#FAFAF9",
        foreground: "#18181B",
        surface: "#FFFFFF",
        border: "#E4E4E7",
        muted: "#71717A",
      },
      typography: {
        displayFont: "sans-serif",
        bodyFont: "sans-serif",
      },
      layout: {
        borderRadius: "1rem",
        maxWidth: "1600px",
      },
    },
    pages: [
      "home", "shop", "product", "collection", "search",
      "cart", "checkout", "about", "contact",
      "account", "account-login", "account-register",
      "orders", "order",
    ],
    isActive: true,
    isPremium: false,
    requiredPlan: "free",
    sortOrder: 5,
    version: "1.0.0",
    tags: ["fashion", "modern", "light"],
    metadata: {},
  },
];   // ✅ ARRAY CLOSE

// ═══════════════════════════════════════════════════════
// 🎯 TEMPLATE REGISTRY SEEDER
// ═══════════════════════════════════════════════════════
export async function seedTemplates() {
  console.log("Seeding templates...");

  for (const t of TEMPLATES) {
    await db
      .insert(templateRegistry)
      .values(t)
      .onConflictDoUpdate({
        target: templateRegistry.id,
        set: {
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
          updatedAt: new Date(),
        },
      });
    console.log(`✅ ${t.id}`);
  }

  console.log("Templates seeded!");
}

// ═══════════════════════════════════════════════════════
// 🎯 MAIN SEED (Demo user + store + templates)
// ═══════════════════════════════════════════════════════
export async function seed() {
  try {
    // 0. Templates pehle seed karo
    await seedTemplates();

    // 1. Demo User
    const email = "demo@yournextstore.com";
    let [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      const insertedUser = await db
        .insert(users)
        .values({
          name: "Demo Admin",
          email,
          passwordHash: await hashPassword("demo1234"),
        })
        .returning();
      user = insertedUser[0];
    }

    if (!user) return;

    // 2. Demo Store (with ATELIER template) 🎯
    const defaultSlug = "aurora";
    const defaultDbName = "tenant_aurora_default";

    let [store] = await db
      .select()
      .from(stores)
      .where(eq(stores.slug, defaultSlug))
      .limit(1);

    if (!store) {
      await provisionTenantDatabase(defaultDbName);

      const insertedStore = await db
        .insert(stores)
        .values({
          userId: user.id,
          name: "Aurora Lifestyle",
          businessName: "Aurora Lifestyle Pvt. Ltd.",
          category: "Fashion",
          country: "India",
          currency: "INR",
          timezone: "Asia/Kolkata",
          productTypes: ["Physical Products"],
          templateId: "fashion.atelier",
          slug: defaultSlug,
          brandName: "Aurora",
          primaryColor: "#6366F1",
          secondaryColor: "#FAFAF9",
          sections: [],
          connections: {},
          announcement: "Free shipping on orders above ₹999",
          discounts: [
            {
              id: "d1",
              code: "WELCOME10",
              type: "percentage",
              value: 10,
              status: "active",
              usage: 0,
            },
          ],
          dbName: defaultDbName,
        })
        .returning();

      store = insertedStore[0];

      if (store) {
        const tenantDb = getTenantDb(defaultDbName);
        await tenantDb.insert(products).values([
          {
            storeId: store.id,
            name: "Classic Silk Minimal Tee",
            description:
              "Crafted from 100% pure organic silk with a relaxed silhouette.",
            image:
              "https://images.pexels.com/photos/9594147/pexels-photo-9594147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
            price: "1999.00",
            sku: "SKU-SLK-01",
            inventory: 24,
            category: "Fashion",
            tags: ["silk", "top-seller"],
            variants: [],
            status: "active",
          },
        ]);
      }
    }
  } catch (error) {
    console.error("[seed] error:", error);
  }
}

// // src/lib/seed.ts

// import { db } from "@/db";
// import { users, stores, templateRegistry } from "@/db/schema";
// import { getTenantDb } from "@/db/tenant-db";
// import { products } from "@/db/tenant-schema";
// import { provisionTenantDatabase } from "@/lib/actions";
// import { hashPassword } from "@/lib/auth";
// import { eq } from "drizzle-orm";

// // ═══════════════════════════════════════════════════════
// // 🎯 TEMPLATE REGISTRY — Saare templates
// // ═══════════════════════════════════════════════════════
// const TEMPLATES = [
//   // ─────────────────────────────────────────────────────
//   // BEAUTY
//   // ─────────────────────────────────────────────────────
//   {
//     id: "beauty.glow",
//     category: "beauty",
//     name: "Glow",
//     description: "Soft, feminine beauty template",
//     previewImage: "/templates/beauty-glow.jpg",
//     theme: {
//       colors: {
//         primary: "#EC4899",
//         secondary: "#FCE7F3",
//         accent: "#2A2438",
//         background: "#FDFBF7",
//         foreground: "#2A2438",
//         surface: "#FFFFFF",
//         border: "#FCE7F3",
//         muted: "#6B7280",
//       },
//       typography: {
//         displayFont: "Sora, serif",
//         bodyFont: "Manrope, sans-serif",
//       },
//       layout: {
//         borderRadius: "1rem",
//         maxWidth: "1400px",
//       },
//     },
//     pages: [
//       "home", "shop", "product", "collection", "search",
//       "cart", "checkout", "about", "contact",
//     ],
//     isActive: true,
//     isPremium: false,
//     requiredPlan: "free",
//     sortOrder: 1,
//     version: "1.0.0",
//     tags: ["beauty", "skincare", "pink"],
//     metadata: {},
//   },

//   // ─────────────────────────────────────────────────────
//   // GROCERY
//   // ─────────────────────────────────────────────────────
//   {
//     id: "fresh-market",
//     category: "grocery",
//     name: "Fresh Market",
//     description: "Fresh grocery store template",
//     previewImage: "/templates/fresh-market.jpg",
//     theme: {
//       colors: {
//         primary: "#16A34A",
//         secondary: "#DCFCE7",
//         accent: "#16A34A",
//         background: "#FFFFFF",
//         foreground: "#1A1A1A",
//         surface: "#FFFFFF",
//         border: "#E5E5E5",
//         muted: "#6B7280",
//       },
//       typography: {
//         displayFont: "Inter, sans-serif",
//         bodyFont: "Inter, sans-serif",
//       },
//       layout: {
//         borderRadius: "1rem",
//         maxWidth: "1400px",
//       },
//     },
//     pages: [
//       "home", "shop", "product", "collection", "search",
//       "cart", "checkout", "about", "contact",
//     ],
//     isActive: true,
//     isPremium: false,
//     requiredPlan: "free",
//     sortOrder: 2,
//     version: "1.0.0",
//     tags: ["grocery", "fresh"],
//     metadata: {},
//   },

//   // ─────────────────────────────────────────────────────
//   // FASHION — LUXE
//   // ─────────────────────────────────────────────────────
//   {
//     id: "nova-fashion",
//     category: "fashion",
//     name: "Nova Fashion",
//     description: "Modern fashion storefront — warm editorial",
//     previewImage: "/templates/nova-fashion.jpg",
//     theme: {
//       colors: {
//         primary: "#0E6B54",
//         secondary: "#D1FAE5",
//         accent: "#0E6B54",
//         background: "#FDFBF7",
//         foreground: "#1A1A1A",
//         surface: "#FFFFFF",
//         border: "#E5E5E5",
//         muted: "#6B7280",
//       },
//       typography: {
//         displayFont: "Playfair Display, serif",
//         bodyFont: "Inter, sans-serif",
//       },
//       layout: {
//         borderRadius: "0.5rem",
//         maxWidth: "1400px",
//       },
//     },
//     pages: [
//       "home", "shop", "product", "collection", "search",
//       "cart", "checkout", "about", "contact",
//     ],
//     isActive: true,
//     isPremium: false,
//     requiredPlan: "free",
//     sortOrder: 3,
//     version: "1.0.0",
//     tags: ["fashion", "modern"],
//     metadata: {},
//   },

//   // ─────────────────────────────────────────────────────
//   // FASHION — ATELIER (NEW — Light Modern UI) 🎯
//   // ─────────────────────────────────────────────────────
//   {
//     id: "fashion.atelier",
//     category: "fashion",
//     name: "Atelier",
//     description: "Modern fashion template with interactive light UI",
//     previewImage: "/templates/fashion-atelier.jpg",
//     theme: {
//       colors: {
//         primary: "#6366F1",        // Indigo
//         secondary: "#EC4899",      // Pink
//         accent: "#8B5CF6",         // Violet
//         background: "#FAFAF9",     // Warm off-white
//         foreground: "#18181B",     // Near-black
//         surface: "#FFFFFF",        // White cards
//         border: "#E4E4E7",         // Light gray borders
//         muted: "#71717A",          // Muted gray
//       },
//       typography: {
//         displayFont: "sans-serif",
//         bodyFont: "sans-serif",
//       },
//       layout: {
//         borderRadius: "1rem",
//         maxWidth: "1600px",
//       },
//     },
//     pages: [
//       "home",
//       "shop",
//       "product",
//       "collection",
//       "search",
//       "cart",
//       "checkout",
//       "about",
//       "contact",
//       "account",
//       "account-login",
//       "account-register",
//       "orders",
//       "order",
//     ],
//     isActive: true,
//     isPremium: false,
//     requiredPlan: "free",
//     sortOrder: 4,
//     version: "1.0.0",
//     tags: ["fashion", "modern", "light"],
//     metadata: {},
//   },
// ];   // 👈 ✅ ARRAY CLOSE

// // ═══════════════════════════════════════════════════════
// // 🎯 TEMPLATE REGISTRY SEEDER
// // ═══════════════════════════════════════════════════════
// export async function seedTemplates() {
//   console.log("Seeding templates...");

//   for (const t of TEMPLATES) {
//     await db
//       .insert(templateRegistry)
//       .values(t)
//       .onConflictDoUpdate({
//         target: templateRegistry.id,
//         set: {
//           category: t.category,
//           name: t.name,
//           description: t.description,
//           previewImage: t.previewImage,
//           theme: t.theme,
//           pages: t.pages,
//           isActive: t.isActive,
//           isPremium: t.isPremium,
//           requiredPlan: t.requiredPlan,
//           sortOrder: t.sortOrder,
//           version: t.version,
//           tags: t.tags,
//           metadata: t.metadata,
//           updatedAt: new Date(),
//         },
//       });
//     console.log(`✅ ${t.id}`);
//   }

//   console.log("Templates seeded!");
// }

// // ═══════════════════════════════════════════════════════
// // 🎯 MAIN SEED (Demo user + store + templates)
// // ═══════════════════════════════════════════════════════
// export async function seed() {
//   try {
//     // 0. Templates pehle seed karo
//     await seedTemplates();

//     // 1. Demo User
//     const email = "demo@yournextstore.com";
//     let [user] = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, email))
//       .limit(1);

//     if (!user) {
//       const insertedUser = await db
//         .insert(users)
//         .values({
//           name: "Demo Admin",
//           email,
//           passwordHash: await hashPassword("demo1234"),
//         })
//         .returning();
//       user = insertedUser[0];
//     }

//     if (!user) return;

//     // 2. Demo Store (with ATELIER template) 🎯
//     const defaultSlug = "aurora";
//     const defaultDbName = "tenant_aurora_default";

//     let [store] = await db
//       .select()
//       .from(stores)
//       .where(eq(stores.slug, defaultSlug))
//       .limit(1);

//     if (!store) {
//       await provisionTenantDatabase(defaultDbName);

//       const insertedStore = await db
//         .insert(stores)
//         .values({
//           userId: user.id,
//           name: "Aurora Lifestyle",
//           businessName: "Aurora Lifestyle Pvt. Ltd.",
//           category: "Fashion",
//           country: "India",
//           currency: "INR",
//           timezone: "Asia/Kolkata",
//           productTypes: ["Physical Products"],
//           templateId: "fashion.atelier",   // ✅ Atelier
//           slug: defaultSlug,
//           brandName: "Aurora",
//           primaryColor: "#6366F1",          // ✅ Indigo
//           secondaryColor: "#FAFAF9",        // ✅ Warm white
//           sections: [],
//           connections: {},
//           announcement: "Free shipping on orders above ₹999",
//           discounts: [
//             {
//               id: "d1",
//               code: "WELCOME10",
//               type: "percentage",
//               value: 10,
//               status: "active",
//               usage: 0,
//             },
//           ],
//           dbName: defaultDbName,
//         })
//         .returning();

//       store = insertedStore[0];

//       if (store) {
//         const tenantDb = getTenantDb(defaultDbName);
//         await tenantDb.insert(products).values([
//           {
//             storeId: store.id,
//             name: "Classic Silk Minimal Tee",
//             description:
//               "Crafted from 100% pure organic silk with a relaxed silhouette.",
//             image:
//               "https://images.pexels.com/photos/9594147/pexels-photo-9594147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//             price: "1999.00",
//             sku: "SKU-SLK-01",
//             inventory: 24,
//             category: "Fashion",
//             tags: ["silk", "top-seller"],
//             variants: [],
//             status: "active",
//           },
//         ]);
//       }
//     }
//   } catch (error) {
//     console.error("[seed] error:", error);
//   }
// }