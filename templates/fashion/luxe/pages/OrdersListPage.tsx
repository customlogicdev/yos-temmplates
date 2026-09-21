"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";

interface OrdersListPageProps {
  slug: string;
  store: any;
  customer: any;
  orders: any[];
}

export function FashionOrdersListPage({
  slug,
  store,
  customer,
  orders,
}: OrdersListPageProps) {
  const props: any = {
    slug,
    basePath: `/store/${slug}`,
    data: { products: [], store },
    storefront: store,
  };

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-4xl px-5 py-20">
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
              My Account
            </p>
            <h1 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3rem)] leading-[1] tracking-[-0.03em] text-[#1A1815]">
              My <span className="italic">Orders</span>
            </h1>
            {customer?.name && (
              <p className="mt-3 text-sm text-[#6A6156]">
                Welcome back, {customer.name}
              </p>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="border border-[#E5DED2] bg-white px-6 py-16 text-center">
              <Package className="mx-auto h-12 w-12 text-[#B8935A]" />
              <p className="mt-4 text-sm text-[#6A6156]">
                You haven&apos;t placed any orders yet.
              </p>
              <Link
                href={`/store/${slug}/fashion/shop`}
                className="mt-6 inline-flex items-center gap-3 bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition hover:bg-[#B8935A]"
              >
                Start shopping
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <Link
                  key={order.id}
                  href={`/store/${slug}/fashion/order/${order.id}`}
                  className="block border border-[#E5DED2] bg-white px-6 py-5 transition hover:border-[#B8935A]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#8F6E3D]">
                        Order
                      </p>
                      <p className="mt-1 font-bold text-[#1A1815]">
                        #{order.number || order.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#8F6E3D]">
                        Total
                      </p>
                      <p className="mt-1 font-bold text-[#1A1815]">
                        ₹{Number(order.total || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#F0EAE0] pt-3 text-xs text-[#6A6156]">
                    <span className="uppercase tracking-[0.18em]">
                      {order.status || order.fulfillmentStatus || "Confirmed"}
                    </span>
                    <span>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-IN")
                        : ""}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}