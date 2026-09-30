"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* Background Image - High-Res Crisp Fortuner Sunset */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-fortuner.jpg"
          alt="Black Toyota Fortuner on scenic mountain highway at golden sunset"
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover object-[78%_center] md:object-[70%_center] lg:object-center"
          sizes="100vw"
        />

        {/* Targeted Left Gradient Vignette: Darkens behind text on left, preserves crystal clear car and sunset on right */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent z-10" />

        {/* Subtle top shade for navbar contrast */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />

        {/* Gentle bottom edge ground */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Top Right "Good Cars, Better Journeys." Handwritten Watermark */}
      <div className="absolute top-6 sm:top-10 right-6 sm:right-10 lg:right-16 z-20 hidden md:block text-right pointer-events-none select-none">
        <div className="font-handwriting text-3xl sm:text-4xl lg:text-5xl text-white/95 leading-[1.05] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide">
          Good <br />
          Cars <br />
          Better <br />
          Journeys.
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-7">
          {/* Editorial Headline matching mockup font style */}
          <h1 className="font-editorial text-5xl sm:text-7xl lg:text-[80px] font-normal tracking-tight text-white leading-[1.04] drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]">
            Find Your <br />
            Next{" "}
            <span className="text-[#DC2626] font-editorial italic font-normal">
              Journey
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-slate-200 max-w-lg leading-relaxed drop-shadow font-medium">
            Quality inspected pre-owned cars at transparent prices. Trusted by 500+ happy customers.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1 sm:pt-2">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#DC2626] hover:bg-red-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all duration-200"
            >
              <span>Browse Cars</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/sell-your-car"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-black/40 hover:bg-black/65 active:scale-95 text-slate-100 border border-white/30 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-200"
            >
              <span>Sell Your Car</span>
            </Link>
          </div>

          {/* Customer Avatars & Social Proof */}
          <div className="flex items-center gap-3.5 pt-2 sm:pt-4">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white/30 object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                alt="Customer"
              />
              <img
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white/30 object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                alt="Customer"
              />
              <img
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white/30 object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120"
                alt="Customer"
              />
              <img
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white/30 object-cover shadow-sm"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
                alt="Customer"
              />
            </div>

            <span className="text-xs sm:text-sm font-semibold text-slate-200 drop-shadow">
              500+ Happy Customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
