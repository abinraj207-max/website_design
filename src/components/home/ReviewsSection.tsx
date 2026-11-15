"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { customerReviews } from "@/data/mock/veloraData";

export const ReviewsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => {
    setStartIndex((prev) => (prev === 0 ? customerReviews.length - 1 : prev - 1));
  };

  const next = () => {
    setStartIndex((prev) => (prev === customerReviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto py-6 sm:py-8">
      {/* Header with Arrows */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-800 text-slate-700 hover:text-black flex items-center justify-center transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-800 text-slate-700 hover:text-black flex items-center justify-center transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {customerReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-start gap-4 transition-transform hover:-translate-y-1"
          >
            {/* Avatar */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-sm">
              <Image
                src={rev.avatar}
                alt={rev.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                {rev.name}
              </h4>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 my-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                  />
                ))}
              </div>

              <p className="mt-1 text-xs text-slate-600 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

