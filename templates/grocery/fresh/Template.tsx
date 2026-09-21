// src/templates/grocery/fresh/Template.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import { ProductPage, AboutPage, ContactPage } from "@/templates/kit/sections";
import type { TemplateRenderProps } from "@/lib/types";

// ✅ Shell (footer + wrapper)
import { GroceryShell } from "./layout/GroceryShell";

// ✅ Navbar (rendered here for legacy ?page= routes)
import { GroceryNavbar } from "./layout/GroceryNavbar";

// ✅ Home Sections
import { GroceryHero } from "./sections/Hero";
import { FlashDeals } from "./sections/FlashDeals";
import { CategoryTiles } from "./sections/CategoryTiles";
import { CategoryProducts } from "./sections/CategoryProducts";
import { FreshArrivals } from "./sections/FreshArrivals";
import { DailyOffers } from "./sections/DailyOffers";
import { HowItWorks } from "./sections/HowItWorks";
import { RecipeIdeas } from "./sections/RecipeIdeas";
import { GroceryTestimonials } from "./sections/Testimonials";
import { GroceryNewsletter } from "./sections/Newsletter";

// ✅ Pages
import { GroceryShopPage } from "./pages/ShopPage";
import { GroceryCartPage } from "./pages/CartPage";
import { GroceryCheckoutPage } from "./pages/CheckoutPage";
import { GroceryAislePage } from "./pages/AislePage";
import { GroceryAccountPage } from "./pages/AccountPage";

export function GroceryFreshTemplate(props: TemplateRenderProps) {
  const data = props.data || {
    products: [],
    featuredProducts: [],
    categories: [],
  };
  const slug = props?.slug || props?.data?.slug || "";
  const page = props.page || "home";
  const category = props.category;
  const customer = (props as any).customer;

  return (
    <TemplateFrame props={props}>
      <GroceryShell props={props} slug={slug}>
        {/* ✅ NAVBAR — rendered here for legacy ?page= routes.
            For /grocery/* routes, it's rendered by grocery/layout.tsx */}
        <GroceryNavbar props={props} slug={slug} />

        {/* 🏠 HOME */}
        {page === "home" && (
          <>
            <GroceryHero props={props} />
            <CategoryTiles props={props} />
            <FlashDeals props={props} />
            <CategoryProducts props={props} />
            <FreshArrivals props={props} />
            <DailyOffers props={props} />
            <HowItWorks props={props} />
            <RecipeIdeas props={props} />
            <GroceryTestimonials props={props} />
            <GroceryNewsletter props={props} />
          </>
        )}

        {/* 🛒 SHOP */}
        {page === "products" && (
          <GroceryShopPage
            slug={slug}
            store={data.store}
            products={data.products}
            categories={data.categories}
          />
        )}

        {/* 📂 AISLE */}
        {page === "collection" && category && (
          <GroceryAislePage
            slug={slug}
            store={data.store}
            products={data.products}
            category={category}
          />
        )}

        {/* 🥦 PRODUCT */}
        {page === "product" && <ProductPage props={props} />}

        {/* 🛍️ CART */}
        {page === "cart" && (
          <GroceryCartPage slug={slug} store={data.store} />
        )}

        {/* 💳 CHECKOUT */}
        {page === "checkout" && (
          <GroceryCheckoutPage
            slug={slug}
            store={data.store}
            customer={customer}
          />
        )}

        {/* 👤 ACCOUNT */}
        {page === "account" && (
          <GroceryAccountPage
            slug={slug}
            store={data.store}
            customer={customer}
          />
        )}

        {/* ℹ️ STATIC */}
        {page === "about" && <AboutPage props={props} />}
        {page === "contact" && (
          <ContactPage props={props} heading="Delivery & Orders" />
        )}
      </GroceryShell>
    </TemplateFrame>
  );
}