import React from "react";
import Image from "next/image";
import { DEALERSHIP_CONFIG } from "@/lib/config";

const STATS = [
  { value: "500+", label: "Cars Sold" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "150+", label: "Point Inspection" },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Banner with Dealership Showroom Image */}
      <div className="bg-white border-b border-slate-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left copy */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-red-600 block">
                Buy a Car
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-slate-950">
                About DRIVEHUB
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed pt-1">
                We&apos;re on a mission to make pre-owned cars a smarter, safer and more trusted choice for everyone.
              </p>
            </div>

            {/* Right showroom image with neon sign */}
            <div className="md:col-span-5 relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=85&w=800"
                alt="DRIVEHUB Showroom"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-between p-5">
                <span className="font-black text-xl text-white tracking-tight drop-shadow-md">
                  DRIVE<span className="text-red-500">HUB</span>
                </span>
                <div className="text-right">
                  <span className="font-handwriting text-2xl text-white/95 block drop-shadow-md leading-tight">
                    Real Cars. <br />
                    Real People. <br />
                    Real Stories.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Boxes matching Screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs text-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
