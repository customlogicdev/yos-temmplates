
// src/templates/grocery/fresh/layout/GroceryNavbar.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/components/cart";
import { AccountMenu } from "@/components/customer/account-menu";
import { getCategoryIcon } from "@/lib/category-icons";
import {
  Search,
  ShoppingCart,
  MapPin,
  Clock,
  Menu,
  X,
  Leaf,
  ChevronDown,
  User,
  Heart,
  Percent,
  Store,
} from "lucide-react";

export function GroceryNavbar({ props, slug }: any) {
  const basePath = `/store/${slug}/grocery`;
  const brandTitle = props?.data?.store?.name || "FreshCart";
  const categories = props?.data?.categories || [];
  const { lines } = useCart();
  const cartCount = new Set(lines.map((i: any) => i.productId)).size;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Strip */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 text-[11px]">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1.5 hover:opacity-80">
              <MapPin className="h-3 w-3" strokeWidth={2.5} />
              <span className="font-semibold">Deliver to:</span>
              <span>Mumbai 400001</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <span className="hidden items-center gap-1.5 md:flex">
              <Clock className="h-3 w-3" strokeWidth={2.5} />
              12-hour delivery
            </span>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <Link href={`${basePath}/account/orders`} className="hover:opacity-80">
              Track Order
            </Link>
            <Link href={`${basePath}/account`} className="hover:opacity-80">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 border-b border-green-100 bg-white transition-all ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="flex items-center gap-4 py-3">
            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-200 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <Link href={basePath} className="flex shrink-0 items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Leaf className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-lg font-black text-green-900">{brandTitle}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-green-600">
                  Fresh Daily
                </p>
              </div>
            </Link>

            {/* Search */}
            <div className="relative hidden flex-1 lg:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
              <input
                type="text"
                placeholder="Search for milk, bread, vegetables, snacks..."
                className="w-full rounded-2xl border border-green-100 bg-green-50/50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href={`${basePath}/shop`}
                className="flex h-11 items-center gap-2 rounded-xl border border-green-200 px-4 text-sm font-bold text-green-800 transition hover:bg-green-50"
              >
                <Store className="h-4 w-4" strokeWidth={2.2} />
                Shop
              </Link>

              <Link
                href={`${basePath}/account/wishlist`}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-green-200 text-green-800 transition hover:bg-green-50"
              >
                <Heart className="h-4 w-4" strokeWidth={2.2} />
              </Link>

              <AccountMenu slug={slug} basePath={basePath} />

              <Link
                href={`${basePath}/cart`}
                className="relative flex h-11 items-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 px-4 text-white shadow-lg transition hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4" strokeWidth={2.4} />
                <span className="text-xs font-bold uppercase tracking-wider">Cart</span>
                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-black text-green-700">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Cart */}
            <Link
              href={`${basePath}/cart`}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg lg:hidden"
            >
              <ShoppingCart className="h-4 w-4" strokeWidth={2.4} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Search */}
          <div className="relative pb-3 lg:hidden">
            <Search className="pointer-events-none absolute left-4 top-[18px] h-4 w-4 -translate-y-1/2 text-green-600" />
            <input
              type="text"
              placeholder="Search groceries..."
              className="w-full rounded-2xl border border-green-100 bg-green-50/50 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-green-500"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-white lg:hidden">
            <div className="flex items-center justify-between border-b border-green-100 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <Leaf className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <p className="font-black text-green-900">{brandTitle}</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-green-600">
                Shop by Category
              </p>
              <div className="space-y-1">
                <Link
                  href={`${basePath}/shop`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-green-800 hover:bg-green-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
                    <Percent className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                  All Products
                </Link>
                {categories.map((cat: any) => {
                  const { Icon, color, bg } = getCategoryIcon(cat.slug);
                  return (
                    <Link
                      key={cat.slug}
                      href={`${basePath}/aisles/${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-green-50"
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ background: bg }}
                      >
                        <Icon className="h-4 w-4" style={{ color }} strokeWidth={2.4} />
                      </span>
                      <span className="flex-1 font-semibold">{cat.name}</span>
                      <span className="text-xs text-slate-400">{cat.count}</span>
                    </Link>
                  );
                })}
              </div>

              <p className="mb-3 mt-6 text-[10px] font-black uppercase tracking-[0.15em] text-green-600">
                Account
              </p>
              <div className="space-y-1">
                <Link
                  href={`${basePath}/account`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-green-50"
                >
                  <User className="h-4 w-4" />
                  My Account
                </Link>
                <Link
                  href={`${basePath}/account/orders`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-green-50"
                >
                  My Orders
                </Link>
                <Link
                  href={`${basePath}/cart`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-green-50"
                >
                  <ShoppingCart className="h-4 w-4" />
                  My Cart
                  {cartCount > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-green-500 px-1.5 text-[10px] font-black text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}