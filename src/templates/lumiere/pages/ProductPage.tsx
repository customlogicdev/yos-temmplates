// src/templates/beauty/lumiere/pages/ProductPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import {
  Minus,
  Plus,
  ArrowLeft,
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export function LumiereProductPage({
  slug,
  product,
  relatedProducts = [],
}: any) {
  const base = `/store/${slug}`;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <p className="font-serif text-2xl italic text-[#B76E79]">
          Piece not found
        </p>
        <Link
          href={`${base}?page=products`}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E8DDD5] bg-white px-6 py-3 text-sm font-semibold text-[#1F1B24] transition hover:border-[#B76E79]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
          Back to shop
        </Link>
      </div>
    );
  }

  const images = [product.image, ...(product.images || [])].filter(Boolean);
  const inStock = Number(product.inventory ?? 1) > 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add({
        productId: product.id,
        name: product.name,
        image: images[0],
        price: product.price,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="min-h-screen bg-[#FAF7F5]">
      <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10">
        {/* Breadcrumb */}
        <Link
          href={`${base}?page=products`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1B24]/50 transition hover:text-[#B76E79]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
          Back to shop
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-[80px_1fr]">
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
                  {images.slice(0, 5).map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative aspect-[3/4] w-16 overflow-hidden rounded-2xl border-2 transition ${
                        selectedImage === i
                          ? "border-[#B76E79]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="order-1 sm:order-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[#E8DDD5] bg-white shadow-lg shadow-rose-100/40">
                  {images[selectedImage] ? (
                    <img
                      src={images[selectedImage]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}

                  {/* Rating badge */}
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                    <Star
                      className="h-3.5 w-3.5"
                      fill="#B76E79"
                      stroke="#B76E79"
                      strokeWidth={0}
                    />
                    <span className="text-xs font-bold text-[#1F1B24]">
                      {product.rating || "4.9"}
                    </span>
                  </span>

                  {!inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                      <span className="rounded-full bg-[#1F1B24] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
              {product.category || "Beauty"}
            </p>

            <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-normal italic leading-[0.95] tracking-tight text-[#1F1B24]">
              {product.name}
            </h1>

            {/* Rating + reviews */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i <= Math.round(product.rating || 5)
                        ? "fill-[#B76E79] text-[#B76E79]"
                        : "text-[#E8DDD5]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#1F1B24]/50">
                {product.reviewCount || 128} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-serif text-3xl font-bold text-[#1F1B24]">
                {formatMoney(product.price)}
              </span>
              {product.compareAt && product.compareAt > product.price && (
                <span className="text-lg text-[#1F1B24]/40 line-through">
                  {formatMoney(product.compareAt)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-[#1F1B24]/60">
              {product.description ||
                "A luxurious, clinically-proven formula. Crafted with clean ingredients for skin that glows from within."}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Vegan", "Cruelty-Free", "Dermatologist-Tested"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD5] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#B76E79]"
                >
                  <Sparkles className="h-3 w-3" strokeWidth={2} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Qty + Add */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-[#E8DDD5] bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-12 w-12 items-center justify-center text-[#1F1B24]/60 transition hover:text-[#B76E79]"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={2.6} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#1F1B24]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="flex h-12 w-12 items-center justify-center text-[#1F1B24]/60 transition hover:text-[#B76E79]"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!inStock}
                className={`flex h-12 flex-1 min-w-[200px] items-center justify-center gap-3 rounded-full px-8 text-sm font-semibold shadow-xl transition disabled:opacity-40 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-[#1F1B24] text-white hover:scale-105 hover:bg-[#B76E79]"
                }`}
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
                {added ? "Added to bag" : `Add to bag — ${formatMoney(product.price * qty)}`}
              </button>

              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8DDD5] bg-white text-[#1F1B24]/60 transition hover:border-[#B76E79] hover:text-[#B76E79]"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#E8DDD5] pt-8">
              {[
                { Icon: Truck, label: "Free shipping" },
                { Icon: RotateCcw, label: "Easy returns" },
                { Icon: ShieldCheck, label: "Secure pay" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Icon className="h-5 w-5 text-[#B76E79]" strokeWidth={1.8} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1F1B24]/50">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-[#E8DDD5] pt-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
              / You may also love
            </p>
            <h2 className="mt-4 font-serif text-3xl font-normal italic tracking-tight text-[#1F1B24]">
              Complete your ritual
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((p: any) => (
                <Link
                  key={p.id}
                  href={`${base}?page=product&product=${p.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[#E8DDD5] bg-white shadow-sm transition group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-rose-200/40">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
                      {p.category || "Beauty"}
                    </p>
                    <h3 className="mt-1 line-clamp-1 font-serif text-sm italic text-[#1F1B24]">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-[#1F1B24]">
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