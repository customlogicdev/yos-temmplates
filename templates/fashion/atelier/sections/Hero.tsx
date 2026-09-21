// src/templates/fashion/atelier/sections/Hero.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { formatMoney } from "@/lib/format";

export function AtelierHero({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const data = props?.data || {};
  const products = data.products || [];
  const store = data.store || {};

  const heroProducts = products.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (heroProducts.length <= 1) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(t);
  }, [heroProducts.length]);

  const activeProduct = heroProducts[activeIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* LEFT — Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" strokeWidth={2.4} />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                New Season 2026
              </span>
            </div>

            <h1 className="mt-8 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-zinc-900">
              The Art of{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent italic">
                Modern Style
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-600">
              {store.about ||
                "Premium fabrics, considered details, and designs made to last. Crafted in Mumbai for the modern wardrobe."}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={`${base}?page=products`}
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-105 hover:shadow-2xl"
              >
                Shop Collection
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.4}
                />
              </Link>
              <Link
                href={`${base}?page=about`}
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-8 py-4 text-sm font-semibold text-zinc-900 backdrop-blur-sm transition hover:border-zinc-900 hover:bg-white"
              >
                <Play className="h-3.5 w-3.5" strokeWidth={2.4} />
                Watch Film
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-zinc-200/80 pt-8">
              {[
                { label: "Drops", value: "24+" },
                { label: "Members", value: "50K+" },
                { label: "Cities", value: "180" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold tracking-tight text-zinc-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Hero Product */}
          <div className="lg:col-span-6">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-500/10 ring-1 ring-zinc-200">
              {activeProduct?.image ? (
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                  Loading...
                </div>
              )}

              {/* Corner labels */}
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-900 backdrop-blur-sm">
                  Vol.01
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-900 backdrop-blur-sm">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(heroProducts.length).padStart(2, "0")}
                </span>
              </div>

              {/* Product info */}
              {activeProduct && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 backdrop-blur-sm">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                        Featured
                      </p>
                      <p className="mt-2 truncate text-lg font-bold text-white">
                        {activeProduct.name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white/90">
                        {formatMoney(activeProduct.price)}
                      </p>
                    </div>
                    <Link
                      href={`${base}?page=product&product=${activeProduct.id}`}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg transition hover:scale-110 hover:bg-zinc-100"
                    >
                      <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Pagination dots */}
              {heroProducts.length > 1 && (
                <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                  {heroProducts.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-8 w-1 rounded-full transition-all ${
                        i === activeIndex ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}