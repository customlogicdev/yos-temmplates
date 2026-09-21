// src/templates/kit/sections.tsx

"use client";

import type { ReactNode } from "react";
import type { TemplateRenderProps } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import { formatMoney } from "@/lib/format";
import { filterVisibleProducts, isProductVisible } from "@/lib/product-utils";
import { useCart } from "@/components/cart";
import { AccountMenu } from "@/components/customer/account-menu";

export type Chrome = {
  header?: string;
  megaMenu?: boolean;
  stickyShopBar?: boolean;
};

// ============================================================
// TICKER
// ============================================================
export function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[var(--store-border)] bg-[var(--store-surface)] py-3">
      <div className="flex w-max animate-[nexora-marquee_34s_linear_infinite] gap-10 whitespace-nowrap text-[11px] uppercase tracking-[0.22em] opacity-70">
        {doubled.map((item, index) => (
          <span key={item + index} className="flex items-center gap-10">
            {item}
            <span className="text-[var(--store-accent)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EDITORIAL ROW
// ============================================================
export function EditorialRow({ props }: any) {
  const products = filterVisibleProducts(props?.data?.products);
  const basePath = props?.basePath || "";
  const top = [...products]
    .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  if (top.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-14">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
        <div className="flex flex-col justify-between rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-7">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--store-accent)]">
              Editor's Pick
            </p>
            <h3 className="mt-3 font-[family-name:var(--store-display)] text-3xl leading-tight tracking-[-0.02em]">
              Most Loved This Season
            </h3>
            <p className="mt-4 text-sm leading-7 opacity-65">
              Curated from our best-selling collection
            </p>
          </div>
          <Link
            href={`${basePath}?page=products`}
            className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--store-accent)]"
          >
            Shop All →
          </Link>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--store-display)] text-2xl tracking-[-0.02em]">
              Top Rated
            </h3>
            <span className="text-[11px] uppercase tracking-[0.14em] opacity-50">
              Ranked by reviews
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {top.map((product: any, index: number) => {
              const img =
                product.image ||
                product.images?.[0] ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";
              return (
                <Link
                  key={product.id}
                  href={`${basePath}?page=product&product=${product.id}`}
                  className="group flex items-center gap-4 rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-3 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="w-8 text-center font-[family-name:var(--store-display)] text-2xl opacity-35">
                    {index + 1}
                  </span>
                  <img
                    src={img}
                    alt=""
                    className="h-16 w-14 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-[11px] opacity-55">
                      {product.category || product.brand || "Product"} ·{" "}
                      {product.reviewCount || 0} reviews
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[var(--store-accent)]">
                    {formatMoney
                      ? formatMoney(product.price)
                      : `₹${product.price}`}
                  </span>
                  <span className="rounded-full border border-[var(--store-border)] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] group-hover:bg-[var(--store-accent)] group-hover:text-[var(--store-accent-fg)]">
                    View
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SHELL
// ============================================================
export function Shell({ children, props, chrome }: any) {
  const basePath = props?.basePath || "";
  const page = props?.page || "home";
  const brandTitle =
    props?.data?.store?.name || props?.storefront?.brandName || "Store";
  const slug = props?.slug || "";

  const { lines } = useCart();
  const productCount = new Set(lines.map((item: any) => item.productId)).size;

  return (
    <div className="min-h-screen bg-[var(--store-bg)] text-[var(--store-fg)]">
      <header className="sticky top-0 z-50 border-b border-[var(--store-border)] bg-[var(--store-bg)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4">
          {/* LEFT — Brand */}
          <Link
            href={`${basePath}?page=home`}
            className="shrink-0 text-xl font-bold tracking-tight text-[var(--store-accent)]"
          >
            {brandTitle}
          </Link>

          {/* CENTER — Nav */}
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <Link
              href={`${basePath}?page=home`}
              className={`hover:text-[var(--store-accent)] ${
                page === "home"
                  ? "text-[var(--store-accent)] font-semibold"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={`${basePath}?page=products`}
              className={`hover:text-[var(--store-accent)] ${
                page === "products"
                  ? "text-[var(--store-accent)] font-semibold"
                  : ""
              }`}
            >
              Products
            </Link>
            <Link
              href={`${basePath}?page=about`}
              className={`hover:text-[var(--store-accent)] ${
                page === "about"
                  ? "text-[var(--store-accent)] font-semibold"
                  : ""
              }`}
            >
              About
            </Link>
            <Link
              href={`${basePath}?page=contact`}
              className={`hover:text-[var(--store-accent)] ${
                page === "contact"
                  ? "text-[var(--store-accent)] font-semibold"
                  : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT — Account + Cart */}
          <div className="flex shrink-0 items-center gap-3">
            <AccountMenu slug={slug} basePath={basePath} />

            <Link
              href={`${basePath}?page=cart`}
              className="relative rounded-full border border-[var(--store-border)] px-4 py-2 text-sm transition hover:bg-[var(--store-surface)]"
            >
              🛒 Cart
              {productCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {productCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================
export function Hero({ props, tone = "split" }: any) {
  const data = props?.data || {};
  const visibleProducts = filterVisibleProducts(data.products);
  const featured =
    filterVisibleProducts(data.featuredProducts)[0] || visibleProducts[0];

  const title =
    data.store?.tagline ||
    props?.storefront?.description ||
    "Welcome to Our Store";
  const desc =
    data.store?.about ||
    "Discover our curated collection of premium products, crafted for quality.";
  const heroImage =
    featured?.image ||
    featured?.images?.[0] ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--store-surface)] to-[var(--store-bg)] py-20">
      <div className="mx-auto max-w-[1400px] px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-[family-name:var(--store-display)] text-5xl font-bold leading-tight tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[var(--store-muted)]">
              {desc}
            </p>
            <Link
              href={`${props.basePath || ""}?page=products`}
              className="mt-6 inline-block rounded-full bg-[var(--store-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
            >
              Shop Collection →
            </Link>
          </div>
          {featured && (
            <div className="overflow-hidden rounded-2xl border border-[var(--store-border)] shadow-xl">
              <img
                src={heroImage}
                alt={featured.name || "Featured"}
                className="aspect-square w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRODUCT CARD
// ============================================================
export function ProductCard({ product, basePath }: any) {
  const { add } = useCart();

  if (!product) return null;
  if (!isProductVisible(product)) return null;

  const imageUrl =
    product.image ||
    product.images?.[0] ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800";

  const productHref = `${basePath}?page=product&product=${encodeURIComponent(
    product.id
  )}`;

  const handleAdd = () => {
    add({
      productId: product.id,
      name: product.name || product.title || "Product",
      image: imageUrl,
      price: product.price,
    });
  };

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] transition hover:-translate-y-1 hover:shadow-lg">
      <div>
        <Link href={productHref}>
          <div className="relative aspect-square overflow-hidden bg-[var(--store-surface)]">
            <img
              src={imageUrl}
              alt={product.name || "Product"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="p-4 pb-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--store-muted)]">
            {product.category || "General"}
          </div>
          <Link href={productHref}>
            <h3 className="mt-1 line-clamp-1 font-semibold group-hover:text-[var(--store-accent)]">
              {product.name}
            </h3>
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold text-[var(--store-accent)]">
              {formatMoney ? formatMoney(product.price) : `₹${product.price}`}
            </span>
            {product.compareAt && (
              <span className="text-sm text-[var(--store-muted)] line-through">
                {formatMoney
                  ? formatMoney(product.compareAt)
                  : `₹${product.compareAt}`}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 p-4 pt-3">
        <Link
          href={productHref}
          className="flex-1 rounded-full border border-[var(--store-border)] py-2 text-center text-xs font-semibold transition hover:border-[var(--store-accent)]"
        >
          View
        </Link>
        <button
          onClick={handleAdd}
          className="flex-1 rounded-full bg-[var(--store-accent)] py-2 text-xs font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SHOP SECTION — supports search query + category lock
// ============================================================
export function ShopSection({
  props,
  title = "All Products",
  subtitle,
  lockedCategoryId,
  initialQuery,
  showSidebar = true,
  products: productsProp,
}: any) {
  const basePath = props?.basePath || "";

  const sourceProducts = productsProp
    ? filterVisibleProducts(productsProp)
    : filterVisibleProducts(props?.data?.products);

  const [query, setQuery] = useState<string>(initialQuery || "");

  const visibleProducts = sourceProducts.filter((p: any) => {
    // 1. Category lock
    if (lockedCategoryId) {
      const cat = (p.category || "").toLowerCase();
      const lock = String(lockedCategoryId).toLowerCase();
      const catMatch =
        cat === lock ||
        p.categoryId === lockedCategoryId ||
        String(p.categoryId).toLowerCase() === lock;
      if (!catMatch) return false;
    }

    // 2. Search query
    const q = query.trim().toLowerCase();
    if (q) {
      const haystack = [
        p.name,
        p.title,
        p.category,
        p.brand,
        p.description,
        p.sku,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--store-border)] pb-4">
        <div>
          <h2 className="font-[family-name:var(--store-display)] text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-[var(--store-muted)]">{subtitle}</p>
          )}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--store-muted)]">
          {visibleProducts.length} Products
        </span>
      </div>

      {/* Inline search bar */}
      {showSidebar && (
        <div className="mt-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search within results…"
              aria-label="Search products"
              className="w-full rounded-full border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-2.5 text-sm outline-none focus:border-[var(--store-accent)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--store-muted)] hover:text-[var(--store-fg)]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {visibleProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-base text-[var(--store-muted)]">
            {query.trim()
              ? `No products match "${query}".`
              : "No products found in this collection."}
          </p>
          <Link
            href={`${basePath}?page=products`}
            className="mt-3 inline-block text-xs uppercase tracking-widest text-[var(--store-accent)] hover:underline"
          >
            View all products →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              basePath={basePath}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================
// CATEGORY RAIL
// ============================================================
export function CategoryRail({ props }: any) {
  const categories =
    props?.data?.categories || props?.storefront?.categories || [];
  const basePath = props?.basePath || "";

  if (!categories.length) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--store-display)] text-2xl font-bold">
          Shop by Category
        </h2>
        <Link
          href={`${basePath}?page=products`}
          className="text-sm text-[var(--store-accent)] hover:underline"
        >
          All Categories →
        </Link>
      </div>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {categories.map((category: any) => (
          <Link
            key={category.id || category.slug}
            href={`${basePath}?page=collection&category=${
              category.slug || category.id
            }`}
            className="flex-shrink-0 rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-6 py-4 transition hover:border-[var(--store-accent)] hover:shadow-md"
          >
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIAL WALL
// ============================================================
export function TestimonialWall({ props }: any) {
  const testimonials =
    props?.data?.testimonials ||
    props?.storefront?.testimonials || [
      {
        id: "1",
        author: "Pooja Hegde",
        content:
          "Exceptional quality and swift delivery. Completely matched the preview!",
        rating: 5,
      },
      {
        id: "2",
        author: "Aman Sharma",
        content: "Great craftsmanship and genuine products. Very satisfied.",
        rating: 5,
      },
      {
        id: "3",
        author: "Sunita Roy",
        content:
          "Smooth checkout process and pristine packaging. Highly recommend!",
        rating: 5,
      },
    ];

  return (
    <section className="mx-auto my-10 max-w-[1400px] rounded-3xl bg-[var(--store-surface)] px-5 py-16">
      <div className="text-center">
        <h2 className="font-[family-name:var(--store-display)] text-3xl font-bold">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-sm text-[var(--store-muted)]">
          Real reviews from genuine buyers
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t: any) => (
          <div
            key={t.id}
            className="flex flex-col justify-between rounded-xl border border-[var(--store-border)] bg-[var(--store-bg)] p-6 shadow-sm"
          >
            <div>
              <div className="flex text-sm text-[var(--store-accent)]">
                {"★".repeat(t.rating || 5)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--store-fg)]/80">
                "{t.content}"
              </p>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--store-muted)]">
              — {t.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
export function AboutPage({ props }: any) {
  const data = props?.data || {};
  const store = data.store || {};

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20">
      <div className="text-center">
        <h1 className="font-[family-name:var(--store-display)] text-4xl font-bold">
          About Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--store-muted)]">
          {store.tagline ||
            "We're passionate about bringing you curated quality goods."}
        </p>
      </div>
      <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-[family-name:var(--store-display)] text-2xl font-bold">
            Our Philosophy
          </h3>
          <p className="mt-4 leading-relaxed text-[var(--store-muted)]">
            {store.about ||
              `We began with a clear purpose: to bridge authentic craftsmanship with modern convenience. Every item in our collection is carefully inspected for longevity, style, and uncompromising standard.`}
          </p>
          <p className="mt-4 leading-relaxed text-[var(--store-muted)]">
            Our commitment is to deliver transparent, reliable, and premium
            retail experiences right to your doorstep.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6 text-center">
            <div className="text-3xl font-bold text-[var(--store-accent)]">
              100%
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-[var(--store-muted)]">
              Authentic
            </div>
          </div>
          <div className="rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6 text-center">
            <div className="text-3xl font-bold text-[var(--store-accent)]">
              4.9★
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-[var(--store-muted)]">
              Average Rating
            </div>
          </div>
          <div className="rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6 text-center">
            <div className="text-3xl font-bold text-[var(--store-accent)]">
              Fast
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-[var(--store-muted)]">
              Express Dispatch
            </div>
          </div>
          <div className="rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6 text-center">
            <div className="text-3xl font-bold text-[var(--store-accent)]">
              Direct
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-[var(--store-muted)]">
              Concierge Help
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
export function ContactPage({ props, heading = "Contact Us" }: any) {
  const [status, setStatus] = useState("");

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20">
      <div className="text-center">
        <h1 className="font-[family-name:var(--store-display)] text-4xl font-bold">
          {heading}
        </h1>
        <p className="mt-4 text-base text-[var(--store-muted)]">
          We are here to assist with your orders and questions.
        </p>
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📧</span>
            <div>
              <h4 className="text-sm font-semibold">Customer Care</h4>
              <p className="text-sm text-[var(--store-muted)]">
                support@storefront.in
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <h4 className="text-sm font-semibold">Headquarters</h4>
              <p className="text-sm text-[var(--store-muted)]">
                Indore, Madhya Pradesh, India
              </p>
            </div>
          </div>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("Thank you! Your message has been received.");
            setTimeout(() => setStatus(""), 4000);
          }}
        >
          <input
            type="text"
            required
            placeholder="Full Name"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
          />
          <textarea
            rows={4}
            required
            placeholder="Your Inquiry"
            className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
          />
          <button className="rounded-full bg-[var(--store-accent)] px-8 py-3 text-sm font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90">
            Send Inquiry
          </button>
          {status && (
            <p className="text-sm font-medium text-green-600">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}

// ============================================================
// CART PAGE
// ============================================================
export function CartPage({ props }: any) {
  const basePath = props?.basePath || "";
  const slug = props?.slug || "";
  const { lines, subtotal, setQty, remove, clear } = useCart();

  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20">
      <h1 className="font-[family-name:var(--store-display)] text-4xl font-bold">
        Your Bag
      </h1>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-[var(--store-border)] py-20 text-center">
          <p className="text-sm text-[var(--store-muted)]">
            Your shopping bag is currently empty.
          </p>
          <Link
            href={`${basePath}?page=products`}
            className="mt-4 inline-block rounded-full bg-[var(--store-accent)] px-8 py-3 text-sm font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
          >
            Browse Catalog →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {lines.map((item: any, index: number) => {
              const qty = item.qty ?? item.quantity ?? 1;
              return (
                <div
                  key={`${item.productId}-${item.variant ?? ""}-${index}`}
                  className="flex items-center gap-4 border-b border-[var(--store-border)] pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                    {item.variant && (
                      <p className="text-xs text-[var(--store-muted)]">
                        {item.variant}
                      </p>
                    )}
                    <p className="text-sm font-bold text-[var(--store-accent)]">
                      {formatMoney(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center rounded-lg border border-[var(--store-border)]">
                    <button
                      onClick={() =>
                        setQty(item.productId, item.variant, qty - 1)
                      }
                      className="px-2.5 py-1.5 text-[var(--store-muted)] hover:text-[var(--store-fg)]"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {qty}
                    </span>
                    <button
                      onClick={() =>
                        setQty(item.productId, item.variant, qty + 1)
                      }
                      className="px-2.5 py-1.5 text-[var(--store-muted)] hover:text-[var(--store-fg)]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => remove(item.productId, item.variant)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="h-fit rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Summary
            </h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--store-muted)]">Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--store-muted)]">Delivery</span>
                <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--store-border)] pt-2 font-bold">
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </div>

              <Link
                href={
                  slug ? `/store/${slug}/checkout` : `${basePath}?page=cart`
                }
                className="mt-4 block w-full rounded-full bg-[var(--store-accent)] py-3 text-center text-xs uppercase tracking-widest font-semibold text-[var(--store-accent-fg)] hover:opacity-90 transition"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={clear}
                className="mt-2 w-full text-center text-xs text-[var(--store-muted)] hover:text-red-500"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
export function ProductPage({ props }: any) {
  const { add } = useCart();

  const productId = props?.productId || props?.product?.id || "";
  const basePath = props?.basePath || "";

  const products = filterVisibleProducts(props?.data?.products);

  const product =
    (props.product && isProductVisible(props.product) ? props.product : null) ||
    products.find((p: any) => String(p.id) === String(productId)) ||
    null;

  if (!product) {
    return (
      <div className="p-20 text-center">
        <p className="text-[var(--store-muted)]">Product not found.</p>
        <Link
          href={`${basePath}?page=products`}
          className="mt-4 inline-block text-xs uppercase tracking-widest text-[var(--store-accent)] hover:underline"
        >
          Return to Catalog →
        </Link>
      </div>
    );
  }

  const imageUrl =
    product.image ||
    product.images?.[0] ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000";

  const handleAdd = () => {
    add({
      productId: product.id,
      name: product.name || product.title || "Product",
      image: imageUrl,
      price: product.price,
    });
  };

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-12">
      <Link
        href={`${basePath}?page=products`}
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--store-muted)] transition hover:text-[var(--store-accent)]"
      >
        ← Back to Catalog
      </Link>
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-[var(--store-border)] bg-[var(--store-surface)]">
          <img
            src={imageUrl}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--store-muted)]">
            {product.category || "General"}
          </div>
          <h1 className="mt-2 font-[family-name:var(--store-display)] text-3xl font-bold tracking-tight">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[var(--store-accent)]">
              {formatMoney ? formatMoney(product.price) : `₹${product.price}`}
            </span>
            {product.compareAt && (
              <span className="text-lg text-[var(--store-muted)] line-through">
                {formatMoney
                  ? formatMoney(product.compareAt)
                  : `₹${product.compareAt}`}
              </span>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--store-muted)]">
            {product.description || "Authentic quality, crafted with precision."}
          </p>
          <div className="mt-6 space-y-2 border-t border-[var(--store-border)] pt-6 text-sm">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--store-muted)]">
                SKU:
              </span>
              <span>{product.sku || "N/A"}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--store-muted)]">
                Availability:
              </span>
              <span className="font-medium text-green-600">In Stock</span>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="mt-8 w-full rounded-full bg-[var(--store-accent)] py-4 text-sm font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
          >
            Add to Bag —{" "}
            {formatMoney ? formatMoney(product.price) : `₹${product.price}`}
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SEARCH PAGE
// ============================================================
export function SearchPage({
  props,
  title,
}: {
  props: TemplateRenderProps;
  title?: string;
}) {
  const query = (props.query ?? "").trim();
  const basePath = props?.basePath || "";

  if (!query) {
    return (
      <section className="mx-auto max-w-[1400px] px-5 py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--store-accent)]">
            Search
          </p>
          <h1 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            What are you looking for?
          </h1>
          <p className="mt-4 text-sm opacity-60">
            Enter a product name, category, or keyword to begin.
          </p>

          <form
            action={basePath}
            method="get"
            className="mt-8 flex items-center gap-2 border-b border-[var(--store-fg)] pb-2"
          >
            <input type="hidden" name="page" value="search" />
            <input
              type="search"
              name="query"
              autoFocus
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full bg-transparent text-base outline-none placeholder:opacity-40"
            />
            <button
              type="submit"
              className="text-[10px] uppercase tracking-[0.22em] opacity-70 transition hover:opacity-100"
            >
              Search →
            </button>
          </form>
        </div>
      </section>
    );
  }
 

  return (
    <ShopSection
      props={props}
      title={title ?? `Search — "${query}"`}
      subtitle={`Showing results for "${query}"`}
      initialQuery={query}
      showSidebar={true}
    />
  );
}
 
// ============================================================
// ACCOUNT PAGE
// ============================================================
export function AccountPage({ props }: any) {
  const basePath = props?.basePath || "";
  const slug = props?.slug || "";
  const customer = props?.customer || null;

  if (!customer) {
    return (
      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[var(--store-border)] bg-[var(--store-surface)]">
            <span className="text-3xl">👤</span>
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
            Your Account
          </p>
          <h1 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.03em]">
            Sign in to <span className="italic">continue</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[var(--store-muted)]">
            Access your orders, saved items, and personalized recommendations.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`${basePath}?page=account&sub=login`}
              className="inline-flex items-center gap-3 rounded-full bg-[var(--store-accent)] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--store-accent-fg)] transition hover:opacity-90"
            >
              Sign in →
            </Link>
            <Link
              href={`${basePath}?page=account&sub=register`}
              className="inline-flex items-center gap-3 rounded-full border border-[var(--store-fg)] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--store-fg)] transition hover:bg-[var(--store-fg)] hover:text-[var(--store-bg)]"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const menu = [
    { href: `${basePath}?page=account&tab=orders`, emoji: "📦", label: "My Orders", desc: "Track, return, or view past purchases" },
    { href: `${basePath}?page=account&tab=wishlist`, emoji: "❤️", label: "Wishlist", desc: "Your saved items" },
    { href: `${basePath}?page=account&tab=addresses`, emoji: "📍", label: "Addresses", desc: "Delivery preferences" },
    { href: `${basePath}?page=account&tab=settings`, emoji: "⚙️", label: "Settings", desc: "Profile and preferences" },
  ];

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-24">
      <div className="border-b border-[var(--store-border)] pb-8">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--store-accent)]" />
          Your Account
        </p>
        <h1 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.03em]">
          Hello,{" "}
          <span className="italic text-[var(--store-accent)]">
            {customer.name?.split(" ")[0] || "there"}
          </span>
        </h1>
        {customer.email && (
          <p className="mt-3 text-sm text-[var(--store-muted)]">
            📧 {customer.email}
          </p>
        )}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {menu.map(({ href, emoji, label, desc }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-start gap-5 rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-7 transition hover:-translate-y-1 hover:border-[var(--store-accent)] hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--store-border)] text-2xl transition group-hover:border-[var(--store-accent)] group-hover:bg-[var(--store-accent)]">
              <span>{emoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-[family-name:var(--store-display)] text-lg tracking-[-0.01em]">
                {label}
              </h3>
              <p className="mt-1 text-xs text-[var(--store-muted)]">{desc}</p>
            </div>
            <span className="text-[var(--store-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--store-accent)]">
              →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center border-t border-[var(--store-border)] pt-8">
        <Link
          href={`${basePath}?page=account&sub=logout`}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--store-muted)] transition hover:text-red-500"
        >
          Sign out
        </Link>
      </div>
    </section>
  );
}

// ============================================================
// ACCOUNT LOGIN PAGE
// ============================================================
export function AccountLoginPage({ props }: any) {
  const basePath = props?.basePath || "";

  return (
    <section className="mx-auto max-w-md px-5 py-20 lg:py-28">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
          Welcome back
        </p>
        <h1 className="mt-3 font-[family-name:var(--store-display)] text-3xl tracking-[-0.02em]">
          Sign in
        </h1>
      </div>

      <form className="mt-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-[var(--store-accent)] py-4 text-sm font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[var(--store-muted)]">
        Don't have an account?{" "}
        <Link
          href={`${basePath}?page=account&sub=register`}
          className="font-semibold text-[var(--store-accent)] hover:underline"
        >
          Create one
        </Link>
      </p>
    </section>
  );
}

// ============================================================
// ACCOUNT REGISTER PAGE
// ============================================================
export function AccountRegisterPage({ props }: any) {
  const basePath = props?.basePath || "";

  return (
    <section className="mx-auto max-w-md px-5 py-20 lg:py-28">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--store-accent)]">
          Join us
        </p>
        <h1 className="mt-3 font-[family-name:var(--store-display)] text-3xl tracking-[-0.02em]">
          Create your account
        </h1>
      </div>

      <form className="mt-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          required
          placeholder="Full name"
          className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="w-full rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--store-accent)]"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-[var(--store-accent)] py-4 text-sm font-semibold text-[var(--store-accent-fg)] transition hover:opacity-90"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[var(--store-muted)]">
        Already have an account?{" "}
        <Link
          href={`${basePath}?page=account&sub=login`}
          className="font-semibold text-[var(--store-accent)] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}