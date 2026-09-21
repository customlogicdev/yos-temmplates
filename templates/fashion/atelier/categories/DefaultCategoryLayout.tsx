// src/templates/fashion/atelier/categories/DefaultCategoryLayout.tsx

"use client";

import { AtelierShopPage } from "../pages/ShopPage";

export function DefaultCategoryLayout({ props }: { props: any }) {
  const categorySlug = props?.category?.slug || "";
  const categoryName = props?.category?.name || "Collection";

  return (
    <AtelierShopPage
      slug={props?.slug}
      store={props?.data?.store}
      products={props?.data?.products || []}
      categories={props?.data?.categories || []}
      lockedCategoryId={categorySlug}
      title={categoryName}
      subtitle=""
    />
  );
}