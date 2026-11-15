"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { trendingProducts } from "@/data/mock/veloraData";
import { ProductCard } from "@/components/products/ProductCard";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const categoryKey = resolvedParams.category.toLowerCase();

  // Match category or show all
  const filtered = trendingProducts.filter(
    (p) =>
      p.category.toLowerCase() === categoryKey ||
      p.category.toLowerCase().includes(categoryKey)
  );

  const displayList = filtered.length > 0 ? filtered : trendingProducts;

  const categoryTitles: Record<string, string> = {
    men: "Men's Fashion & Wardrobe",
    women: "Women's Collection",
    kids: "Kids Apparel & Fashion",
    footwear: "Footwear & Shoes",
    accessories: "Luxury Accessories & Watches",
    bags: "Handbags & Totes",
    watches: "Minimalist Watches",
    jewellery: "Fine Jewellery & Earrings",
    "casual-wear": "Casual Wear Collection",
    "office-wear": "Office & Formal Wear",
    "party-wear": "Party & Evening Outfits",
    "festive-wear": "Festive & Traditional Edit",
    "active-wear": "Athletic & Active Wear",
    "travel-wear": "Travel & Resort Essentials",
  };

  const title = categoryTitles[categoryKey] || `${categoryKey.toUpperCase()} Collection`;

  return (
    <div className="max-w-[1400px] mx-auto py-6 sm:py-8 space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold capitalize">{categoryKey}</span>
      </div>

      <div className="border-b border-slate-100 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Showing {displayList.length} items handpicked for you
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayList.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

