// src/templates/grocery/fresh/sections/Hero.tsx

"use client";

import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Truck, Sparkles } from "lucide-react";

export function GroceryHero({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const data = props?.data || {};
  const store = data.store || {};
  const featured = (data.featuredProducts || data.products || [])[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-12 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700">
                Delivering Today
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-tight text-green-900">
              Farm-fresh,{" "}
              <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                in 12 hours.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-green-800/70">
              {store.about ||
                "Hand-picked fruits, vegetables, dairy, and daily essentials — from local farms to your door, always fresh."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/store/${slug}/grocery/shop`}
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
              >
                Shop Groceries
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href={`/store/${slug}/grocery/aisles/fruits-vegetables`}
                className="inline-flex items-center gap-2 rounded-2xl border border-green-300 bg-white/60 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-green-800 backdrop-blur-sm transition hover:bg-white"
              >
                Today's Deals
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { Icon: Truck, label: "Free Delivery", value: "₹999+" },
                { Icon: Clock, label: "12-hr Delivery", value: "Guaranteed" },
                { Icon: ShieldCheck, label: "100% Fresh", value: "or Refund" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100">
                    <Icon className="h-4 w-4 text-green-700" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                      {label}
                    </p>
                    <p className="text-xs font-semibold text-green-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured */}
          {featured && (
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-green-200/50">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="h-full w-full object-cover"
                />
                {/* Fresh badge */}
                <div className="absolute left-5 top-5 rounded-2xl bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-green-600" strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-800">
                      Farm Fresh
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating price card */}
              <div className="absolute -bottom-6 -right-6 rounded-3xl bg-white p-5 shadow-2xl">
                <p className="text-[10px] font-bold uppercase tracking-wider text-green-600">
                  Best Seller
                </p>
                <p className="mt-1 font-bold text-green-900">{featured.name}</p>
                <p className="mt-2 text-2xl font-black text-green-600">
                  ₹{featured.price}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}