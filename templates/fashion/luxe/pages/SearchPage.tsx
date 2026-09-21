// src/templates/fashion/luxe/pages/SearchPage.tsx

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { ProductCard } from "@/templates/kit/sections";

export function FashionSearchPage({
  slug,
  store,
  products,
  query: initialQuery,
}: {
  slug: string;
  store: any;
  products: any[];
  query?: string;
}) {
  const [query, setQuery] = useState(initialQuery || "");

  const props: any = {
    slug,
    basePath: `/store/${slug}`,
    data: { products: products || [], store },
    storefront: store,
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (products || []).filter((p) =>
      [p.name, p.title, p.category, p.brand, p.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, products]);

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
            Search the maison
          </p>
          <h1 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-[#1A1815]">
            Find your <span className="italic">piece</span>
          </h1>

          <div className="mt-10 flex items-center gap-4 border-b border-[#1A1815] pb-4">
            <SearchIcon
              className="h-5 w-5 shrink-0 text-[#8A7F72]"
              strokeWidth={1.6}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              placeholder="Search by name, category, or keyword…"
              className="w-full bg-transparent text-xl font-light tracking-tight outline-none placeholder:text-[#8A7F72]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear"
                className="text-[#8A7F72] hover:text-[#1A1815]"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {query.trim() && (
            <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-[#8A7F72]">
              {results.length} {results.length === 1 ? "result" : "results"} for{" "}
              <span className="text-[#1A1815]">"{query}"</span>
            </p>
          )}

          {!query.trim() && (
            <div className="mt-16 text-center">
              <p className="text-sm text-[#6A6156]">
                Start typing to search the collection.
              </p>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="mt-16 border border-dashed border-[#E5DDD0] py-32 text-center">
              <p className="text-base text-[#6A6156]">
                No pieces match your search.
              </p>
              <Link
                href={`/store/${slug}/fashion/shop`}
                className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8F6E3D] underline decoration-[#B8935A]/40 underline-offset-4 hover:decoration-[#B8935A]"
              >
                Browse all pieces
                <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((p: any) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  basePath={`/store/${slug}`}
                />
              ))}
            </div>
          )}
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}