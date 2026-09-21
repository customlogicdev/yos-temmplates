// src/templates/fashion/luxe/sections/EditorialRow.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Star, Crown, TrendingUp, Award } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { TemplateRenderProps } from "@/lib/types";

interface EditorialRowProps {
  props: TemplateRenderProps;
}

export function EditorialRow({ props }: EditorialRowProps) {
  const products = props.data?.products || [];
  const store: any = props.data?.store || {};
  const slug = props?.slug || props?.data?.slug || "";
  const basePath = `/store/${slug}/fashion`;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const top = [...products]
    .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  if (top.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-[1600px] px-5 py-24 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        {/* LEFT — Editorial Story Card */}
        <div
          className={`lg:col-span-5 transition-all duration-1000 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="group relative flex h-full flex-col justify-between overflow-hidden border border-[#E5DDD0] bg-gradient-to-br from-[#F1EBE0] via-[#FAF7F2] to-[#EDE4D3] p-10">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-16 select-none font-[family-name:var(--store-display)] text-[16rem] font-black leading-none text-[#1A1815]/[0.04] transition-transform duration-1000 group-hover:scale-110"
            >
              01
            </span>

            <div className="pointer-events-none absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#B8935A]/40">
              <Award className="h-5 w-5 text-[#B8935A]" strokeWidth={1.6} />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 border border-[#D4AF7A]/50 bg-white/70 px-3 py-1.5 backdrop-blur-sm">
                <Crown className="h-3 w-3 text-[#B8935A]" strokeWidth={2.5} />
                <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#8F6E3D]">
                  Most Loved
                </span>
              </div>

              <h3 className="mt-12 font-[family-name:var(--store-display)] text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] tracking-[-0.025em] text-[#1A1815]">
                {store.tagline || "The pieces our clients return to"}
              </h3>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#6A6156]">
                {store.about ||
                  "Hand-finished in our atelier. Made in limited runs, each piece is designed to be worn for decades — and remembered for longer."}
              </p>
            </div>

            <div className="relative mt-14">
              <Link
                href={`${basePath}/about`}
                className="group/cta inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A1815]"
              >
                <span className="relative">
                  Read the full story
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-[#1A1815] transition-all duration-300 group-hover/cta:w-0" />
                  <span className="absolute -bottom-1 right-0 h-px w-0 bg-[#B8935A] transition-all duration-300 group-hover/cta:w-full" />
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-1"
                  strokeWidth={2.4}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — Top 3 Ranked */}
        <div className="lg:col-span-7">
          <div className="flex items-end justify-between border-b border-[#E5DDD0] pb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8A7F72]">
                Client Favourites
              </p>
              <h3 className="mt-2 font-[family-name:var(--store-display)] text-3xl tracking-[-0.025em] text-[#1A1815]">
                Top Rated
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#8A7F72]">
              <Star className="h-3 w-3 fill-[#B8935A] text-[#B8935A]" />
              Ranked by clients
            </span>
          </div>

          <div className="divide-y divide-[#E5DDD0]">
            {top.map((product: any, index: number) => (
              <Link
                key={product.id}
                href={`${basePath}/product/${product.id}`}
                className="group relative flex items-center gap-5 py-6 transition sm:gap-7"
                style={{
                  animation: mounted
                    ? `fadeSlide 0.7s ease-out ${index * 150}ms both`
                    : "none",
                }}
              >
                <span className="hidden shrink-0 font-[family-name:var(--store-display)] text-5xl font-light leading-none text-[#1A1815]/15 transition duration-500 group-hover:text-[#B8935A] sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#F1EBE0]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-[1.08]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-[#8A7F72]">
                      N/A
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-[family-name:var(--store-display)] text-lg font-medium tracking-[-0.015em] text-[#1A1815] transition group-hover:text-[#8F6E3D]">
                    {product.name}
                  </p>
                  <p className="mt-1 truncate text-[10px] uppercase tracking-[0.2em] text-[#8A7F72]">
                    {[product.brand, product.category]
                      .filter(Boolean)
                      .join(" · ")}{" "}
                    · {product.reviewCount || 0} reviews
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#D4AF7A]/20 px-2.5 py-1 text-[10px] text-[#8F6E3D]">
                    <TrendingUp className="h-3 w-3" strokeWidth={2.4} />
                    <span className="uppercase tracking-[0.2em]">
                      Trending this week
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-[family-name:var(--store-display)] text-lg text-[#1A1815]">
                    {formatMoney(product.price)}
                  </p>
                  {product.compareAt && product.compareAt > product.price && (
                    <p className="mt-0.5 text-[11px] text-[#8A7F72] line-through">
                      {formatMoney(product.compareAt)}
                    </p>
                  )}
                </div>

                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 -translate-x-2 text-[#8A7F72] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                  strokeWidth={2.4}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}