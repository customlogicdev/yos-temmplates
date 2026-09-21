// src/templates/beauty/lumiere/Template.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import type { TemplateRenderProps } from "@/lib/types";

// Layout
import { LumiereShell } from "./layout/LumiereShell";

// Sections
import { LumiereHero } from "./sections/Hero";
import { LumiereSubCategories } from "./sections/SubCategories";
import { LumiereFeatured } from "./sections/Featured";
import { LumiereEditorialStory } from "./sections/EditorialStory";
import { LumiereRituals } from "./sections/Rituals";
import { LumiereTestimonials } from "./sections/Testimonials";
import { LumiereNewsletter } from "./sections/Newsletter";

// Pages
import { LumiereShopPage } from "./pages/ShopPage";
import { LumiereProductPage } from "./pages/ProductPage";
import { LumiereCartPage } from "./pages/CartPage";
import { LumiereCheckoutPage } from "./pages/CheckoutPage";
import { LumiereOrderPage } from "./pages/OrderPage";
import { LumiereAccountPage } from "./pages/AccountPage";

// Fallback
import {
  AboutPage,
  ContactPage,
  SearchPage,
} from "@/templates/kit/sections";

export function BeautyLumiereTemplate(props: TemplateRenderProps) {
  const p: any = props as any;
  const data: any = p.data || { products: [], featuredProducts: [] };
  const slug: string = p?.slug || p?.data?.slug || "";
  const page: string = p.page || "home";

  const accountSub =
    page === "account-login"
      ? "login"
      : page === "account-register"
      ? "register"
      : p.sub || "dashboard";

  return (
    <TemplateFrame props={props}>
      <LumiereShell props={props} slug={slug}>
        {/* HOME */}
        {page === "home" && (
          <>
            <LumiereHero props={props} />
            <LumiereSubCategories props={props} />
            <LumiereFeatured props={props} />
            <LumiereEditorialStory props={props} />
            <LumiereRituals props={props} />
            <LumiereTestimonials props={props} />
            <LumiereNewsletter props={props} />
          </>
        )}

        {/* SHOP */}
        {page === "products" && (
          <LumiereShopPage
            slug={slug}
            store={data.store}
            products={data.products}
            categories={data.categories}
            title="All"
            subtitle="Beauty"
          />
        )}

        {/* COLLECTION */}
        {page === "collection" && (
          <LumiereShopPage
            slug={slug}
            store={data.store}
            products={data.products}
            categories={data.categories}
            lockedCategoryId={p.category?.slug || ""}
            title={p.category?.name || "Collection"}
          />
        )}

        {/* PRODUCT */}
        {page === "product" && (
          <LumiereProductPage
            slug={slug}
            product={p.product}
            relatedProducts={data.products.filter(
              (pr: any) => pr.id !== p.product?.id
            )}
          />
        )}

        {/* CART */}
        {page === "cart" && (
          <LumiereCartPage slug={slug} customer={p.customer} />
        )}

        {/* CHECKOUT */}
        {page === "checkout" && (
          <LumiereCheckoutPage
            slug={slug}
            customer={p.customer}
            store={data.store}
          />
        )}

        {/* ORDER */}
        {(page === "order" || page === "orders") && (
          <LumiereOrderPage
            slug={slug}
            order={p.order}
            orderId={p.orderId}
          />
        )}

        {/* ACCOUNT */}
        {(page === "account" ||
          page === "account-login" ||
          page === "account-register") && (
          <LumiereAccountPage
            slug={slug}
            customer={p.customer}
            page={page}
            sub={accountSub}
            tab={p.tab}
            store={data.store}
          />
        )}

        {/* STATIC */}
        {page === "about" && <AboutPage props={props} />}
        {page === "contact" && (
          <ContactPage props={props} heading="Lumière Consultation" />
        )}

        {/* SEARCH */}
        {page === "search" && (
          <SearchPage props={props} title={`Search — "${p.query ?? ""}"`} />
        )}
      </LumiereShell>
    </TemplateFrame>
  );
}

export default BeautyLumiereTemplate;