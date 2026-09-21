// src/templates/fashion/editorial/Template.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import {
  Shell,
  Hero,
  ShopSection,
  TestimonialWall,
  Ticker,
  ProductPage,
  AboutPage,
  ContactPage,
  CartPage,
  CategoryRail,
  SearchPage,
} from "@/templates/kit/sections";
import type { TemplateRenderProps } from "@/lib/types";

import { CoverStory } from "./sections/CoverStory";
import { Lookbook } from "./sections/Lookbook";

export function FashionEditorialTemplate(props: TemplateRenderProps) {
  const chrome = {
    header: props.runtime?.variant?.id === "utility" ? "utility" : "centered",
    megaMenu: false,
  } as const;

  const data: any = props.data || { products: [], featuredProducts: [] };
  const page = props.page || "home";

  const products = data.products || [];

  const topPrice = products.length
    ? Math.max(...products.map((p: any) => Number(p.price) || 0))
    : 0;

  const ranked = [...products]
    .sort((a: any, b: any) => (b.reviewCount || 0) - (a.reviewCount || 0))
    .slice(0, 4);

  const store = data.store || {};
  const storeAddress = store.address || "Mumbai, India";

  return (
    <TemplateFrame props={props}>
      <Shell props={props} chrome={chrome}>
        {page === "home" && (
          <>
            {/* Editorial Masthead Bar */}
            <div className="border-b border-[var(--store-border)] bg-[var(--store-surface)]/40">
              <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 text-[10px] uppercase tracking-[0.32em]">
                <span className="flex items-center gap-2 opacity-70">
                  <span className="h-1 w-1 rounded-full bg-[var(--store-accent)]" />
                  Issue 14
                </span>
                <span className="hidden opacity-55 md:inline">
                  {storeAddress}
                </span>
                <span className="opacity-70">
                  Top · ₹ {topPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Ticker
              items={[
                "The quiet season",
                "New arrivals weekly",
                "Editor's picks inside",
                "Made in limited runs",
              ]}
            />

            <Hero props={props} tone="plain" />

            <CoverStory props={props} ranked={ranked} />

            <CategoryRail props={props} />

            <Lookbook props={props} />

            <TestimonialWall props={props} />
          </>
        )}

        {page === "products" && (
          <ShopSection
            props={props}
            title="The Shop"
            subtitle="A full commerce grid with an editorial skin"
            products={products}
          />
        )}

        {page === "collection" && (
          <ShopSection
            props={props}
            lockedCategoryId={props.category?.id ?? null}
            title={props.category?.name ?? "Feature"}
          />
        )}

        {page === "product" && <ProductPage props={props} />}
        {page === "about" && <AboutPage props={props} />}
        {page === "contact" && (
          <ContactPage props={props} heading="Letters to the Editor" />
        )}
        {page === "cart" && <CartPage props={props} />}

        {page === "search" && (
          <SearchPage
            props={props}
            title={`Index — "${props.query ?? ""}"`}
          />
        )}
      </Shell>
    </TemplateFrame>
  );
}

export default FashionEditorialTemplate;