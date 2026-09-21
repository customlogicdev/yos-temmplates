// src/templates/fashion/atelier/pages/ProductPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";

export function AtelierProductPage({ slug, product, relatedProducts = [] }: any) {
  const base = `/store/${slug}/fashion`;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-32 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/40">
          PIECE NOT FOUND
        </p>
        <Link
          href={`${base}/shop`}
          className="mt-6 inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-mono text-[10px] font-black uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black"
        >
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  const images = [product.image, ...(product.images || [])].filter(Boolean);
  const inStock = Number(product.inventory ?? 1) > 0;

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10">
        <Link
          href={`${base}/shop`}
          className="inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/40 transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={3} />
          BACK TO SHOP
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-[80px_1fr]">
              {/* Thumbs */}
              {images.length > 1 && (
                <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                  {images.slice(0, 5).map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative aspect-[3/4] w-16 overflow-hidden border transition ${
                        selectedImage === i
                          ? "border-white"
                          : "border-white/10 hover:border-white/40"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main */}
              <div className="order-1 sm:order-2">
                <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/5">
                  {images[selectedImage] ? (
                    <img
                      src={images[selectedImage]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <span className="absolute left-4 top-4 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    · VOL.01
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              {product.category || "SIGNATURE"} / {inStock ? "IN STOCK" : "SOLD OUT"}
            </p>
            <h1 className="mt-4 font-mono text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
              {product.name}
            </h1>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-mono text-2xl font-black text-white">
                {formatMoney(product.price)}
              </span>
              {product.compareAt && product.compareAt > product.price && (
                <span className="font-mono text-sm text-white/40 line-through">
                  {formatMoney(product.compareAt)}
                </span>
              )}
            </div>

            <p className="mt-6 font-mono text-sm leading-relaxed text-white/60">
              {product.description ||
                "Heavyweight construction. Limited archive release. Made for the bold."}
            </p>

            {/* Qty + Add */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-white/20">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-12 w-12 items-center justify-center text-white/60 transition hover:text-white"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={3} />
                </button>
                <span className="w-10 text-center font-mono text-sm font-black">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="flex h-12 w-12 items-center justify-center text-white/60 transition hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={3} />
                </button>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) {
                    add({
                      productId: product.id,
                      name: product.name,
                      image: images[0],
                      price: product.price,
                    });
                  }
                }}
                disabled={!inStock}
                className="flex h-12 flex-1 min-w-[200px] items-center justify-center gap-3 bg-white px-8 font-mono text-[11px] font-black uppercase tracking-[0.25em] text-black transition hover:bg-white/80 disabled:opacity-40"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={3} />
                ADD — {formatMoney(product.price * qty)}
              </button>
            </div>

            {/* Meta */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                { label: "SHIPPING", value: "INSURED" },
                { label: "RETURNS", value: "30 DAYS" },
                { label: "CARE", value: "LIFETIME" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-1 font-mono text-xs font-black text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-16">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              / RELATED
            </p>
            <h2 className="mt-4 font-mono text-3xl font-black uppercase tracking-[-0.02em]">
              YOU MAY ALSO LIKE
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((p: any, i: number) => (
                <Link
                  key={p.id}
                  href={`${base}/product/${p.id}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/5">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    )}
                    <span className="absolute right-3 top-3 font-mono text-[10px] font-black tracking-[0.25em] text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                      {p.category || "SIGNATURE"}
                    </p>
                    <h3 className="mt-1 line-clamp-1 font-mono text-xs font-black uppercase text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 font-mono text-sm font-black text-white">
                      {formatMoney(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}