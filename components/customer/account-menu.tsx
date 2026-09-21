// components/customer/account-menu.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function AccountMenu({
  slug,
  basePath,
}: {
  slug?: string;
  basePath: string;
}) {
  const [customer, setCustomer] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    fetch(`/api/customer/me?slug=${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        // ✅ API returns { customer: {...} } | { customer: null }
        setCustomer(data?.customer || null);
      })
      .catch(() => setCustomer(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (!slug || loading) return null;

  // ✅ Logged in — show account
  if (customer && customer.name) {
    return (
      <Link
        href={`${basePath}?page=account`}
        className="hidden items-center gap-2 rounded-full border border-[var(--store-border)] px-4 py-2 text-sm transition hover:bg-[var(--store-surface)] md:flex"
      >
        👤 {customer.name.split(" ")[0] || "Account"}
      </Link>
    );
  }

  // ✅ Not logged in — show login
  return (
    <Link
      href={`${basePath}?page=account-login`}
      className="hidden rounded-full border border-[var(--store-border)] px-4 py-2 text-sm transition hover:bg-[var(--store-surface)] md:flex"
    >
      Login
    </Link>
  );
}