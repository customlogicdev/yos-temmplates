// src/templates/beauty/lumiere/sections/SubCategories.tsx

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SUBCATEGORIES = [
  {
    slug: "skincare",
    name: "Skincare",
    desc: "Serums · Moisturizers · Cleansers",
    image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "makeup",
    name: "Makeup",
    desc: "Lips · Eyes · Complexion",
    image: "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "haircare",
    name: "Haircare",
    desc: "Shampoos · Treatments · Styling",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "body",
    name: "Body",
    desc: "Scrubs · Lotions · Oils",
    image: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "fragrance",
    name: "Fragrance",
    desc: "Perfumes · Mists · Candles",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "wellness",
    name: "Wellness",
    desc: "Supplements · Teas · Rituals",
    image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function LumiereSubCategories({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;

  return (
    <section className="border-t border-[#E8DDD5]/60 bg-[#FAF7F5] py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
              The Collections
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal italic leading-tight tracking-tight text-[#1F1B24]">
              Shop by <span className="text-[#B76E79]">ritual</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm text-[#1F1B24]/60">
              From skincare essentials to wellness rituals — every category
              curated for your glow.
            </p>
          </div>
          <Link
            href={`${base}?page=products`}
            className="hidden text-sm font-semibold text-[#B76E79] underline decoration-[#B76E79]/40 underline-offset-8 transition hover:decoration-[#B76E79] md:inline"
          >
            All Categories →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBCATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`${base}?page=collection&category=${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#E8DDD5] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-200/40"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B24]/85 via-[#1F1B24]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-serif text-[10px] italic text-[#D4A5A5]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-2xl italic text-white">
                  {cat.name}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-white/60">
                  {cat.desc}
                </p>
              </div>
              <div className="absolute right-4 top-4 flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full bg-white/95 opacity-0 backdrop-blur-sm transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight
                  className="h-4 w-4 text-[#B76E79]"
                  strokeWidth={2.4}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}