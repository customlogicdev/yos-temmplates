// src/components/customer/register-form.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerCustomerAction } from "@/lib/customer-actions";

export function RegisterForm({
  dbName,
  storeId,
  slug,
  storeName,
}: {
  dbName: string;
  storeId: string;
  slug: string;
  storeName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const res = await registerCustomerAction(dbName, storeId, slug, fd);

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push(`/store/${slug}/account`);
      router.refresh();
    }
  }

  return (
    <section className="mx-auto max-w-md px-5 py-20">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
        <p className="text-sm text-[var(--store-muted)]">
          Join {storeName}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--store-muted)]">
            Full Name
          </label>
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--store-muted)]">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--store-muted)]">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Min 6 characters"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 outline-none focus:border-[var(--store-accent)]"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[var(--store-accent)] py-3.5 font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--store-muted)]">
        Already have an account?{" "}
        <Link
          href={`/store/${slug}/account/login`}
          className="font-semibold text-[var(--store-accent)] hover:underline"
        >
          Login
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-[var(--store-muted)]">
        <Link
          href={`/store/${slug}`}
          className="hover:text-[var(--store-accent)]"
        >
          ← Back to store
        </Link>
      </p>
    </section>
  );
}