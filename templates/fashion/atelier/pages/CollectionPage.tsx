// src/templates/fashion/atelier/pages/CollectionPage.tsx

"use client";

import { CoOrdsLayout } from "../categories/CoOrdsLayout";
import { DenimLayout } from "../categories/DenimLayout";
import { DefaultCategoryLayout } from "../categories/DefaultCategoryLayout";

// 🎯 Map category slug to layout
const CATEGORY_LAYOUTS: Record<string, any> = {
  "co-ords": CoOrdsLayout,
  denim: DenimLayout,
  // Add more as needed:
  // "cocktail-dresses": CocktailDressesLayout,
  // "day-to-night": DayToNightLayout,
  // essentials: EssentialsLayout,
};

export function AtelierCollectionPage({ props }: { props: any }) {
  const categorySlug = String(props?.category?.slug || "").toLowerCase();

  // Find specific layout or use default
  const Layout = CATEGORY_LAYOUTS[categorySlug] || DefaultCategoryLayout;

  return <Layout props={props} />;
}