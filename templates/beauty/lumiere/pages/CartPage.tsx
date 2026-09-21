// src/templates/beauty/lumiere/pages/CartPage.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
} from "lucide-react";

export function LumiereCartPage({ slug, customer }: any) {
  const base = `/store/${slug}`;
  const { lines, subtotal, setQty, remove } = useCart();

  const shipping = subtotal === 0 || subtotal > 1499 ? 0 : 99;
  const total = subtotal + shipping;

  const checkoutHref = customer
    ? `${base}?page=checkout`
    : `${base}?page=account-login&redirect=${encodeURIComponent(
        `${base}?page=checkout`
      )}`;

  // Empty state
  if (lines.length === 0) {
    return (
      <section className="min-h-screen bg-[#FAF7F5]">
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5]">
            <ShoppingBag className="h-10 w-10 text-white" strokeWidth={1.8} />
          </div>
          <h1 className="mt-8 font-serif text-3xl font-normal italic tracking-tight text-[#1F1B24]">
            Your bag is empty
          </h1>
          <p className="mt-3 text-sm text-[#1F1B24]/60">
            Start your glow ritual — add products to your bag.
          </p>
          <Link
            href={`${base}?page=products`}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1F1B24] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-105 hover:bg-[#B76E79]"
          >
            Start shopping
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF7F5]">
      {/* Header */}
      <div className="border-b border-[#E8DDD5] bg-gradient-to-br from-[#FAF7F5] via-[#FFE5E9]/30 to-[#F5E6D3]/40">
        <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            / Cart
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal italic leading-[0.95] tracking-tight text-[#1F1B24]">
            Your <span className="text-[#B76E79]">ritual</span> bag
          </h1>
          <p className="mt-4 text-sm text-[#1F1B24]/50">
            {lines.length} item{lines.length > 1 ? "s" : ""} · Ready to glow
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Items */}
          <div className="space-y-4">
            {lines.map((item, i) => (
              <div
                key={`${item.productId}-${i}`}
                className="flex gap-5 rounded-3xl border border-[#E8DDD5] bg-white p-5 shadow-sm transition hover:shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-24 shrink-0 rounded-2xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
                      Item {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1.5 font-serif text-base italic text-[#1F1B24]">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-[#E8DDD5]">
                      <button
                        onClick={() =>
                          setQty(item.productId, item.variant, item.qty - 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#1F1B24]/60 transition hover:bg-rose-50 hover:text-[#B76E79]"
                      >
                        <Minus className="h-3 w-3" strokeWidth={2.6} />
                      </button>
                      <span className="w-9 text-center text-sm font-bold text-[#1F1B24]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          setQty(item.productId, item.variant, item.qty + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#1F1B24]/60 transition hover:bg-rose-50 hover:text-[#B76E79]"
                      >
                        <Plus className="h-3 w-3" strokeWidth={2.6} />
                      </button>
                    </div>

                    <p className="text-base font-bold text-[#1F1B24]">
                      {formatMoney(item.price * item.qty)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => remove(item.productId, item.variant)}
                  className="self-start rounded-full p-2 text-[#1F1B24]/40 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            ))}

            {/* Trust row */}
            <div className="mt-6 grid grid-cols-3 gap-4 rounded-3xl border border-[#E8DDD5] bg-white p-6">
              {[
                { Icon: Truck, label: "Free shipping ₹1499+" },
                { Icon: ShieldCheck, label: "Secure checkout" },
                { Icon: Sparkles, label: "Free samples" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Icon className="h-5 w-5 text-[#B76E79]" strokeWidth={1.8} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1F1B24]/50">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl border border-[#E8DDD5] bg-white p-7 shadow-lg shadow-rose-100/40">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
                / Summary
              </p>
              <h3 className="mt-3 font-serif text-xl italic tracking-tight text-[#1F1B24]">
                Order total
              </h3>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#1F1B24]/60">Subtotal</span>
                  <span className="font-semibold text-[#1F1B24]">
                    {formatMoney(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1F1B24]/60">Shipping</span>
                  <span className="font-semibold text-[#1F1B24]">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatMoney(shipping)
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 p-3 text-xs text-[#B76E79]">
                    <Sparkles className="mr-1 inline h-3 w-3" strokeWidth={2} />
                    Add {formatMoney(1500 - subtotal)} more for free shipping
                  </div>
                )}

                <div className="flex justify-between border-t border-[#E8DDD5] pt-4">
                  <span className="font-serif text-base italic text-[#1F1B24]">
                    Total
                  </span>
                  <span className="font-serif text-lg font-bold text-[#1F1B24]">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>

              <Link
                href={checkoutHref}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1F1B24] py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-[1.02] hover:bg-[#B76E79]"
              >
                Proceed to checkout
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>

              <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1F1B24]/40">
                Free shipping over ₹1499
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}