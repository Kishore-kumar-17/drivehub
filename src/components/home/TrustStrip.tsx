import React from "react";
import { Car, FileCheck2, ShieldCheck, Award } from "lucide-react";

const STATS = [
  {
    icon: Car,
    stat: "500+",
    label: "Cars Sold",
  },
  {
    icon: FileCheck2,
    stat: "100%",
    label: "Verified Documents",
  },
  {
    icon: ShieldCheck,
    stat: "150+",
    label: "Point Inspection",
  },
  {
    icon: Award,
    stat: "5+",
    label: "Years of Trust",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-white border-b border-slate-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 sm:justify-center"
              >
                {/* Red Circular Icon with subtle border */}
                <div className="w-11 h-11 rounded-full bg-red-50 border border-red-200/80 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight font-sans">
                    {item.stat}
                  </div>
                  <div className="text-xs font-medium text-slate-500 font-sans">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
