// src/app/store/[slug]/beauty/shop/page.tsx

import { notFound } from "next/navigation";
import { loadStoreData } from "@/lib/store-data";
import { BeautyShopPage } from "@/templates/beauty/glow/pages/ShopPage";

export const dynamic = "force-dynamic";

export default async function BeautyShopRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadStoreData(slug);
  if (!data) return notFound();

  return (
    <BeautyShopPage
      slug={slug}
      store={data.store}
      products={data.products}
    />
  );
}