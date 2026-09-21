// templates/beauty/lumiere/pages/CheckoutPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import {
  ChevronLeft,
  Lock,
  Sparkles,
  Loader2,
  CreditCard,
  ArrowRight,
} from "lucide-react";

export function LumiereCheckoutPage({ slug, store, customer, basePath }: any) {
  const base = basePath || `/${slug}`;
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal === 0 || subtotal > 1499 ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 🎯 Demo mode — fake submit (no DB)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clear();
    router.push(`${base}?page=home`);

    setLoading(false);
  };

  if (lines.length === 0) {
    return (
      <section className="min-h-screen bg-[#FAF7F5]">
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <h1 className="font-serif text-3xl font-normal italic text-[#1F1B24]">
            Nothing to checkout
          </h1>
          <p className="mt-3 text-sm text-[#1F1B24]/60">
            Add products to your bag first.
          </p>
          <Link
            href={`${base}?page=products`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1F1B24] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B76E79]"
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
      <div className="mx-auto max-w-[1200px] px-5 py-12 lg:px-10">
        <Link
          href={`${base}?page=cart`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1B24]/50 transition hover:text-[#B76E79]"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
          Back to cart
        </Link>

        {/* Header */}
        <div className="mt-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            Checkout
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-normal italic leading-tight tracking-tight text-[#1F1B24]">
            Almost <span className="text-[#B76E79]">glowing</span>
          </h1>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact */}
            <div className="rounded-3xl border border-[#E8DDD5] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5] font-serif text-xs italic text-white">
                  1
                </div>
                <h2 className="font-serif text-lg italic text-[#1F1B24]">
                  Contact
                </h2>
              </div>
              <div className="mt-5 space-y-3">
                <input
                  name="name"
                  required
                  defaultValue={customer?.name || ""}
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                />
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={customer?.email || ""}
                  placeholder="Email"
                  className="w-full rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                />
                <input
                  name="phone"
                  required
                  defaultValue={customer?.phone || ""}
                  placeholder="Phone"
                  className="w-full rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-3xl border border-[#E8DDD5] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5] font-serif text-xs italic text-white">
                  2
                </div>
                <h2 className="font-serif text-lg italic text-[#1F1B24]">
                  Shipping
                </h2>
              </div>
              <div className="mt-5 space-y-3">
                <input
                  name="line1"
                  required
                  placeholder="Address Line 1"
                  className="w-full rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                />
                <input
                  name="line2"
                  placeholder="Address Line 2 (optional)"
                  className="w-full rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    name="city"
                    required
                    defaultValue={customer?.city || ""}
                    placeholder="City"
                    className="rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                  />
                  <input
                    name="state"
                    required
                    placeholder="State"
                    className="rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                  />
                  <input
                    name="pincode"
                    required
                    placeholder="Pincode"
                    className="rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl border border-[#E8DDD5] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5] font-serif text-xs italic text-white">
                  3
                </div>
                <h2 className="font-serif text-lg italic text-[#1F1B24]">
                  Payment
                </h2>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] p-4">
                <CreditCard className="h-5 w-5 text-[#B76E79]" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-semibold text-[#1F1B24]">
                    Demo Payment
                  </p>
                  <p className="text-xs text-[#1F1B24]/60">
                    No real payment will be charged
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1F1B24] py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-[1.02] hover:bg-[#B76E79] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" strokeWidth={2.4} />
                  Pay {formatMoney(total)}
                </>
              )}
            </button>

            <p className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1F1B24]/40">
              <Lock className="h-3 w-3" strokeWidth={2.4} />
              Secure checkout
            </p>
          </form>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl border border-[#E8DDD5] bg-white p-7 shadow-lg shadow-rose-100/40">
              <h3 className="font-serif text-lg italic text-[#1F1B24]">
                Your order
              </h3>

              <div className="mt-5 max-h-64 space-y-3 overflow-y-auto">
                {lines.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#1F1B24]">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#1F1B24]/50">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#1F1B24]">
                      {formatMoney(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2.5 border-t border-[#E8DDD5] pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#1F1B24]/60">Subtotal</span>
                  <span className="font-semibold">{formatMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1F1B24]/60">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatMoney(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E8DDD5] pt-3">
                  <span className="font-serif text-base italic">Total</span>
                  <span className="font-serif text-lg font-bold">
                    {formatMoney(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 p-4">
                <Sparkles
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#B76E79]"
                  strokeWidth={2}
                />
                <p className="text-xs leading-relaxed text-[#B76E79]">
                  All products are vegan, cruelty-free, and dermatologist-tested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}