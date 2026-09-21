// src/templates/grocery/fresh/pages/CartPage.tsx

"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { formatMoney } from "@/lib/format";
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, Clock, Truck } from "lucide-react";

export function GroceryCartPage({ slug, store }: any) {
  const { lines, subtotal, setQty, remove } = useCart();
  const shipping = subtotal === 0 || subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <ShoppingCart className="h-9 w-9 text-green-600" />
        </div>
        <h1 className="mt-6 text-2xl font-black text-green-900">Cart is empty</h1>
        <p className="mt-2 text-sm text-green-700">Add fresh groceries to get started</p>
        <Link
          href={`/store/${slug}?page=products`}
          className="mt-6 inline-block rounded-2xl bg-green-600 px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-green-700"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12">
      <h1 className="text-4xl font-black tracking-tight text-green-900">
        Your Cart
      </h1>
      <p className="mt-2 text-sm text-green-700">
        {lines.length} item{lines.length > 1 ? "s" : ""} · Ready for delivery
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-4">
          {lines.map((item, i) => (
            <div
              key={`${item.productId}-${i}`}
              className="flex gap-4 rounded-3xl border border-green-100 bg-white p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-2xl object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  {item.variant && (
                    <p className="text-xs text-slate-500">{item.variant}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-xl border border-green-200">
                    <button
                      onClick={() => setQty(item.productId, item.variant, item.qty - 1)}
                      className="p-2 text-green-600 hover:text-green-800"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => setQty(item.productId, item.variant, item.qty + 1)}
                      className="p-2 text-green-600 hover:text-green-800"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="font-black text-green-700">
                    {formatMoney(item.price * item.qty)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => remove(item.productId, item.variant)}
                className="self-start text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-3xl border border-green-100 bg-white p-6 lg:sticky lg:top-24">
          <h3 className="text-lg font-black text-green-900">Order Summary</h3>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Delivery</span>
              <span className="font-bold">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  formatMoney(shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between border-t border-green-100 pt-3 text-lg">
              <span className="font-black text-green-900">Total</span>
              <span className="font-black text-green-700">{formatMoney(total)}</span>
            </div>
          </div>

          <Link
            href={`/store/${slug}?page=checkout`}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-[11px] font-black uppercase tracking-wider text-white hover:bg-green-700"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-6 space-y-2 border-t border-green-100 pt-5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-green-600" />
              <span>Free delivery on ₹999+</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-green-600" />
              <span>12-hour delivery promise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}