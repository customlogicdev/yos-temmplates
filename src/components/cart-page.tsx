"use client";

import Link from "next/link";
import { useCart } from "./cart";
import { Button, Card, EmptyState } from "./ui";
import { Icon } from "./icons";
import { inr } from "@/lib/format";

export function CartView({ slug, brand }: { slug: string; brand: string }) {
  const { lines, setQty, remove, subtotal } = useCart();
  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Your cart</h1>
      {lines.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description={`Browse ${brand} and add something you love.`}
            action={<Link href={`/store/${slug}`}><Button icon="storefront">Continue shopping</Button></Link>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {lines.map((l) => (
              <Card key={`${l.productId}-${l.variant ?? ""}`} className="flex gap-4 p-4">
                <img src={l.image} alt="" className="h-24 w-20 rounded-lg object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{l.name}</div>
                      {l.variant && <div className="text-xs text-muted">{l.variant}</div>}
                    </div>
                    <button onClick={() => remove(l.productId, l.variant)} className="rounded-lg p-1.5 text-muted hover:bg-ink/5 hover:text-danger"><Icon name="trash" className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-line">
                      <button onClick={() => setQty(l.productId, l.variant, l.qty - 1)} className="px-2.5 py-1.5 text-muted hover:text-ink"><Icon name="minus" className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm font-bold">{l.qty}</span>
                      <button onClick={() => setQty(l.productId, l.variant, l.qty + 1)} className="px-2.5 py-1.5 text-muted hover:text-ink"><Icon name="plus" className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="font-display font-bold">{inr(l.price * l.qty)}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div>
            <Card className="sticky top-20 p-6">
              <h3 className="font-display text-base font-bold">Order summary</h3>
              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-muted"><span>Subtotal</span><span className="font-semibold text-ink">{inr(subtotal)}</span></div>
                <div className="flex justify-between text-muted"><span>Shipping</span><span className="font-semibold text-ink">{shipping === 0 ? "Free" : inr(shipping)}</span></div>
                <div className="flex justify-between border-t border-line pt-3 font-display text-base font-bold"><span>Total</span><span>{inr(subtotal + shipping)}</span></div>
              </div>
              <Link href={`/store/${slug}/checkout`} className="mt-5 block">
                <Button className="w-full" size="lg" icon="arrowRight">Checkout</Button>
              </Link>
              <Link href={`/store/${slug}`} className="mt-3 block text-center text-sm font-semibold text-muted hover:text-ink">Continue shopping</Link>
              <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-muted">
                <Icon name="lock" className="h-3.5 w-3.5" /> Secure checkout · UPI · Cards · Wallets
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
