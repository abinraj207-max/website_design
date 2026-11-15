"use client";

import React from "react";
import Link from "next/link";
import { User, Package, Heart, MapPin, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-[1400px] mx-auto py-8 space-y-8">
      <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="w-16 h-16 rounded-full bg-[#701a28] text-white flex items-center justify-center font-bold text-xl shadow-md">
          AK
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Arun Kumar
          </h1>
          <p className="text-xs text-slate-500">arun.kumar@example.com • +91 9876543210</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/orders"
          className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-[#701a28] hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#701a28] flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">My Orders</h3>
            <p className="text-xs text-slate-500">Track shipments & view order history</p>
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-[#701a28] hover:shadow-md transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#701a28] flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Saved Wishlist</h3>
            <p className="text-xs text-slate-500">Your favorite saved items</p>
          </div>
        </Link>

        <div className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Saved Addresses</h3>
            <p className="text-xs text-slate-500">Bengaluru, Karnataka (Default)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

