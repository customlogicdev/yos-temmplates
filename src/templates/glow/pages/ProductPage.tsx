// src/templates/beauty/glow/pages/ProductPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { BeautyShell } from "../layout/Shell";
import { ProductCard } from "@/components/storefront/product";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  Minus,
  Plus,
  Leaf,
} from "lucide-react";

export function BeautyProductPage({ slug, store, product, relatedProducts = [] }: any) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [product.image, product.image, product.image];
  const basePath = `/store/${slug}`;

  const handleAddToCart = () => {
    add(
      {
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      },
      qty
    );
  };

  return (
    <BeautyShell props={{ data: { store }, basePath }} slug={slug}>
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#2A2438]/50">
          <Link href={`/store/${slug}/beauty/shop`} className="hover:text-pink-500">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#2A2438]">{product.name}</span>
        </nav>

        {/* Main */}
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-pink-50">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    selectedImage === i
                      ? "border-pink-500"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-pink-500">
              {product.category}
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-[#2A2438] lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex gap-0.5 text-pink-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-[#2A2438]/60">4.8 · 124 reviews</span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-[#2A2438]">
                {formatMoney(product.price)}
              </span>
              {product.compareAt && (
                <>
                  <span className="text-lg text-[#2A2438]/40 line-through">
                    {formatMoney(product.compareAt)}
                  </span>
                  <span className="rounded-full bg-pink-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-pink-600">
                    Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-[#2A2438]/70">
              {product.description ||
                "Clinically-proven formula with clean, vegan ingredients. Dermatologist-tested and gentle on all skin types."}
            </p>

            {/* Ingredients badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
              <Leaf className="h-3.5 w-3.5 text-green-600" strokeWidth={2} />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
                Vegan · Cruelty-Free
              </span>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/store/${slug}/beauty/concern/${tag}`}
                    className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-[11px] uppercase tracking-wider text-pink-600 hover:bg-pink-100"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-pink-200">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 text-[#2A2438]/60 hover:text-pink-500"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 text-[#2A2438]/60 hover:text-pink-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2A2438] py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-pink-500"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Bag
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-pink-200 text-pink-500 transition hover:bg-pink-50">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-pink-100 pt-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-5 w-5 text-pink-500" strokeWidth={1.8} />
                <p className="mt-2 text-[10px] uppercase tracking-wider text-[#2A2438]/60">
                  Free Shipping
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="h-5 w-5 text-pink-500" strokeWidth={1.8} />
                <p className="mt-2 text-[10px] uppercase tracking-wider text-[#2A2438]/60">
                  Easy Returns
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-5 w-5 text-pink-500" strokeWidth={1.8} />
                <p className="mt-2 text-[10px] uppercase tracking-wider text-[#2A2438]/60">
                  Dermatologist Tested
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to use */}
        <div className="mt-20">
          <h2 className="text-center font-serif text-2xl text-[#2A2438]">
            How to <span className="italic text-pink-500">use</span>
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Cleanse", desc: "Start with a fresh, clean face" },
              { step: "02", title: "Apply", desc: "Take 2-3 drops and pat gently" },
              { step: "03", title: "Glow", desc: "Use morning & night for best results" },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-pink-100 bg-white p-6"
              >
                <span className="font-serif text-3xl italic text-pink-300">
                  {item.step}
                </span>
                <h3 className="mt-3 font-medium text-[#2A2438]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#2A2438]/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-center font-serif text-2xl text-[#2A2438]">
              You may also <span className="italic text-pink-500">love</span>
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((p: any) => (
                <ProductCard key={p.id} product={p} basePath={basePath} />
              ))}
            </div>
          </div>
        )}
      </div>
    </BeautyShell>
  );
}