// src/templates/beauty/lumiere/pages/ShopPage.tsx

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import {
  Plus,
  Search,
  X,
  Star,
  Heart,
  SlidersHorizontal,
  Check,
} from "lucide-react";

export function LumiereShopPage({
  slug,
  store,
  products = [],
  categories = [],
  lockedCategoryId = null,
  title = "All",
  subtitle = "Beauty",
}: any) {
  const base = `/store/${slug}`;
  const { add } = useCart();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(lockedCategoryId || "");
  const [sortBy, setSortBy] = useState<"featured" | "low" | "high" | "new">(
    "featured"
  );
  const [added, setAdded] = useState<string | null>(null);

  const visible = useMemo(() => {
    let list = [...products];

    if (activeCategory) {
      const lock = activeCategory.toLowerCase();
      list = list.filter(
        (p: any) =>
          (p.categorySlug || "").toLowerCase() === lock ||
          (p.category || "").toLowerCase() === lock
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p: any) =>
        [p.name, p.category, p.brand]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    if (sortBy === "low") list.sort((a, b) => a.price - b.price);
    if (sortBy === "high") list.sort((a, b) => b.price - a.price);
    if (sortBy === "new")
      list.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );

    return list;
  }, [products, query, activeCategory, sortBy]);

  const handleAdd = (product: any) => {
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section className="min-h-screen bg-[#FAF7F5]">
      {/* Masthead */}
      <div className="border-b border-[#E8DDD5] bg-gradient-to-br from-[#FAF7F5] via-[#FFE5E9]/30 to-[#F5E6D3]/40">
        <div className="mx-auto max-w-[1600px] px-5 py-14 lg:px-10 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            / Shop
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] font-normal italic leading-[0.95] tracking-tight text-[#1F1B24]">
            {title}
            <br />
            <span className="text-[#B76E79]">{subtitle}</span>
          </h1>
          <p className="mt-4 text-sm text-[#1F1B24]/50">
            {visible.length} {visible.length === 1 ? "product" : "products"} ·
            Curated for glow
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 border-b border-[#E8DDD5] bg-[#FAF7F5]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="flex flex-wrap items-center gap-3 py-4">
            {/* Search */}
            <div className="relative min-w-[200px] max-w-md flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B76E79]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search beauty products..."
                className="w-full rounded-full border border-[#E8DDD5] bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#B76E79] focus:ring-4 focus:ring-[#B76E79]/10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#B76E79] hover:bg-rose-50"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  !activeCategory
                    ? "bg-[#B76E79] text-white shadow-lg shadow-rose-200/50"
                    : "border border-[#E8DDD5] bg-white text-[#1F1B24]/70 hover:border-[#B76E79] hover:text-[#B76E79]"
                }`}
              >
                All
              </button>
              {categories.slice(0, 5).map((c: any) => (
                <button
                  key={c.slug || c.id}
                  onClick={() => setActiveCategory(c.slug || c.name)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${
                    activeCategory === (c.slug || c.name)
                      ? "bg-[#B76E79] text-white shadow-lg shadow-rose-200/50"
                      : "border border-[#E8DDD5] bg-white text-[#1F1B24]/70 hover:border-[#B76E79] hover:text-[#B76E79]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="ml-auto rounded-full border border-[#E8DDD5] bg-white px-4 py-3 text-xs font-semibold text-[#1F1B24] outline-none focus:border-[#B76E79]"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="low">Price ↑</option>
              <option value="high">Price ↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#E8DDD5] bg-white py-32 text-center">
            <p className="font-serif text-2xl italic text-[#B76E79]">
              No products found
            </p>
            <p className="mt-3 text-sm text-[#1F1B24]/50">
              Try a different search or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((product: any, i: number) => (
              <div key={product.id} className="group relative">
                <Link href={`${base}?page=product&product=${product.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[#E8DDD5] bg-white shadow-sm transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-rose-200/40">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : null}

                    {/* Rating badge */}
                    <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 backdrop-blur-sm">
                      <Star
                        className="h-3 w-3"
                        fill="#B76E79"
                        stroke="#B76E79"
                        strokeWidth={0}
                      />
                      <span className="text-[10px] font-bold text-[#1F1B24]">
                        {product.rating || "4.9"}
                      </span>
                    </span>

                    {/* Sale badge */}
                    {product.compareAt && product.compareAt > product.price && (
                      <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A5A5] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        {Math.round(
                          (1 - product.price / product.compareAt) * 100
                        )}
                        % off
                      </span>
                    )}
                  </div>
                </Link>

                {/* Add to cart */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAdd(product);
                  }}
                  className={`absolute -bottom-3 right-4 flex h-11 w-11 items-center justify-center rounded-full shadow-xl transition ${
                    added === product.id
                      ? "bg-green-500 text-white"
                      : "bg-[#1F1B24] text-white hover:scale-110 hover:bg-[#B76E79]"
                  }`}
                  aria-label="Add to cart"
                >
                  {added === product.id ? (
                    <Check className="h-4 w-4" strokeWidth={2.6} />
                  ) : (
                    <Plus className="h-4 w-4" strokeWidth={2.6} />
                  )}
                </button>

                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
                    {product.category || "Beauty"}
                  </p>
                  <h3 className="mt-1.5 line-clamp-1 font-serif text-base italic text-[#1F1B24]">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-bold text-[#1F1B24]">
                      {formatMoney(product.price)}
                    </span>
                    {product.compareAt && product.compareAt > product.price && (
                      <span className="text-xs text-[#1F1B24]/40 line-through">
                        {formatMoney(product.compareAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}