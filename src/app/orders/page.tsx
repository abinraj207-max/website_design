"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { trendingProducts } from "@/data/mock/veloraData";
import { formatINR } from "@/lib/utils";

export default function OrdersPage() {
  const mockOrders = [
    {
      id: "VEL-942817",
      date: "08 Nov 2026",
      status: "In Transit (Out for Delivery Today)",
      items: [
        {
          product: trendingProducts[0],
          size: "L",
          color: "Tan Brown",
          quantity: 1,
        },
      ],
      total: 3499,
    },
    {
      id: "VEL-821940",
      date: "25 Oct 2026",
      status: "Delivered",
      items: [
        {
          product: trendingProducts[2],
          size: "M",
          color: "Navy Blue",
          quantity: 2,
        },
      ],
      total: 2598,
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto py-8 space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">My Orders</span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
        My Orders & Track Shipments
      </h1>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                    Order #{order.id}
                  </span>
                  <span className="text-xs text-slate-400 block">Placed on {order.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>{order.status}</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Qty: {item.quantity} • Size: {item.size} • Color: {item.color}
                    </p>
                    <span className="text-xs font-bold text-slate-900 mt-1 block">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total Paid (Inclusive of taxes):</span>
              <span className="font-bold text-sm text-[#701a28]">{formatINR(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

