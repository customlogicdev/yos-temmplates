// src/templates/beauty/lumiere/layout/LumiereShell.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
  Heart,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Send,
  Mail,
} from "lucide-react";
import { useCart } from "@/components/cart";

interface ShellProps {
  children: React.ReactNode;
  props: any;
  slug: string;
}

export function LumiereShell({ children, props, slug }: ShellProps) {
  const store = props?.data?.store || {};
  const brandTitle = store.name || "LUMIÈRE";
  const basePath = `/store/${slug}`;

  const { lines } = useCart();
  const cartCount = lines.reduce(
    (sum: number, l: any) => sum + (l.qty ?? l.quantity ?? 1),
    0
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  // 🎯 Sub-categories for Lumière
  const nav = [
    { label: "Skincare", href: `${basePath}?page=collection&category=skincare` },
    { label: "Makeup", href: `${basePath}?page=collection&category=makeup` },
    { label: "Haircare", href: `${basePath}?page=collection&category=haircare` },
    { label: "Body", href: `${basePath}?page=collection&category=body` },
    { label: "Fragrance", href: `${basePath}?page=collection&category=fragrance` },
    { label: "Wellness", href: `${basePath}?page=collection&category=wellness` },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#1F1B24] antialiased">
      {/* Announcement bar — rose gold gradient */}
      <div className="bg-gradient-to-r from-[#B76E79] via-[#D4A5A5] to-[#B76E79] text-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-2.5 text-[11px] font-medium tracking-wide">
          <span className="flex items-center gap-2">
            <Sparkles className="h-3 w-3" strokeWidth={2.4} />
            Complimentary samples with every order
          </span>
          <span className="hidden md:inline opacity-90">
            Free shipping over ₹1499
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#E8DDD5]/60 bg-[#FAF7F5]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-10">
          {/* Logo — italic elegant */}
          <Link href={basePath} className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5] shadow-lg shadow-rose-200/50 transition group-hover:scale-105">
              <span className="text-lg font-serif italic text-white">
                {brandTitle[0]?.toUpperCase() || "L"}
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl italic tracking-wide text-[#1F1B24]">
                {brandTitle}
              </span>
              <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#B76E79]">
                Beauty Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-sm font-medium text-[#1F1B24]/70 transition hover:text-[#B76E79]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#B76E79] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#1F1B24]/70 transition hover:bg-rose-50 hover:text-[#B76E79]"
              aria-label="Search"
            >
              <Search className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              className="hidden h-10 w-10 items-center justify-center rounded-full text-[#1F1B24]/70 transition hover:bg-rose-50 hover:text-[#B76E79] sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" strokeWidth={2} />
            </button>
            <Link
              href={`${basePath}?page=account`}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#1F1B24]/70 transition hover:bg-rose-50 hover:text-[#B76E79]"
              aria-label="Account"
            >
              <User className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href={`${basePath}?page=cart`}
              className="relative ml-1 flex h-10 items-center gap-2 rounded-full bg-[#1F1B24] px-5 text-white shadow-lg shadow-zinc-900/20 transition hover:bg-[#B76E79]"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={2} />
              <span className="text-xs font-bold">{cartCount}</span>
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-[#1F1B24] transition hover:bg-rose-50 lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-[#1F1B24]/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-[70] w-[85%] max-w-sm bg-[#FAF7F5] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg italic text-[#1F1B24]">
                {brandTitle}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8DDD5] transition hover:bg-white"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <nav className="mt-10 space-y-1">
              {nav.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 transition hover:bg-white"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-serif text-[10px] text-[#B76E79]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-medium text-[#1F1B24]">
                      {item.label}
                    </span>
                  </span>
                  <ChevronRight
                    className="h-4 w-4 text-[#B76E79] transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#E8DDD5] bg-[#1F1B24] text-white">
        <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Brand */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5]">
                  <span className="font-serif text-lg italic text-white">
                    {brandTitle[0]?.toUpperCase() || "L"}
                  </span>
                </div>
                <span className="font-serif text-xl italic tracking-wide">
                  {brandTitle}
                </span>
              </div>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
                Conscious beauty, crafted with care. Clean formulas,
                clinically-proven results, and a touch of glamour in every drop.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 flex max-w-md gap-2"
              >
                <input
                  type="email"
                  placeholder="Join our beauty list"
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#B76E79] focus:bg-white/10"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#B76E79] to-[#D4A5A5] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:scale-105"
                >
                  Join
                </button>
              </form>
            </div>

            {/* Columns */}
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#B76E79]">
                Shop
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {nav.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/60 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#B76E79]">
                Help
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href={`${basePath}?page=contact`}
                    className="text-white/60 transition hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${basePath}?page=account`}
                    className="text-white/60 transition hover:text-white"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${basePath}?page=about`}
                    className="text-white/60 transition hover:text-white"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#B76E79]">
                Follow
              </p>
              <div className="mt-5 flex gap-2">
              {[Send, MessageCircle, Mail].map((Icon, i) => (                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[#B76E79] hover:bg-[#B76E79] hover:text-white"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </a>
                ))}
              </div>

              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Cruelty-free · Vegan · Dermatologist-tested
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {brandTitle}. All rights reserved.
            </p>
            <p className="text-xs text-white/40">Made with care in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}