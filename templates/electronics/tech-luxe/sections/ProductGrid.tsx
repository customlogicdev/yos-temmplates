// src/templates/electronics/tech-luxe/sections/ProductGrid.tsx

"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";

interface ProductGridProps {
  products: any[];
  basePath: string;
  viewMode: "grid" | "list";
}

export function ProductGrid({ products, basePath, viewMode }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)]">
        <p className="text-[var(--theme-muted)]">No products found matching your filters.</p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-6 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-32 w-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="text-xs text-[var(--theme-muted)]">{product.brand || "AURELIA"}</div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-[var(--theme-muted)]">{product.description}</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-lg font-bold text-[var(--theme-primary)]">
                  {formatMoney(product.price)}
                </span>
                {product.compareAt && (
                  <span className="text-sm text-[var(--theme-muted)] line-through">
                    {formatMoney(product.compareAt)}
                  </span>
                )}
              </div>
            </div>
            <button className="self-start rounded-lg bg-[var(--theme-primary)] px-6 py-2 text-sm font-semibold text-white hover:opacity-90">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="group rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] overflow-hidden transition hover:shadow-lg"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="relative aspect-square overflow-hidden bg-[var(--theme-surface)]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            
            {hoveredProduct === product.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity">
                <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-[var(--theme-primary)] hover:text-white">
                  QUICK VIEW ADD
                </button>
              </div>
            )}

            {product.compareAt && (
              <span className="absolute left-3 top-3 rounded-full bg-[var(--theme-primary)] px-2.5 py-1 text-xs font-bold text-white">
                {Math.round(((product.compareAt - product.price) / product.compareAt) * 100)}% OFF
              </span>
            )}
          </div>

          <div className="p-4">
            <div className="text-xs text-[var(--theme-muted)]">
              {product.brand || "AURELIA"}
            </div>
            <h3 className="mt-1 font-semibold group-hover:text-[var(--theme-primary)]">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-lg font-bold text-[var(--theme-primary)]">
                {formatMoney(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-sm text-[var(--theme-muted)] line-through">
                  {formatMoney(product.compareAt)}
                </span>
              )}
            </div>
            {product.rating && (
              <div className="mt-2 flex items-center gap-1 text-sm">
                <span className="text-[var(--theme-primary)]">★</span>
                <span className="font-medium">{product.rating}</span>
                <span className="text-[var(--theme-muted)]">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}