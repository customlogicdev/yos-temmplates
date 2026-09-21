// src/templates/grocery/fresh/layout/GroceryShell.tsx

"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  MessageCircle,
  Send,
  Smartphone,
  PlayCircle,
} from "lucide-react";

// ⚠️ NOTE: Navbar is NOT rendered here.
// It's rendered by:
//   • /store/[slug]/grocery/layout.tsx (for /grocery/* routes)
//   • /store/[slug]/grocery/fresh/Template.tsx (for legacy ?page= routes)
//
// This shell only provides the footer + wrapper.

export function GroceryShell({ children, props, slug }: any) {
  const brandTitle = props?.data?.store?.name || "FreshCart";
  const categories = props?.data?.categories || [];

  return (
    <div className="min-h-screen bg-[#F8FBF5] text-[#1A2E1A]">
      {/* ❌ Navbar REMOVED — rendered by parent (Template or layout.tsx) */}

      <main>{children}</main>

      {/* 🟢 PROFESSIONAL FOOTER */}
      <footer className="mt-20 bg-gradient-to-br from-green-900 to-emerald-950 text-white">
        {/* Top strip */}
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-6">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-300" />
                <span className="text-green-200">24/7 Support:</span>
                <span className="font-bold">+91 98765 43210</span>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-300" />
                <span className="text-green-200">help@freshcart.com</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-green-200">Follow us:</span>
              {[Share2, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl font-black text-white">{brandTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-green-200">
                Farm-fresh groceries, delivered in 12 hours. Handpicked,
                quality-checked, and always fresh.
              </p>

              <div className="mt-5 flex items-start gap-2 text-xs text-green-300">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>123 Farm Road, Mumbai 400001, India</span>
              </div>

              {/* App download */}
              <div className="mt-6">
                <p className="text-[10px] font-black uppercase tracking-wider text-green-300">
                  Get the app
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">
                    <Smartphone className="h-4 w-4" />
                    iOS
                  </button>
                  <button className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">
                    <PlayCircle className="h-4 w-4" />
                    Android
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-green-300">
                Shop
              </h4>
              <ul className="space-y-2.5 text-sm text-green-100">
                {categories.slice(0, 6).map((cat: any) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/store/${slug}/grocery/aisles/${cat.slug}`}
                      className="transition hover:text-white"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-green-300">
                Help
              </h4>
              <ul className="space-y-2.5 text-sm text-green-100">
                <li>
                  <Link href={`/store/${slug}/grocery/account/orders`} className="hover:text-white">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href={`/store/${slug}/grocery/account`} className="hover:text-white">
                    My Account
                  </Link>
                </li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-green-300">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-green-100">
                <li>
                  <Link
                    href={`/store/${slug}/grocery/shop`}
                    className="hover:text-white"
                  >
                    Shop All
                  </Link>
                </li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-green-300">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm text-green-100">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-green-300">
              <span>We accept:</span>
              {["Visa", "Mastercard", "UPI", "Paytm", "COD"].map((method) => (
                <span
                  key={method}
                  className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold"
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="text-xs text-green-300">
              © {new Date().getFullYear()} {brandTitle}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}