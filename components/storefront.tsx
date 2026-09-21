"use client";

import { useState } from "react";
import type { Section } from "@/lib/types";
import { inr } from "@/lib/format";
import { Icon } from "./icons";
import { cn } from "./ui";

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  compareAt?: number | null;
  image: string;
  category: string;
}

interface Props {
  sections: Section[];
  products: StoreProduct[];
  slug?: string;
  templateId?: string;
  onAddToCart?: (p: StoreProduct) => void;
  builderMode?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

const TESTIMONIALS = [
  { quote: "The quality genuinely surprised me. Packaging, fabric, fit — everything felt premium.", name: "Ananya Sharma", role: "Mumbai · Verified buyer" },
  { quote: "Ordered on a Tuesday, wearing it by Friday. The size guide was spot on.", name: "Rohan Mehta", role: "Bengaluru · Verified buyer" },
  { quote: "Customer support answered in minutes and the exchange was painless. Rare these days.", name: "Priya Nair", role: "Kochi · Verified buyer" },
];

function P(props: Record<string, unknown>, key: string, fallback: unknown = "") {
  const v = props[key];
  return v == null || v === "" ? fallback : v;
}

// ✅ FIX: Image URL safe hai (empty string → undefined)
function safeSrc(value: unknown): string | undefined {
  const s = typeof value === "string" ? value.trim() : "";
  return s.length > 0 ? s : undefined;
}

export function StorefrontRenderer({
  sections = [],
  products = [],
  slug,
  templateId,
  onAddToCart,
  builderMode,
  selectedId,
  onSelect,
}: Props) {
  const isJewellery = ["aura-jewels", "luxe-boutique", "riva-silver-gems", "jewellery-bridal"].includes(templateId || "");
  const isStreetwear = ["stride-kicks", "urban-goods", "streetwear"].includes(templateId || "");
  const isElectronics = ["techhub"].includes(templateId || "");
  const isBeauty = ["botanica-skin"].includes(templateId || "");
  const isGrocery = ["fresh-market"].includes(templateId || "");
  const isHealthcare = ["healthcare-clinic"].includes(templateId || "");
  const isFashion = ["nova-fashion", "fashion-luxe", "minimal-store"].includes(templateId || "");

  const themeColors = {
    jewellery: { bg: "#FFFDF9", fg: "#27211B", accent: "#855829", surface: "#FDF8F0", border: "#EADCC8" },
    streetwear: { bg: "#0A0A0A", fg: "#FFFFFF", accent: "#EF4444", surface: "#111111", border: "#262626" },
    electronics: { bg: "#FFFFFF", fg: "#111827", accent: "#2563EB", surface: "#F3F4F6", border: "#E5E7EB" },
    beauty: { bg: "#FFFFFF", fg: "#27222A", accent: "#C084FC", surface: "#F5F3FF", border: "#E6DFF2" },
    grocery: { bg: "#FFFEFB", fg: "#2C2C2C", accent: "#FF6B35", surface: "#FFF4E6", border: "#E8DDCE" },
    healthcare: { bg: "#FFFFFF", fg: "#0F172A", accent: "#0EA5E9", surface: "#EFF6FF", border: "#DCE8F7" },
    fashion: { bg: "#FBFAF7", fg: "#1B1D1A", accent: "#D97706", surface: "#F2EDE3", border: "#DED8CC" },
    default: { bg: "#FFFFFF", fg: "#111111", accent: "#000000", surface: "#F5F5F5", border: "#E5E5E5" },
  };

  const getColors = () => {
    if (isElectronics) return themeColors.electronics;
    if (isBeauty) return themeColors.beauty;
    if (isGrocery) return themeColors.grocery;
    if (isHealthcare) return themeColors.healthcare;
    if (isFashion) return themeColors.fashion;
    if (isJewellery) return themeColors.jewellery;
    if (isStreetwear) return themeColors.streetwear;
    return themeColors.default;
  };

  const colors = getColors();

  const hasFooter = sections.some((s) => s.type === "footer");
  const headerSection = sections.find((s) => s.type === "header");
  const fallbackBrandName = String(P(headerSection?.props || {}, "brandText", slug ? slug.toUpperCase() : "Store"));

  const renderSection = (s: Section) => {
    const pr = s.props;
    switch (s.type) {
      case "header":
        return (
          <header
            className="sticky top-0 z-30 border-b"
            style={{
              background: String(P(pr, "bgColor", colors.bg)),
              color: String(P(pr, "textColor", colors.fg)),
              borderColor: colors.border,
            }}
          >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
              <a
                href={slug ? `/store/${slug}` : "#"}
                className={cn(
                  "text-lg tracking-tight",
                  isJewellery && "font-serif tracking-[0.15em] uppercase",
                  isStreetwear && "font-mono font-black italic uppercase",
                  isElectronics && "font-sans font-bold",
                  isFashion && "font-serif font-bold",
                )}
              >
                {String(P(pr, "brandText", fallbackBrandName))}
              </a>
              <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                <a href={slug ? `/store/${slug}` : "#"} className="opacity-80 hover:opacity-100">Home</a>
                <a href={slug ? `/store/${slug}/products` : "#"} className="opacity-80 hover:opacity-100">Shop</a>
                <a href={slug ? `/store/${slug}/about` : "#"} className="opacity-80 hover:opacity-100">About</a>
                <a href={slug ? `/store/${slug}/contact` : "#"} className="opacity-80 hover:opacity-100">Contact</a>
              </nav>
              <a href={slug ? `/store/${slug}/cart` : "#"}>
                <Icon name="cart" style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </header>
        );

      case "hero": {
        // ✅ FIX: hero image null-safe
        const heroImage = safeSrc(P(pr, "image", products[0]?.image));

        return (
          <section
            className="overflow-hidden"
            style={{
              background: String(P(pr, "bgColor", colors.surface)),
              color: String(P(pr, "textColor", colors.fg)),
            }}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-2">
              <div>
                {isJewellery && (
                  <span className="mb-2 block text-xs uppercase tracking-[0.2em]" style={{ color: colors.accent }}>
                    Exclusive Artisanal Edit
                  </span>
                )}
                {isStreetwear && (
                  <span className="mb-3 inline-block rounded bg-red-600 px-2 py-0.5 text-[11px] font-black uppercase text-black">
                    LIMITED RELEASE
                  </span>
                )}
                {isElectronics && (
                  <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase" style={{ background: colors.accent, color: "#fff" }}>
                    Drop 07
                  </span>
                )}
                {isBeauty && (
                  <span className="mb-2 block text-xs uppercase tracking-[0.3em]" style={{ color: colors.accent }}>
                    Find your routine
                  </span>
                )}
                {isGrocery && (
                  <span className="mb-2 block text-xs uppercase tracking-[0.28em]" style={{ color: colors.accent }}>
                    Today only
                  </span>
                )}

                <h1 className={cn(
                  "text-4xl leading-[1.08] tracking-tight md:text-5xl",
                  isJewellery && "font-serif italic font-light",
                  isStreetwear && "font-black uppercase tracking-tighter",
                  isElectronics && "font-sans font-bold",
                  isBeauty && "font-serif",
                  isFashion && "font-serif font-bold",
                )}>
                  {String(P(pr, "heading", "Discover products you'll love."))}
                </h1>

                <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-80">
                  {String(P(pr, "subheading", ""))}
                </p>

                <a
                  href={slug ? `/store/${slug}/products` : "#"}
                  className="mt-7 inline-flex h-12 items-center gap-2 rounded-lg px-7 text-sm font-semibold transition hover:opacity-90"
                  style={{ background: colors.fg, color: colors.bg }}
                >
                  {String(P(pr, "ctaText", "Shop Now"))}
                </a>
              </div>

              <div>
                {/* ✅ FIX: only render img if src exists */}
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt=""
                    className="h-[320px] w-full object-cover md:h-[420px]"
                    style={{ borderRadius: 8 }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="h-[320px] w-full md:h-[420px]"
                    style={{
                      borderRadius: 8,
                      background: `linear-gradient(135deg, ${colors.surface}, ${colors.border})`,
                    }}
                  />
                )}
              </div>
            </div>
          </section>
        );
      }

      case "productGrid":
        return (
          <section style={{ background: colors.bg, padding: "64px 0" }}>
            <div className="mx-auto max-w-6xl px-5">
              <h2 className="mb-8 text-2xl font-bold md:text-3xl" style={{ color: colors.fg }}>
                {String(P(pr, "title", "Bestsellers"))}
              </h2>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {products.slice(0, 8).map((p) => (
                  <ProductCard
                    key={p.id}
                    p={p}
                    slug={slug}
                    onAddToCart={onAddToCart}
                    isJewellery={isJewellery}
                    isStreetwear={isStreetwear}
                  />
                ))}
              </div>
            </div>
          </section>
        );

      case "footer":
        return (
          <footer style={{ background: colors.fg, color: colors.bg }}>
            <div className="mx-auto max-w-6xl px-5 py-12 text-center">
              <div className="text-lg font-bold">
                {String(P(pr, "brandText", fallbackBrandName))}
              </div>
              <p className="mt-2 text-sm opacity-70">
                {String(P(pr, "tagline", ""))}
              </p>
              <p className="mt-6 text-xs opacity-50">
                © {new Date().getFullYear()} {String(P(pr, "brandText", fallbackBrandName))}
              </p>
            </div>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ background: colors.bg, color: colors.fg, minHeight: "100vh" }}>
      {isStreetwear && (
        <div className="bg-[#EF4444] py-1.5 text-center text-[11px] font-black uppercase text-black">
          ⚡ LIMITED DROP // 100% AUTHENTIC ⚡
        </div>
      )}
      {isJewellery && (
        <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
          Complimentary Insured Shipping · Certified Heirloom Jewels
        </div>
      )}
      {isElectronics && (
        <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
          Free Shipping on orders above ₹999
        </div>
      )}
      {isBeauty && (
        <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
          Clean Beauty · Cruelty Free · Organic
        </div>
      )}
      {isGrocery && (
        <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
          Fresh Delivery within 12 hours
        </div>
      )}
      {isHealthcare && (
        <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
          Same-day appointments available
        </div>
      )}

      <div>
        {sections.map((s) => (
          <div key={s.id}>{renderSection(s)}</div>
        ))}
      </div>
    </div>
  );
}

