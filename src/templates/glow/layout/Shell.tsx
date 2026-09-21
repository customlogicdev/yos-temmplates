// src/templates/beauty/glow/layout/Shell.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart";
import { AccountMenu } from "@/components/customer/account-menu";
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from "lucide-react";

export function BeautyShell({ children, props, slug }: any) {
  const basePath = props?.basePath || "";
  const brandTitle = props?.data?.store?.name || "GLOW";
  const { lines } = useCart();
  const cartCount = new Set(lines.map((i: any) => i.productId)).size;
  const [mobileOpen, setMobileOpen] = useState(false);

const nav = [
  { label: "Shop All", href: `/store/${slug}/beauty/shop` },
  { label: "Hydration", href: `/store/${slug}/beauty/concern/hydration` },
  { label: "Brightening", href: `/store/${slug}/beauty/concern/brightening` },
  { label: "Acne Care", href: `/store/${slug}/beauty/concern/acne` },
  { label: "Glow", href: `/store/${slug}/beauty/concern/glow` },
  { label: "Routine Finder", href: `/store/${slug}/beauty/ritual` },
  { label: "About", href: `${basePath}?page=about` },
];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2438]">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 py-2 text-center text-[11px] uppercase tracking-[0.25em] text-white">
        ✨ Free Shipping on Orders Above ₹999 ✨
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-xl border-b border-pink-100">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href={basePath} className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-500" strokeWidth={2} />
            <span className="text-2xl font-serif italic text-[#2A2438]">
              {brandTitle}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-pink-500 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-pink-50 rounded-full transition">
              <Search className="h-4 w-4" />
            </button>
            <button className="hidden lg:block p-2 hover:bg-pink-50 rounded-full transition">
              <Heart className="h-4 w-4" />
            </button>

            <AccountMenu slug={slug} basePath={basePath} />

            <Link
              href={`${basePath}?page=cart`}
              className="relative p-2 hover:bg-pink-50 rounded-full transition"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-pink-100 bg-[#FDFBF7] p-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm hover:bg-pink-50 hover:text-pink-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="mt-20 bg-[#2A2438] text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href={`${basePath}?page=products`} className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href={`${basePath}?page=collection&category=skincare`} className="hover:text-white">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href={`${basePath}?page=collection&category=makeup`} className="hover:text-white">
                  Makeup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-4">
              Help
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">Shipping</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href={`${basePath}?page=about`} className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li><a href="#" className="hover:text-white">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-4">
              Follow
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {brandTitle}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}