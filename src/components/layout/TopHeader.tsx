"use client";

import React, { useState } from "react";
import { Star, RotateCcw, ShieldCheck, Phone, Truck, ChevronDown } from "lucide-react";

export const TopHeader: React.FC = () => {
  const [currency, setCurrency] = useState("INR");
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  return (
    <div className="bg-[#701a28] text-white text-[11px] sm:text-xs py-2 px-[10px] select-none transition-colors">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Value Props */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-white/95">
          <div className="flex items-center gap-1.5 font-medium">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
            <span>Free Shipping on Orders Above ₹999</span>
          </div>
          <span className="hidden sm:inline text-white/40">|</span>
          <div className="flex items-center gap-1.5 font-medium">
            <RotateCcw className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Easy Returns Within 14 Days</span>
          </div>
          <span className="hidden lg:inline text-white/40">|</span>
          <div className="hidden lg:flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>100% Authentic Products</span>
          </div>
        </div>

        {/* Right Customer Utility Links */}
        <div className="flex items-center gap-5 text-white/90">
          <a
            href="tel:+918001234567"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Support</span>
          </a>
          <span className="text-white/40">·</span>
          <a
            href="/orders"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </a>
          <span className="text-white/40">·</span>

          {/* Currency dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdown(!currencyDropdown)}
              className="flex items-center gap-1 hover:text-white font-semibold transition-colors"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {currencyDropdown && (
              <div className="absolute right-0 top-full mt-1 w-24 bg-white text-slate-800 rounded-md shadow-lg py-1 border border-slate-100 z-50">
                {["INR", "USD", "EUR", "AED"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-slate-100 ${
                      currency === c ? "font-bold text-[#701a28]" : ""
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

