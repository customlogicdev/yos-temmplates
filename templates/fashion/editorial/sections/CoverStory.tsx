// src/templates/fashion/editorial/sections/CoverStory.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { TemplateRenderProps } from "@/lib/types";

interface CoverStoryProps {
  props: TemplateRenderProps;
  ranked: any[];
}

export function CoverStory({ props, ranked }: CoverStoryProps) {
  const basePath = props.basePath || "";
  const hero = ranked[0];
  const secondary = ranked.slice(1, 4);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!hero) {
    return (
      <section className="mx-auto max-w-[1500px] px-5 py-20">
        <div className="border border-[var(--store-border)] p-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
            Cover story
          </p>
          <h2 className="mt-4 font-[family-name:var(--store-display)] text-2xl opacity-60">
            No featured products yet
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-[1500px] px-5 py-20">
      {/* Section Masthead */}
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-[var(--store-border)] pb-6">
        <div>
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--store-accent)]" />
            Volume 01 · Cover Story
          </p>
          <h2 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            The <span className="italic">Edit</span>
          </h2>
        </div>
        <p className="max-w-xs text-xs leading-relaxed opacity-55">
          Featured this issue — the pieces our editors return to, season
          after season.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* LEFT — Hero Feature Card (7 cols) */}
        <div
          className={`lg:col-span-7 transition-all duration-1000 ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="group relative">
            {/* Magazine Badge */}
            <div className="absolute -left-2 -top-2 z-10 flex items-center gap-2 bg-[var(--store-fg)] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--store-bg)] shadow-lg sm:-left-3 sm:-top-3">
              <BookOpen className="h-3 w-3" strokeWidth={2.4} />
              Feature
            </div>

            {/* Main Image */}
            <Link
              href={`${basePath}/products/${hero.slug || hero.id}`}
              className="block overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)]"
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
                {hero.image ? (
                  <img
                    src={hero.image}
                    alt={hero.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[var(--store-border)]/30 text-xs opacity-40">
                    No image
                  </div>
                )}

                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Bottom overlay content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/70">
                    Look 01 · Editor's Pick
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[0.98] tracking-[-0.02em] text-white">
                    {hero.name || "Featured Product"}
                  </h3>
                  {hero.category && (
                    <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/70">
                      {hero.category}
                      {hero.brand ? ` · ${hero.brand}` : ""}
                    </p>
                  )}
                </div>

                {/* Price tag — pinned corner */}
                <div className="absolute right-4 top-4 flex items-center gap-2 bg-white/95 px-3.5 py-2 backdrop-blur-sm">
                  <Star
                    className="h-3 w-3 fill-amber-500 text-amber-500"
                    strokeWidth={0}
                  />
                  <span className="font-[family-name:var(--store-display)] text-sm text-stone-950">
                    {formatMoney(hero.price ?? 0)}
                  </span>
                </div>
              </div>
            </Link>

            {/* Below-image editorial text */}
            <div className="mt-6 flex items-start justify-between gap-6">
              <p className="line-clamp-3 max-w-lg text-sm leading-7 opacity-65">
                {hero.description ||
                  "A considered piece from our latest edit — crafted in limited runs, designed to be worn for decades."}
              </p>
              <Link
                href={`${basePath}/products/${hero.slug || hero.id}`}
                className="group/cta inline-flex shrink-0 items-center gap-2 border-b border-[var(--store-fg)] pb-1 text-[10px] uppercase tracking-[0.24em]"
              >
                Read &amp; shop
                <ArrowRight
                  className="h-3 w-3 transition-transform group-hover/cta:translate-x-1"
                  strokeWidth={2.4}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — Secondary Editorial Stack (5 cols) */}
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center justify-between border-b border-[var(--store-border)] pb-3">
            <p className="text-[10px] uppercase tracking-[0.28em] opacity-55">
              Also in this issue
            </p>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--store-accent)]">
              02 — 04
            </span>
          </div>

          <div className="space-y-6">
            {secondary.map((product, index) => (
              <Link
                key={product.id}
                href={`${basePath}/products/${product.slug || product.id}`}
                className="group grid grid-cols-[auto_1fr] items-center gap-5 border-b border-[var(--store-border)] pb-6 transition hover:border-[var(--store-fg)]"
                style={{
                  animation: mounted
                    ? `editorialFade 0.8s ease-out ${
                        200 + index * 120
                      }ms both`
                    : "none",
                }}
              >
                {/* Number */}
                <span className="font-[family-name:var(--store-display)] text-4xl font-light leading-none text-[var(--store-fg)] opacity-30 transition group-hover:text-[var(--store-accent)] group-hover:opacity-100 sm:text-5xl">
                  {String(index + 2).padStart(2, "0")}
                </span>

                {/* Image */}
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[var(--store-border)]/30 text-[10px] opacity-40">
                        N/A
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] uppercase tracking-[0.28em] opacity-45">
                      Look {String(index + 2).padStart(2, "0")}
                    </p>
                    <h4 className="mt-1.5 truncate font-[family-name:var(--store-display)] text-lg leading-tight tracking-[-0.01em] transition group-hover:text-[var(--store-accent)]">
                      {product.name}
                    </h4>
                    <p className="mt-2 font-[family-name:var(--store-display)] text-sm opacity-60">
                      {formatMoney(product.price ?? 0)}
                    </p>
                  </div>

                  <ArrowRight
                    className="h-4 w-4 shrink-0 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={2.4}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Editorial footer note */}
          <div className="mt-8 border border-dashed border-[var(--store-border)] p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] opacity-45">
              From the editors
            </p>
            <p className="mt-2 text-xs leading-relaxed opacity-65">
              Every issue we curate four pieces that define the season —{" "}
              <Link
                href={`${basePath}/products`}
                className="border-b border-[var(--store-fg)] pb-0.5 text-[var(--store-fg)] transition hover:text-[var(--store-accent)]"
              >
                see all edits
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes editorialFade {
          from {
            opacity: 0;
            transform: translateX(16px);
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