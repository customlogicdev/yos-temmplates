// src/templates/grocery/fresh/pages/ShopPage.tsx

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, Leaf, Grid3x3, List, Percent } from "lucide-react";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/components/cart";
import { getCategoryIcon } from "@/lib/category-icons";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
];

export function GroceryShopPage({
  slug,
  store,
  products,
  categories = [],
}: any) {
  const { add } = useCart();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selected.length > 0) {
      result = result.filter((p) => selected.includes(p.categorySlug));
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, search, selected, sortBy]);

  const toggleCategory = (catSlug: string) => {
    setSelected((prev) =>
      prev.includes(catSlug)
        ? prev.filter((c) => c !== catSlug)
        : [...prev, catSlug]
    );
  };

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
    <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-5 lg:py-12">
      {/* 📢 Page Header */}
      <div className="rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 p-6 lg:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500 text-white">
            <Leaf className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-700">
            Shop All Aisles
          </p>
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-green-900 lg:text-4xl">
          Fresh Groceries
        </h1>
        <p className="mt-2 text-sm text-green-800/70">
          {filtered.length} products · Delivered in 12 hours
        </p>
      </div>

      {/* 🔍 Search + Sort Row */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fresh products..."
            className="w-full rounded-2xl border border-green-200 bg-white py-3 pl-11 pr-10 text-sm outline-none focus:border-green-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-2xl border border-green-200 bg-white px-4 py-3 text-sm font-semibold text-green-900 outline-none focus:border-green-500"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-green-700 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {selected.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-black text-green-700">
              {selected.length}
            </span>
          )}
        </button>
      </div>

      {/* 🏷️ Category Filter Chips — PROPER FILTER (not fixed bar) */}
      {categories.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {/* "All" chip */}
          <button
            onClick={() => setSelected([])}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
              selected.length === 0
                ? "border-green-500 bg-green-500 text-white shadow-md"
                : "border-green-200 bg-white text-green-800 hover:border-green-400"
            }`}
          >
            <Percent className="h-3.5 w-3.5" strokeWidth={2.4} />
            All
          </button>

          {categories.map((cat: any) => {
            const { Icon, color, bg } = getCategoryIcon(cat.slug);
            const isActive = selected.includes(cat.slug);
            return (
              <button
                key={cat.slug}
                onClick={() => toggleCategory(cat.slug)}
                className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-transparent text-white shadow-md"
                    : "border-green-200 bg-white text-slate-700 hover:border-green-400"
                }`}
                style={isActive ? { background: color } : {}}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: isActive ? "rgba(255,255,255,0.2)" : bg }}
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    style={{ color: isActive ? "#fff" : color }}
                    strokeWidth={2.4}
                  />
                </span>
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? "text-white/80" : "text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 🛒 Main Grid Layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar — Desktop filter panel */}
        <aside className="hidden space-y-4 lg:block">
          <div className="rounded-3xl border border-green-100 bg-white p-5">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-green-800">
              Categories
            </h3>
            <div className="mt-4 space-y-1">
              {categories.map((cat: any) => {
                const { Icon, color, bg } = getCategoryIcon(cat.slug);
                const isActive = selected.includes(cat.slug);
                return (
                  <button
                    key={cat.slug}
                    onClick={() => toggleCategory(cat.slug)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition ${
                      isActive
                        ? "bg-green-50 text-green-800"
                        : "hover:bg-green-50/50"
                    }`}
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ background: bg }}
                    >
                      <Icon
                        className="h-3.5 w-3.5"
                        style={{ color }}
                        strokeWidth={2.4}
                      />
                    </span>
                    <span className="flex-1 text-sm font-medium text-slate-700">
                      {cat.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="mt-4 w-full rounded-xl border border-green-200 py-2 text-[10px] font-bold uppercase tracking-wider text-green-700 transition hover:bg-green-50"
              >
                Clear all
              </button>
            )}
          </div>
        </aside>

        {/* Products Grid */}
        <div>
          {/* Mobile filter overlay */}
          {filtersOpen && (
            <div className="mb-6 rounded-3xl border border-green-100 bg-white p-5 lg:hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.15em] text-green-800">
                  Filter by Category
                </h3>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="text-slate-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((cat: any) => {
                  const { Icon, color, bg } = getCategoryIcon(cat.slug);
                  const isActive = selected.includes(cat.slug);
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => toggleCategory(cat.slug)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        isActive
                          ? "border-transparent text-white"
                          : "border-green-200 bg-white text-slate-700"
                      }`}
                      style={isActive ? { background: color } : {}}
                    >
                      <Icon
                        className="h-3 w-3"
                        style={{ color: isActive ? "#fff" : color }}
                        strokeWidth={2.4}
                      />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-green-200 py-20 text-center">
              <p className="text-sm text-green-800/60">
                No products match your filters.
              </p>
              {(selected.length > 0 || search) && (
                <button
                  onClick={() => {
                    setSelected([]);
                    setSearch("");
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-green-600 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product: any) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-green-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/store/${slug}?page=product&product=${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-green-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition group-hover:scale-110"
                      />
                      {product.compareAt && (
                        <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-black text-white">
                          {Math.round(
                            (1 - product.price / product.compareAt) * 100
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
                      {product.category}
                    </p>
                    <h3 className="mt-1 line-clamp-1 font-bold text-slate-900">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-green-700">
                          {formatMoney(product.price)}
                        </span>
                        {product.compareAt && (
                          <span className="ml-2 text-xs text-slate-400 line-through">
                            {formatMoney(product.compareAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`mt-3 w-full rounded-xl py-2.5 text-[10px] font-black uppercase tracking-wider transition ${
                        added === product.id
                          ? "bg-green-500 text-white"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {added === product.id ? "✓ Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}