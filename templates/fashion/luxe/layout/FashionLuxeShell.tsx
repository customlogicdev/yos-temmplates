// src/templates/fashion/luxe/layout/FashionLuxeShell.tsx

"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/components/cart";
import { AccountMenu } from "@/components/customer/account-menu";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Camera,
  Share2,
  Play,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import type { TemplateRenderProps } from "@/lib/types";

interface ShellProps {
  children: React.ReactNode;
  props: TemplateRenderProps;
  slug: string;
}

export function FashionLuxeShell({ children, props, slug }: ShellProps) {
  const store: any = props?.data?.store || {};
  const brandTitle = store.name || props?.storefront?.brandName || "LUXE";

  // ✅ FIXED: Hardcode true — no window, no pathname, no hydration mismatch
  const isDedicatedFashionRoute = true;

  const basePath = `/store/${slug}/fashion`;

  const url = (path: string) => {
    return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const { lines } = useCart();
  const cartCount = useMemo(
    () =>
      lines.reduce(
        (sum: number, l: any) => sum + (l.qty ?? l.quantity ?? 1),
        0
      ),
    [lines]
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const nav = [
    { label: "New In", href: url("/shop") },
    { label: "Ready to Wear", href: url("/collection/evening-gowns") },
    { label: "Journal", href: url("/about") },
  ];

  const homeHref = `/store/${slug}/fashion`;
  const cartHref = `/store/${slug}/fashion/cart`;
  const contactHref = `/store/${slug}/fashion/contact`;
  const aboutHref = `/store/${slug}/fashion/about`;
  const shopHref = `/store/${slug}/fashion/shop`;
  const searchHref = `/store/${slug}/fashion/search`;

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1815] antialiased">
      {/* Scroll progress bar */}
      <div
        className="fixed left-0 top-0 z-[100] h-[2px] bg-[#1A1815] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      {/* Announcement Bar */}
      {/* <div className="relative overflow-hidden bg-[#1A1815] text-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-2.5 text-[10px] uppercase tracking-[0.32em]">
          <span className="hidden md:block opacity-80">
            Complimentary tailoring
          </span>
          <span className="mx-auto truncate text-center">
            <span className="opacity-60">Issue 14 —</span> Autumn / Winter 25
            Now Live
          </span>
          <span className="hidden md:block opacity-80">Insured delivery</span>
        </div>
      </div> */}

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-[#E5DDD0]/80 bg-[#FAF7F2]/95 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "py-3.5" : "py-6"
            }`}
          >
            {/* Left — Nav */}
            <div className="flex flex-1 items-center gap-8">
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5DDD0] transition hover:bg-[#1A1815] hover:text-white lg:hidden"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>

              <nav className="hidden items-center gap-8 lg:flex">
                {nav.slice(0, 3).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative text-[11px] font-medium uppercase tracking-[0.2em] text-[#6A6156] transition hover:text-[#1A1815]"
                  >
                    {item.label}
                    <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[#1A1815] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center — Brand */}
            <Link
              href={homeHref}
              className="group flex shrink-0 flex-col items-center"
            >
              <span
                className={`font-[family-name:var(--store-display)] font-black tracking-[0.35em] text-[#1A1815] transition-all duration-500 ${
                  scrolled ? "text-lg" : "text-2xl"
                }`}
              >
                {brandTitle.toUpperCase()}
              </span>
              {/* <span className="mt-1 text-[7px] uppercase tracking-[0.55em] text-[#8A7F72] transition-opacity duration-500 group-hover:text-[#8F6E3D]">
                Maison · Est. 1985
              </span> */}
            </Link>

            {/* Right — Actions */}
            <div className="flex flex-1 items-center justify-end gap-1.5">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[#6A6156] transition hover:bg-[#1A1815]/5 hover:text-[#1A1815] lg:flex"
              >
                <Search className="h-4 w-4" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                aria-label="Wishlist"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-[#6A6156] transition hover:bg-[#1A1815]/5 hover:text-[#1A1815] lg:flex"
              >
                <Heart className="h-4 w-4" strokeWidth={1.6} />
              </button>

              <AccountMenu slug={slug} basePath={basePath} />

              <Link
                href={cartHref}
                aria-label="Shopping bag"
                className="relative ml-1 flex h-10 items-center gap-2 rounded-full bg-[#1A1815] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#8F6E3D]"
              >
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
                <span className="hidden sm:inline">Bag</span>
                {cartCount > 0 && (
                  <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#D4AF7A] px-1 text-[9px] font-black text-[#1A1815]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop secondary nav */}
          {!scrolled && (
            <nav className="hidden justify-center gap-12 border-t border-[#E5DDD0]/70 py-3.5 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative text-[10px] uppercase tracking-[0.24em] text-[#8A7F72] transition hover:text-[#1A1815]"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#B8935A] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Inline search drawer */}
        {searchOpen && (
          <div className="border-t border-[#E5DDD0] bg-[#FAF7F2]/98 backdrop-blur-xl">
            <div className="mx-auto max-w-[1600px] px-5 py-5 lg:px-10">
              <form
                action={searchHref}
                method="get"
                className="flex items-center gap-4 border-b border-[#1A1815] pb-3"
              >
                <Search
                  className="h-5 w-5 shrink-0 text-[#8A7F72]"
                  strokeWidth={1.6}
                />
                <input
                  type="search"
                  name="q"
                  autoFocus
                  placeholder="Search the collection…"
                  className="w-full bg-transparent text-lg font-light tracking-tight outline-none placeholder:text-[#8A7F72]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[10px] uppercase tracking-[0.22em] text-[#8A7F72] hover:text-[#1A1815]"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[#1A1815]/60 backdrop-blur-sm"
            onClick={closeMobile}
          />
          <div className="absolute left-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-[#FAF7F2] p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--store-display)] text-base font-black tracking-[0.35em]">
                {brandTitle.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5DDD0] transition hover:bg-[#1A1815] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col">
              {nav.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobile}
                  className="group flex items-center justify-between border-b border-[#E5DDD0] py-5 text-sm uppercase tracking-[0.2em] text-[#6A6156] transition hover:text-[#1A1815]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--store-display)] text-[10px] text-[#8A7F72]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              ))}
            </nav>

            <div className="mt-10 space-y-3 text-[10px] uppercase tracking-[0.2em] text-[#8A7F72]">
              <div className="flex items-center gap-3">
                <MapPin className="h-3.5 w-3.5" />
                {storeAddressLine(store)}
              </div>
              {store.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-3.5 w-3.5" />
                  {store.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main>{children}</main>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#E5DDD0] bg-[#F1EBE0]">
        <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10">
          {/* Top row */}
          <div className="grid gap-8 border-b border-[#E5DDD0] pb-10 lg:grid-cols-2">
            <div>
              <h4 className="font-[family-name:var(--store-display)] text-2xl font-black tracking-[0.28em] text-[#1A1815]">
                {brandTitle.toUpperCase()}
              </h4>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#6A6156]">
                {store.about ||
                  "Crafted in our Mumbai atelier. Limited runs, uncompromising detail."}
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md items-center gap-2 self-center lg:ml-auto"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full border border-[#E5DDD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#1A1815]"
              />
              <button
                type="submit"
                className="bg-[#1A1815] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white transition hover:bg-[#8F6E3D]"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Middle: Link columns */}
          <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Shop */}
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8A7F72]">
                Shop
              </h5>
              <ul className="mt-4 space-y-2.5 text-sm text-[#6A6156]">
                <li>
                  <Link href={shopHref} className="hover:text-[#1A1815]">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${slug}/fashion/collection/evening-gowns`}
                    className="hover:text-[#1A1815]"
                  >
                    Ready to Wear
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${slug}/fashion/collection/footwear`}
                    className="hover:text-[#1A1815]"
                  >
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${slug}/fashion/collection/jewellery`}
                    className="hover:text-[#1A1815]"
                  >
                    Jewellery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8A7F72]">
                Account
              </h5>
              <ul className="mt-4 space-y-2.5 text-sm text-[#6A6156]">
                <li>
                  <Link
                    href={`/store/${slug}/fashion/account`}
                    className="hover:text-[#1A1815]"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${slug}/fashion/account/orders`}
                    className="hover:text-[#1A1815]"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/store/${slug}/fashion/cart`}
                    className="hover:text-[#1A1815]"
                  >
                    Shopping Bag
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8A7F72]">
                Help
              </h5>
              <ul className="mt-4 space-y-2.5 text-sm text-[#6A6156]">
                <li>
                  <Link href={contactHref} className="hover:text-[#1A1815]">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1A1815]">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1A1815]">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            {/* Maison */}
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8A7F72]">
                Maison
              </h5>
              <ul className="mt-4 space-y-2.5 text-sm text-[#6A6156]">
                <li>
                  <Link href={aboutHref} className="hover:text-[#1A1815]">
                    Our Story
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1A1815]">
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E5DDD0] pt-6 text-[10px] uppercase tracking-[0.22em] text-[#8A7F72] md:flex-row">
            <p>
              © {new Date().getFullYear()} {brandTitle}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#1A1815]">
                Privacy
              </a>
              <a href="#" className="hover:text-[#1A1815]">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function storeAddressLine(store: any) {
  return (
    store?.address ||
    [store?.city, store?.country].filter(Boolean).join(", ") ||
    "Mumbai, India"
  );
}