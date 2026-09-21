// src/templates/kit/pages/AccountPage.tsx

"use client";

import Link from "next/link";

interface CommonAccountPageProps {
  slug: string;
  store: any;
  customer?: any;
}

export function CommonAccountPage({
  slug,
  store,
  customer,
}: CommonAccountPageProps) {
  const basePath = `/store/${slug}`;

  if (!customer) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center lg:py-32">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[var(--store-border)] bg-[var(--store-surface)]">
          <span className="text-3xl">👤</span>
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
          Your Account
        </p>
        <h1 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.03em]">
          Sign in to <span className="italic">continue</span>
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={`${basePath}/account/login`}
            className="inline-flex items-center gap-3 bg-[var(--store-accent)] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--store-accent-fg)]"
          >
            Sign in →
          </Link>
          <Link
            href={`${basePath}/account/register`}
            className="inline-flex items-center gap-3 border border-[var(--store-fg)] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--store-fg)]"
          >
            Create account
          </Link>
        </div>
      </section>
    );
  }

  const menu = [
    { href: `${basePath}/account/orders`, emoji: "📦", label: "My Orders", desc: "Track past purchases" },
    { href: `${basePath}/account/wishlist`, emoji: "❤️", label: "Wishlist", desc: "Your saved items" },
    { href: `${basePath}/account/addresses`, emoji: "📍", label: "Addresses", desc: "Delivery preferences" },
    { href: `${basePath}/account/settings`, emoji: "⚙️", label: "Settings", desc: "Profile and preferences" },
  ];

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-24">
      <div className="border-b border-[var(--store-border)] pb-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
          Your Account
        </p>
        <h1 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.03em]">
          Hello,{" "}
          <span className="italic text-[var(--store-accent)]">
            {customer.name?.split(" ")[0] || "there"}
          </span>
        </h1>
        {customer.email && (
          <p className="mt-3 text-sm text-[var(--store-muted)]">
            📧 {customer.email}
          </p>
        )}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {menu.map(({ href, emoji, label, desc }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-  start gap-5 rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-7 transition hover:-translate-y-1 hover:border-[var(--store-accent)] hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--store-border)] text-2xl">
              <span>{emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-[family-name:var(--store-display)] text-lg">
                {label}
              </h3>
              <p className="mt-1 text-xs text-[var(--store-muted)]">{desc}</p>
            </div>
            <span className="text-[var(--store-muted)] group-hover:text-[var(--store-accent)]">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}