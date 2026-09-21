// src/templates/fashion/editorial/sections/Lookbook.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { TemplateRenderProps } from "@/lib/types";

interface LookbookProps {
  props: TemplateRenderProps;
}

interface Look {
  id: string;
  title: string;
  subtitle: string;
  chapter: string;
  image: string;
  href: string;
  featured?: boolean;
}

export function Lookbook({ props }: LookbookProps) {
  const basePath = props.basePath || "";
  const data: any = props.data || { products: [] };
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const products = (data.products || []).slice(0, 3);
  const fallbackImages = [
    "https://images.pexels.com/photos/18516749/pexels-photo-18516749.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/16575980/pexels-photo-16575980.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/27742425/pexels-photo-27742425.jpeg?auto=compress&cs=tinysrgb&w=900",
  ];

  const looks: Look[] =
    products.length >= 3
      ? products.map((p: any, i: number) => ({
          id: String(p.id ?? i),
          title: p.name || `Look ${i + 1}`,
          subtitle: p.category || p.brand || "Editorial",
          chapter: `Chapter ${String(i + 1).padStart(2, "0")}`,
          image: p.image || fallbackImages[i % fallbackImages.length],
          href: `${basePath}/products/${p.slug || p.id}`,
          featured: i === 1,
        }))
      : [
          {
            id: "urban-elegance",
            title: "Urban Elegance",
            subtitle: "City Edit",
            chapter: "Chapter 01",
            image: fallbackImages[0],
            href: `${basePath}/products`,
          },
          {
            id: "minimalist-chic",
            title: "Minimalist Chic",
            subtitle: "Quiet Luxury",
            chapter: "Chapter 02",
            image: fallbackImages[1],
            href: `${basePath}/products`,
            featured: true,
          },
          {
            id: "editorial-edge",
            title: "Editorial Edge",
            subtitle: "Statement",
            chapter: "Chapter 03",
            image: fallbackImages[2],
            href: `${basePath}/products`,
          },
        ];

  return (
    <section className="relative mx-auto max-w-[1500px] px-5 py-24">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--store-border)] pb-6">
        <div>
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
            <Sparkles className="h-3 w-3" strokeWidth={2.4} />
            The Lookbook
          </p>
          <h2 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            New <span className="italic">Collection</span>
          </h2>
        </div>
        <Link
          href={`${basePath}/products`}
          className="group inline-flex items-center gap-2 border-b border-[var(--store-fg)] pb-1 text-[11px] uppercase tracking-[0.24em]"
        >
          Browse all chapters
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={2.4}
          />
        </Link>
      </div>

      {/* Editorial staggered grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-12">
        {looks.map((look, index) => {
          const colSpan = "md:col-span-4";
          const isFeatured = look.featured;
          const offsetClass = isFeatured ? "md:-mt-12" : "";

          return (
            <Link
              key={look.id}
              href={look.href}
              className={`group relative block ${colSpan} ${offsetClass}`}
              style={{
                animation: mounted
                  ? `lookbookFade 0.9s ease-out ${index * 150}ms both`
                  : "none",
              }}
            >
              {/* Chapter label */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--store-accent)]">
                  {look.chapter}
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] opacity-40">
                  {look.subtitle}
                </span>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)]">
                <div
                  className={`relative w-full overflow-hidden ${
                    isFeatured ? "aspect-[3/4]" : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-[1.06]"
                  />

                  {isFeatured && (
                    <div className="absolute left-4 top-4 flex items-center gap-2 bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-stone-950">
                        Editor's Note
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white">
                      View look
                      <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="mt-4">
                <h3 className="font-[family-name:var(--store-display)] text-xl leading-tight tracking-[-0.015em] transition group-hover:text-[var(--store-accent)]">
                  {look.title}
                </h3>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.24em] opacity-45">
                  {look.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[var(--store-border)] pt-8 sm:flex-row">
        <p className="max-w-md text-xs leading-relaxed opacity-55">
          Each chapter is released in limited quantities. New looks are added
          every Thursday at 10 AM IST.
        </p>
        <Link
          href={`${basePath}/products`}
          className="group inline-flex items-center gap-3 bg-[var(--store-fg)] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--store-bg)] transition hover:opacity-90"
        >
          Shop full lookbook
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={2.4}
          />
        </Link>
      </div>

      <style jsx>{`
        @keyframes lookbookFade {
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