// src/templates/fashion/luxe/sections/Hero.tsx

"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { TemplateRenderProps } from "@/lib/types";

interface HeroProps {
  props: TemplateRenderProps;
}

export function FashionLuxeHero({ props }: HeroProps) {
  const slug = props?.slug || props?.data?.slug || "";
  const data: any = props?.data || {};
  const store: any = data.store || {};
  const basePath = `/store/${slug}/fashion`;

  const featured = (data.featuredProducts || data.products || [])[0];
  const secondary = (data.featuredProducts || data.products || []).slice(1, 3);

  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      setMousePos({ x, y });
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  const headline = store.heroTitle || "Where quiet\nluxury lives";
  const [line1, line2] = headline.split("\n");

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2]">
      {/* Ambient gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#B8935A]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#D4AF7A]/10 blur-3xl"
      />

      {/* Editorial masthead strip */}
      <div className="relative mx-auto max-w-[1600px] px-5 pt-10 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DDD0] pb-4 text-[10px] uppercase tracking-[0.32em] text-[#8A7F72]">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8935A] animate-pulse" />
            {store.season || "Autumn / Winter 25"}
          </span>
          <span className="hidden sm:inline">
            {store.tagline || "Made in limited runs"}
          </span>
          <span>Issue 14</span>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-14 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:py-24">
        {/* LEFT — Copy */}
        <div
          className={`relative z-10 lg:col-span-5 transition-all duration-1000 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 border border-[#D4AF7A]/40 bg-white/60 px-3 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-[#B8935A]" strokeWidth={2.4} />
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#8F6E3D]">
              The New Collection
            </span>
          </div>

          <h1 className="mt-8 font-[family-name:var(--store-display)] text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[0.92] tracking-[-0.035em] text-[#1A1815]">
            {line1}
            {line2 && (
              <>
                <br />
                <span className="relative inline-block italic">
                  <span className="relative z-10">{line2}</span>
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-0 -z-0 h-3 w-full bg-[#D4AF7A]/30"
                  />
                </span>
              </>
            )}
          </h1>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#6A6156]">
            {store.heroSubtitle ||
              "A considered collection of ready-to-wear, crafted in our Mumbai atelier. Made in limited runs, designed to last decades."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href={`${basePath}/shop`}
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-[#B8935A] transition-transform duration-500 group-hover:translate-x-0"
              />
              <span className="relative z-10">Discover Collection</span>
              <ArrowRight
                className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </Link>
            <Link
              href={`${basePath}/about`}
              className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A1815]"
            >
              <span className="relative">
                The Atelier
                <span className="absolute -bottom-1 left-0 h-px w-full bg-[#1A1815] transition-all duration-300 group-hover:w-0" />
                <span className="absolute -bottom-1 right-0 h-px w-0 bg-[#B8935A] transition-all duration-300 group-hover:w-full" />
              </span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Trust Row */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.22em] text-[#8A7F72]">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-[#B8935A] text-[#B8935A]"
                  />
                ))}
              </div>
              <span>4.9 / 5 · 2,400 reviews</span>
            </div>
            <span className="hidden h-3 w-px bg-[#E5DDD0] sm:block" />
            <span className="hidden sm:inline">Trusted by 50,000+</span>
          </div>
        </div>

        {/* RIGHT — Image Composition */}
        <div ref={heroRef} className="relative lg:col-span-7">
          <div className="grid grid-cols-12 gap-4">
            {/* Primary Image with parallax */}
            <div
              className={`col-span-12 sm:col-span-8 transition-all duration-1000 delay-150 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="group relative aspect-[4/5] overflow-hidden bg-[#F1EBE0]">
                {featured?.image ? (
                  <img
                    src={featured.image}
                    alt={featured.name || "Featured"}
                    className="h-full w-full object-cover transition duration-[1.5s] group-hover:scale-[1.05]"
                    style={{
                      transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)`,
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#8A7F72]">
                    Featured
                  </div>
                )}

                {/* Corner accents */}
                <div className="pointer-events-none absolute inset-0 z-10">
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-white/80" />
                  <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-white/80" />
                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-white/80" />
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-white/80" />
                </div>

                {/* Look tag */}
                <div className="absolute left-6 top-6 z-20 flex items-center gap-2 bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8935A]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#1A1815]">
                    Look 01
                  </span>
                </div>

                {featured && (
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#1A1815]/90 via-[#1A1815]/40 to-transparent p-7">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.32em] text-white/70">
                          Featured Piece
                        </p>
                        <h3 className="mt-2 font-[family-name:var(--store-display)] text-2xl text-white sm:text-3xl">
                          {featured.name}
                        </h3>
                        <p className="mt-2 font-[family-name:var(--store-display)] text-base text-[#D4AF7A]">
                          {formatMoney(featured.price ?? 0)}
                        </p>
                      </div>
                      <Link
                        href={`${basePath}/product/${featured.id}`}
                        aria-label={`View ${featured.name}`}
                        className="group/btn flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#1A1815] transition duration-500 hover:scale-110 hover:bg-[#B8935A] hover:text-white"
                      >
                        <ArrowRight
                          className="h-5 w-5 transition-transform group-hover/btn:rotate-[-45deg]"
                          strokeWidth={2.4}
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Side Stack */}
            <div className="col-span-12 flex flex-col gap-4 sm:col-span-4">
              {secondary.slice(0, 2).map((p: any, i: number) => (
                <Link
                  key={p.id || i}
                  href={`${basePath}/product/${p.id}`}
                  className={`group relative block overflow-hidden bg-[#F1EBE0] transition-all duration-1000 ${
                    mounted
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <div className="aspect-[4/5] w-full">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition duration-[1.5s] group-hover:scale-[1.08]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-[#8A7F72]">
                        Look {String(i + 2).padStart(2, "0")}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1815]/85 to-transparent p-5">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#D4AF7A]">
                      Look {String(i + 2).padStart(2, "0")}
                    </p>
                    <p className="mt-1 truncate font-[family-name:var(--store-display)] text-sm text-white">
                      {p.name}
                    </p>
                  </div>
                </Link>
              ))}

              {/* CTA Tile */}
              <Link
                href={`${basePath}/shop`}
                className={`group relative flex flex-1 flex-col items-start justify-between overflow-hidden border border-[#E5DDD0] bg-white p-6 transition-all duration-1000 hover:border-[#B8935A] ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <span
                  aria-hidden
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#D4AF7A]/20 transition-transform duration-700 group-hover:scale-150"
                />

                <span className="relative text-[9px] uppercase tracking-[0.32em] text-[#8A7F72]">
                  The Lookbook
                </span>
                <span className="relative mt-4 font-[family-name:var(--store-display)] text-xl leading-[1.05] tracking-[-0.02em] text-[#1A1815]">
                  Explore
                  <br />
                  <span className="italic text-[#8F6E3D]">
                    all {data.products?.length || 0} pieces
                  </span>
                </span>
                <span className="relative mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#1A1815]">
                  View All
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.4}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}