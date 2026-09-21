// templates/grocery/fresh/pages/CheckoutPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { ChevronLeft, Lock, Loader2, Clock, Leaf } from "lucide-react";

export function GroceryCheckoutPage({ slug, store, customer, basePath }: any) {
  const base = basePath || `/${slug}`;
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slot, setSlot] = useState("morning");

  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const slots = [
    { id: "morning", label: "Morning", time: "7 AM - 11 AM" },
    { id: "afternoon", label: "Afternoon", time: "12 PM - 4 PM" },
    { id: "evening", label: "Evening", time: "5 PM - 9 PM" },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 🎯 Demo mode — fake submit (no DB)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clear();
    router.push(`${base}?page=home`);

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12">
      <Link
        href={`${base}?page=cart`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-700 hover:text-green-900"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to Cart
      </Link>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5">
          <Leaf className="h-3.5 w-3.5 text-green-700" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-700">
            Fresh Checkout
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-green-900">
          Almost there
        </h1>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact */}
          <div className="rounded-3xl border border-green-100 bg-white p-6">
            <h2 className="text-lg font-black text-green-900">1. Contact</h2>
            <div className="mt-4 space-y-3">
              <input
                name="name"
                required
                defaultValue={customer?.name || ""}
                placeholder="Full Name"
                className="w-full rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
              <input
                name="email"
                type="email"
                required
                defaultValue={customer?.email || ""}
                placeholder="Email"
                className="w-full rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
              <input
                name="phone"
                required
                defaultValue={customer?.phone || ""}
                placeholder="Phone"
                className="w-full rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
            </div>
          </div>

          {/* Delivery Slot */}
          <div className="rounded-3xl border border-green-100 bg-white p-6">
            <h2 className="text-lg font-black text-green-900">2. Delivery Slot</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {slots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlot(s.id)}
                  className={`rounded-2xl border-2 p-4 text-center transition ${
                    slot === s.id
                      ? "border-green-500 bg-green-50"
                      : "border-green-100 bg-white hover:border-green-300"
                  }`}
                >
                  <Clock
                    className={`mx-auto h-5 w-5 ${
                      slot === s.id ? "text-green-600" : "text-slate-400"
                    }`}
                  />
                  <p className="mt-2 text-xs font-bold text-slate-900">{s.label}</p>
                  <p className="mt-1 text-[10px] text-slate-500">{s.time}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="rounded-3xl border border-green-100 bg-white p-6">
            <h2 className="text-lg font-black text-green-900">3. Address</h2>
            <div className="mt-4 space-y-3">
              <input
                name="line1"
                required
                placeholder="Address Line 1"
                className="w-full rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
              <input
                name="line2"
                placeholder="Address Line 2"
                className="w-full rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  name="city"
                  required
                  defaultValue={customer?.city || ""}
                  placeholder="City"
                  className="rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
                />
                <input
                  name="state"
                  required
                  placeholder="State"
                  className="rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
                />
                <input
                  name="pincode"
                  required
                  placeholder="Pincode"
                  className="rounded-2xl border border-green-200 bg-green-50/30 px-4 py-3 text-sm outline-none focus:border-green-500"
                />
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
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-sm font-black uppercase tracking-wider text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Pay {formatMoney(total)}
              </>
            )}
          </button>
        </form>

        {/* Summary */}
        <div className="h-fit rounded-3xl border border-green-100 bg-white p-6 lg:sticky lg:top-24">
          <h3 className="text-lg font-black text-green-900">Your Order</h3>

          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
            {lines.map((item, i) => (
              <div key={i} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-500">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-bold text-green-700">
                  {formatMoney(item.price * item.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2.5 border-t border-green-100 pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Delivery</span>
              <span className="font-bold">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  formatMoney(shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between border-t border-green-100 pt-3 text-lg">
              <span className="font-black text-green-900">Total</span>
              <span className="font-black text-green-700">{formatMoney(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}