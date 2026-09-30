import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CarSearch } from "@/components/home/CarSearch";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyDrivehub } from "@/components/home/WhyDrivehub";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { CTABanner } from "@/components/home/CTABanner";
import { getFeaturedCars, getCars } from "@/lib/cars";

export const metadata: Metadata = {
  title: "DRIVEHUB | Trusted Pre-Owned Cars. Ready for the Road.",
  description:
    "Explore certified second-hand pre-owned cars at transparent prices. Browse our verified inventory of Hyundai, Toyota, Kia, Tata, Honda and more.",
};

export default async function HomePage() {
  const [featuredCars, allCars] = await Promise.all([
    getFeaturedCars(),
    getCars(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Full Fitted Hero Section */}
      <Hero />

      {/* 2. Dedicated Search Cars Section */}
      <section className="relative z-20 bg-slate-50 pt-8 pb-4 px-4 sm:px-6 lg:px-8 w-full border-b border-slate-200/50">
        <CarSearch />
      </section>

      {/* 3. Trust Strip */}
      <TrustStrip />

      {/* 4. Featured Cars */}
      <FeaturedCars cars={featuredCars.length > 0 ? featuredCars : allCars} />

      {/* 5. Why Drivehub */}
      <WhyDrivehub />

      {/* 6. Customer Reviews */}
      <ReviewsSection />

      {/* 7. CTA Banner */}
      <CTABanner />
    </div>
  );
}
