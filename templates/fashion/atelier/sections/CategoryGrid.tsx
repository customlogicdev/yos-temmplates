// src/templates/fashion/atelier/sections/CategoryGrid.tsx

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function AtelierCategoryGrid({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const categories = props?.data?.categories || [];
  const products = props?.data?.products || [];

  if (categories.length === 0) return null;

  const displayCategories = categories.slice(0, 4);

  return (
    <section className="border-t border-zinc-200/60 bg-white py-20">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Categories
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight text-zinc-900">
              Browse the{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent italic">
                Archive
              </span>
            </h2>
          </div>
          <Link
            href={`${base}?page=products`}
            className="hidden text-sm font-semibold text-zinc-600 underline decoration-zinc-300 underline-offset-8 transition hover:text-zinc-900 hover:decoration-zinc-900 md:inline"
          >
            All Categories →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayCategories.map((cat: any, i: number) => {
            const catImage =
              cat.image ||
              products.find(
                (p: any) =>
                  p.category === cat.name || p.categorySlug === cat.slug
              )?.image;

            return (
              <Link
                key={cat.id || cat.slug || i}
                href={`${base}?page=collection&category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
              >
                {catImage ? (
                  <img
                    src={catImage}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-pink-100" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-xl font-bold text-white">
                    {cat.name}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {cat.count || 0} items
                  </p>
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full bg-white/95 opacity-0 backdrop-blur-sm transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 text-zinc-900" strokeWidth={2.4} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}