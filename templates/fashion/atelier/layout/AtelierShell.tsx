// src/templates/fashion/atelier/layout/AtelierShell.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
  Sparkles,
  ArrowRight,
  Send,
  MessageCircle,
  Play,
  Heart,
} from "lucide-react";
import { useCart } from "@/components/cart";

interface ShellProps {
  children: React.ReactNode;
  props: any;
  slug: string;
}

export function AtelierShell({ children, props, slug }: ShellProps) {
  const store = props?.data?.store || {};
  const brandTitle = store.name || "ATELIER";
  const basePath = `/store/${slug}`;

  const { lines } = useCart();
  const cartCount = lines.reduce(
    (sum: number, l: any) => sum + (l.qty ?? l.quantity ?? 1),
    0
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { label: "Shop", href: `${basePath}?page=products` },
    { label: "New In", href: `${basePath}?page=products` },
    { label: "Journal", href: `${basePath}?page=about` },
    { label: "Contact", href: `${basePath}?page=contact` },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#18181B] antialiased">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-2.5 text-xs">
          <span className="flex items-center gap-2 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            New Season · Free shipping over ₹2999
          </span>
          <span className="hidden md:inline opacity-90">
            SS26 Collection Available Now
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-10">
          {/* Logo */}
          <Link href={basePath} className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition group-hover:scale-105">
              <span className="text-lg font-black">
                {brandTitle[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900">
              {brandTitle}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-pink-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`${basePath}?page=search`}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 sm:flex"
              aria-label="Search"
            >
              <Search className="h-4 w-4" strokeWidth={2.4} />
            </Link>
            <button
              className="hidden h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" strokeWidth={2.4} />
            </button>
            <Link
              href={`${basePath}?page=account`}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="Account"
            >
              <User className="h-4 w-4" strokeWidth={2.4} />
            </Link>

            <Link
              href={`${basePath}?page=cart`}
              className="relative flex h-10 items-center gap-2 rounded-full bg-zinc-900 px-5 text-white shadow-lg shadow-zinc-900/20 transition hover:bg-zinc-800"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
              <span className="text-xs font-bold">{cartCount}</span>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-zinc-900/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-[70] w-[85%] max-w-sm bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Menu
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={2.4} />
              </button>
            </div>

            <nav className="mt-10 space-y-1">
              {nav.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                  <span className="text-lg font-black">
                    {brandTitle[0]?.toUpperCase() || "A"}
                  </span>
                </div>
                <span className="text-lg font-bold tracking-tight text-zinc-900">
                  {brandTitle}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 lg:text-3xl">
                Get the drop before it drops.
              </h3>
              <p className="mt-3 text-sm text-zinc-600">
                Join 50,000+ members for early access, exclusive drops, and
                member-only pricing.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex max-w-md gap-2"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
                <button
                  type="submit"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800"
                >
                  Join
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Shop
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {nav.slice(0, 3).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 transition hover:text-zinc-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Support
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href={`${basePath}?page=contact`}
                    className="text-zinc-600 transition hover:text-zinc-900"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${basePath}?page=account`}
                    className="text-zinc-600 transition hover:text-zinc-900"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${basePath}?page=cart`}
                    className="text-zinc-600 transition hover:text-zinc-900"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Follow
              </p>
              <div className="mt-5 flex gap-2">
                {[Send, MessageCircle, Play].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-6">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} {brandTitle}. All rights reserved.
            </p>
            <p className="text-xs text-zinc-500">Made in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}