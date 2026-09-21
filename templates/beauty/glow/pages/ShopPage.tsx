// src/templates/beauty/glow/pages/ShopPage.tsx

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  Percent,
  ChevronDown,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Clock,
  IndianRupee,
  RotateCcw,
  Star,
  Check,
  Zap,
  Package,
  Leaf,
} from "lucide-react";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/components/cart";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name", label: "Name A-Z" },
];

const RATING_FILTERS = [4, 3, 2];

const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1K", min: 500, max: 1000 },
  { label: "₹1K+", min: 1000, max: 100000 },
];

export function BeautyShopPage({
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
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  const maxProductPrice = useMemo(
    () => Math.max(...products.map((p: any) => p.price || 0), 5000),
    [products]
  );

  const [priceMax, setPriceMax] = useState<number>(maxProductPrice);
  const [priceMin, setPriceMin] = useState<number>(0);

  useEffect(() => {
    setPriceMax(maxProductPrice);
  }, [maxProductPrice]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      );
    }

    if (selected.length > 0) {
      result = result.filter((p) => selected.includes(p.categorySlug));
    }

    result = result.filter((p) => p.price >= priceMin && p.price <= priceMax);

    if (inStockOnly) {
      result = result.filter((p) => (p.inventory || 10) > 0);
    }

    if (selectedRating) {
      result = result.filter((p) => (p.rating || 4.5) >= selectedRating);
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name")
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    return result;
  }, [
    products,
    search,
    selected,
    sortBy,
    priceMin,
    priceMax,
    inStockOnly,
    selectedRating,
  ]);

  const toggleCategory = (catSlug: string) => {
    setSelected((prev) =>
      prev.includes(catSlug)
        ? prev.filter((c) => c !== catSlug)
        : [...prev, catSlug]
    );
  };

  const clearAll = () => {
    setSelected([]);
    setSearch("");
    setPriceMin(0);
    setPriceMax(maxProductPrice);
    setSelectedRating(null);
    setInStockOnly(false);
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

  const activeFilterCount =
    selected.length +
    (search ? 1 : 0) +
    (priceMin > 0 || priceMax < maxProductPrice ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const hasFilters = activeFilterCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 via-white to-purple-50/30">
      {/* ═══════════════════════════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════════════════════════ */}
      <section className="border-b border-pink-100 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-pink-700/70">
            <Link href={`/store/${slug}`} className="transition hover:text-pink-900">
              Home
            </Link>
            <span>·</span>
            <span className="font-bold text-pink-900">Beauty Shop</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20">
              <Sparkles className="h-6 w-6" strokeWidth={2.4} />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-pink-700">
                The Beauty Shop
              </p>
              <h1 className="mt-1 font-serif text-[clamp(2rem,4vw,3rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#2A2438]">
                Curated Rituals
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#2A2438]/70">
            {filtered.length} clean beauty products · Dermatologist approved ·
            Cruelty-free
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { Icon: Leaf, label: "Clean formulas" },
              { Icon: ShieldCheck, label: "Dermat tested" },
              { Icon: Heart, label: "Cruelty-free" },
              { Icon: Clock, label: "Fast delivery" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-800 backdrop-blur"
              >
                <Icon className="h-3 w-3" strokeWidth={2.5} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STICKY FILTER BAR (Search + Sort + Filter Toggle + Categories)
      ═══════════════════════════════════════════════════════════ */}
      <section className="sticky top-0 z-40 border-b border-pink-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          {/* Row 1: Search + Sort + Filter */}
          <div className="flex flex-wrap items-center gap-3 py-4">
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search beauty products..."
                className="w-full rounded-full border border-pink-200 bg-white py-2.5 pl-11 pr-10 text-sm outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-500/10"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-pink-500 transition hover:bg-pink-50"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-full border border-pink-200 bg-white py-2.5 pl-4 pr-9 text-[11px] font-bold uppercase tracking-wider text-[#2A2438] outline-none transition focus:border-pink-400"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-pink-500" />
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="relative flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#2A2438] px-5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-pink-600"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={2.4} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1.5 text-[10px] font-black text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 text-[11px] font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-100"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.5} />
                Clear
              </button>
            )}
          </div>

          {/* Row 2: Category Chips */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1">
              <button
                type="button"
                onClick={() => setSelected([])}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition ${
                  selected.length === 0
                    ? "border-pink-500 bg-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "border-pink-200 bg-white text-pink-800 hover:border-pink-400"
                }`}
              >
                <Percent className="h-3 w-3" strokeWidth={2.4} />
                All
              </button>

              {categories.map((cat: any) => {
                const isActive = selected.includes(cat.slug);
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => toggleCategory(cat.slug)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold transition ${
                      isActive
                        ? "border-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md shadow-pink-500/20"
                        : "border-pink-200 bg-white text-[#2A2438] hover:border-pink-400 hover:bg-pink-50"
                    }`}
                  >
                    <Sparkles
                      className="h-3 w-3"
                      style={{ color: isActive ? "#fff" : "#ec4899" }}
                      strokeWidth={2.4}
                    />
                    <span>{cat.name}</span>
                    {cat.count != null && (
                      <span
                        className={`text-[10px] font-bold ${
                          isActive ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MAIN LAYOUT — Sidebar + Products
      ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* SIDEBAR */}
          <aside
            className={`${
              filtersOpen ? "block" : "hidden"
            } space-y-4 lg:sticky lg:top-[200px] lg:block lg:self-start`}
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  className="h-4 w-4 text-pink-500"
                  strokeWidth={2.4}
                />
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2A2438]">
                  Filters
                </p>
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[10px] font-bold uppercase tracking-wider text-red-500 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Price Range */}
            <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white">
              <div className="border-b border-pink-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <IndianRupee
                    className="h-3.5 w-3.5 text-pink-500"
                    strokeWidth={2.4}
                  />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2A2438]">
                    Price
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2A2438]">
                    {formatMoney(priceMin)}
                  </span>
                  <span className="text-pink-400">—</span>
                  <span className="font-bold text-[#2A2438]">
                    {formatMoney(priceMax)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxProductPrice}
                  step={100}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="mt-3 w-full accent-pink-500"
                />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      type="button"
                      onClick={() => {
                        setPriceMin(range.min);
                        setPriceMax(range.max);
                      }}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition ${
                        priceMin === range.min && priceMax === range.max
                          ? "border-pink-500 bg-pink-500 text-white"
                          : "border-pink-200 bg-white text-pink-800 hover:border-pink-400"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white">
              <div className="border-b border-pink-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Star
                    className="h-3.5 w-3.5 text-pink-500"
                    strokeWidth={2.4}
                  />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2A2438]">
                    Rating
                  </h3>
                </div>
              </div>
              <div className="p-2">
                {RATING_FILTERS.map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() =>
                      setSelectedRating(
                        selectedRating === rating ? null : rating
                      )
                    }
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                      selectedRating === rating
                        ? "bg-pink-50 text-pink-800"
                        : "hover:bg-pink-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3"
                          fill={i < rating ? "#ec4899" : "transparent"}
                          stroke="#ec4899"
                          strokeWidth={2}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {rating}★ & above
                    </span>
                    {selectedRating === rating && (
                      <Check
                        className="ml-auto h-3.5 w-3.5 text-pink-500"
                        strokeWidth={2.5}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white">
              <div className="border-b border-pink-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Package
                    className="h-3.5 w-3.5 text-pink-500"
                    strokeWidth={2.4}
                  />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2A2438]">
                    Availability
                  </h3>
                </div>
              </div>
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                    inStockOnly ? "bg-pink-50" : "hover:bg-pink-50/60"
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                      inStockOnly
                        ? "border-pink-500 bg-pink-500"
                        : "border-slate-300"
                    }`}
                  >
                    {inStockOnly && (
                      <Check
                        className="h-2.5 w-2.5 text-white"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-700">
                    In stock only
                  </span>
                </button>
              </div>
            </div>

            {/* Promo */}
            <div className="overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-500 to-purple-600 p-4 text-white">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Zap className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider">
                    Free Shipping
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-white/80">
                    On orders above ₹999
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="min-w-0">
            {/* Results Bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#2A2438]/70">
                <span className="font-black text-[#2A2438]">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "product" : "products"}
                {activeFilterCount > 0 && (
                  <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pink-700">
                    {activeFilterCount} filter
                    {activeFilterCount > 1 ? "s" : ""} applied
                  </span>
                )}
              </p>
            </div>

            {/* Empty State */}
            {filtered.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-white/50 py-24 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <Search className="h-7 w-7 text-pink-500" strokeWidth={1.8} />
                </div>
                <p className="mt-4 font-bold text-[#2A2438]">
                  No products found
                </p>
                <p className="mt-1 text-sm text-[#2A2438]/60">
                  Try adjusting your filters or search
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 rounded-2xl bg-[#2A2438] px-6 py-3 text-[11px] font-black uppercase tracking-wider text-white transition hover:bg-pink-500"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product: any) => {
                  const discount = product.compareAt
                    ? Math.round(
                        (1 - product.price / product.compareAt) * 100
                      )
                    : 0;

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-xl"
                    >
                      <Link
                        href={`/store/${slug}/beauty/product/${product.id}`}
                        className="relative block aspect-square overflow-hidden bg-pink-50"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        {discount > 0 && (
                          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                            {discount}% OFF
                          </span>
                        )}
                        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                          <Heart
                            className="h-4 w-4 text-pink-500"
                            strokeWidth={2.2}
                          />
                        </span>
                      </Link>

                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-pink-500">
                          {product.category || "Beauty"}
                        </p>
                        <Link
                          href={`/store/${slug}/beauty/product/${product.id}`}
                        >
                          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#2A2438] transition group-hover:text-pink-600">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="mt-2 flex items-center gap-1">
                          <Star
                            className="h-3 w-3"
                            fill="#ec4899"
                            stroke="#ec4899"
                            strokeWidth={1.5}
                          />
                          <span className="text-[10px] font-bold text-slate-700">
                            {product.rating || "4.8"}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({product.reviewCount || 128})
                          </span>
                        </div>

                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-lg font-black text-[#2A2438]">
                            {formatMoney(product.price)}
                          </span>
                          {product.compareAt && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatMoney(product.compareAt)}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[10px] font-black uppercase tracking-wider transition ${
                            added === product.id
                              ? "bg-green-500 text-white"
                              : "bg-[#2A2438] text-white hover:bg-pink-500"
                          }`}
                        >
                          {added === product.id ? (
                            <>
                              <Check
                                className="h-3.5 w-3.5"
                                strokeWidth={2.5}
                              />
                              Added
                            </>
                          ) : (
                            <>
                              <ShoppingBag
                                className="h-3.5 w-3.5"
                                strokeWidth={2.5}
                              />
                              Add to Bag
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}