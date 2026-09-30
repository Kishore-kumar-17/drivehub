"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CarCard } from "@/components/cars/CarCard";
import { Car } from "@/lib/types";

interface FeaturedCarsProps {
  cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(cars.length - 4, prev + 1));
  };

  const badges = ["Featured", "Best Value", "Low KM", "Popular"];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title, Subtitle, View All link & Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-slate-950">
              Featured Cars
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Handpicked pre-owned cars ready for their next journey.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/cars"
              className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 transition-colors"
            >
              <span>View All Cars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevSlide}
                disabled={startIndex === 0}
                aria-label="Previous cars"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={startIndex >= cars.length - 4}
                aria-label="Next cars"
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cars.slice(startIndex, startIndex + 4).map((car, idx) => (
            <CarCard
              key={car.id}
              car={car}
              badgeLabel={badges[(startIndex + idx) % badges.length]}
              priority={idx < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
