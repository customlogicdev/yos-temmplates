"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { useCart } from "@/components/cart";

interface FashionCartPageProps {
  slug: string;
  store: any;
  customer: any | null;
}

export function FashionCartPage({
  slug,
  store,
  customer,
}: FashionCartPageProps) {
  const props: any = {
    slug,
    basePath: `/store/${slug}`,
    data: { products: [], store },
    storefront: store,
  };

  // ✅ useCart() ka actual shape dekho
  const cart = useCart() as any;

  // ✅ "lines" use karo (jaise FashionLuxeShell karta hai)
  const items: any[] = cart?.lines || cart?.items || [];

  const remove =
    cart?.remove ||
    cart?.removeLine ||
    cart?.removeItem ||
    cart?.deleteLine;

  const updateQty =
    cart?.updateQty ||
    cart?.updateQuantity ||
    cart?.setQty ||
    cart?.setLineQty ||
    cart?.updateLine;

  // ✅ Client-only render (SSR hydration se bachne ke liye)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce(
    (sum, it) =>
      sum + Number(it.price || 0) * Number(it.qty ?? it.quantity ?? 1),
    0
  );

  const isLoggedIn = !!customer;

  const checkoutHref = isLoggedIn
    ? `/store/${slug}/fashion/checkout`
    : `/store/${slug}/fashion/account?redirect=${encodeURIComponent(
        `/store/${slug}/fashion/checkout`
      )}&reason=checkout`;

  if (!mounted) {
    return (
      <TemplateFrame props={props}>
        <FashionLuxeShell props={props} slug={slug}>
          <section className="mx-auto max-w-4xl px-5 py-20 text-center">
            <p className="text-sm text-[#6A6156]">Loading cart…</p>
          </section>
        </FashionLuxeShell>
      </TemplateFrame>
    );
  }

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-4xl px-5 py-20">
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
              Your Bag
            </p>
            <h1 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3rem)] leading-[1] tracking-[-0.03em] text-[#1A1815]">
              Shopping <span className="italic">Cart</span>
            </h1>
          </div>

          {items.length === 0 ? (
            <div className="border border-[#E5DED2] bg-white px-6 py-16 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-[#B8935A]" />
              <p className="mt-4 text-sm text-[#6A6156]">
                Your cart is empty.
              </p>
              <Link
                href={`/store/${slug}/fashion/shop`}
                className="mt-6 inline-flex items-center gap-3 bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition hover:bg-[#B8935A]"
              >
                Continue shopping
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="border border-[#E5DED2] bg-white">
              {items.map((item: any, i: number) => {
                const qty = item.qty ?? item.quantity ?? 1;
                const price = Number(item.price || 0);
                const itemId = item.id || item.lineId || item.productId;

                return (
                  <div
                    key={itemId || i}
                    className="flex items-center gap-4 border-b border-[#F0EAE0] px-6 py-4 last:border-b-0"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name || item.title || ""}
                        className="h-20 w-16 shrink-0 object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1A1815]">
                        {item.name || item.title}
                      </p>
                      <p className="mt-1 text-xs text-[#6A6156]">
                        ₹{price.toLocaleString("en-IN")}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() => updateQty?.(itemId, qty - 1)}
                          className="h-7 w-7 border border-[#E5DED2] text-sm"
                        >
                          −
                        </button>
                        <span className="text-sm">{qty}</span>
                        <button
                          onClick={() => updateQty?.(itemId, qty + 1)}
                          className="h-7 w-7 border border-[#E5DED2] text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1A1815]">
                        ₹{(price * qty).toLocaleString("en-IN")}
                      </p>
                      {remove && (
                        <button
                          onClick={() => remove(itemId)}
                          className="mt-2 text-[#8F6E3D] hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="border-t border-[#E5DED2] bg-[#FAF7F2] px-6 py-5">
                <div className="flex items-center justify-between text-base font-bold text-[#1A1815]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <Link
                  href={checkoutHref}
                  className="mt-5 flex w-full items-center justify-center gap-3 bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition hover:bg-[#B8935A]"
                >
                  {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}