export function ProductCard({
  p,
  slug,
  onAddToCart,
  isJewellery,
  isStreetwear,
}: {
  p: StoreProduct;
  slug?: string;
  onAddToCart?: (p: StoreProduct) => void;
  isJewellery?: boolean;
  isStreetwear?: boolean;
}) {
  // ✅ FIX: product image null-safe
  const productImage = safeSrc(p.image);

  const inner = (
    <>
      <div className="relative overflow-hidden rounded-xl bg-[#EFEEE8]">
        {productImage ? (
          <img
            src={productImage}
            alt={p.name}
            className="aspect-[3/4] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center bg-[#EFEEE8] text-[#B5B0A5]">
            <Icon name="image" style={{ width: 32, height: 32 }} />
          </div>
        )}
        {p.compareAt && (
          <span className="absolute left-2 top-2 rounded-md bg-danger px-2 py-0.5 text-[11px] font-bold text-white">
            -{Math.round((1 - p.price / p.compareAt) * 100)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-[11px] font-medium uppercase text-muted">{p.category}</div>
        <div className="text-sm font-semibold">{p.name}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold">{inr(p.price)}</span>
          {p.compareAt && <span className="text-xs text-muted line-through">{inr(p.compareAt)}</span>}
        </div>
      </div>
    </>
  );

  return slug ? (
    <a href={`/store/${slug}/product/${p.id}`} className="group block">
      {inner}
    </a>
  ) : (
    <div className="group block">{inner}</div>
  );
}
// "use client";

// import { useState } from "react";
// import type { Section } from "@/lib/types";
// import { inr } from "@/lib/format";
// import { Icon } from "./icons";
// import { cn } from "./ui";

// export interface StoreProduct {
//   id: string;
//   name: string;
//   price: number;
//   compareAt?: number | null;
//   image: string;
//   category: string;
// }

// interface Props {
//   sections: Section[];
//   products: StoreProduct[];
//   slug?: string;
//   templateId?: string;
//   onAddToCart?: (p: StoreProduct) => void;
//   builderMode?: boolean;
//   selectedId?: string | null;
//   onSelect?: (id: string) => void;
// }

// const TESTIMONIALS = [
//   { quote: "The quality genuinely surprised me. Packaging, fabric, fit — everything felt premium.", name: "Ananya Sharma", role: "Mumbai · Verified buyer" },
//   { quote: "Ordered on a Tuesday, wearing it by Friday. The size guide was spot on.", name: "Rohan Mehta", role: "Bengaluru · Verified buyer" },
//   { quote: "Customer support answered in minutes and the exchange was painless. Rare these days.", name: "Priya Nair", role: "Kochi · Verified buyer" },
// ];

// function P(props: Record<string, unknown>, key: string, fallback: unknown = "") {
//   const v = props[key];
//   return v == null || v === "" ? fallback : v;
// }

// export function StorefrontRenderer({
//   sections = [],
//   products = [],
//   slug,
//   templateId,
//   onAddToCart,
//   builderMode,
//   selectedId,
//   onSelect,
// }: Props) {
//   // ============================================
//   // THEME DIFFERENTIATORS - Sab templates ke liye
//   // ============================================
//   const isJewellery = ["aura-jewels", "luxe-boutique", "riva-silver-gems", "jewellery-bridal"].includes(templateId || "");
//   const isStreetwear = ["stride-kicks", "urban-goods", "streetwear"].includes(templateId || "");
//   const isElectronics = ["techhub"].includes(templateId || "");
//   const isBeauty = ["botanica-skin"].includes(templateId || "");
//   const isGrocery = ["fresh-market"].includes(templateId || "");
//   const isHealthcare = ["healthcare-clinic"].includes(templateId || "");
//   const isFashion = ["nova-fashion", "fashion-luxe", "minimal-store"].includes(templateId || "");

//   // ============================================
//   // THEME COLORS
//   // ============================================
//   const themeColors = {
//     jewellery: { bg: "#FFFDF9", fg: "#27211B", accent: "#855829", surface: "#FDF8F0", border: "#EADCC8" },
//     streetwear: { bg: "#0A0A0A", fg: "#FFFFFF", accent: "#EF4444", surface: "#111111", border: "#262626" },
//     electronics: { bg: "#FFFFFF", fg: "#111827", accent: "#2563EB", surface: "#F3F4F6", border: "#E5E7EB" },
//     beauty: { bg: "#FFFFFF", fg: "#27222A", accent: "#C084FC", surface: "#F5F3FF", border: "#E6DFF2" },
//     grocery: { bg: "#FFFEFB", fg: "#2C2C2C", accent: "#FF6B35", surface: "#FFF4E6", border: "#E8DDCE" },
//     healthcare: { bg: "#FFFFFF", fg: "#0F172A", accent: "#0EA5E9", surface: "#EFF6FF", border: "#DCE8F7" },
//     fashion: { bg: "#FBFAF7", fg: "#1B1D1A", accent: "#D97706", surface: "#F2EDE3", border: "#DED8CC" },
//     default: { bg: "#FFFFFF", fg: "#111111", accent: "#000000", surface: "#F5F5F5", border: "#E5E5E5" },
//   };

//   const getColors = () => {
//     if (isElectronics) return themeColors.electronics;
//     if (isBeauty) return themeColors.beauty;
//     if (isGrocery) return themeColors.grocery;
//     if (isHealthcare) return themeColors.healthcare;
//     if (isFashion) return themeColors.fashion;
//     if (isJewellery) return themeColors.jewellery;
//     if (isStreetwear) return themeColors.streetwear;
//     return themeColors.default;
//   };

//   const colors = getColors();

//   const hasFooter = sections.some((s) => s.type === "footer");
//   const headerSection = sections.find((s) => s.type === "header");
//   const fallbackBrandName = String(P(headerSection?.props || {}, "brandText", slug ? slug.toUpperCase() : "Store"));

//   const renderSection = (s: Section) => {
//     const pr = s.props;
//     switch (s.type) {
//       case "header":
//         return (
//           <header
//             className="sticky top-0 z-30 border-b"
//             style={{
//               background: String(P(pr, "bgColor", colors.bg)),
//               color: String(P(pr, "textColor", colors.fg)),
//               borderColor: colors.border,
//             }}
//           >
//             <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
//               <a
//                 href={slug ? `/store/${slug}` : "#"}
//                 className={cn(
//                   "text-lg tracking-tight",
//                   isJewellery && "font-serif tracking-[0.15em] uppercase",
//                   isStreetwear && "font-mono font-black italic uppercase",
//                   isElectronics && "font-sans font-bold",
//                   isFashion && "font-serif font-bold",
//                 )}
//               >
//                 {String(P(pr, "brandText", fallbackBrandName))}
//               </a>
//               <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
//                 <a href={slug ? `/store/${slug}` : "#"} className="opacity-80 hover:opacity-100">Home</a>
//                 <a href={slug ? `/store/${slug}/products` : "#"} className="opacity-80 hover:opacity-100">Shop</a>
//                 <a href={slug ? `/store/${slug}/about` : "#"} className="opacity-80 hover:opacity-100">About</a>
//                 <a href={slug ? `/store/${slug}/contact` : "#"} className="opacity-80 hover:opacity-100">Contact</a>
//               </nav>
//               <a href={slug ? `/store/${slug}/cart` : "#"}>
//                 <Icon name="cart" style={{ width: 18, height: 18 }} />
//               </a>
//             </div>
//           </header>
//         );

//       case "hero":
//         return (
//           <section
//             className="overflow-hidden"
//             style={{
//               background: String(P(pr, "bgColor", colors.surface)),
//               color: String(P(pr, "textColor", colors.fg)),
//             }}
//           >
//             <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-2">
//               <div>
//                 {isJewellery && (
//                   <span className="mb-2 block text-xs uppercase tracking-[0.2em]" style={{ color: colors.accent }}>
//                     Exclusive Artisanal Edit
//                   </span>
//                 )}
//                 {isStreetwear && (
//                   <span className="mb-3 inline-block rounded bg-red-600 px-2 py-0.5 text-[11px] font-black uppercase text-black">
//                     LIMITED RELEASE
//                   </span>
//                 )}
//                 {isElectronics && (
//                   <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase" style={{ background: colors.accent, color: "#fff" }}>
//                     Drop 07
//                   </span>
//                 )}
//                 {isBeauty && (
//                   <span className="mb-2 block text-xs uppercase tracking-[0.3em]" style={{ color: colors.accent }}>
//                     Find your routine
//                   </span>
//                 )}
//                 {isGrocery && (
//                   <span className="mb-2 block text-xs uppercase tracking-[0.28em]" style={{ color: colors.accent }}>
//                     Today only
//                   </span>
//                 )}
                
//                 <h1 className={cn(
//                   "text-4xl leading-[1.08] tracking-tight md:text-5xl",
//                   isJewellery && "font-serif italic font-light",
//                   isStreetwear && "font-black uppercase tracking-tighter",
//                   isElectronics && "font-sans font-bold",
//                   isBeauty && "font-serif",
//                   isFashion && "font-serif font-bold",
//                 )}>
//                   {String(P(pr, "heading", "Discover products you'll love."))}
//                 </h1>
                
//                 <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-80">
//                   {String(P(pr, "subheading", ""))}
//                 </p>
                
//                 <a
//                   href={slug ? `/store/${slug}/products` : "#"}
//                   className="mt-7 inline-flex h-12 items-center gap-2 rounded-lg px-7 text-sm font-semibold transition hover:opacity-90"
//                   style={{ background: colors.fg, color: colors.bg }}
//                 >
//                   {String(P(pr, "ctaText", "Shop Now"))}
//                 </a>
//               </div>
              
//               <div>
//                 <img
//                   src={String(P(pr, "image", products[0]?.image || ""))}
//                   alt=""
//                   className="h-[320px] w-full object-cover md:h-[420px]"
//                   style={{ borderRadius: 8 }}
//                   loading="lazy"
//                 />
//               </div>
//             </div>
//           </section>
//         );

//       case "productGrid":
//         return (
//           <section style={{ background: colors.bg, padding: "64px 0" }}>
//             <div className="mx-auto max-w-6xl px-5">
//               <h2 className="mb-8 text-2xl font-bold md:text-3xl" style={{ color: colors.fg }}>
//                 {String(P(pr, "title", "Bestsellers"))}
//               </h2>
//               <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
//                 {products.slice(0, 8).map((p) => (
//                   <ProductCard
//                     key={p.id}
//                     p={p}
//                     slug={slug}
//                     onAddToCart={onAddToCart}
//                     isJewellery={isJewellery}
//                     isStreetwear={isStreetwear}
//                   />
//                 ))}
//               </div>
//             </div>
//           </section>
//         );

//       case "footer":
//         return (
//           <footer style={{ background: colors.fg, color: colors.bg }}>
//             <div className="mx-auto max-w-6xl px-5 py-12 text-center">
//               <div className="text-lg font-bold">
//                 {String(P(pr, "brandText", fallbackBrandName))}
//               </div>
//               <p className="mt-2 text-sm opacity-70">
//                 {String(P(pr, "tagline", ""))}
//               </p>
//               <p className="mt-6 text-xs opacity-50">
//                 © {new Date().getFullYear()} {String(P(pr, "brandText", fallbackBrandName))}
//               </p>
//             </div>
//           </footer>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ background: colors.bg, color: colors.fg, minHeight: "100vh" }}>
//       {isStreetwear && (
//         <div className="bg-[#EF4444] py-1.5 text-center text-[11px] font-black uppercase text-black">
//           ⚡ LIMITED DROP // 100% AUTHENTIC ⚡
//         </div>
//       )}
//       {isJewellery && (
//         <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
//           Complimentary Insured Shipping · Certified Heirloom Jewels
//         </div>
//       )}
//       {isElectronics && (
//         <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
//           Free Shipping on orders above ₹999
//         </div>
//       )}
//       {isBeauty && (
//         <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
//           Clean Beauty · Cruelty Free · Organic
//         </div>
//       )}
//       {isGrocery && (
//         <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
//           Fresh Delivery within 12 hours
//         </div>
//       )}
//       {isHealthcare && (
//         <div className="py-2 text-center text-[11px] uppercase" style={{ background: colors.accent, color: "#fff" }}>
//           Same-day appointments available
//         </div>
//       )}

//       <div>
//         {sections.map((s) => (
//           <div key={s.id}>{renderSection(s)}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function ProductCard({
//   p,
//   slug,
//   onAddToCart,
//   isJewellery,
//   isStreetwear,
// }: {
//   p: StoreProduct;
//   slug?: string;
//   onAddToCart?: (p: StoreProduct) => void;
//   isJewellery?: boolean;
//   isStreetwear?: boolean;
// }) {
//   const inner = (
//     <>
//       <div className="relative overflow-hidden rounded-xl bg-[#EFEEE8]">
//         <img src={p.image} alt={p.name} className="aspect-[3/4] w-full object-cover" loading="lazy" />
//         {p.compareAt && (
//           <span className="absolute left-2 top-2 rounded-md bg-danger px-2 py-0.5 text-[11px] font-bold text-white">
//             -{Math.round((1 - p.price / p.compareAt) * 100)}%
//           </span>
//         )}
//       </div>
//       <div className="mt-3">
//         <div className="text-[11px] font-medium uppercase text-muted">{p.category}</div>
//         <div className="text-sm font-semibold">{p.name}</div>
//         <div className="mt-1 flex items-baseline gap-2">
//           <span className="text-sm font-bold">{inr(p.price)}</span>
//           {p.compareAt && <span className="text-xs text-muted line-through">{inr(p.compareAt)}</span>}
//         </div>
//       </div>
//     </>
//   );

//   return slug ? (
//     <a href={`/store/${slug}/product/${p.id}`} className="group block">
//       {inner}
//     </a>
//   ) : (
//     <div className="group block">{inner}</div>
//   );
// }