// src/templates/fashion/atelier/pages/ShopPage.tsx

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { Plus, Search, X } from "lucide-react";

export function AtelierShopPage({
  slug,
  store,
  products = [],
  categories = [],
  lockedCategoryId = null,
  title,
  subtitle,
}: any) {
  const base = `/store/${slug}`;
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    lockedCategoryId || ""
  );
  const [sortBy, setSortBy] = useState<"featured" | "low" | "high">("featured");

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

    return list;
  }, [products, query, activeCategory, sortBy]);

  return (
    <section className="min-h-screen bg-[#FAFAF9]">
      {/* Masthead */}
      <div className="border-b border-zinc-200/60 bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            / Shop
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-zinc-900">
            {title || "All"}
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent italic">
              {subtitle || "Drops"}
            </span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"} · SS26 Collection
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 border-b border-zinc-200/60 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div className="flex flex-wrap items-center gap-4 py-4">
            {/* Search */}
            <div className="relative min-w-[200px] max-w-md flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the archive..."
                className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  !activeCategory
                    ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                }`}
              >
                All
              </button>
              {categories.slice(0, 6).map((c: any) => (
                <button
                  key={c.slug || c.id}
                  onClick={() => setActiveCategory(c.slug || c.name)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeCategory === (c.slug || c.name)
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
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
              className="ml-auto rounded-full border border-zinc-200 bg-white px-4 py-3 text-xs font-semibold text-zinc-700 outline-none focus:border-indigo-500"
            >
              <option value="featured">Featured</option>
              <option value="low">Price ↑</option>
              <option value="high">Price ↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white py-32 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              No pieces found
            </p>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory("")}
                className="mt-6 rounded-full bg-zinc-900 px-6 py-3 text-xs font-semibold text-white"
              >
                Clear filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((product: any, i: number) => (
              <div key={product.id} className="group relative">
                <Link href={`${base}?page=product&product=${product.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : null}
                    <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-900 backdrop-blur-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {product.compareAt && product.compareAt > product.price && (
                      <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        {Math.round(
                          (1 - product.price / product.compareAt) * 100
                        )}
                        % off
                      </span>
                    )}
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    add({
                      productId: product.id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                    });
                  }}
                  className="absolute -bottom-3 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl shadow-zinc-900/20 transition hover:scale-110 hover:bg-zinc-800"
                  aria-label="Add to cart"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.6} />
                </button>

                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                    {product.category || "Signature"}
                  </p>
                  <h3 className="mt-1.5 line-clamp-1 text-sm font-semibold text-zinc-900">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-bold text-zinc-900">
                      {formatMoney(product.price)}
                    </span>
                    {product.compareAt && product.compareAt > product.price && (
                      <span className="text-xs text-zinc-400 line-through">
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
// // src/templates/fashion/atelier/pages/ShopPage.tsx

// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import { useCart } from "@/components/cart";
// import { formatMoney } from "@/lib/format";
// import { Plus, Search, SlidersHorizontal, X } from "lucide-react";

// export function AtelierShopPage({
//   slug,
//   store,
//   products = [],
//   categories = [],
// }: any) {
//   const base = `/store/${slug}/fashion`;
//   const { add } = useCart();
//   const [query, setQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("");
//   const [sortBy, setSortBy] = useState<"featured" | "low" | "high">("featured");

//   const visible = useMemo(() => {
//     let list = [...products];

//     if (activeCategory) {
//       list = list.filter(
//         (p: any) =>
//           (p.categorySlug || p.category || "").toLowerCase() ===
//           activeCategory.toLowerCase()
//       );
//     }

//     if (query.trim()) {
//       const q = query.toLowerCase();
//       list = list.filter((p: any) =>
//         [p.name, p.category, p.brand]
//           .filter(Boolean)
//           .join(" ")
//           .toLowerCase()
//           .includes(q)
//       );
//     }

//     if (sortBy === "low") list.sort((a, b) => a.price - b.price);
//     if (sortBy === "high") list.sort((a, b) => b.price - a.price);

//     return list;
//   }, [products, query, activeCategory, sortBy]);

//   return (
//     <section className="min-h-screen bg-black text-white">
//       {/* Masthead */}
//       <div className="border-b border-white/10">
//         <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10 lg:py-20">
//           <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
//             / SHOP
//           </p>
//           <h1 className="mt-4 font-mono text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
//             ALL
//             <br />
//             <span className="text-white/30">DROPS</span>
//           </h1>
//           <p className="mt-4 font-mono text-sm text-white/50">
//             {visible.length} pieces · SS26 COLLECTION
//           </p>
//         </div>
//       </div>

//       {/* Filter bar */}
//       <div className="sticky top-[72px] z-30 border-b border-white/10 bg-black/95 backdrop-blur-xl">
//         <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
//           <div className="flex flex-wrap items-center gap-4 py-4">
//             {/* Search */}
//             <div className="relative flex-1 min-w-[200px] max-w-md">
//               <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
//               <input
//                 type="search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="SEARCH THE ARCHIVE..."
//                 className="w-full border border-white/20 bg-transparent py-3 pl-11 pr-10 font-mono text-xs uppercase tracking-[0.2em] text-white outline-none placeholder:text-white/30 focus:border-white"
//               />
//               {query && (
//                 <button
//                   onClick={() => setQuery("")}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//             </div>

//             {/* Category chips */}
//             <div className="flex flex-wrap items-center gap-2">
//               <button
//                 onClick={() => setActiveCategory("")}
//                 className={`border px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.25em] transition ${
//                   !activeCategory
//                     ? "border-white bg-white text-black"
//                     : "border-white/20 text-white/60 hover:border-white hover:text-white"
//                 }`}
//               >
//                 ALL
//               </button>
//               {categories.slice(0, 5).map((c: any) => (
//                 <button
//                   key={c.slug || c.id}
//                   onClick={() => setActiveCategory(c.slug || c.name)}
//                   className={`border px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.25em] transition ${
//                     activeCategory === (c.slug || c.name)
//                       ? "border-white bg-white text-black"
//                       : "border-white/20 text-white/60 hover:border-white hover:text-white"
//                   }`}
//                 >
//                   {c.name}
//                 </button>
//               ))}
//             </div>

//             {/* Sort */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value as any)}
//               className="ml-auto border border-white/20 bg-black px-4 py-3 font-mono text-[10px] font-black uppercase tracking-[0.25em] text-white outline-none focus:border-white"
//             >
//               <option value="featured">FEATURED</option>
//               <option value="low">PRICE ↑</option>
//               <option value="high">PRICE ↓</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Grid */}
//       <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
//         {visible.length === 0 ? (
//           <div className="border border-dashed border-white/20 py-32 text-center">
//             <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/40">
//               NO PIECES FOUND
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//             {visible.map((product: any, i: number) => (
//               <div key={product.id} className="group relative">
//                 <Link href={`${base}/product/${product.id}`}>
//                   <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/5">
//                     {product.image ? (
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
//                       />
//                     ) : null}
//                     <span className="absolute right-3 top-3 font-mono text-[10px] font-black tracking-[0.25em] text-white">
//                       {String(i + 1).padStart(2, "0")}
//                     </span>
//                     {product.compareAt && product.compareAt > product.price && (
//                       <span className="absolute left-3 top-3 bg-white px-2 py-1 font-mono text-[9px] font-black tracking-[0.2em] text-black">
//                         {Math.round((1 - product.price / product.compareAt) * 100)}% OFF
//                       </span>
//                     )}
//                   </div>
//                 </Link>

//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     add({
//                       productId: product.id,
//                       name: product.name,
//                       image: product.image,
//                       price: product.price,
//                     });
//                   }}
//                   className="absolute -bottom-3 right-4 flex h-10 w-10 items-center justify-center border-2 border-black bg-white text-black transition hover:bg-black hover:text-white"
//                   aria-label="Add to cart"
//                 >
//                   <Plus className="h-4 w-4" strokeWidth={3} />
//                 </button>

//                 <div className="mt-6">
//                   <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
//                     {product.category || "SIGNATURE"}
//                   </p>
//                   <h3 className="mt-1 line-clamp-1 font-mono text-xs font-black uppercase tracking-[-0.01em] text-white">
//                     {product.name}
//                   </h3>
//                   <div className="mt-2 flex items-baseline gap-2">
//                     <span className="font-mono text-sm font-black text-white">
//                       {formatMoney(product.price)}
//                     </span>
//                     {product.compareAt && product.compareAt > product.price && (
//                       <span className="font-mono text-[10px] text-white/40 line-through">
//                         {formatMoney(product.compareAt)}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }