// src/templates/fashion/luxe/sections/Lookbook.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/templates/kit/sections";
import type { TemplateRenderProps } from "@/lib/types";

interface LookbookProps {
  props: TemplateRenderProps;
}

export function FashionLookbook({ props }: LookbookProps) {
  const slug = props?.slug || props?.data?.slug || "";
  const products = (
    props?.data?.featuredProducts ||
    props?.data?.products ||
    []
  ).slice(0, 4);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (products.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-[1600px] px-5 py-24 lg:px-10">
      {/* Section Masthead */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#E5DDD0] pb-7">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#8F6E3D]">
            <Sparkles className="h-3 w-3" strokeWidth={2.4} />
            The Lookbook
          </p>
          <h2 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-[#1A1815]">
            New <span className="italic">arrivals</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#6A6156]">
            Curated from this season's editorials. Limited quantities, made in
            our Mumbai atelier.
          </p>
        </div>
        <Link
          href={`/store/${slug}?page=products`}
          className="group inline-flex items-center gap-2 border-b border-[#1A1815] pb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A1815]"
        >
          View All Pieces
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={2.4}
          />
        </Link>
      </div>

      {/* Editorial Staggered Grid */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product: any, index: number) => {
          const offsetY = index % 2 === 1 ? "lg:mt-8" : "";

          return (
            <div
              key={product.id}
              className={`relative ${offsetY}`}
              style={{
                animation: mounted
                  ? `fadeUp 0.9s ease-out ${index * 120}ms both`
                  : "none",
              }}
            >
              {/* Look index header */}
              <div className="mb-3 flex items-center justify-between">
                <span className="font-[family-name:var(--store-display)] text-[10px] tracking-[0.28em] text-[#8A7F72]">
                  Look {String(index + 1).padStart(2, "0")}
                </span>
                {index === 0 && (
                  <span className="inline-flex items-center gap-1.5 border border-[#D4AF7A] bg-[#D4AF7A]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-[#8F6E3D]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B8935A]" />
                    New
                  </span>
                )}
              </div>

              <ProductCard
                product={product}
                basePath={`/store/${slug}`}
              />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}