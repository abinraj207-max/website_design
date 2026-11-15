"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "VEL-894102";
  const amount = Number(searchParams.get("amount")) || 3499;

  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div>
        <span className="text-xs font-bold text-[#701a28] uppercase tracking-wider">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-900 mt-1">
          Thank you for your order!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Your order has been placed successfully. A confirmation message has been sent to your email.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 text-left space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Order ID:</span>
          <span className="font-mono font-bold text-slate-900">{orderId}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Total Paid:</span>
          <span className="font-bold text-[#701a28]">{formatINR(amount)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Payment Status:</span>
          <span className="font-bold text-emerald-600">Paid via UPI</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Estimated Delivery:</span>
          <span className="font-semibold text-slate-900">3 - 5 Business Days</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto bg-[#701a28] hover:bg-[#58121f] text-white text-xs font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

