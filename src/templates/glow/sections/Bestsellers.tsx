// src/templates/beauty/glow/sections/Bestsellers.tsx

"use client";

import Link from "next/link";
import { ProductCard } from "@/components/storefront/product";

export function Bestsellers({ props }: { props: any }) {
  const data = props?.data || {};
  const basePath = props?.basePath || "";
  const slug = props?.slug || props?.data?.slug || "";   // ✅ Added
  const products = (data.featuredProducts || data.products || []).slice(0, 6);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-pink-100 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-pink-500">
            Customer favourites
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight tracking-tight text-[#2A2438]">
            Our <span className="italic text-pink-500">bestsellers</span>
          </h2>
        </div>

        {/* ✅ FIXED: New URL */}
        <Link
          href={`/store/${slug}/beauty/shop`}
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[#2A2438]/60 hover:text-pink-500"
        >
          View All →
        </Link>
      </div>

      {/* Product grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            basePath={basePath}
          />
        ))}
      </div>
    </section>
  );
}