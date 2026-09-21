// src/templates/healthcare/clinic/Template.tsx

"use client";

import { TemplateFrame } from "@/templates/frame";
import {
  Shell,
  Hero,
  ShopSection,
  TestimonialWall,
  ProductPage,
  AboutPage,
  ContactPage,
  CartPage,
  ProductCard,
} from "@/templates/kit/sections";
import type { TemplateRenderProps } from "@/lib/types";

// ✅ UNIQUE HEALTHCARE SECTIONS
import { DepartmentGrid } from "./sections/Departments";
import { DoctorProfiles } from "./sections/Doctors";
import { AppointmentBanner } from "./sections/Appointment";
import { QuickActions } from "./sections/QuickActions";
import { HealthPackages } from "./sections/HealthPackages";
import { EmergencyStrip } from "./sections/EmergencyStrip";
import { WhyChooseUs } from "./sections/WhyChooseUs";
import { HealthTips } from "./sections/HealthTips";

// ✅ NAYE IMPORTS — Customer Auth + Checkout
import { LoginForm } from "@/components/customer/login-form";
import { RegisterForm } from "@/components/customer/register-form";
import { CheckoutForm } from "@/components/customer/checkout-form";
import { AccountPage } from "@/components/customer/account-page";
import { OrderConfirmation } from "@/components/customer/order-confirmation";

export function HealthcareClinicTemplate(props: TemplateRenderProps) {
  const chrome = {
    header: "utility",
    megaMenu: false,
    stickyShopBar: true,
  };

  const data = props.data || {
    products: [],
    featuredProducts: [],
    categories: [],
  };
  const basePath = props.basePath || "";
  const page = props.page || "home";
  const query = props.query || "";

  // ✅ Slug — multiple sources
  const slug = props?.slug || props?.data?.slug || "";

  return (
    <TemplateFrame props={props}>
      <Shell props={props} chrome={chrome} slug={slug}>
        {page === "home" && (
          <>
            {/* 🚨 Emergency Strip — always visible on top */}
            <EmergencyStrip props={props} />

            {/* 🎯 Hero — healthcare-specific */}
            <Hero props={props} tone="split" />

            {/* ⚡ Quick Actions — same-day slots, reports, pharmacy */}
            <QuickActions props={props} />

            {/* 🏥 Departments — care by specialty */}
            <DepartmentGrid props={props} />

            {/* 👨‍⚕️ Doctors — meet our specialists */}
            <DoctorProfiles props={props} />

            {/* 💊 Health Packages — checkups & bundles */}
            <HealthPackages props={props} />

            {/* 🏆 Why Choose Us — trust builders */}
            <WhyChooseUs props={props} />

            {/* 🛒 Popular Services / Pharmacy */}
            <section className="mx-auto max-w-[1400px] px-5 py-12">
              <div className="mb-6 flex items-end justify-between border-b border-[var(--store-border)] pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--store-accent)]">
                    Pharmacy
                  </p>
                  <h2 className="mt-1.5 font-[family-name:var(--store-display)] text-[clamp(1.8rem,3.5vw,2.5rem)] leading-none tracking-[-0.02em]">
                    Health Essentials
                  </h2>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(data.featuredProducts || [])
                  .slice(0, 3)
                  .map((product: any) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      basePath={basePath}
                    />
                  ))}
              </div>
            </section>

            {/* 💬 Patient Stories */}
            <TestimonialWall props={props} />

            {/* 📰 Health Tips / Blog */}
            <HealthTips props={props} />

            {/* 📅 Final CTA — Book Appointment */}
            <AppointmentBanner props={props} />
          </>
        )}

        {page === "products" && (
          <ShopSection
            props={props}
            title="Pharmacy"
            subtitle="Health products and essentials"
            products={data.products}
          />
        )}

        {page === "product" && <ProductPage props={props} />}
        {page === "about" && <AboutPage props={props} />}
        {page === "contact" && (
          <ContactPage props={props} heading="Talk to Reception" />
        )}
        {page === "cart" && <CartPage props={{ ...props, slug }} />}

        {/* ✅ NAYE CASES — Customer Auth + Checkout */}
        {page === "login" && (
          <LoginForm
            dbName={data.store?.dbName || ""}
            storeId={data.store?.id || ""}
            slug={slug}
            storeName={data.store?.name || "Store"}
          />
        )}
        {page === "register" && (
          <RegisterForm
            dbName={data.store?.dbName || ""}
            storeId={data.store?.id || ""}
            slug={slug}
            storeName={data.store?.name || "Store"}
          />
        )}
        {page === "checkout" && (
          <CheckoutForm
            dbName={data.store?.dbName || ""}
            storeId={data.store?.id || ""}
            slug={slug}
          />
        )}
        {page === "account" && (
          <AccountPage dbName={data.store?.dbName || ""} slug={slug} />
        )}
        {page === "order" && (
          <OrderConfirmation
            dbName={data.store?.dbName || ""}
            orderId={query}
            slug={slug}
          />
        )}
      </Shell>
    </TemplateFrame>
  );
}