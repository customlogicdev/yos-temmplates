// src/lib/product-filters.ts

export function discountPercent(product: any): number {
  if (!product) return 0;
  
  const price = Number(product.price || 0);
  const compareAt = Number(product.compareAt || product.compareAtPrice || 0);
  
  if (compareAt <= 0 || price <= 0) return 0;
  
  const discount = ((compareAt - price) / compareAt) * 100;
  return Math.round(discount);
}