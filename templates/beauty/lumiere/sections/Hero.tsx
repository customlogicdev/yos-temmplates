// src/templates/beauty/lumiere/sections/Hero.tsx

"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Star, Heart, Flower2, Leaf } from "lucide-react";

export function LumiereHero({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const data = props?.data || {};
  const products = data.products || [];
  const store = data.store || {};

  const heroProduct = products[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFE5E9] via-[#FAF7F5] to-[#E8DDD5]">
      {/* Decorative colorful blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#FFB6A3]/40 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-[#C9B6E4]/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#A8E6CF]/30 blur-3xl" />
      </div>

      {/* Floating decorative flowers */}
      <Flower2 className="pointer-events-none absolute left-8 top-32 h-16 w-16 animate-pulse text-[#B76E79]/20" />
      <Leaf className="pointer-events-none absolute bottom-32 right-12 h-14 w-14 rotate-45 text-[#A8E6CF]/40" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* LEFT — Copy */}
          <div className="lg:col-span-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#B76E79]/30 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" strokeWidth={2.4} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B76E79]">
                The Beauty Edit · 2026
              </span>
            </div>

            {/* Big headline with multi-color */}
            <h1 className="mt-8 font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] font-normal italic leading-[0.9] tracking-tight text-[#1F1B24]">
              <span className="block">Radiance,</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#B76E79] via-[#FFB6A3] to-[#C9B6E4] bg-clip-text text-transparent">
                  reimagined.
                </span>
                {/* Hand-drawn underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q75 2, 150 8 T298 6"
                    stroke="#FFB6A3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-10 max-w-md text-base leading-relaxed text-[#1F1B24]/70">
              {store.about ||
                "Clean, conscious beauty. Crafted with clinically-proven ingredients and a touch of glamour."}
            </p>

            {/* CTA Row */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={`${base}?page=products`}
                className="group inline-flex items-center gap-2 rounded-full bg-[#1F1B24] px-8 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#B76E79]/30 transition hover:scale-105"
              >
                Shop the Collection
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.4}
                />
              </Link>
              <Link
                href={`${base}?page=about`}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-[#1F1B24]/10 bg-white/60 px-8 py-4 text-sm font-semibold text-[#1F1B24] backdrop-blur-sm transition hover:border-[#B76E79] hover:bg-white"
              >
                <Heart className="h-3.5 w-3.5 text-[#B76E79]" strokeWidth={2.4} />
                Our Story
              </Link>
            </div>

            {/* Colored stat pills */}
            <div className="mt-12 flex flex-wrap items-center gap-3">
              {[
                { value: "100%", label: "Vegan", color: "#A8E6CF" },
                { value: "4.9★", label: "Rated", color: "#FFE5A3" },
                { value: "50K+", label: "Glowing", color: "#C9B6E4" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl border border-[#E8DDD5] bg-white/80 px-4 py-3 backdrop-blur-sm"
                >
                  <span
                    className="flex h-2.5 w-2.5 rounded-full"
                    style={{ background: stat.color }}
                  />
                  <div>
                    <p className="font-serif text-lg font-bold italic text-[#1F1B24]">
                      {stat.value}
                    </p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#1F1B24]/50">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Smaller framed image with collage */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md">
              {/* Big decorative circle behind */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-[#FFB6A3]/30 via-[#C9B6E4]/20 to-transparent blur-2xl" />

              {/* Main framed image (smaller) */}
              <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-2xl shadow-[#B76E79]/30">
                <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                  {heroProduct?.image ? (
                    <img
                      src={heroProduct.image}
                      alt={heroProduct.name || "Featured"}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-rose-100 to-pink-100">
                      <Sparkles className="h-16 w-16 text-[#B76E79]/30" />
                    </div>
                  )}
                </div>

                {/* Top-left rating tag */}
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                  <Star
                    className="h-3 w-3"
                    fill="#B76E79"
                    stroke="#B76E79"
                    strokeWidth={0}
                  />
                  <span className="text-[10px] font-bold text-[#1F1B24]">4.9</span>
                </div>

                {/* Bottom product info */}
                {heroProduct && (
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-4 backdrop-blur-sm">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#B76E79]">
                      Bestseller
                    </p>
                    <p className="mt-1 font-serif text-base italic text-[#1F1B24]">
                      {heroProduct.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Small floating secondary image (top-right) */}
              {products[1]?.image && (
                <div className="absolute -right-8 -top-8 hidden h-32 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl shadow-[#B76E79]/20 lg:block">
                  <img
                    src={products[1].image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Small floating tertiary image (bottom-left) */}
              {products[2]?.image && (
                <div className="absolute -bottom-8 -left-8 hidden h-28 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl shadow-[#C9B6E4]/30 lg:block">
                  <img
                    src={products[2].image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Floating colored badge */}
              <div className="absolute -right-4 top-1/2 hidden rounded-2xl bg-[#A8E6CF] px-4 py-2 shadow-lg lg:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#1F1B24]">
                  New ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}