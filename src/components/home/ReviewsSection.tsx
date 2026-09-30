"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { MOCK_REVIEWS } from "@/data/cars";

export function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const customerAvatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150",
  ];

  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-slate-950">
            What Our Customers Say
          </h2>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
              disabled={startIndex === 0}
              aria-label="Previous review"
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setStartIndex((prev) => Math.min(MOCK_REVIEWS.length - 3, prev + 1))
              }
              disabled={startIndex >= MOCK_REVIEWS.length - 3}
              aria-label="Next review"
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_REVIEWS.slice(startIndex, startIndex + 3).map((rev, i) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-red-500/30 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <div className="flex items-center gap-0.5 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={customerAvatars[(startIndex + i) % customerAvatars.length]}
                    alt={rev.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {rev.author}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {rev.carPurchased}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
