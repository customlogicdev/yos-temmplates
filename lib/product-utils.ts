// src/lib/product-utils.ts

/**
 * Filter products for storefront display.
 * Hidden + draft products ko hata deta hai.
 */
export function filterVisibleProducts(products: any[] = []): any[] {
  if (!Array.isArray(products)) return [];
  return products.filter((p) => {
    // Backward compat: agar status field nahi hai toh visible maano
    if (!p?.status) return true;
    // Sirf active products storefront pe dikhao
    return p.status === "active";
  });
}

/**
 * Single product check — hidden hai ya nahi.
 */
export function isProductVisible(product: any): boolean {
  if (!product) return false;
  if (!product.status) return true;
  return product.status === "active";
}