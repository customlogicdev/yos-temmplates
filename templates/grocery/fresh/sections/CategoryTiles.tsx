// src/templates/grocery/fresh/sections/CategoryTiles.tsx

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon } from "@/lib/category-icons";

export function CategoryTiles({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const categories = props?.data?.categories || [];

  if (categories.length === 0) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 py-12">
        <div className="rounded-3xl border-2 border-dashed border-green-200 py-16 text-center">
          <p className="text-sm text-green-800/60">
            No categories yet. Add products to see aisles here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-600">
            Shop by Aisle
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-green-900">
            Everything you need
          </h2>
        </div>
        <Link
          href={`/store/${slug}?page=products`}
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-600 hover:text-green-800"
        >
          All Categories
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat: any) => {
          const { Icon, color, bg } = getCategoryIcon(cat.slug);
          return (
            <Link
              key={cat.slug}
              href={`/store/${slug}?page=collection&category=${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 text-center transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl transition-transform duration-500 group-hover:scale-110"
                style={{ background: bg }}
              >
                <Icon className="h-10 w-10" style={{ color }} strokeWidth={1.8} />
              </div>
              <p className="mt-4 text-sm font-bold text-slate-900">{cat.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                {cat.count} items
              </p>
              <p
                className="mt-2 text-[10px] font-bold uppercase tracking-wider"
                style={{ color }}
              >
                Shop Now →
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}