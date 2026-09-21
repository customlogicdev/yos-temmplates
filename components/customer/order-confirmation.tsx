// src/components/customer/order-confirmation.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/format";

export function OrderConfirmation({
  dbName,
  orderId,
  slug,
}: {
  dbName: string;
  orderId: string;
  slug: string;
}) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId || !dbName) {
      setLoading(false);
      return;
    }

    fetch(`/api/customer/order?id=${orderId}&dbName=${dbName}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId, dbName]);

  if (loading) {
    return (
      <div className="mx-auto max-w-md p-20 text-center">
        <p className="text-[var(--store-muted)]">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-md p-20 text-center">
        <p className="text-[var(--store-muted)]">Order not found</p>
        <Link
          href={`/store/${slug}`}
          className="mt-4 inline-block text-[var(--store-accent)] hover:underline"
        >
          Back to Store →
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-20 text-center">
      <div className="mb-4 text-6xl">✅</div>
      <h1 className="text-3xl font-bold">Order Confirmed!</h1>
      <p className="mt-2 text-[var(--store-muted)]">
        Order #{order.number} ·{" "}
        {new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      <div className="mt-8 rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6 text-left">
        <h3 className="mb-4 font-semibold">Order Details</h3>
        {(order.items || []).map((item: any, i: number) => (
          <div key={i} className="mb-2 flex justify-between text-sm">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>{formatMoney(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="mt-4 flex justify-between border-t border-[var(--store-border)] pt-4 font-bold">
          <span>Total</span>
          <span>{formatMoney(Number(order.total))}</span>
        </div>
      </div>

      <div className="mt-6 text-sm text-[var(--store-muted)]">
        <p>
          Confirmation sent to <strong>{order.customerEmail}</strong>
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href={`/store/${slug}?page=products`}
          className="rounded-full bg-[var(--store-accent)] px-8 py-3 font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
        >
          Continue Shopping
        </Link>
        <Link
          href={`/store/${slug}`}
          className="rounded-full border border-[var(--store-border)] px-8 py-3 font-semibold transition hover:border-[var(--store-accent)]"
        >
          Back to Store
        </Link>
      </div>
    </section>
  );
}