import React from "react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryPills } from "@/components/home/CategoryPills";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { PromoDualBanner } from "@/components/home/PromoDualBanner";
import { OccasionSection } from "@/components/home/OccasionSection";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="w-full pb-8 space-y-2 sm:space-y-4">
      {/* 1. Hero Fashion Banner with Sliders */}
      <HeroSlider />

      {/* 2. 8 Circular Category Pills */}
      <CategoryPills />

      {/* 3. 3 Featured Collection Banners */}
      <FeaturedCollections />

      {/* 4. Trending Now (6 Interactive Products Grid) */}
      <TrendingProducts />

      {/* 5. 4 Trust / Value Proposition Strip */}
      <FeatureStrip />

      {/* 6. Winter Essentials & 40% OFF Dual Banners */}
      <PromoDualBanner />

      {/* 7. Shop by Occasion (6 Cards) */}
      <OccasionSection />

      {/* 8. Top Brands Strip */}
      <BrandCarousel />

      {/* 9. Customer Testimonials */}
      <ReviewsSection />

      {/* 10. Deep Burgundy Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}

