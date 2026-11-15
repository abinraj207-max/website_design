"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categoryCircles } from "@/data/mock/veloraData";

export const CategoryPills: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full max-w-[1400px] mx-auto py-5 sm:py-7 px-1 group/carousel">
      {/* Scroll Left Button (for smaller/medium screens when overflowing) */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-800 items-center justify-center shadow-md border border-slate-200 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Horizontal Scrollable Categories Container - Balanced & Spaced Evenly */}
      <div
        ref={scrollContainerRef}
        className="w-full flex items-center justify-between gap-3 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-2 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categoryCircles.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group flex flex-col items-center gap-2.5 flex-1 min-w-[76px] sm:min-w-[90px] max-w-[130px] shrink-0 transition-transform hover:-translate-y-1"
          >
            {/* Circular Thumbnail with polished border & shadow */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full overflow-hidden bg-slate-50 p-1 border-2 border-slate-100 group-hover:border-[#701a28] shadow-[0_3px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_16px_rgba(112,26,40,0.18)] transition-all duration-300">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Category Title */}
            <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#701a28] transition-colors text-center tracking-tight whitespace-nowrap">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-800 items-center justify-center shadow-md border border-slate-200 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </section>
  );
};
