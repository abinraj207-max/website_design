import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const PromoDualBanner: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto py-5 sm:py-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Banner: Winter Essentials */}
        <div className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[300px] bg-[#3a3532] text-white flex items-center p-7 sm:p-10 shadow-sm group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 w-full sm:w-3/4" />

          {/* Model Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Winter Essentials"
              fill
              className="object-cover object-right group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
          </div>

          {/* Text Content */}
          <div className="relative z-20 max-w-xs">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
              Winter <br /> Essentials
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal">
              Layer up in style
            </p>
            <Link
              href="/products?collection=winter"
              className="mt-5 inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-sm hover:gap-3"
            >
              <span>Shop Winter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Banner: Up to 40% OFF */}
        <div className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[300px] bg-[#fde9eb] text-slate-900 flex items-center p-7 sm:p-10 shadow-sm group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fde9eb] via-[#fde9eb]/80 to-transparent z-10 w-full sm:w-3/4" />

          {/* Model Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Sale Styles"
              fill
              className="object-cover object-right group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Text Content */}
          <div className="relative z-20 max-w-xs">
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#701a28] leading-tight tracking-tight">
              Up to <br /> 40% OFF
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 font-medium">
              on Selected Styles
            </p>
            <Link
              href="/products?filter=sale"
              className="mt-5 inline-flex items-center gap-2 bg-[#701a28] hover:bg-[#58121f] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-sm hover:gap-3"
            >
              <span>Shop the Sale</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

