import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const BrandCarousel: React.FC = () => {
  const brands = [
    {
      name: "Levi's",
      badge: (
        <span className="bg-[#c41230] text-white font-black text-xs px-2.5 py-1 tracking-wider rounded-[2px] shadow-sm">
          Levi's
        </span>
      ),
    },
    {
      name: "Nike",
      badge: (
        <svg className="w-12 h-6 fill-current text-black" viewBox="0 0 24 24">
          <path d="M21.707 5.293c-.24-.24-.606-.312-.924-.182l-18 7.333c-.476.194-.783.655-.783 1.168 0 .513.307.974.783 1.168l6.388 2.603 9.423-11.396-8.24 12.366 7.42 3.024c.148.06.305.09.462.09.348 0 .684-.145.924-.385l3.535-3.535c.391-.391.391-1.023 0-1.414l-.988-.988 1.988-1.988c.391-.391.391-1.023 0-1.414l-1.988-1.988 1.988-1.988c.391-.391.391-1.023 0-1.414l-1.988-1.988 1.988-1.988c.391-.391.391-1.023 0-1.414z"/>
        </svg>
      ),
    },
    {
      name: "Adidas",
      badge: (
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-0.5">
            <span className="w-1 h-2 bg-black -rotate-12 rounded-t-sm" />
            <span className="w-1 h-3 bg-black -rotate-12 rounded-t-sm" />
            <span className="w-1 h-4 bg-black -rotate-12 rounded-t-sm" />
          </div>
          <span className="text-[10px] font-black tracking-tighter">adidas</span>
        </div>
      ),
    },
    {
      name: "Puma",
      badge: (
        <span className="font-extrabold text-sm tracking-widest uppercase text-slate-900">
          PUMA
        </span>
      ),
    },
    {
      name: "H&M",
      badge: (
        <span className="text-[#e50010] font-bold italic text-base tracking-tighter font-serif">
          H&M
        </span>
      ),
    },
    {
      name: "Zara",
      badge: (
        <span className="font-serif font-black text-sm tracking-[0.2em] uppercase text-black">
          ZARA
        </span>
      ),
    },
    {
      name: "Allen Solly",
      badge: (
        <div className="text-center">
          <span className="block text-[8px] font-bold uppercase tracking-widest text-[#701a28]">ESTD 1744</span>
          <span className="font-serif font-bold text-xs text-slate-900">Allen Solly</span>
        </div>
      ),
    },
    {
      name: "U.S. Polo Assn.",
      badge: (
        <div className="text-center">
          <span className="font-serif font-bold text-[11px] text-blue-950 uppercase tracking-tight block">
            U.S. POLO ASSN.
          </span>
          <span className="text-[7px] text-red-600 font-bold tracking-widest">SINCE 1890</span>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Top Brands
        </h2>

        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#701a28] transition-colors group"
        >
          <span>View All Brands</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {brands.map((b, index) => (
          <div
            key={index}
            className="h-16 sm:h-20 rounded-xl bg-white border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-center p-3 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
          >
            {b.badge}
          </div>
        ))}
      </div>
    </section>
  );
};

