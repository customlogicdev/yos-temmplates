// src/components/customer/account-page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AccountPage({
  dbName,
  slug,
}: {
  dbName: string;
  slug: string;
}) {
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    fetch(`/api/customer/me?slug=${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) {
          router.push(`/store/${slug}?page=login`);
        } else {
          setCustomer(data);
        }
      })
      .catch(() => {
        router.push(`/store/${slug}?page=login`);
      })
      .finally(() => setLoading(false));
  }, [slug, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-md p-20 text-center">
        <p className="text-[var(--store-muted)]">Loading...</p>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <div className="flex items-center justify-between border-b border-[var(--store-border)] pb-6">
        <div>
          <h1 className="text-3xl font-bold">Hi, {customer.name}</h1>
          <p className="mt-1 text-sm text-[var(--store-muted)]">
            {customer.email}
          </p>
        </div>
        <button
          onClick={async () => {
            // Simple logout — just redirect, cookie clear manually
            document.cookie = `customer_session_${slug}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            router.push(`/store/${slug}`);
            router.refresh();
          }}
          className="rounded-full border border-[var(--store-border)] px-5 py-2 text-sm font-semibold transition hover:border-red-500 hover:text-red-500"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6">
          <p className="text-xs uppercase tracking-wider text-[var(--store-muted)]">
            Total Orders
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            {customer.ordersCount || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6">
          <p className="text-xs uppercase tracking-wider text-[var(--store-muted)]">
            Total Spent
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            ₹{Number(customer.totalSpent || 0).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/store/${slug}?page=products`}
          className="rounded-full bg-[var(--store-accent)] px-6 py-2.5 text-sm font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
        >
          Continue Shopping
        </Link>
        <Link
          href={`/store/${slug}`}
          className="rounded-full border border-[var(--store-border)] px-6 py-2.5 text-sm font-semibold transition hover:border-[var(--store-accent)]"
        >
          Back to Store
        </Link>
      </div>
    </section>
  );
}