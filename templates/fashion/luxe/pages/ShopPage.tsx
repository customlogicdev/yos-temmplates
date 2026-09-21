// src/templates/fashion/luxe/pages/ShopPage.tsx

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, SlidersHorizontal, Search, X } from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { ProductCard } from "@/templates/kit/sections";

interface FashionShopPageProps {
  slug: string;
  store: any;
  products: any[];
  categories: any[];
  initialQuery?: string;
  initialCategory?: string;
}

export function FashionShopPage({
  slug,
  store,
  products,
  categories,
  initialQuery = "",
  initialCategory = "",
}: FashionShopPageProps) {
  const basePath = `/store/${slug}/fashion`;
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "new"
  >("featured");

  const props: any = {
    slug,
    basePath,
    data: {
      products: products || [],
      featuredProducts: products || [],
      categories: categories || [],
      store: store || {},
    },
    storefront: store,
  };

  const visible = useMemo(() => {
    let list = [...(products || [])];

    if (activeCategory) {
      list = list.filter(
        (p) =>
          (p.category || "").toLowerCase() === activeCategory.toLowerCase() ||
          (p.categorySlug || "").toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) =>
        [p.name, p.title, p.category, p.brand, p.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "new":
        list.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
    }

    return list;
  }, [products, query, activeCategory, sortBy]);

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        {/* Editorial Masthead */}
        <section className="border-b border-[#E5DDD0] bg-[#FAF7F2]">
          <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8935A]" />
                  The Shop · Issue 14
                </p>
                <h1 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-[#1A1815]">
                  Ready <span className="italic">to wear</span>
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#6A6156]">
                  {visible.length} pieces — hand-finished in our Mumbai
                  atelier, made in limited runs.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full max-w-sm">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A7F72]"
                  strokeWidth={1.8}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the collection…"
                  aria-label="Search products"
                  className="w-full rounded-full border border-[#E5DDD0] bg-white py-3.5 pl-11 pr-10 text-sm outline-none transition focus:border-[#B8935A]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7F72] hover:text-[#1A1815]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Filters Bar */}
        <section className="sticky top-[72px] z-30 border-b border-[#E5DDD0] bg-[#FAF7F2]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
            <div className="flex flex-wrap items-center gap-6 py-4">
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory("")}
                  className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition ${
                    !activeCategory
                      ? "bg-[#1A1815] text-white"
                      : "border border-[#E5DDD0] text-[#6A6156] hover:border-[#B8935A] hover:text-[#1A1815]"
                  }`}
                >
                  All
                </button>
                {(categories || []).slice(0, 6).map((c: any) => (
                  <button
                    key={c.id || c.slug}
                    type="button"
                    onClick={() => setActiveCategory(c.slug || c.name)}
                    className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition ${
                      activeCategory === (c.slug || c.name)
                        ? "bg-[#1A1815] text-white"
                        : "border border-[#E5DDD0] text-[#6A6156] hover:border-[#B8935A] hover:text-[#1A1815]"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <SlidersHorizontal
                  className="h-4 w-4 text-[#8A7F72]"
                  strokeWidth={1.8}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="cursor-pointer bg-transparent text-[10px] font-bold uppercase tracking-[0.22em] text-[#1A1815] outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="new">Newest</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
          {visible.length === 0 ? (
            <div className="border border-dashed border-[#E5DDD0] py-32 text-center">
              <Filter
                className="mx-auto h-8 w-8 text-[#8A7F72]"
                strokeWidth={1.4}
              />
              <p className="mt-4 text-base text-[#6A6156]">
                No pieces match your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("");
                }}
                className="mt-4 text-[10px] uppercase tracking-[0.28em] text-[#8F6E3D] underline decoration-[#B8935A]/40 underline-offset-4 hover:decoration-[#B8935A]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((product: any, i: number) => (
                <div
                  key={product.id}
                  style={{
                    animation: `fadeUp 0.7s ease-out ${i * 60}ms both`,
                  }}
                >
                  <ProductCard product={product} basePath={basePath} />
                </div>
              ))}
            </div>
          )}
        </section>

        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}