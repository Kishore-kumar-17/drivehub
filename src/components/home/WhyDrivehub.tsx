import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClipboardCheck,
  BadgePercent,
  FileCheck,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: "Thoroughly Inspected",
    description: "150+ point inspection",
  },
  {
    icon: BadgePercent,
    title: "Transparent Pricing",
    description: "No hidden charges",
  },
  {
    icon: CreditCard,
    title: "Easy Financing",
    description: "Flexible loan options",
  },
  {
    icon: FileCheck,
    title: "Verified Documentation",
    description: "RC, insurance & documents checked",
  },
];

export function WhyDrivehub() {
  return (
    <section className="bg-[#0B0F19] text-white py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Car Taillight Image Visual (4 cols) */}
          <div className="lg:col-span-4 relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=85&w=800"
              alt="Sleek Car Taillight"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />
          </div>

          {/* Right Column: Copy + 2x2 Feature Cards Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-500 block mb-2">
                  Why DRIVEHUB
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
                  Buying Used Should <br />
                  Feel Like Buying{" "}
                  <span className="text-red-500 font-editorial italic font-normal">
                    New.
                  </span>
                </h2>
              </div>

              <Link
                href="/about"
                className="text-xs font-bold text-red-500 hover:text-red-400 inline-flex items-center gap-1 transition-colors self-start sm:self-auto"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-4.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-colors flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-500/25 text-red-500 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-normal font-sans">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-normal mt-0.5 font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
