"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { collectionBanners } from "@/data/mock/veloraData";

export const FeaturedCollections: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto py-5 sm:py-7">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {collectionBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`group relative rounded-3xl overflow-hidden p-6 sm:p-7 flex items-center justify-between min-h-[190px] sm:min-h-[210px] border border-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_38px_-8px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1.5 ${banner.bgClass}`}
          >
            {/* Background subtle radial glow */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/40 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            {/* Left Content */}
            <div className="z-10 max-w-[58%] flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#701a28] mb-1">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>{index === 0 ? "Curated" : index === 1 ? "Trending" : "Essential"}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                {banner.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2 font-medium">
                {banner.subtitle}
              </p>

              <Link
                href={banner.link}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-[#701a28] transition-colors"
              >
                <span className="underline-offset-4 group-hover:underline">
                  {banner.buttonText}
                </span>
                <span className="w-6 h-6 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-slate-800 group-hover:bg-[#701a28] group-hover:text-white transition-all">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Right Image with Attractive Multi-Layer Box Shadow & Ring */}
            <div className="relative z-10 shrink-0">
              {/* Floating Image Card */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white p-1 ring-4 ring-white/90 shadow-[0_14px_30px_-6px_rgba(0,0,0,0.22)] group-hover:shadow-[0_22px_40px_-8px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
