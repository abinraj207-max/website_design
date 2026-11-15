"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 99;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "VELORA10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    }
  };

  const finalTotal = subtotal - discount + shippingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto py-16 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Explore our trending collection and add styles you love!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#701a28] hover:bg-[#591420] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto py-6 sm:py-8 space-y-8">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
        Shopping Bag ({totalItems} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
          {items.map((item, idx) => (
            <div
              key={`${item.product.id}-${idx}`}
              className="flex gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0 items-center"
            >
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="text-sm font-bold text-slate-900 hover:text-[#701a28] transition-colors"
                >
                  {item.product.name}
                </Link>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-2">
                  {formatINR(item.product.price)}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center border border-slate-200 rounded-lg">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity - 1,
                      item.selectedSize,
                      item.selectedColor
                    )
                  }
                  className="px-2.5 py-1 text-sm font-bold text-slate-600 hover:text-black"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-slate-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.quantity + 1,
                      item.selectedSize,
                      item.selectedColor
                    )
                  }
                  className="px-2.5 py-1 text-sm font-bold text-slate-600 hover:text-black"
                >
                  +
                </button>
              </div>

              {/* Line Total */}
              <div className="text-right font-bold text-sm text-slate-900 min-w-[80px]">
                {formatINR(item.product.price * item.quantity)}
              </div>

              {/* Delete */}
              <button
                onClick={() =>
                  removeFromCart(
                    item.product.id,
                    item.selectedSize,
                    item.selectedColor
                  )
                }
                className="text-slate-400 hover:text-rose-600 p-1"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-100 p-6 space-y-5">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Order Summary
          </h3>

          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Promo Code (VELORA10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              Apply
            </button>
          </form>

          {promoApplied && (
            <p className="text-xs text-emerald-600 font-bold">
              ✓ Promo code VELORA10 applied (-10%)
            </p>
          )}

          <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">
                {formatINR(subtotal)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-semibold">-{formatINR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-semibold text-slate-900">
                {isFreeShipping ? "FREE" : "₹99"}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-950 pt-3 border-t border-slate-200">
              <span>Estimated Total</span>
              <span className="text-[#701a28]">{formatINR(finalTotal)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-[#701a28] hover:bg-[#58121f] text-white py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure 256-Bit Encrypted Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

