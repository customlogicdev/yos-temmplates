// src/templates/beauty/lumiere/sections/Featured.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { Plus, Star, Check } from "lucide-react";
import { useState } from "react";

export function LumiereFeatured({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const products = (
    props?.data?.featuredProducts ||
    props?.data?.products ||
    []
  ).slice(0, 6);
  const { add } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  if (products.length === 0) return null;

  const handleAdd = (product: any) => {
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section className="relative overflow-hidden border-t border-[#E8DDD5]/60 bg-white py-20 lg:py-24">
      {/* Subtle blob */}
      <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-[#FFB6A3]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#E8DDD5] pb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
              The Icons
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal italic leading-tight tracking-tight text-[#1F1B24]">
              Bestselling <span className="text-[#B76E79]">rituals</span>
            </h2>
          </div>
          <Link
            href={`${base}?page=products`}
            className="text-sm font-semibold text-[#B76E79] underline decoration-[#B76E79]/40 underline-offset-8 transition hover:decoration-[#B76E79]"
          >
            View all →
          </Link>
        </div>

        {/* Grid — smaller cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any, i: number) => {
            // Rotate decorative colors
            const colors = ["#FFB6A3", "#A8E6CF", "#C9B6E4", "#FFE5A3", "#FFC7D4", "#B8E6E1"];
            const cardColor = colors[i % colors.length];

            return (
              <div key={product.id} className="group relative">
                <Link href={`${base}?page=product&product=${product.id}`}>
                  {/* Colored glow behind */}
                  <div
                    className="absolute -inset-2 rounded-[2.5rem] opacity-0 blur-xl transition group-hover:opacity-50"
                    style={{ background: cardColor }}
                  />

                  <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-md transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                    {/* Smaller image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      ) : null}

                      {/* Corner tags */}
                      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 backdrop-blur-sm">
                        <Star
                          className="h-2.5 w-2.5"
                          fill="#B76E79"
                          stroke="#B76E79"
                          strokeWidth={0}
                        />
                        <span className="text-[10px] font-bold text-[#1F1B24]">
                          {product.rating || "4.9"}
                        </span>
                      </span>

                      {product.compareAt && product.compareAt > product.price && (
                        <span
                          className="absolute right-3 top-3 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#1F1B24] shadow-lg"
                          style={{ background: cardColor }}
                        >
                          {Math.round(
                            (1 - product.price / product.compareAt) * 100
                          )}
                          % off
                        </span>
                      )}
                    </div>

                    {/* Info card */}
                    <div className="p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
                        {product.category || "Beauty"}
                      </p>
                      <h3 className="mt-1.5 line-clamp-1 font-serif text-base italic text-[#1F1B24]">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#1F1B24]">
                          {formatMoney(product.price)}
                        </span>
                        {product.compareAt && product.compareAt > product.price && (
                          <span className="text-xs text-[#1F1B24]/40 line-through">
                            {formatMoney(product.compareAt)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to bag floating */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdd(product);
                      }}
                      className={`absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full shadow-xl transition ${
                        added === product.id
                          ? "bg-green-500 text-white"
                          : "text-white hover:scale-110"
                      }`}
                      style={
                        added === product.id ? {} : { background: "#1F1B24" }
                      }
                      aria-label="Add to cart"
                    >
                      {added === product.id ? (
                        <Check className="h-4 w-4" strokeWidth={2.6} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={2.6} />
                      )}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}