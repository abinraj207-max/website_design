"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Menu, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  X,
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { trendingProducts } from "@/data/mock/veloraData";
import { formatINR } from "@/lib/utils";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("HOME");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "MEN", href: "/categories/men" },
    { name: "WOMEN", href: "/categories/women" },
    { name: "KIDS", href: "/categories/kids" },
    { name: "FOOTWEAR", href: "/categories/footwear" },
    { name: "ACCESSORIES", href: "/categories/accessories" },
    { name: "SALE", href: "/products?filter=sale", isSale: true },
  ];

  // Predictive search suggestions
  const searchResults = searchQuery.trim()
    ? trendingProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const trendingKeywords = ["Knit Sweater", "Polo T-Shirt", "Sneakers", "Analog Watch", "Maxi Dress"];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      setSearchOpenMobile(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      if (onSearch) onSearch(searchQuery.trim());
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsSearchFocused(false);
    setSearchOpenMobile(false);
    setSearchQuery("");
    router.push(`/products/${slug}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] px-[10px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Left Hamburger + Brand Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 -ml-1.5 text-slate-800 hover:text-black rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[2.2]" />
              </button>

              <Link href="/" className="flex items-center">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 select-none">
                  Velorá
                </span>
              </Link>
            </div>

            {/* Persistent Central Search Bar (Amazon-Style Conversion Anchor) */}
            <div
              ref={searchContainerRef}
              className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-xl mx-2 lg:mx-6 relative"
            >
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search luxury fashion, shoes, watches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full h-10 pl-10 pr-9 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 rounded-full border border-slate-200 focus:border-[#701a28] focus:ring-2 focus:ring-[#701a28]/15 outline-none transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Autocomplete Predictive Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-12 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {searchQuery.trim() ? (
                    <div>
                      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <span>Matching Products ({searchResults.length})</span>
                        <span>Instant Preview</span>
                      </div>

                      {searchResults.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">
                          No products found matching &quot;{searchQuery}&quot;.
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                          {searchResults.slice(0, 5).map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleSelectProduct(p.slug)}
                              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 text-left transition-colors"
                            >
                              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-slate-900 truncate">
                                  {p.name}
                                </div>
                                <div className="text-[11px] text-slate-400 capitalize">
                                  Category: {p.category}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="text-xs font-bold text-slate-900">
                                  {formatINR(p.price)}
                                </div>
                                {p.discountPercentage && (
                                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                    {p.discountPercentage}% OFF
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={handleSearchSubmit}
                        className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border-t border-slate-100 text-xs font-bold text-[#701a28] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>View all results for &quot;{searchQuery}&quot;</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <TrendingUp className="w-3.5 h-3.5 text-[#701a28]" />
                        <span>Trending Searches</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingKeywords.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium flex items-center gap-1.5 transition-colors"
                          >
                            <Tag className="w-3 h-3 text-slate-400" />
                            <span>{tag}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveCategory(link.name)}
                  className={`text-xs font-bold tracking-wider transition-all relative py-1 ${
                    link.isSale
                      ? "text-red-600 hover:text-red-700"
                      : activeCategory === link.name
                      ? "text-slate-950 font-extrabold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-slate-900"
                      : "text-slate-700 hover:text-slate-950"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Mobile Search Icon Toggle */}
              <button
                onClick={() => setSearchOpenMobile(!searchOpenMobile)}
                className="p-2 text-slate-800 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors md:hidden"
                aria-label="Search items"
              >
                <Search className="w-5 h-5 stroke-[2]" />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="p-2 text-slate-800 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[2]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#701a28] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Red Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-slate-800 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2]" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#701a28] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 0 ? totalItems : 3}
                </span>
              </button>

              {/* Account Icon */}
              <Link
                href="/profile"
                className="p-2 text-slate-800 hover:text-slate-950 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="My Account"
              >
                <User className="w-5 h-5 stroke-[2]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expandable Drawer */}
        {searchOpenMobile && (
          <div className="md:hidden border-t border-slate-100 py-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none placeholder:text-slate-400 text-slate-800"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Mobile Autocomplete Results */}
            {searchQuery.trim() && searchResults.length > 0 && (
              <div className="mt-2 bg-white border border-slate-200 rounded-xl shadow-lg divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {searchResults.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p.slug)}
                    className="w-full px-3 py-2 flex items-center gap-2.5 text-left hover:bg-slate-50"
                  >
                    <div className="relative w-9 h-9 rounded-md overflow-hidden bg-slate-100 shrink-0">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-slate-500">{formatINR(p.price)}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
                  Velorá
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveCategory(link.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      link.isSale
                        ? "text-red-600 hover:bg-red-50"
                        : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 px-4 rounded-xl bg-[#701a28] text-white text-sm font-semibold hover:bg-[#5b1420]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
