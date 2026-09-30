import React from "react";
import {
  UserCheck,
  ShieldCheck,
  History,
  FileCheck2,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import { Car } from "@/lib/types";

interface VehicleHighlightsProps {
  car: Car;
}

export function VehicleHighlights({ car }: VehicleHighlightsProps) {
  const HIGHLIGHTS = [
    { icon: UserCheck, label: car.ownership },
    { icon: ShieldCheck, label: "No Major Accidents" },
    { icon: History, label: "Service History" },
    { icon: FileCheck2, label: "Insurance Valid" },
    { icon: FileText, label: "RC Verified" },
    { icon: ClipboardCheck, label: "150+ Inspection" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
      <h3 className="text-sm font-black text-slate-950 mb-3.5">
        Key Highlights
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {HIGHLIGHTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col items-center text-center justify-center gap-1.5"
            >
              <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
