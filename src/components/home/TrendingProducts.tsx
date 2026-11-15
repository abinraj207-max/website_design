"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trendingProducts } from "@/data/mock/veloraData";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductQuickViewModal } from "@/components/products/ProductQuickViewModal";
import { Product } from "@/types";

export const TrendingProducts: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="w-full max-w-[1400px] mx-auto py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Trending Now
        </h2>

        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#701a28] transition-colors group"
        >
          <span>View All Products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 6 Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
        {trendingProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};

