"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { occasions } from "@/data/mock/veloraData";

export const OccasionSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto py-6 sm:py-8">
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-5 sm:mb-6">
        Shop by Occasion
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {occasions.map((occ) => (
          <Link
            key={occ.id}
            href={`/categories/${occ.slug}`}
            className="group flex flex-col items-center gap-2"
          >
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#f0e7df] shadow-sm">
              <Image
                src={occ.image}
                alt={occ.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#701a28] transition-colors text-center tracking-tight mt-1">
              {occ.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

