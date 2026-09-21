// src/templates/beauty/glow/sections/Hero.tsx

"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function BeautyHero({ props }: { props: any }) {
  const data = props?.data || {};
  const basePath = props?.basePath || "";
  const slug = props?.slug || props?.data?.slug || "";   // ✅ Added
  const store = data.store || {};
  const featured = (data.featuredProducts || [])[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-pink-500" strokeWidth={2.5} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-600">
                Find your routine
              </span>
            </div>

            <h1 className="mt-6 font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[0.95] tracking-tight text-[#2A2438]">
              {store.tagline || (
                <>
                  Glow that
                  <span className="italic text-pink-500"> feels </span>
                  like you.
                </>
              )}
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#2A2438]/60">
              {store.about ||
                "Clean, conscious beauty crafted with clinically-proven ingredients. Vegan, cruelty-free, and made for real skin."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* ✅ FIXED: New URL */}
              <Link
                href={`/store/${slug}/beauty/shop`}
                className="group inline-flex items-center gap-2 rounded-full bg-[#2A2438] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-pink-500"
              >
                Shop the Collection
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
              <Link
                href={`${basePath}?page=about`}
                className="inline-flex items-center gap-2 rounded-full border border-[#2A2438]/20 bg-white/60 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm transition hover:border-pink-500 hover:text-pink-500"
              >
                Our Story
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider text-[#2A2438]/60">
              <div className="flex items-center gap-1.5">
                <span className="text-pink-500">🌱</span>
                <span>Vegan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-pink-500">🐰</span>
                <span>Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-pink-500">✓</span>
                <span>Dermatologist Tested</span>
              </div>
            </div>
          </div>

          {/* Right - Featured Product Image */}
          {featured && (
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-pink-200/50">
                <img
                  src={featured.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800"}
                  alt={featured.name || "Featured"}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                    <Sparkles className="h-5 w-5 text-pink-500" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#2A2438]/60">
                      Bestseller
                    </p>
                    <p className="text-sm font-semibold text-[#2A2438]">
                      {featured.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}