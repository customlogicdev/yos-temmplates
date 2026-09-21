// src/templates/grocery/fresh/sections/FlashDeals.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Clock } from "lucide-react";
import { formatMoney } from "@/lib/format";

export function FlashDeals({ props }: { props: any }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  const slug = props?.slug || props?.data?.slug || "";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = (props.data?.products || []).slice(0, 4);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12">
      <div className="rounded-[2rem] bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-1">
        <div className="rounded-[1.9rem] bg-white p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-orange-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg animate-pulse">
                <Zap className="h-7 w-7" strokeWidth={2.5} />
              </span>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 lg:text-3xl">
                  Flash Deals
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                  Save up to 40% today
                </p>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-3">
              <Clock className="h-4 w-4 text-orange-600" strokeWidth={2.5} />
              <div className="flex items-center gap-1.5">
                {[
                  { value: timeLeft.hours, label: "HRS" },
                  { value: timeLeft.minutes, label: "MIN" },
                  { value: timeLeft.seconds, label: "SEC" },
                ].map((t, i) => (
                  <div key={t.label} className="flex items-center gap-1.5">
                    <div className="flex flex-col items-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-sm font-black text-white tabular-nums shadow-md">
                        {String(t.value).padStart(2, "0")}
                      </span>
                      <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-orange-600">
                        {t.label}
                      </span>
                    </div>
                    {i < 2 && <span className="text-xl font-black text-orange-500">:</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deals grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((product: any) => (
              <Link
                key={product.id}
                href={`/store/${slug}?page=product&product=${product.id}`}

                className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Discount badge */}
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                  <Zap className="h-3 w-3" strokeWidth={3} />
                  40% OFF
                </div>

                <div className="aspect-square overflow-hidden rounded-xl bg-orange-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="mt-3">
                  <h3 className="line-clamp-1 font-bold text-slate-900">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-black text-orange-600">
                      {formatMoney(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatMoney(product.price * 1.4)}
                    </span>
                  </div>
                  <button className="mt-3 w-full rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href={`/store/${slug}/grocery/shop`}
              className="group inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
            >
              See all deals
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}