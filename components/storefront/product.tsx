// src/components/storefront/product.tsx
"use client";

import Link from "next/link";
import { formatMoney } from "@/lib/format";

export function ProductCard({ product, basePath }: { product: any; basePath: string }) {
  if (!product) return null;

  // Standardize link: search param model (?page=product&product=id)
  const productHref = `${basePath}?page=product&product=${encodeURIComponent(product.id)}`;

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[var(--store-border,#e5e7eb)] bg-[var(--store-surface,#ffffff)] p-4 transition-all hover:shadow-md">
      <Link href={productHref} className="block overflow-hidden rounded-xl bg-black/5 aspect-[4/5] relative">
        <img
          src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"}
          alt={product.name || "Product"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="mt-3">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
          {product.category || "General"}
        </span>
        <Link href={productHref}>
          <h3 className="text-sm font-semibold tracking-tight text-[var(--store-fg,#111827)] line-clamp-1 hover:underline mt-0.5">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-bold text-[var(--store-accent,#4f46e5)]">
            {formatMoney ? formatMoney(product.price) : `₹${product.price}`}
          </p>
          {product.compareAt && (
            <p className="text-xs line-through opacity-40">
              {formatMoney ? formatMoney(product.compareAt) : `₹${product.compareAt}`}
            </p>
          )}
        </div>
      </div>

      <Link
        href={productHref}
        className="mt-3 block text-center w-full rounded-xl bg-[var(--store-fg,#111827)] py-2 text-xs font-bold text-[var(--store-bg,#ffffff)] transition hover:opacity-90"
      >
        View Details
      </Link>
    </div>
  );
}