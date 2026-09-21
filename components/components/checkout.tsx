"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./cart";
import { Button, Card, Input } from "./ui";
import { Icon } from "./icons";
import { inr } from "@/lib/format";
import { placeOrderAction } from "@/lib/actions";

export function CheckoutView({ slug, brand }: { slug: string; brand: string }) {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);
  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lines.length) { setError("Your cart is empty."); return; }
    setPlacing(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    fd.set("slug", slug);
    fd.set("cart", JSON.stringify(lines));
    const res = await placeOrderAction(fd);
    setPlacing(false);
    if (res.error) setError(res.error);
    else {
      clear();
      router.push(res.redirect ?? `/store/${slug}`);
    }
  }

  if (!lines.length) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <Icon name="cart" className="mx-auto h-10 w-10 text-muted" />
        <h1 className="mt-4 font-display text-2xl font-bold">Nothing to check out</h1>
        <p className="mt-2 text-sm text-muted">Your cart is empty. Add a product first.</p>
        <Link href={`/store/${slug}`} className="mt-5 inline-block"><Button icon="storefront">Back to store</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Checkout</h1>
      <p className="mt-1 text-sm text-muted">{brand} · demo checkout — no real payment is processed.</p>
      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 font-display text-base font-bold">Contact</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" name="name" required placeholder="Ananya Sharma" />
              <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
              <Input label="Phone" name="phone" placeholder="+91 98xxx xxxxx" />
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="mb-4 font-display text-base font-bold">Shipping address</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Input label="Address" name="line1" required placeholder="42, Linking Road" /></div>
              <Input label="City" name="city" required placeholder="Mumbai" />
              <Input label="State" name="state" required placeholder="Maharashtra" />
              <Input label="PIN code" name="pincode" required placeholder="400050" />
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="mb-4 font-display text-base font-bold">Payment</h3>
            <div className="space-y-2.5">
              {[["UPI (GPay / PhonePe / Paytm)", true], ["Credit / Debit Card", false], ["Cash on Delivery", false]].map(([label, on]) => (
                <label key={String(label)} className={`flex items-center gap-3 rounded-xl border p-3.5 text-sm font-semibold ${on ? "border-brand bg-brand-soft/40" : "border-line"}`}>
                  <input type="radio" name="pay" defaultChecked={!!on} className="accent-[#0E6B54]" />
                  {String(label)}
                  {on && <span className="ml-auto text-xs font-bold text-brand-deep">Recommended</span>}
                </label>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20 p-6">
            <h3 className="font-display text-base font-bold">Your order</h3>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {lines.map((l) => (
                <div key={`${l.productId}-${l.variant ?? ""}`} className="flex items-center gap-3">
                  <img src={l.image} alt="" className="h-12 w-10 rounded-md object-cover" />
                  <div className="flex-1 text-sm">
                    <div className="font-semibold leading-tight">{l.name}</div>
                    <div className="text-xs text-muted">Qty {l.qty}{l.variant ? ` · ${l.variant}` : ""}</div>
                  </div>
                  <div className="text-sm font-bold">{inr(l.price * l.qty)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span className="font-semibold text-ink">{inr(subtotal)}</span></div>
              <div className="flex justify-between text-muted"><span>Shipping</span><span className="font-semibold text-ink">{shipping === 0 ? "Free" : inr(shipping)}</span></div>
              <div className="flex justify-between font-display text-base font-bold"><span>Total</span><span>{inr(subtotal + shipping)}</span></div>
            </div>
            {error && <p className="mt-3 rounded-lg border border-danger/30 bg-danger/8 px-3 py-2 text-sm text-danger">{error}</p>}
            <Button type="submit" size="lg" className="mt-4 w-full" loading={placing} icon="lock">
              Place order · {inr(subtotal + shipping)}
            </Button>
            <p className="mt-3 text-center text-[11px] text-muted">This order will appear in your admin Orders dashboard instantly.</p>
          </Card>
        </div>
      </form>
    </div>
  );
}

import Link from "next/link";
