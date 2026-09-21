// src/lib/demo.ts

import { eq } from "drizzle-orm";
import { products, customers, orders, campaigns } from "@/db/tenant-schema";
import { getTenantDb } from "@/db/tenant-db";
import type { OrderItem, VariantGroup } from "./types";

const F = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800`;

export const FASHION_IMAGES = [
  F(30590661), F(9594147), F(8030146), F(9218420), F(36594454),
  F(6770820), F(37347163), F(30246248), F(20548709), F(7147465),
];

export const MIXED_IMAGES = [
  F(2659939), F(28859429), F(19117855), F(29904622), F(1203819),
  F(7434244), F(821652), F(16045125), F(38561561), F(821653),
];

export interface ProductDef {
  name: string;
  description: string;
  image: string;
  price: number;
  compareAt?: number;
  sku: string;
  inventory: number;
  category: string;
  tags: string[];
  variants?: VariantGroup[];
}

const SIZES: VariantGroup[] = [{ name: "Size", options: ["XS", "S", "M", "L", "XL"] }];

const FASHION: ProductDef[] = [
  { name: "The Aurora Maxi Dress", description: "A flowing maxi cut in breathable viscose with a smocked bodice and adjustable straps. Designed in our Mumbai studio.", image: FASHION_IMAGES[0], price: 4299, compareAt: 5499, sku: "AUR-1001", inventory: 42, category: "Evening Gowns", tags: ["bestseller", "new"], variants: SIZES },
  { name: "Everyday Crew Sweatshirt", description: "Heavyweight 320 GSM loopback cotton with a relaxed fit. Garment-dyed for a lived-in feel from day one.", image: FASHION_IMAGES[1], price: 2199, sku: "AUR-1002", inventory: 86, category: "Essentials", tags: ["essential"], variants: SIZES },
  { name: "The Onyx Sheath Dress", description: "A structured little black dress with a concealed back zip and satin lining. The one you reach for every time.", image: FASHION_IMAGES[2], price: 3499, sku: "AUR-1003", inventory: 28, category: "Signature Black", tags: ["bestseller"], variants: SIZES },
  { name: "Scarlett Floral Midi", description: "Hand-finished floral midi with a wrap silhouette and flutter sleeves. Limited run of 200 pieces.", image: FASHION_IMAGES[3], price: 3199, compareAt: 3999, sku: "AUR-1004", inventory: 17, category: "Cocktail Dresses", tags: ["limited"], variants: SIZES },
  { name: "Riviera Summer Set", description: "Two-piece co-ord in breezy cotton voile. Wear together or style separately — it works either way.", image: FASHION_IMAGES[4], price: 2899, sku: "AUR-1005", inventory: 54, category: "Co-ords", tags: ["summer"], variants: SIZES },
  { name: "Indigo Denim Two-Piece", description: "Rigid Japanese selvedge denim, cropped jacket and matching skirt. Ages beautifully with wear.", image: FASHION_IMAGES[5], price: 3899, sku: "AUR-1006", inventory: 33, category: "Denim", tags: ["premium"], variants: SIZES },
  { name: "Sage Garden Dress", description: "Botanical print tea dress with covered buttons and a swing hem. Fully lined, zero sheer.", image: FASHION_IMAGES[6], price: 2699, sku: "AUR-1007", inventory: 61, category: "Day to Night", tags: ["new"], variants: SIZES },
  { name: "Monochrome Edit Dress", description: "Colour-blocked shift dress in a matte crepe. Tailored at the waist, forgiving everywhere else.", image: FASHION_IMAGES[7], price: 3299, sku: "AUR-1008", inventory: 24, category: "Signature Black", tags: [], variants: SIZES },
  { name: "The Celeste Wrap Dress", description: "Our signature wrap in a midnight crepe. Tie it your way — the drape does the rest.", image: FASHION_IMAGES[8], price: 2999, compareAt: 3799, sku: "AUR-1009", inventory: 47, category: "Day to Night", tags: ["bestseller"], variants: SIZES },
  { name: "Atelier Ivory Gown", description: "Couture-finished ivory gown with hand-set pleats. Made to order in 10 working days.", image: FASHION_IMAGES[9], price: 5299, sku: "AUR-1010", inventory: 12, category: "Evening Gowns", tags: ["made-to-order"], variants: SIZES },
];

const ELECTRONICS: ProductDef[] = [
  { name: "Prime 50mm f/1.8 Lens", description: "Fast prime lens with silent STM focusing. The sharpest fifty in its class.", image: MIXED_IMAGES[1], price: 18999, sku: "TH-2001", inventory: 22, category: "Lenses", tags: ["bestseller"] },
  { name: "Instax Mini Instant Camera", description: "Point, shoot, hold the memory. Auto exposure and a selfie mirror built in.", image: MIXED_IMAGES[7], price: 7499, compareAt: 8999, sku: "TH-2002", inventory: 64, category: "Cameras", tags: ["gift"] },
  { name: "Retro Kodak Film Camera", description: "Reissued 35mm classic with a glass lens and manual wind. Shoots any 35mm film.", image: MIXED_IMAGES[4], price: 12500, sku: "TH-2003", inventory: 18, category: "Cameras", tags: ["retro"] },
  { name: "Studio Desk Bundle", description: "Complete creator desk: laptop stand, monitor speakers and cable management.", image: MIXED_IMAGES[0], price: 54999, sku: "TH-2004", inventory: 9, category: "Studio", tags: ["bundle"] },
  { name: "Silver Mirrorless Camera", description: "26MP APS-C body with IBIS and 4K60 video. Weather-sealed magnesium chassis.", image: MIXED_IMAGES[8], price: 42000, compareAt: 47500, sku: "TH-2005", inventory: 14, category: "Cameras", tags: ["pro"] },
  { name: "TLR Classic Camera", description: "Twin-lens reflex icon, fully serviced and film tested. A shelf piece that shoots.", image: MIXED_IMAGES[9], price: 9800, sku: "TH-2006", inventory: 6, category: "Cameras", tags: ["vintage"] },
  { name: "Lens Craft Repair Kit", description: "Precision toolkit for cleaning and servicing lenses at home.", image: MIXED_IMAGES[6], price: 3299, sku: "TH-2007", inventory: 41, category: "Accessories", tags: [] },
  { name: "Creator Stationery Pack", description: "Storyboards, shot lists and gaffer tags in one colourful pack.", image: MIXED_IMAGES[5], price: 1499, sku: "TH-2008", inventory: 120, category: "Accessories", tags: ["new"] },
];

const FURNITURE: ProductDef[] = [
  { name: "Terra Ceramic Vase", description: "Hand-thrown stoneware vase with a matte sand glaze. Each piece is one of a kind.", image: MIXED_IMAGES[3], price: 2499, sku: "HC-3001", inventory: 38, category: "Decor", tags: ["handmade"] },
  { name: "Gilt Keepsake Box", description: "Brass-finished keepsake box with a velvet lining. Heirloom-grade hardware.", image: MIXED_IMAGES[2], price: 1899, sku: "HC-3002", inventory: 52, category: "Decor", tags: ["gift"] },
  { name: "Atelier Stationery Set", description: "Cotton-paper notecards and a brass pen tray for a considered desk.", image: MIXED_IMAGES[5], price: 999, sku: "HC-3003", inventory: 90, category: "Desk", tags: [] },
  { name: "Oak Desk Organizer", description: "Solid oak organiser with cable channels and a phone dock. Oiled finish.", image: MIXED_IMAGES[0], price: 3499, sku: "HC-3004", inventory: 27, category: "Desk", tags: ["bestseller"] },
  { name: "Heritage Film Camera", description: "A working vintage camera that doubles as a sculptural shelf object.", image: MIXED_IMAGES[4], price: 6800, sku: "HC-3005", inventory: 11, category: "Objects", tags: ["vintage"] },
  { name: "Artisan Lens Object", description: "Decommissioned lens, mounted and sealed as a paperweight.", image: MIXED_IMAGES[6], price: 1299, sku: "HC-3006", inventory: 44, category: "Objects", tags: [] },
];

const BEAUTY: ProductDef[] = [
  { name: "Radiance Gift Box", description: "Our best-selling glow ritual in a keepsake gold box.", image: MIXED_IMAGES[2], price: 3499, compareAt: 4299, sku: "LB-4001", inventory: 46, category: "Gift Sets", tags: ["bestseller"] },
  { name: "Botanical Bloom Set", description: "Floral-infused serum and mist duo for sensitive skin.", image: FASHION_IMAGES[4], price: 2799, sku: "LB-4002", inventory: 33, category: "Skincare", tags: ["new"] },
  { name: "Velvet Rouge Edit", description: "Three buildable lip shades in a velvet pouch.", image: FASHION_IMAGES[3], price: 1999, sku: "LB-4003", inventory: 71, category: "Makeup", tags: [] },
  { name: "Silk Hair Ritual", description: "Bond-repair mask and silk scrunchie for glass hair.", image: FASHION_IMAGES[6], price: 2299, sku: "LB-4004", inventory: 58, category: "Hair", tags: [] },
  { name: "Porcelain Skin Duo", description: "Ceramic gua sha and cold-roller in a linen case.", image: MIXED_IMAGES[3], price: 1699, sku: "LB-4005", inventory: 64, category: "Tools", tags: ["gift"] },
  { name: "Noir Evening Parfum", description: "Amber, oud and black fig. 50ml eau de parfum.", image: FASHION_IMAGES[8], price: 4599, sku: "LB-4006", inventory: 25, category: "Fragrance", tags: ["premium"] },
];

export function catalogFor(category: string): ProductDef[] {
  switch (category) {
    case "Electronics": return ELECTRONICS;
    case "Furniture": return FURNITURE;
    case "Beauty": return BEAUTY;
    default: return FASHION;
  }
}

export function sampleProductsFor(category: string) {
  return catalogFor(category).map((p, i) => ({
    id: `sample-${i}`,
    name: p.name,
    price: p.price,
    compareAt: p.compareAt,
    image: p.image,
    category: p.category,
  }));
}

const CUSTOMER_POOL = [
  { name: "Ananya Sharma", email: "ananya.sharma@gmail.com", phone: "+91 98200 11223", city: "Mumbai" },
  { name: "Rohan Mehta", email: "rohan.mehta@outlook.com", phone: "+91 99870 44556", city: "Bengaluru" },
  { name: "Priya Nair", email: "priya.nair@gmail.com", phone: "+91 98450 77889", city: "Kochi" },
  { name: "Arjun Reddy", email: "arjun.reddy@proton.me", phone: "+91 90000 12345", city: "Hyderabad" },
  { name: "Sneha Iyer", email: "sneha.iyer@gmail.com", phone: "+91 98840 55667", city: "Chennai" },
  { name: "Vikram Singh", email: "vikram.singh@yahoo.in", phone: "+91 98110 22334", city: "Delhi" },
  { name: "Meera Pillai", email: "meera.pillai@gmail.com", phone: "+91 97440 88990", city: "Pune" },
  { name: "Kabir Khan", email: "kabir.khan@gmail.com", phone: "+91 98300 66778", city: "Kolkata" },
  { name: "Divya Menon", email: "divya.menon@outlook.com", phone: "+91 96330 99001", city: "Mumbai" },
  { name: "Aditya Rao", email: "aditya.rao@gmail.com", phone: "+91 98860 33445", city: "Bengaluru" },
];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STATES = ["Maharashtra", "Karnataka", "Kerala", "Telangana", "Tamil Nadu", "Delhi", "West Bengal"];

// ============================================================
// Seed Commerce
// ============================================================
export async function seedCommerce(storeId: string, category: string, dbName: string) {
  const tenantDb = getTenantDb(dbName);
  const cat = catalogFor(category);

  await tenantDb.insert(products).values(
    cat.map((p) => ({
      storeId,
      name: p.name,
      description: p.description,
      image: p.image,
      price: String(p.price),
      compareAtPrice: p.compareAt != null ? String(p.compareAt) : null,
      sku: p.sku,
      inventory: p.inventory,
      category: p.category,
      tags: p.tags,
      variants: p.variants ?? [],
      seoTitle: `${p.name} — buy online in India`,
      seoDescription: p.description,
      status: "active",
    }))
  );

  const custRows = await tenantDb
    .insert(customers)
    .values(CUSTOMER_POOL.map((c) => ({ storeId, ...c, status: "active" })))
    .returning();

  const rnd = mulberry32(1337);
  const now = Date.now();
  const orderValues = [];

  for (let i = 0; i < 48; i++) {
    const cust = custRows[Math.floor(rnd() * custRows.length)]!;
    const itemCount = 1 + Math.floor(rnd() * 3);
    const items: OrderItem[] = [];

    for (let j = 0; j < itemCount; j++) {
      const p = cat[Math.floor(rnd() * cat.length)]!;
      items.push({ name: p.name, image: p.image, price: p.price, qty: 1 + Math.floor(rnd() * 2) });
    }

    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;
    const daysAgo = Math.floor(rnd() * 120);
    const createdAt = new Date(now - daysAgo * 86400000 - Math.floor(rnd() * 80000000));
    const r = rnd();
    const fulfillment = r < 0.1 ? "cancelled" : r < 0.28 ? "processing" : r < 0.55 ? "shipped" : "delivered";

    orderValues.push({
      storeId,
      number: 1001 + i,
      customerName: cust.name,
      customerEmail: cust.email,
      items,
      subtotal: String(subtotal),
      shipping: String(shipping),
      discount: "0",
      total: String(total),
      paymentStatus: fulfillment === "cancelled" ? "refunded" : "paid",
      fulfillmentStatus: fulfillment,
      address: {
        line1: `${12 + Math.floor(rnd() * 200)}, ${["MG Road", "Linking Road", "Jubilee Hills", "Indiranagar", "Salt Lake"][Math.floor(rnd() * 5)]}`,
        city: cust.city,
        state: STATES[Math.floor(rnd() * STATES.length)]!,
        pincode: String(400000 + Math.floor(rnd() * 300000)),
        phone: cust.phone,
      },
      createdAt,
    });
  }

  await tenantDb.insert(orders).values(orderValues);

  for (const c of custRows) {
    const mine = orderValues.filter((o) => o.customerEmail === c.email && o.fulfillmentStatus !== "cancelled");
    if (mine.length) {
      const spent = mine.reduce((s, o) => s + Number(o.total), 0);
      const last = mine.reduce((m, o) => (o.createdAt > m ? o.createdAt : m), mine[0]!.createdAt);
      await tenantDb
        .update(customers)
        .set({ ordersCount: mine.length, totalSpent: String(spent), lastOrderAt: last })
        .where(eq(customers.id, c.id));
    }
  }

  await tenantDb.insert(campaigns).values([
    { storeId, name: "Diwali Mega Sale — Final Hours", type: "campaign", recipients: 1284, sent: 1284, openRate: "42.5", status: "sent" },
    { storeId, name: "Winter Edit Launch", type: "campaign", recipients: 1120, sent: 1120, openRate: "38.1", status: "sent" },
    { storeId, name: "Welcome Series", type: "automated", recipients: 1284, sent: 342, openRate: "61.4", status: "active" },
    { storeId, name: "Abandoned Cart Recovery", type: "automated", recipients: 486, sent: 189, openRate: "48.9", status: "active" },
    { storeId, name: "Monthly Newsletter — January", type: "campaign", recipients: 1284, sent: 0, openRate: "0", status: "draft" },
  ]);
}

// ============================================================
// ensureDemoData — No-op placeholder
// ============================================================
export async function ensureDemoData() {
  console.log("[seed] ensureDemoData called — no-op");
  return { success: true };
}