"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Slide {
  season: string;
  title1: string;
  title2: string;
  description: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    season: "AUTUMN / WINTER 26 —",
    title1: "New Arrival",
    title2: "Fashion Collection",
    description: "Style that defines you with timeless silhouettes, understated luxury, and sustainable tailoring.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    link: "/products",
  },
  {
    season: "SPRING EDIT 26 —",
    title1: "Effortless",
    title2: "Urban Luxury",
    description: "Curated contemporary essentials designed for relaxed everyday confidence and all-day ease.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    link: "/products?filter=new",
  },
  {
    season: "LIMITED EDITION —",
    title1: "The Tailored",
    title2: "Statement Pieces",
    description: "Impeccably cut blazers and structured coats crafted with artisan attention to every stitch.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    link: "/products?filter=featured",
  },
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const active = slides[current];

  return (
    <section className="relative w-full max-w-[1400px] mx-auto my-3 sm:my-4 rounded-2xl overflow-hidden bg-[#f4ebe3] min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center shadow-sm">
      {/* Background soft lighting / texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4ebe3] via-[#f7eee7]/95 to-transparent z-10 w-full md:w-3/5" />

      {/* Slider Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all hover:scale-105"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all hover:scale-105"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Content Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 items-center px-8 sm:px-14 lg:px-20 py-10">
        {/* Left Text Block */}
        <div className="md:col-span-7 flex flex-col justify-center max-w-xl">
          <p className="text-[11px] sm:text-xs font-bold tracking-widest text-slate-700 uppercase mb-2">
            {active.season}
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#701a28] leading-[1.12] tracking-tight">
            <span>{active.title1}</span>
            <br />
            <span>{active.title2}</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed font-normal">
            {active.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link
              href={active.link}
              className="inline-flex items-center gap-2 bg-[#701a28] hover:bg-[#591420] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-sm hover:gap-3"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center text-slate-800 hover:text-black border border-slate-300 hover:border-slate-800 text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors bg-white/40 hover:bg-white"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Right Model Image (Desktop & Tablet) */}
        <div className="hidden md:block md:col-span-5 relative h-[420px] lg:h-[480px]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={active.image}
              alt={active.title1}
              fill
              className="object-cover object-top transition-all duration-700 ease-out"
              priority
            />
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-6 h-2 bg-[#701a28]"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

