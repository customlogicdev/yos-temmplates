// src/templates/beauty/glow/pages/ConcernPage.tsx

"use client";

import Link from "next/link";
import { BeautyShell } from "../layout/Shell";
import { ProductCard } from "@/components/storefront/product";

const CONCERN_DATA: Record<string, { title: string; desc: string; emoji: string }> = {
  hydration: {
    title: "Hydration",
    desc: "Quench thirsty skin with deeply moisturizing formulas",
    emoji: "💧",
  },
  brightening: {
    title: "Brightening",
    desc: "Even skin tone and reveal natural radiance",
    emoji: "✨",
  },
  acne: {
    title: "Acne Care",
    desc: "Clear breakouts and calm irritation",
    emoji: "🌿",
  },
  "anti-aging": {
    title: "Anti-Aging",
    desc: "Firm, smooth, and turn back the clock",
    emoji: "⏳",
  },
  glow: {
    title: "Glow",
    desc: "Luminous, dewy, glass-skin finish",
    emoji: "🌟",
  },
  sensitive: {
    title: "Sensitive Skin",
    desc: "Gentle, soothing, fragrance-free care",
    emoji: "🌸",
  },
};

export function BeautyConcernPage({ slug, store, products, tag }: any) {
  const concern = CONCERN_DATA[tag] || {
    title: tag,
    desc: `Curated products for ${tag}`,
    emoji: "💖",
  };

  const filtered = products.filter((p: any) =>
    p.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
  );

  return (
    <BeautyShell
      props={{ data: { store }, basePath: `/store/${slug}` }}
      slug={slug}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#2A2438]/50">
          <Link href={`/store/${slug}/beauty/shop`} className="hover:text-pink-500">
            Shop
          </Link>
          <span className="mx-2">·</span>
          <span className="text-[#2A2438]">Concern: {concern.title}</span>
        </nav>

        {/* Header */}
        <div className="mt-6 text-center">
          <p className="text-4xl">{concern.emoji}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-pink-500">
            Concern
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#2A2438]">
            For <span className="italic text-pink-500">{concern.title}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[#2A2438]/60">
            {concern.desc}
          </p>
          <p className="mt-4 text-xs uppercase tracking-wider text-[#2A2438]/40">
            {filtered.length} products
          </p>
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-pink-200 py-20 text-center">
            <p className="text-sm text-[#2A2438]/60">
              No products found for this concern yet.
            </p>
            <Link
              href={`/store/${slug}/beauty/shop`}
              className="mt-4 inline-block text-xs uppercase tracking-[0.15em] text-pink-500 hover:underline"
            >
              Browse all products →
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p: any) => (
              <ProductCard key={p.id} product={p} basePath={`/store/${slug}`} />
            ))}
          </div>
        )}
      </div>
    </BeautyShell>
  );
}