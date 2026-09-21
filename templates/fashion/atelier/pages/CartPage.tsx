// src/templates/fashion/atelier/pages/CartPage.tsx

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
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export function AtelierCartPage({ slug, customer }: any) {
  const base = `/store/${slug}`;
  const { lines, subtotal, setQty, remove } = useCart();

  const shipping = subtotal === 0 || subtotal > 2999 ? 0 : 199;
  const total = subtotal + shipping;

  const checkoutHref = customer
    ? `${base}?page=checkout`
    : `${base}?page=account&redirect=${encodeURIComponent(
        `${base}?page=checkout`
      )}&reason=checkout`;

  // ─── EMPTY STATE ───
  if (lines.length === 0) {
    return (
      <section className="min-h-screen bg-[#FAFAF9]">
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-pink-100">
            <ShoppingBag className="h-10 w-10 text-indigo-600" strokeWidth={1.8} />
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900">
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            Nothing in the bag. Start exploring the collection.
          </p>
          <Link
            href={`${base}?page=products`}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-105"
          >
            Start shopping
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      </section>
    );
  }

  // ─── CART WITH ITEMS ───
  return (
    <section className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <div className="border-b border-zinc-200/60 bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            / Cart
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-zinc-900">
            Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent italic">
              Bag
            </span>
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            {lines.length} item{lines.length > 1 ? "s" : ""} · Ready to ship
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
                className="flex gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-24 shrink-0 rounded-2xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                      Item {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1.5 text-sm font-semibold text-zinc-900">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Qty */}
                    <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50">
                      <button
                        onClick={() =>
                          setQty(item.productId, item.variant, item.qty - 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:bg-white hover:text-zinc-900"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3 w-3" strokeWidth={2.6} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-zinc-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          setQty(item.productId, item.variant, item.qty + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:bg-white hover:text-zinc-900"
                        aria-label="Increase"
                      >
                        <Plus className="h-3 w-3" strokeWidth={2.6} />
                      </button>
                    </div>

                    <p className="text-sm font-bold text-zinc-900">
                      {formatMoney(item.price * item.qty)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => remove(item.productId, item.variant)}
                  className="self-start rounded-full p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            ))}

            {/* Trust Row */}
            <div className="mt-6 grid grid-cols-3 gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
              {[
                { Icon: Truck, label: "Free shipping ₹2999+" },
                { Icon: RotateCcw, label: "30-day returns" },
                { Icon: ShieldCheck, label: "Secure checkout" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="h-5 w-5 text-indigo-600" strokeWidth={1.8} />
                  <span className="text-[11px] font-medium text-zinc-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                / Summary
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900">
                Order total
              </h3>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">
                    {formatMoney(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-zinc-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      formatMoney(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-4">
                  <span className="text-base font-bold text-zinc-900">Total</span>
                  <span className="text-lg font-bold text-zinc-900">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>

              <Link
                href={checkoutHref}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-[1.02] hover:bg-zinc-800"
              >
                Proceed to checkout
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>

              <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                Free shipping over ₹2999
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}