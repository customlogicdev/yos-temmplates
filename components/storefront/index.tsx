// src/components/storefront/index.tsx

"use client";

import Link from "next/link";

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  compareAt?: number | null;
  image: string;
  category: string;
  slug?: string;
}

interface Section {
  id: string;
  type: string;
  props: Record<string, any>;
}

interface StorefrontRendererProps {
  sections: Section[];
  products: StoreProduct[];
  slug: string;
  templateId?: string;
}

export function StorefrontRenderer({
  sections,
  products,
  slug,
  templateId,
}: StorefrontRendererProps) {
  // ✅ Get template colors
  const getColors = () => {
    const colorMap: Record<string, any> = {
      "nova-fashion": { primary: "#D97706", secondary: "#F2EDE3", bg: "#FBFAF7", fg: "#1B1D1A" },
      "fashion-luxe": { primary: "#9A7B4F", secondary: "#F5F1EA", bg: "#FFFFFF", fg: "#171717" },
      "healthcare-clinic": { primary: "#0EA5E9", secondary: "#EFF6FF", bg: "#FFFFFF", fg: "#0F172A" },
      "grocery-fresh": { primary: "#FF6B35", secondary: "#FFF4E6", bg: "#FFFEFB", fg: "#2C2C2C" },
      "techhub": { primary: "#2563EB", secondary: "#F3F4F6", bg: "#FFFFFF", fg: "#111827" },
      "botanica-skin": { primary: "#C084FC", secondary: "#F5F3FF", bg: "#FFFFFF", fg: "#27222A" },
    };
    return colorMap[templateId || "nova-fashion"] || colorMap["nova-fashion"];
  };

  const colors = getColors();

  // ✅ Render section
  const renderSection = (section: Section) => {
    const { type, props } = section;

    switch (type) {
      case "header":
        return (
          <header className="sticky top-0 z-50 border-b" style={{ background: colors.bg, borderColor: colors.secondary }}>
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
              <Link href={`/store/${slug}`} className="text-xl font-bold" style={{ color: colors.fg }}>
                {props.brandText || "Store"}
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link href={`/store/${slug}`} style={{ color: colors.fg }}>Home</Link>
                <Link href={`/store/${slug}/products`} style={{ color: colors.fg }}>Products</Link>
                <Link href={`/store/${slug}/about`} style={{ color: colors.fg }}>About</Link>
                <Link href={`/store/${slug}/contact`} style={{ color: colors.fg }}>Contact</Link>
              </nav>
              <Link href={`/store/${slug}/cart`} className="text-lg">🛒</Link>
            </div>
          </header>
        );

      case "hero":
        return (
          <section className="py-16" style={{ background: props.bgColor || colors.primary }}>
            <div className="mx-auto max-w-6xl px-5">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <h1 className="text-4xl font-bold md:text-5xl" style={{ color: "#FFFFFF" }}>
                    {props.heading || "Welcome"}
                  </h1>
                  <p className="mt-4 text-lg opacity-90" style={{ color: "#FFFFFF" }}>
                    {props.subheading || ""}
                  </p>
                  <Link
                    href={`/store/${slug}/products`}
                    className="mt-6 inline-block rounded-full px-8 py-3 text-sm font-semibold transition hover:opacity-90"
                    style={{ background: "#FFFFFF", color: props.bgColor || colors.primary }}
                  >
                    {props.ctaText || "Shop Now"}
                  </Link>
                </div>
                {props.image && (
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <img src={props.image} alt="Hero" className="w-full aspect-square object-cover" />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "productGrid":
        return (
          <section className="py-16" style={{ background: props.bgColor || colors.secondary }}>
            <div className="mx-auto max-w-6xl px-5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold md:text-3xl" style={{ color: colors.fg }}>
                  {props.title || "Products"}
                </h2>
                <Link href={`/store/${slug}/products`} className="text-sm hover:underline" style={{ color: colors.primary }}>
                  View All →
                </Link>
              </div>
              <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
                {products.slice(0, 8).map((product) => (
                  <div key={product.id} className="group rounded-lg border overflow-hidden" style={{ borderColor: colors.primary + "30" }}>
                    <Link href={`/store/${slug}/product/${product.id}`}>
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="text-xs opacity-60" style={{ color: colors.fg }}>{product.category}</div>
                      <Link href={`/store/${slug}/product/${product.id}`}>
                        <h3 className="mt-1 font-semibold hover:opacity-70" style={{ color: colors.fg }}>{product.name}</h3>
                      </Link>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-bold" style={{ color: colors.primary }}>₹{product.price.toLocaleString()}</span>
                        {product.compareAt && (
                          <span className="text-sm line-through opacity-50" style={{ color: colors.fg }}>₹{product.compareAt.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "footer":
        return (
          <footer style={{ background: props.bgColor || colors.primary }}>
            <div className="mx-auto max-w-6xl px-5 py-12 text-center">
              <p className="text-lg font-bold" style={{ color: props.textColor || "#FFFFFF" }}>
                {props.brandText || "Store"}
              </p>
              <p className="mt-2 text-sm opacity-80" style={{ color: props.textColor || "#FFFFFF" }}>
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: colors.bg }}>
      {sections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  );
}