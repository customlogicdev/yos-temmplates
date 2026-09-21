// src/templates/beauty/glow/pages/AccountPage.tsx

"use client";

import Link from "next/link";
import { User, Package, Heart, MapPin, Settings, LogOut, ArrowRight, Mail } from "lucide-react";

interface BeautyAccountPageProps {
  slug: string;
  store: any;
  customer?: any;
}

export function BeautyAccountPage({ slug, store, customer }: BeautyAccountPageProps) {
  const basePath = `/store/${slug}/beauty`;

  if (!customer) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 border border-pink-200">
          <User className="h-9 w-9 text-pink-500" strokeWidth={1.6} />
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-pink-500">
          Your Beauty Account
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#2A2438]">
          Sign in to <span className="italic text-pink-500">glow</span>
        </h1>
        <div className="mt-10 flex justify-center gap-4">
          <Link href={`${basePath}/account/login`} className="rounded-full bg-[#2A2438] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-pink-500">
            Sign in
          </Link>
          <Link href={`${basePath}/account/register`} className="rounded-full border border-[#2A2438] px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#2A2438]">
            Create account
          </Link>
        </div>
      </section>
    );
  }

  const menu = [
    { href: `${basePath}/account/orders`, Icon: Package, label: "My Orders", desc: "Track past purchases" },
    { href: `${basePath}/account/wishlist`, Icon: Heart, label: "Wishlist", desc: "Your saved items" },
    { href: `${basePath}/account/addresses`, Icon: MapPin, label: "Addresses", desc: "Delivery preferences" },
    { href: `${basePath}/account/settings`, Icon: Settings, label: "Settings", desc: "Profile and preferences" },
  ];

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-24">
      <div className="border-b border-pink-100 pb-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-pink-500">
          Your Account
        </p>
        <h1 className="mt-4 font-serif text-5xl text-[#2A2438]">
          Hello, <span className="italic text-pink-500">{customer.name?.split(" ")[0] || "there"}</span>
        </h1>
        {customer.email && (
          <p className="mt-3 flex items-center gap-2 text-sm text-[#2A2438]/60">
            <Mail className="h-3.5 w-3.5" /> {customer.email}
          </p>
        )}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {menu.map(({ href, Icon, label, desc }) => (
          <Link key={label} href={href} className="group flex items-start gap-5 rounded-3xl border border-pink-100 bg-white p-7 transition hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 transition group-hover:bg-pink-500">
              <Icon className="h-5 w-5 text-pink-500 transition group-hover:text-white" strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-lg text-[#2A2438]">{label}</h3>
              <p className="mt-1 text-xs text-[#2A2438]/60">{desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#2A2438]/40 transition group-hover:translate-x-1 group-hover:text-pink-500" />
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center border-t border-pink-100 pt-8">
        <Link href={`${basePath}/account/logout`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#2A2438]/60 hover:text-red-500">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </Link>
      </div>
    </section>
  );
}