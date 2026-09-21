// src/templates/beauty/glow/pages/CartPage.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { BeautyShell } from "../layout/Shell";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";

export function BeautyCartPage({ slug, store }: any) {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const [removing, setRemoving] = useState<string | null>(null);

  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);

  const handleRemove = (productId: string, variant?: string) => {
    setRemoving(`${productId}-${variant || ""}`);
    setTimeout(() => {
      remove(productId, variant);
      setRemoving(null);
    }, 300);
  };

  return (
    <BeautyShell
      props={{ data: { store }, basePath: `/store/${slug}` }}
      slug={slug}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-pink-500">
            Your Bag
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#2A2438]">
            Your <span className="italic text-pink-500">ritual</span> bag
          </h1>
          <p className="mt-4 text-sm text-[#2A2438]/60">
            {itemCount} {itemCount === 1 ? "item" : "items"} ready to glow
          </p>
        </div>

        {/* Empty state */}
        {lines.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-pink-200 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
              <ShoppingBag className="h-8 w-8 text-pink-400" strokeWidth={1.5} />
            </div>
            <p className="mt-6 text-sm text-[#2A2438]/60">
              Your bag is empty — time to treat yourself.
            </p>
            <Link
              href={`/store/${slug}/beauty/shop`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2A2438] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-pink-500"
            >
              Start Shopping
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Cart items */}
            <div className="space-y-4">
              {lines.map((item, index) => {
                const key = `${item.productId}-${item.variant || ""}`;
                const isRemoving = removing === key;

                return (
                  <div
                    key={key}
                    className={`group relative flex gap-5 rounded-2xl border border-pink-100 bg-white p-5 transition-all duration-300 ${
                      isRemoving
                        ? "translate-x-full opacity-0"
                        : "translate-x-0 opacity-100"
                    }`}
                  >
                    <Link
                      href={`/store/${slug}/beauty/product/${item.productId}`}
                      className="shrink-0 overflow-hidden rounded-xl bg-pink-50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/store/${slug}/beauty/product/${item.productId}`}
                          className="font-serif text-base text-[#2A2438] hover:text-pink-500"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="mt-1 text-xs text-[#2A2438]/50">
                            {item.variant}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-pink-200">
                          <button
                            onClick={() =>
                              setQty(item.productId, item.variant, item.qty - 1)
                            }
                            className="p-2 text-[#2A2438]/60 transition hover:text-pink-500"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              setQty(item.productId, item.variant, item.qty + 1)
                            }
                            className="p-2 text-[#2A2438]/60 transition hover:text-pink-500"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <p className="font-medium text-[#2A2438]">
                          {formatMoney(item.price * item.qty)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item.productId, item.variant)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[#2A2438]/40 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}

              {/* Clear cart */}
              <button
                onClick={clear}
                className="text-xs uppercase tracking-[0.15em] text-[#2A2438]/50 hover:text-red-500"
              >
                Clear bag
              </button>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-3xl border border-pink-100 bg-white p-7">
                <h3 className="font-serif text-lg text-[#2A2438]">
                  Order Summary
                </h3>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#2A2438]/60">Subtotal</span>
                    <span className="font-medium text-[#2A2438] tabular-nums">
                      {formatMoney(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2A2438]/60">Shipping</span>
                    <span className="font-medium tabular-nums">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatMoney(shipping)
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="rounded-xl bg-pink-50 p-3 text-xs text-pink-600">
                      <Sparkles className="mr-1 inline h-3 w-3" />
                      Add {formatMoney(1000 - subtotal)} more for free shipping!
                    </div>
                  )}

                  <div className="flex justify-between border-t border-pink-100 pt-4 text-base">
                    <span className="font-serif text-[#2A2438]">Total</span>
                    <span className="font-serif text-[#2A2438] tabular-nums">
                      {formatMoney(total)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/store/${slug}/beauty/checkout`}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#2A2438] py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-pink-500"
                >
                  Proceed to Checkout
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>

                {/* Trust badges */}
                <div className="mt-6 space-y-2.5 border-t border-pink-100 pt-6">
                  <div className="flex items-center gap-2.5 text-xs text-[#2A2438]/60">
                    <Truck className="h-3.5 w-3.5 text-pink-500" strokeWidth={2} />
                    <span>Free shipping on orders above ₹999</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#2A2438]/60">
                    <ShieldCheck className="h-3.5 w-3.5 text-pink-500" strokeWidth={2} />
                    <span>Secure payment · 100% encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BeautyShell>
  );
}