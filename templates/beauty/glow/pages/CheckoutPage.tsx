// src/templates/beauty/glow/pages/CheckoutPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BeautyShell } from "../layout/Shell";
import { useCart } from "@/components/cart";
import { createOrderAction } from "@/lib/order-actions";
import { formatMoney } from "@/lib/format";
import {
  ChevronLeft,
  Lock,
  Sparkles,
  CreditCard,
  Loader2,
  ArrowRight,
} from "lucide-react";

export function BeautyCheckoutPage({ slug, store, customer }: any) {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);

    try {
      const res = await createOrderAction({
        dbName: store.dbName,
        storeId: store.id,
        slug,
        customerName: String(fd.get("name")),
        customerEmail: String(fd.get("email")),
        items: lines,
        subtotal,
        shipping,
        discount: 0,
        total,
        address: {
          line1: String(fd.get("line1")),
          line2: String(fd.get("line2") || ""),
          city: String(fd.get("city")),
          state: String(fd.get("state")),
          pincode: String(fd.get("pincode")),
          phone: String(fd.get("phone")),
        },
      });

      // ✅ Type-safe access
      const typedRes = res as {
        success?: boolean;
        orderId?: string;
        orderNumber?: number;
        error?: string;
      };

      if (typedRes?.success && typedRes.orderId) {
        clear();
        router.push(`/store/${slug}/beauty/order/${typedRes.orderId}`);
      } else {
        setError(typedRes?.error || "Something went wrong");
      }
    } catch (err: any) {
      console.error("[Checkout Error]:", err);
      setError(err?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  // Empty cart state
  if (lines.length === 0) {
    return (
      <BeautyShell
        props={{ data: { store }, basePath: `/store/${slug}` }}
        slug={slug}
      >
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="font-serif text-2xl text-[#2A2438]">
            Nothing to checkout
          </h1>
          <p className="mt-3 text-sm text-[#2A2438]/60">
            Add some products to your bag first.
          </p>
          <Link
            href={`/store/${slug}/beauty/shop`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2A2438] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-pink-500"
          >
            Start Shopping
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </BeautyShell>
    );
  }

  return (
    <BeautyShell
      props={{ data: { store }, basePath: `/store/${slug}` }}
      slug={slug}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* Back */}
        <Link
          href={`/store/${slug}/beauty/cart`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#2A2438]/50 hover:text-pink-500"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to Bag
        </Link>

        {/* Header */}
        <div className="mt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-pink-500">
            Checkout
          </p>
          <h1 className="mt-3 font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight tracking-tight text-[#2A2438]">
            Almost <span className="italic text-pink-500">glowing</span>
          </h1>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 font-serif text-sm text-pink-600">
                  1
                </div>
                <h2 className="font-serif text-lg text-[#2A2438]">Contact</h2>
              </div>

              <div className="mt-5 space-y-4">
                <input
                  name="name"
                  required
                  defaultValue={customer?.name || ""}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                />
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={customer?.email || ""}
                  placeholder="Email"
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                />
                <input
                  name="phone"
                  required
                  defaultValue={customer?.phone || ""}
                  placeholder="Phone"
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 font-serif text-sm text-pink-600">
                  2
                </div>
                <h2 className="font-serif text-lg text-[#2A2438]">Shipping</h2>
              </div>

              <div className="mt-5 space-y-4">
                <input
                  name="line1"
                  required
                  placeholder="Address Line 1"
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                />
                <input
                  name="line2"
                  placeholder="Address Line 2 (optional)"
                  className="w-full rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    name="city"
                    required
                    defaultValue={customer?.city || ""}
                    placeholder="City"
                    className="rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                  />
                  <input
                    name="state"
                    required
                    placeholder="State"
                    className="rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                  />
                  <input
                    name="pincode"
                    required
                    placeholder="Pincode"
                    className="rounded-xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-sm outline-none transition focus:border-pink-400 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-pink-100 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 font-serif text-sm text-pink-600">
                  3
                </div>
                <h2 className="font-serif text-lg text-[#2A2438]">Payment</h2>
              </div>

              <div className="mt-5 rounded-xl border border-pink-100 bg-pink-50/50 p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-pink-500" strokeWidth={1.8} />
                  <div>
                    <p className="text-sm font-medium text-[#2A2438]">
                      Demo Payment
                    </p>
                    <p className="text-xs text-[#2A2438]/60">
                      This is a demo — no real payment will be charged
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2A2438] py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-pink-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Pay {formatMoney(total)}
                </>
              )}
            </button>

            <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#2A2438]/50">
              <Lock className="h-3 w-3" strokeWidth={2.5} />
              Secure checkout
            </p>
          </form>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-pink-100 bg-white p-7">
              <h3 className="font-serif text-lg text-[#2A2438]">Your Order</h3>

              <div className="mt-5 max-h-64 space-y-3 overflow-y-auto">
                {lines.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-[#2A2438]">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#2A2438]/50">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <p className="text-xs font-medium tabular-nums text-[#2A2438]">
                      {formatMoney(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2.5 border-t border-pink-100 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#2A2438]/60">Subtotal</span>
                  <span className="font-medium tabular-nums">
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
                <div className="flex justify-between border-t border-pink-100 pt-3 text-base">
                  <span className="font-serif text-[#2A2438]">Total</span>
                  <span className="font-serif text-[#2A2438] tabular-nums">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-pink-50 p-3">
                <Sparkles
                  className="mt-0.5 h-4 w-4 shrink-0 text-pink-500"
                  strokeWidth={2}
                />
                <p className="text-xs leading-relaxed text-pink-700">
                  All products are vegan, cruelty-free, and dermatologist-tested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BeautyShell>
  );
}