"use client";

import { useState } from "react";
import Link from "next/link";
import { resolveTheme } from "@/themes/registry";
import { useCart } from "./cart";
import { Icon } from "./icons";
import type { Section } from "@/lib/types";
import type { StoreProduct } from "@/themes/types";

interface LiveStorefrontProps {
  sections: Section[];
  products: StoreProduct[];
  slug: string;
  templateId?: string;
}

export function LiveStorefront({
  sections,
  products,
  slug,
  templateId,
}: LiveStorefrontProps) {
  const { add, count } = useCart();
  const [toast, setToast] = useState<string | null>(null);

  // Dynamic Theme Resolver (Jewellery, Streetwear, Modern, or Git Themes)
  const ActiveTheme = resolveTheme(templateId);

  return (
    <>
      <ActiveTheme
        sections={sections}
        products={products}
        slug={slug}
        onAddToCart={(p) => {
          add({ productId: p.id, name: p.name, image: p.image, price: p.price });
          setToast(`${p.name} added to bag ✓`);
          setTimeout(() => setToast(null), 2000);
        }}
      />

      {/* Floating Universal Cart Access */}
      <Link
        href={`/store/${slug}/cart`}
        className="fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2.5 rounded-full bg-ink px-5 text-sm font-bold text-white shadow-pop transition hover:scale-105 hover:bg-night-soft"
      >
        <Icon name="cart" className="h-4 w-4" />
        <span>Cart</span>
        {count > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-bold text-white shadow-xs">
            {count}
          </span>
        )}
      </Link>

      {/* Real-time Cart Feedback Toast */}
      {toast && (
        <div className="fixed bottom-20 right-5 z-40 flex items-center gap-2 rounded-xl bg-night px-4 py-2.5 text-xs font-semibold text-white shadow-pop animate-fade-up">
          <Icon name="check" className="h-4 w-4 text-[#7BC4A8]" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}

export function ShopTopBar({
  brand,
  slug,
  dark,
}: {
  brand: string;
  slug: string;
  dark?: boolean;
}) {
  const { count } = useCart();
  return (
    <div
      className={`sticky top-0 z-40 border-b ${
        dark ? "border-neutral-800 bg-[#0A0A0A]/90 text-white" : "border-line bg-paper/90 text-ink"
      } backdrop-blur-md`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href={`/store/${slug}`} className="font-display text-base font-bold">
          {brand}
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold text-muted">
          <Link href={`/store/${slug}`} className="hover:text-ink">
            Continue shopping
          </Link>
          <Link
            href={`/store/${slug}/cart`}
            className="relative flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-ink hover:border-ink/20"
          >
            <Icon name="cart" className="h-4 w-4" />
            <span>Cart</span>
            {count > 0 && (
              <span
                className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white"
                style={{ height: 18, minWidth: 18 }}
              >
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}