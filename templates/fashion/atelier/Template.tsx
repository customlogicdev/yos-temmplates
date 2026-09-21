// src/templates/fashion/atelier/Template.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import type { TemplateRenderProps } from "@/lib/types";

// Sections
import { AtelierShell } from "./layout/AtelierShell";
import { AtelierHero } from "./sections/Hero";
import { AtelierCategoryGrid } from "./sections/CategoryGrid";
import { AtelierFeaturedDrops } from "./sections/FeaturedDrops";
import { AtelierTestimonials } from "./sections/Testimonials";
import { AtelierNewsletter } from "./sections/Newsletter";

// Pages
import { AtelierShopPage } from "./pages/ShopPage";
import { AtelierProductPage } from "./pages/ProductPage";
import { AtelierCartPage } from "./pages/CartPage";
import { AtelierCollectionPage } from "./pages/CollectionPage";
import { AtelierAccountPage } from "./pages/AccountPage";      // 👈 ADD

// Fallback
import {
  AboutPage,
  ContactPage,
  SearchPage,
} from "@/templates/kit/sections";

export function FashionAtelierTemplate(props: TemplateRenderProps) {
  const p: any = props as any;
  const data: any = p.data || { products: [], featuredProducts: [] };
  const slug: string = p?.slug || p?.data?.slug || "";
  const page: string = p.page || "home";

  return (
    <TemplateFrame props={props}>
      <AtelierShell props={props} slug={slug}>
        {/* 🏠 HOME */}
        {page === "home" && (
          <>
            <AtelierHero props={props} />
            <AtelierCategoryGrid props={props} />
            <AtelierFeaturedDrops props={props} />
            <AtelierTestimonials props={props} />
            <AtelierNewsletter props={props} />
          </>
        )}

        {/* 🛍️ SHOP (all products) */}
        {page === "products" && (
          <AtelierShopPage
            slug={slug}
            store={data.store}
            products={data.products}
            categories={data.categories}
            title="All"
            subtitle="Drops"
          />
        )}

        {/* 📂 COLLECTION (category-specific layout) */}
        {page === "collection" && <AtelierCollectionPage props={props} />}

        {/* 🥦 PRODUCT */}
        {page === "product" && (
          <AtelierProductPage
            slug={slug}
            product={p.product}
            relatedProducts={data.products.filter(
              (pr: any) => pr.id !== p.product?.id
            )}
          />
        )}

        {/* 🛒 CART */}
        {page === "cart" && (
          <AtelierCartPage slug={slug} customer={p.customer} />
        )}

        {/* 👤 ACCOUNT — all account-related pages */}
        {(page === "account" ||
          page === "account-login" ||
          page === "account-register" ||
          page === "orders" ||
          page === "order") && (
          <AtelierAccountPage
            slug={slug}
            customer={p.customer}
            sub={p.sub}
            tab={p.tab}
          />
        )}

        {/* ℹ️ STATIC */}
        {page === "about" && <AboutPage props={props} />}
        {page === "contact" && (
          <ContactPage props={props} heading="Atelier Contact" />
        )}

        {/* 🔍 SEARCH */}
        {page === "search" && (
          <SearchPage props={props} title={`Search — "${p.query ?? ""}"`} />
        )}

        {/* 💳 CHECKOUT (fallback) */}
        {page === "checkout" && (
          <AtelierCartPage slug={slug} customer={p.customer} />
        )}
      </AtelierShell>
    </TemplateFrame>
  );
}

export default FashionAtelierTemplate;