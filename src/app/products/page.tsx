"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trendingProducts } from "@/data/mock/veloraData";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductQuickViewModal } from "@/components/products/ProductQuickViewModal";
import { Product } from "@/types";
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Check, 
  Star, 
  RotateCcw,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { formatINR } from "@/lib/utils";

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Mobile drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { label: "All Collections", value: "all" },
    { label: "Men's Apparel", value: "men" },
    { label: "Women's Collection", value: "women" },
    { label: "Designer Footwear", value: "footwear" },
    { label: "Luxury Accessories", value: "accessories" },
  ];

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹1,500", value: "under-1500", min: 0, max: 1500 },
    { label: "₹1,500 - ₹3,000", value: "1500-3000", min: 1500, max: 3000 },
    { label: "₹3,000 - ₹5,000", value: "3000-5000", min: 3000, max: 5000 },
    { label: "Above ₹5,000", value: "above-5000", min: 5000, max: 999999 },
  ];

  const availableSizes = ["XS", "S", "M", "L", "XL", "UK 7", "UK 8", "UK 9", "UK 10"];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSelectedSizes([]);
    setSelectedRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSearchQuery("");
  };

  const activeFiltersCount = 
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedPriceRange !== "all" ? 1 : 0) +
    selectedSizes.length +
    (selectedRating > 0 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Filter and Sort Engine
  const filteredProducts = useMemo(() => {
    let list = [...trendingProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Price range filter
    if (selectedPriceRange !== "all") {
      const range = priceRanges.find((r) => r.value === selectedPriceRange);
      if (range) {
        list = list.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    // Sizes filter
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        p.sizes?.some((s) => selectedSizes.includes(s))
      );
    }

    // Rating filter
    if (selectedRating > 0) {
      list = list.filter((p) => p.rating >= selectedRating);
    }

    // Discount filter
    if (minDiscount > 0) {
      list = list.filter((p) => (p.discountPercentage || 0) >= minDiscount);
    }

    // In Stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return list;
  }, [
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedSizes,
    selectedRating,
    minDiscount,
    inStockOnly,
    sortBy,
  ]);

  return (
    <div className="max-w-[1400px] mx-auto py-6 sm:py-8 space-y-6">
      {/* Top Banner / Breadcrumb Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Collections Catalog</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <span>All Catalog Items</span>
            <span className="text-xs font-sans font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
              {filteredProducts.length} Results
            </span>
          </h1>
        </div>

        {/* Top Controls: Mobile Filter Button & Desktop Sort */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
          {/* Mobile Filter Sheet Trigger */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#701a28]"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main 2-Column Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Faceted Filter Sidebar (Amazon Benchmark Architecture) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 space-y-6 sticky top-24 shadow-sm">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Filter className="w-4 h-4 text-[#701a28]" />
              <span>Filter By</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-[#701a28] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Section 1: Categories */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Department
            </h3>
            <div className="space-y-1.5">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedCategory(c.value)}
                  className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors text-left ${
                    selectedCategory === c.value
                      ? "bg-[#701a28]/10 text-[#701a28] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{c.label}</span>
                  {selectedCategory === c.value && (
                    <Check className="w-3.5 h-3.5 text-[#701a28]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Price Range */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Price Range
            </h3>
            <div className="space-y-1.5">
              {priceRanges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setSelectedPriceRange(r.value)}
                  className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors text-left ${
                    selectedPriceRange === r.value
                      ? "bg-[#701a28]/10 text-[#701a28] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{r.label}</span>
                  {selectedPriceRange === r.value && (
                    <Check className="w-3.5 h-3.5 text-[#701a28]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Available Sizes */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Size
              </h3>
              {selectedSizes.length > 0 && (
                <button
                  onClick={() => setSelectedSizes([])}
                  className="text-[10px] text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {availableSizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-bold transition-all ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Customer Rating Threshold */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Customer Reviews
            </h3>
            <div className="space-y-1">
              {[4.8, 4.5, 4.0].map((stars) => (
                <button
                  key={stars}
                  onClick={() =>
                    setSelectedRating(selectedRating === stars ? 0 : stars)
                  }
                  className={`w-full flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg transition-colors text-left ${
                    selectedRating === stars
                      ? "bg-[#701a28]/10 text-[#701a28] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(stars) ? "fill-amber-500" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{stars}★ & above</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Discount Threshold */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Discount
            </h3>
            <div className="space-y-1">
              {[30, 25, 20].map((disc) => (
                <button
                  key={disc}
                  onClick={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
                  className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors text-left ${
                    minDiscount === disc
                      ? "bg-[#701a28]/10 text-[#701a28] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{disc}% off or more</span>
                  {minDiscount === disc && (
                    <Check className="w-3.5 h-3.5 text-[#701a28]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 6: In Stock Toggle */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#701a28] focus:ring-[#701a28]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* RIGHT: Active Filter Chips + Product Grid */}
        <main className="lg:col-span-9 space-y-4">
          {/* Active Filter Chips Bar (Amazon Benchmark Feature) */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                Active Filters:
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  <span>Search: &quot;{searchQuery}&quot;</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  <span className="capitalize">{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedPriceRange !== "all" && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  <span>
                    {priceRanges.find((r) => r.value === selectedPriceRange)?.label}
                  </span>
                  <button
                    onClick={() => setSelectedPriceRange("all")}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSizes.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-2xs"
                >
                  <span>Size: {s}</span>
                  <button
                    onClick={() => toggleSize(s)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedRating > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  <span>{selectedRating}★ & above</span>
                  <button
                    onClick={() => setSelectedRating(0)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {minDiscount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  <span>{minDiscount}%+ Off</span>
                  <button
                    onClick={() => setMinDiscount(0)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  <span>In Stock Only</span>
                  <button
                    onClick={() => setInStockOnly(false)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-[#701a28] hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center space-y-4">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-slate-800">
                No matching luxury pieces found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your filters, clearing specific size choices, or adjusting your price bracket.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2.5 bg-[#701a28] text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-serif text-lg font-bold text-slate-900">
                  Filter Catalog
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Departments */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-800">Department</span>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setSelectedCategory(c.value)}
                      className={`w-full text-left text-xs py-2 px-2.5 rounded-lg flex items-center justify-between ${
                        selectedCategory === c.value
                          ? "bg-[#701a28] text-white font-bold"
                          : "text-slate-700 bg-slate-50"
                      }`}
                    >
                      <span>{c.label}</span>
                      {selectedCategory === c.value && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase text-slate-800">Price Range</span>
                <div className="space-y-1">
                  {priceRanges.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setSelectedPriceRange(r.value)}
                      className={`w-full text-left text-xs py-2 px-2.5 rounded-lg flex items-center justify-between ${
                        selectedPriceRange === r.value
                          ? "bg-[#701a28] text-white font-bold"
                          : "text-slate-700 bg-slate-50"
                      }`}
                    >
                      <span>{r.label}</span>
                      {selectedPriceRange === r.value && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Sizes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase text-slate-800">Size</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableSizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#701a28] text-white rounded-xl text-xs font-bold"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={() => {
                  resetAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-[1400px] mx-auto py-12 text-center text-xs text-slate-500">Loading catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
