"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ArrowLeft,
  Check
} from "lucide-react";
import { trendingProducts } from "@/data/mock/veloraData";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product by slug or default to first
  const product =
    trendingProducts.find((p) => p.slug === resolvedParams.slug) ||
    trendingProducts[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "shipping" | "reviews">("desc");
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);

  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    router.push("/checkout");
  };

  const related = trendingProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-[1400px] mx-auto py-6 sm:py-8 space-y-12 pb-24 md:pb-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-slate-900">
          Products
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Product Images (Optimized Compact Height) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center p-4">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-[#701a28] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
            <Image
              src={activeImage || product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
              priority
            />
          </div>

          {/* Multiple Image Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border-2 transition-all p-1 ${
                    (activeImage || product.image) === img
                      ? "border-[#701a28] shadow-sm scale-105"
                      : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i}`} fill className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Configurator */}
        <div className="lg:col-span-6 flex flex-col space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#701a28]">
              Velorá Exclusive
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-500 fill-amber-500"
                  />
                ))}
              </div>
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span>•</span>
              <span className="text-slate-500">{product.reviewCount} verified customer reviews</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-950">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-slate-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.discountPercentage && (
              <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                {product.discountPercentage}% OFF
              </span>
            )}
            <span className="text-[11px] text-slate-400 ml-auto font-medium">Inclusive of all taxes</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                <span>Color: <span className="font-normal text-slate-600">{selectedColor || product.colors[0].name}</span></span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === c.name || (!selectedColor && c.name === product.colors![0].name)
                        ? "border-[#701a28] scale-110 shadow-md ring-2 ring-[#701a28]/20"
                        : "border-slate-200 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                <span>Select Size: <span className="font-normal text-slate-600">{selectedSize || product.sizes[0]}</span></span>
                <button className="text-[11px] text-[#701a28] hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                      selectedSize === s || (!selectedSize && s === product.sizes![0])
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and CTA Buttons (Compact / Normal Width) */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 text-slate-600 hover:text-black font-bold flex items-center justify-center rounded-lg hover:bg-white"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 text-slate-600 hover:text-black font-bold flex items-center justify-center rounded-lg hover:bg-white"
                >
                  +
                </button>
              </div>

              {/* Add to Cart - Normal Width */}
              <button
                onClick={handleAddToCart}
                className="w-auto bg-[#701a28] hover:bg-[#58121f] text-white py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>

              {/* Buy Now Direct Button - Normal Width */}
              <button
                onClick={handleBuyNow}
                className="w-auto bg-slate-900 hover:bg-black text-white py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm"
              >
                Buy It Now
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isWished
                    ? "bg-[#701a28] text-white border-[#701a28]"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWished ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#701a28]" />
              <span>Free delivery &gt; ₹999</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#701a28]" />
              <span>14 days easy returns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#701a28]" />
              <span>100% Genuine product</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="pt-8 border-t border-slate-100">
        <div className="flex items-center gap-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 text-sm font-bold tracking-tight transition-colors relative ${
              activeTab === "desc"
                ? "text-[#701a28] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#701a28]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Product Overview & Fabric Care
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 text-sm font-bold tracking-tight transition-colors relative ${
              activeTab === "shipping"
                ? "text-[#701a28] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#701a28]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Shipping & Return Policy
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold tracking-tight transition-colors relative ${
              activeTab === "reviews"
                ? "text-[#701a28] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#701a28]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        <div className="py-6 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          {activeTab === "desc" && (
            <div className="space-y-4">
              <p>
                The {product.name} embodies the quintessential Velorá design philosophy: refined simplicity and enduring craftsmanship. Designed with subtle contemporary proportions, it transitions seamlessly from day to night.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Ethically produced with certified natural raw materials.</li>
                <li>Pre-washed to minimize shrinkage and maintain a relaxed drape.</li>
                <li>Machine wash cold on gentle cycle; lay flat to dry in shade.</li>
                <li>Country of origin: Crafted with pride in India.</li>
              </ul>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-3">
              <p>
                <strong>Delivery Timelines:</strong> Metro cities receive doorstep delivery in 2-4 business days. Rest of India within 4-7 days.
              </p>
              <p>
                <strong>Returns:</strong> We offer a 14-day hassle-free return and exchange policy from the delivery date. Our courier will pick up the items directly from your doorstep at zero extra cost.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <span className="text-3xl font-bold text-slate-900">{product.rating}</span>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">Based on {product.reviewCount} customer ratings</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      <div className="pt-8 border-t border-slate-100">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Purchase Bar (Amazon-Style Mobile Conversion Anchor) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
            <Image
              src={activeImage || product.image}
              alt={product.name}
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-extrabold text-slate-900 truncate">
              {formatINR(product.price)}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold truncate flex items-center gap-1">
              <Truck className="w-3 h-3 shrink-0" />
              <span>Free Delivery</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isWished
                ? "bg-[#701a28] text-white border-[#701a28]"
                : "border-slate-200 text-slate-700 bg-slate-50"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWished ? "fill-white" : ""}`} />
          </button>

          <button
            onClick={handleAddToCart}
            className="bg-[#701a28] hover:bg-[#58121f] text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

