"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md border border-slate-100/80">
      {/* Top Image Container (Optimized Compact Height) */}
      <div className="relative aspect-square sm:aspect-[4/4.2] max-h-[270px] w-full bg-slate-50 overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#701a28] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isWished
              ? "bg-[#701a28] text-white"
              : "bg-white/90 hover:bg-white text-slate-700 hover:text-black"
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWished ? "fill-white" : ""}`} />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between">
        <div>
          {/* Title */}
          <Link
            href={`/products/${product.slug}`}
            className="text-xs sm:text-[13px] font-semibold text-slate-900 hover:text-[#701a28] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing Row */}
        <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-slate-950">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.discountPercentage && (
              <span className="text-[10px] sm:text-[11px] font-bold text-rose-600">
                ({product.discountPercentage}% OFF)
              </span>
            )}
          </div>

          {/* Quick Add Icon */}
          <button
            onClick={handleQuickAdd}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              addedAnimation
                ? "bg-emerald-600 text-white scale-110"
                : "bg-slate-100 hover:bg-[#701a28] text-slate-700 hover:text-white"
            }`}
            aria-label="Add to cart"
            title="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

