"use client";

import Link from "next/link";
import { Check, ArrowRight, Package, MapPin, CreditCard } from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";

interface OrderItem {
  id?: string;
  name: string;
  image?: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  number: string | number;
  status?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  total: number | string;
  subtotal?: number | string;
  shipping?: number | string;
  tax?: number | string;
  discount?: number | string;
  createdAt: string | Date;
  items?: OrderItem[];
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: any;
  address?: any;
  paymentMethod?: string;
}

export function FashionOrderPage({
  slug,
  store,
  orderId,
  order,
}: {
  slug: string;
  store: any;
  orderId: string;
  order: Order;
}) {
  const props: any = {
    slug,
    basePath: `/store/${slug}`,
    data: { products: [], store },
    storefront: store,
  };

  if (!order) {
    return (
      <TemplateFrame props={props}>
        <FashionLuxeShell props={props} slug={slug}>
          <section className="mx-auto max-w-2xl px-5 py-24 text-center">
            <p className="text-sm text-[#6A6156]">Order not found.</p>
          </section>
        </FashionLuxeShell>
      </TemplateFrame>
    );
  }

  const displayStatus =
    order.status || order.fulfillmentStatus || order.paymentStatus || "Confirmed";
  const items = order.items || [];
  const address = order.shippingAddress || order.address;

  const num = (v: any) => Number(v || 0);

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-4xl px-5 py-20">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#B8935A]/40 bg-[#D4AF7A]/15">
              <Check className="h-10 w-10 text-[#8F6E3D]" strokeWidth={2} />
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
              Order confirmed
            </p>
            <h1 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.03em] text-[#1A1815]">
              Thank <span className="italic">you</span>
            </h1>
            <p className="mt-5 text-sm text-[#6A6156]">
              Your order{" "}
              <span className="font-bold text-[#1A1815]">
                #{order.number || orderId}
              </span>{" "}
              has been received.
            </p>
          </div>

          {/* Summary */}
          <div className="mt-14 border border-[#E5DED2] bg-white">
            <div className="border-b border-[#E5DED2] px-6 py-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#1A1815]">
                Order Summary
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-[#E5DED2] px-6 py-4 text-xs">
              <div>
                <p className="text-[#8F6E3D] uppercase tracking-[0.18em]">Status</p>
                <p className="mt-1 font-bold uppercase text-[#1A1815]">
                  {displayStatus}
                </p>
              </div>
              <div>
                <p className="text-[#8F6E3D] uppercase tracking-[0.18em]">Ordered on</p>
                <p className="mt-1 font-bold text-[#1A1815]">
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
            {items.length > 0 && (
              <div className="px-6 py-4">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F6E3D]">
                  Items ({items.length})
                </p>
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <div
                      key={item.id || i}
                      className="flex items-center gap-4 border-b border-[#F0EAE0] pb-4 last:border-b-0"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-14 shrink-0 object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-14 shrink-0 items-center justify-center bg-[#F5F0E8] text-[#8F6E3D]">
                          <Package className="h-6 w-6" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#1A1815]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-[#6A6156]">
                          Qty: {item.qty} × ₹{num(item.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#1A1815]">
                        ₹{(num(item.price) * num(item.qty)).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="border-t border-[#E5DED2] bg-[#FAF7F2] px-6 py-4 space-y-2 text-sm">
              {order.subtotal !== undefined && (
                <div className="flex justify-between text-[#6A6156]">
                  <span>Subtotal</span>
                  <span>₹{num(order.subtotal).toLocaleString("en-IN")}</span>
                </div>
              )}
              {order.shipping !== undefined && (
                <div className="flex justify-between text-[#6A6156]">
                  <span>Shipping</span>
                  <span>
                    {num(order.shipping) === 0
                      ? "Free"
                      : `₹${num(order.shipping).toLocaleString("en-IN")}`}
                  </span>
                </div>
              )}
              {order.discount !== undefined && num(order.discount) > 0 && (
                <div className="flex justify-between text-[#6A6156]">
                  <span>Discount</span>
                  <span>− ₹{num(order.discount).toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#E5DED2] pt-3 text-base font-bold text-[#1A1815]">
                <span>Total</span>
                <span>₹{num(order.total).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          {address && (
            <div className="mt-6 border border-[#E5DED2] bg-white px-6 py-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#8F6E3D]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F6E3D]">
                  Shipping Address
                </p>
              </div>
              <p className="text-sm text-[#1A1815]">
                {order.customerName || address.name || ""}
              </p>
              <p className="mt-1 text-sm text-[#6A6156]">
                {[
                  address.line1 || address.street,
                  address.line2,
                  address.city,
                  address.state,
                  address.pincode || address.zip,
                  address.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Payment */}
          {order.paymentMethod && (
            <div className="mt-6 border border-[#E5DED2] bg-white px-6 py-4">
              <div className="mb-3 flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 text-[#8F6E3D]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8F6E3D]">
                  Payment
                </p>
              </div>
              <p className="text-sm capitalize text-[#1A1815]">
                {order.paymentMethod}
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`/store/${slug}/fashion/shop`}
              className="inline-flex items-center gap-3 bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition hover:bg-[#B8935A]"
            >
              Continue shopping
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </Link>
            <Link
              href={`/store/${slug}/fashion/account/orders`}
              className="inline-flex items-center gap-3 border border-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#1A1815] transition hover:bg-[#1A1815] hover:text-white"
            >
              View all orders
            </Link>
          </div>
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}