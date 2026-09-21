// src/templates/grocery/fresh/pages/AccountPage.tsx

"use client";

import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

export function GroceryAccountPage({ slug, store, customer }: any) {
  const basePath = `/store/${slug}/grocery`;

  // ❌ Not logged in
  if (!customer) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <User className="h-9 w-9 text-green-600" strokeWidth={1.8} />
        </div>
        <h1 className="mt-6 text-2xl font-black text-green-900">
          Please Login
        </h1>
        <p className="mt-2 text-sm text-green-700">
          Login to access your account, orders, and wishlist
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`${basePath}/account/login`}
            className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-green-700"
          >
            Sign in
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
          <Link
            href={`${basePath}/account/register`}
            className="inline-flex items-center gap-2 rounded-2xl border border-green-600 px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-green-700 transition hover:bg-green-50"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Logged in → dashboard
  const menuItems = [
    {
      Icon: Package,
      label: "My Orders",
      desc: "Track and manage orders",
      href: `${basePath}/account/orders`,
      color: "#10b981",
      bg: "rgba(16,185,129,0.10)",
    },
    {
      Icon: Heart,
      label: "Wishlist",
      desc: "Your favorite products",
      href: `${basePath}/account/wishlist`,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.10)",
    },
    {
      Icon: MapPin,
      label: "Addresses",
      desc: "Saved delivery addresses",
      href: `${basePath}/account/addresses`,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.10)",
    },
    {
      Icon: CreditCard,
      label: "Payment Methods",
      desc: "Cards and UPI",
      href: `${basePath}/account/payments`,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.10)",
    },
    {
      Icon: Settings,
      label: "Settings",
      desc: "Profile preferences",
      href: `${basePath}/account/settings`,
      color: "#6b7280",
      bg: "rgba(107,114,128,0.10)",
    },
  ];

  return (
    <div className="mx-auto max-w-[900px] px-5 py-12">
      {/* Profile Header */}
      <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white lg:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black backdrop-blur">
            {customer.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
              Welcome back
            </p>
            <h1 className="mt-1 text-2xl font-black">{customer.name}</h1>
            <p className="mt-0.5 text-sm text-white/80">{customer.email}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Orders", value: customer.ordersCount || 0 },
            { label: "Wishlist", value: 0 },
            { label: "Points", value: 250 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur"
            >
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-6 space-y-3">
        {menuItems.map(({ Icon, label, desc, href, color, bg }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: bg }}
            >
              <Icon className="h-5 w-5" style={{ color }} strokeWidth={2.2} />
            </span>
            <div className="flex-1">
              <p className="font-bold text-slate-900 group-hover:text-green-700">
                {label}
              </p>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <ChevronRight
              className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1"
              strokeWidth={2.4}
            />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <Link
        href={`${basePath}/account/logout`}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-red-200 bg-red-50 py-3.5 text-[11px] font-black uppercase tracking-wider text-red-600 transition hover:bg-red-100"
      >
        <LogOut className="h-4 w-4" strokeWidth={2.4} />
        Logout
      </Link>
    </div>
  );
}