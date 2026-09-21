import { notFound } from "next/navigation";
import { loadStoreData } from "@/lib/store-data";
import { GroceryShopPage } from "@/templates/grocery/fresh/pages/ShopPage";

export const dynamic = "force-dynamic";

export default async function Route({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadStoreData(slug);
  if (!data) return notFound();

  return (
    <GroceryShopPage
      slug={slug}
      store={data.store}
      products={data.products}
    />
  );
}