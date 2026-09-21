// src/components/customer/checkout-form.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { createOrderAction } from "@/lib/order-actions";
import { formatMoney } from "@/lib/format";

export function CheckoutForm({
  dbName,
  storeId,
  slug,
  customer,
}: any) {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    await new Promise((r) => setTimeout(r, 1200));

    try {
      const res = await createOrderAction({
        dbName,
        storeId,
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

      if (res.success) {
        clear();
        router.push(`/store/${slug}/order/${res.orderId}`);
      } else {
        setError("Order creation failed");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Cart is empty</h1>
        <Link
          href={`/store/${slug}?page=products`}
          className="text-[var(--store-accent)] hover:underline"
        >
          Continue shopping →
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {!customer && (
        <div className="mb-6 rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-4 flex items-center justify-between">
          <p className="text-sm text-[var(--store-muted)]">
            Have an account? Login for faster checkout.
          </p>
          <Link
            href={`/store/${slug}/account/login`}
            className="text-sm font-semibold text-[var(--store-accent)] hover:underline"
          >
            Login →
          </Link>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-semibold">Contact</h2>
          <input
            name="name"
            required
            defaultValue={customer?.name || ""}
            placeholder="Full Name"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />
          <input
            name="email"
            type="email"
            required
            defaultValue={customer?.email || ""}
            placeholder="Email"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />
          <input
            name="phone"
            required
            defaultValue={customer?.phone || ""}
            placeholder="Phone"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />

          <h2 className="font-semibold pt-4">Shipping Address</h2>
          <input
            name="line1"
            required
            placeholder="Address Line 1"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />
          <input
            name="line2"
            placeholder="Address Line 2 (optional)"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              name="city"
              required
              defaultValue={customer?.city || ""}
              placeholder="City"
              className="rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
            />
            <input
              name="state"
              required
              placeholder="State"
              className="rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
            />
            <input
              name="pincode"
              required
              placeholder="Pincode"
              className="rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-[var(--store-accent)] py-4 font-semibold text-[var(--store-accent-fg)] hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Processing..." : `Pay ${formatMoney(total)}`}
          </button>
        </form>

        <div className="rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6 h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          {lines.map((l) => (
            <div key={l.productId} className="flex justify-between text-sm mb-2">
              <span>{l.name} × {l.qty}</span>
              <span>{formatMoney(l.price * l.qty)}</span>
            </div>
          ))}
          <div className="border-t border-[var(--store-border)] mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-[var(--store-border)] pt-2">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}