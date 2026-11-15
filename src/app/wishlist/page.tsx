"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto py-16 text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Save your favorite products to buy them later or keep track of sales!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#701a28] hover:bg-[#58121f] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-colors"
        >
          <span>Explore Trending Styles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto py-6 sm:py-8 space-y-6">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
        Saved to Wishlist ({wishlist.length})
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

