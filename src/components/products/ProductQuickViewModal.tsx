"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, Heart, Check, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0]?.name || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:h-full bg-slate-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {product.badge && (
                <span className="inline-block bg-[#701a28] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                  {product.badge}
                </span>
              )}

              <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-900">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-950">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-rose-600">
                    ({product.discountPercentage}% OFF)
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-800">
                    Color: <span className="font-normal text-slate-500">{selectedColor || product.colors[0].name}</span>
                  </span>
                  <div className="mt-1.5 flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColor === c.name || (!selectedColor && c.name === product.colors![0].name)
                            ? "border-[#701a28] scale-110 shadow-sm"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-800">
                    Size: <span className="font-normal text-slate-500">{selectedSize || product.sizes[0]}</span>
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSize === s || (!selectedSize && s === product.sizes![0])
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-800">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-sm text-slate-600 hover:text-black font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2.5 py-1 text-sm text-slate-600 hover:text-black font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="flex-1 bg-[#701a28] hover:bg-[#591420] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isWished
                    ? "bg-[#701a28] text-white border-[#701a28]"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWished ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

