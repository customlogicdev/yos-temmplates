// src/templates/beauty/lumiere/pages/OrderPage.tsx

"use client";

import Link from "next/link";
import {
  Check,
  ArrowRight,
  Package,
  MapPin,
  CreditCard,
} from "lucide-react";

export function LumiereOrderPage({ slug, order, orderId }: any) {
  const base = `/store/${slug}`;

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <p className="font-serif text-2xl italic text-[#B76E79]">
          Order not found
        </p>
        <Link
          href={`${base}?page=products`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1F1B24] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B76E79]"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const num = (v: any) => Number(v || 0);

  return (
    <section className="min-h-screen bg-[#FAF7F5]">
      <div className="mx-auto max-w-4xl px-5 py-20">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5] shadow-xl shadow-rose-200/50">
            <Check className="h-10 w-10 text-white" strokeWidth={2.4} />
          </div>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            Order confirmed
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-normal italic leading-tight tracking-tight text-[#1F1B24]">
            Thank <span className="text-[#B76E79]">you</span>
          </h1>
          <p className="mt-5 text-sm text-[#1F1B24]/60">
            Your order{" "}
            <span className="font-bold text-[#1F1B24]">
              #{order.number || orderId}
            </span>{" "}
            has been received.
          </p>
        </div>

        {/* Summary */}
        <div className="mt-14 rounded-3xl border border-[#E8DDD5] bg-white shadow-lg shadow-rose-100/40">
          <div className="border-b border-[#E8DDD5] p-6">
            <h2 className="font-serif text-lg italic text-[#1F1B24]">
              Order summary
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-[#E8DDD5] p-6 text-xs">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B76E79]">
                Status
              </p>
              <p className="mt-1.5 font-bold uppercase text-[#1F1B24]">
                {order.status || order.fulfillmentStatus || "Confirmed"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B76E79]">
                Ordered on
              </p>
              <p className="mt-1.5 font-bold text-[#1F1B24]">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>
          </div>

          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div className="p-6">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B76E79]">
                Items ({order.items.length})
              </p>
              <div className="space-y-4">
                {order.items.map((item: any, i: number) => (
                  <div
                    key={item.id || i}
                    className="flex items-center gap-4 border-b border-[#E8DDD5] pb-4 last:border-b-0"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-[#B76E79]">
                        <Package className="h-6 w-6" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-serif text-sm italic text-[#1F1B24]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-[#1F1B24]/50">
                        Qty: {item.qty} × {formatMoney ? formatMoney(num(item.price)) : `₹${num(item.price)}`}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-[#1F1B24]">
                      {formatMoney
                        ? formatMoney(num(item.price) * num(item.qty))
                        : `₹${num(item.price) * num(item.qty)}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totals */}
          <div className="space-y-2.5 border-t border-[#E8DDD5] bg-[#FAF7F5] p-6 text-sm">
            {order.subtotal !== undefined && (
              <div className="flex justify-between text-[#1F1B24]/60">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1F1B24]">
                  ₹{num(order.subtotal).toLocaleString("en-IN")}
                </span>
              </div>
            )}
            {order.shipping !== undefined && (
              <div className="flex justify-between text-[#1F1B24]/60">
                <span>Shipping</span>
                <span className="font-semibold text-[#1F1B24]">
                  {num(order.shipping) === 0
                    ? "Free"
                    : `₹${num(order.shipping).toLocaleString("en-IN")}`}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-[#E8DDD5] pt-3">
              <span className="font-serif text-base italic">Total</span>
              <span className="font-serif text-lg font-bold">
                ₹{num(order.total).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Address */}
        {order.address && (
          <div className="mt-6 rounded-3xl border border-[#E8DDD5] bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#B76E79]" strokeWidth={2} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B76E79]">
                Shipping address
              </p>
            </div>
            <p className="font-serif text-sm italic text-[#1F1B24]">
              {order.customerName || order.address.name || ""}
            </p>
            <p className="mt-1.5 text-sm text-[#1F1B24]/60">
              {[
                order.address.line1,
                order.address.line2,
                order.address.city,
                order.address.state,
                order.address.pincode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href={`${base}?page=products`}
            className="inline-flex items-center gap-3 rounded-full bg-[#1F1B24] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-105 hover:bg-[#B76E79]"
          >
            Continue shopping
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
          <Link
            href={`${base}?page=orders`}
            className="inline-flex items-center gap-3 rounded-full border border-[#E8DDD5] bg-white px-8 py-4 text-sm font-semibold text-[#1F1B24] transition hover:border-[#B76E79]"
          >
            View all orders
          </Link>
        </div>
      </div>
    </section>
  );
}

// Helper — import formatMoney if not globally available
const formatMoney = (n: number) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;