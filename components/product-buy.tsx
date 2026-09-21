"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, cn } from "./ui";
import { Icon } from "./icons";
import { inr } from "@/lib/format";
import { useCart } from "./cart";
import { ProductCard, type StoreProduct } from "./storefront";

interface BuyProduct {
  id: string; name: string; price: number; compareAt: number | null; image: string;
  description: string; category: string; variants: { name: string; options: string[] }[]; inventory: number;
}

export function ProductBuy({ product, slug }: { product: BuyProduct; slug: string }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [picked, setPicked] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {};
    product.variants.forEach((v) => { o[v.name] = v.options[0] ?? ""; });
    return o;
  });
  const [added, setAdded] = useState(false);
  const variantStr = Object.entries(picked).map(([k, v]) => `${k}: ${v}`).join(" / ") || undefined;

  function doAdd() {
    add({ productId: product.id, name: product.name, image: product.image, price: product.price, variant: variantStr }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-widest text-muted">{product.category}</div>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">{product.name}</h1>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-2xl font-bold">{inr(product.price)}</span>
        {product.compareAt && (
          <>
            <span className="text-lg text-muted line-through">{inr(product.compareAt)}</span>
            <span className="rounded-md bg-danger/10 px-2 py-0.5 text-xs font-bold text-danger">Save {Math.round((1 - product.price / product.compareAt) * 100)}%</span>
          </>
        )}
      </div>
      <p className="mt-2 text-xs font-semibold text-success">In stock · {product.inventory} available · Free shipping over ₹999</p>
      <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">{product.description}</p>

      {product.variants.map((v) => (
        <div key={v.name} className="mt-6">
          <div className="mb-2 text-[13px] font-bold text-ink-soft">{v.name}: <span className="font-normal text-muted">{picked[v.name]}</span></div>
          <div className="flex flex-wrap gap-2">
            {v.options.map((o) => (
              <button
                key={o}
                onClick={() => setPicked((p) => ({ ...p, [v.name]: o }))}
                className={cn(
                  "min-w-11 rounded-lg border px-3 py-2 text-sm font-semibold transition",
                  picked[v.name] === o ? "border-ink bg-ink text-white" : "border-line hover:border-ink/40"
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-lg border border-line">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2.5 text-muted hover:text-ink"><Icon name="minus" className="h-4 w-4" /></button>
          <span className="w-10 text-center text-sm font-bold">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2.5 text-muted hover:text-ink"><Icon name="plus" className="h-4 w-4" /></button>
        </div>
        <Button size="lg" variant="dark" className="flex-1 sm:flex-none sm:px-8" onClick={doAdd} icon={added ? "check" : "cart"}>
          {added ? "Added to cart" : "Add to Cart"}
        </Button>
        <Button size="lg" className="flex-1 sm:flex-none sm:px-8" onClick={() => { doAdd(); router.push(`/store/${slug}/checkout`); }}>
          Buy Now
        </Button>
      </div>

      <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 border-t border-line pt-6 text-center text-xs text-muted">
        <div><Icon name="truck" className="mx-auto mb-1 h-4 w-4" /> 4–7 day delivery</div>
        <div><Icon name="refresh" className="mx-auto mb-1 h-4 w-4" /> 30-day returns</div>
        <div><Icon name="lock" className="mx-auto mb-1 h-4 w-4" /> Secure checkout</div>
      </div>
    </div>
  );
}

export function RelatedGrid({ products, slug }: { products: StoreProduct[]; slug: string }) {
  const { add } = useCart();
  if (!products.length) return null;
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">You may also like</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} slug={slug} onAddToCart={(x) => add({ productId: x.id, name: x.name, image: x.image, price: x.price })} />
        ))}
      </div>
    </div>
  );
}
