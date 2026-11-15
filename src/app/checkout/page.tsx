"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, CreditCard, Smartphone, Banknote, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [formData, setFormData] = useState({
    fullName: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "+91 9876543210",
    address: "Flat 402, Royale Palms, MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
  });

  const [processing, setProcessing] = useState(false);

  const shippingFee = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      clearCart();
      const randomOrderId = "VEL-" + Math.floor(100000 + Math.random() * 900000);
      router.push(`/order-success?orderId=${randomOrderId}&amount=${grandTotal}`);
    }, 1200);
  };

  return (
    <div className="max-w-[1400px] mx-auto py-6 sm:py-8 space-y-8">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/cart" className="hover:text-slate-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </Link>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
        Checkout & Payment
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Address & Payment Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              1. Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#701a28]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#701a28]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#701a28]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#701a28]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#701a28]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#701a28]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              2. Payment Method
            </h3>

            <div className="space-y-3">
              {/* UPI */}
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === "upi" ? "border-[#701a28] bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="accent-[#701a28]"
                  />
                  <Smartphone className="w-5 h-5 text-[#701a28]" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">UPI / Instant QR</span>
                    <span className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM UPI</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Fastest</span>
              </label>

              {/* Cards */}
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === "card" ? "border-[#701a28] bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-[#701a28]"
                  />
                  <CreditCard className="w-5 h-5 text-slate-700" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Credit / Debit Card</span>
                    <span className="text-[11px] text-slate-500">Visa, Mastercard, RuPay, Amex</span>
                  </div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                paymentMethod === "cod" ? "border-[#701a28] bg-rose-50/20" : "border-slate-200 hover:border-slate-300"
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-[#701a28]"
                  />
                  <Banknote className="w-5 h-5 text-slate-700" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-slate-500">Pay cash or UPI at doorstep</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Confirmation */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-100 p-6 space-y-5 sticky top-24">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Order Review
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <div className="relative w-12 h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                  <p className="text-[11px] text-slate-500">Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ""}</p>
                </div>
                <span className="font-bold text-slate-900">{formatINR(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Delivery</span>
              <span className="font-semibold text-slate-900">{shippingFee === 0 ? "FREE" : "₹99"}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-950 pt-2 border-t border-slate-200">
              <span>Total Payable</span>
              <span className="text-[#701a28]">{formatINR(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-[#701a28] hover:bg-[#58121f] text-white py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-70"
          >
            <Lock className="w-4 h-4" />
            <span>{processing ? "Processing Order..." : `Pay & Place Order • ${formatINR(grandTotal)}`}</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Safe & Secure Transaction</span>
          </div>
        </div>
      </form>
    </div>
  );
}

