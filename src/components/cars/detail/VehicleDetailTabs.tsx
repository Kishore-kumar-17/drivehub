"use client";

import React, { useState } from "react";
import {
  Fan,
  Tv,
  Wind,
  Gauge,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Car } from "@/lib/types";
import { InspectionReport } from "./InspectionReport";

interface VehicleDetailTabsProps {
  car: Car;
}

export function VehicleDetailTabs({ car }: VehicleDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "inspection"
  >("overview");

  const featureChips = [
    { label: "Automatic Climate Control", icon: Fan },
    { label: "Touchscreen Infotainment", icon: Tv },
    { label: "Rear AC Vents", icon: Wind },
    { label: "Cruise Control", icon: Gauge },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-5">
      {/* Tabs Row matching Screenshot */}
      <div className="flex items-center gap-6 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`pb-2 transition-colors relative ${
            activeTab === "overview"
              ? "text-red-600 font-extrabold border-b-2 border-red-600"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("features")}
          className={`pb-2 transition-colors relative ${
            activeTab === "features"
              ? "text-red-600 font-extrabold border-b-2 border-red-600"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Features
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("inspection")}
          className={`pb-2 transition-colors relative ${
            activeTab === "inspection"
              ? "text-red-600 font-extrabold border-b-2 border-red-600"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Inspection Report
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {car.description}
          </p>

          {/* Red icon feature chips row matching screenshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {featureChips.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-bold text-slate-800"
                >
                  <div className="w-6 h-6 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] leading-tight">{chip.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Features */}
      {activeTab === "features" && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="font-bold text-slate-900 block mb-2">Comfort</span>
              <ul className="space-y-1 text-slate-600">
                {car.features.comfort.map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-2">Safety</span>
              <ul className="space-y-1 text-slate-600">
                {car.features.safety.map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-2">Technology</span>
              <ul className="space-y-1 text-slate-600">
                {car.features.technology.map((item, i) => (
                  <li key={i}>&bull; {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Inspection */}
      {activeTab === "inspection" && (
        <InspectionReport scores={car.inspectionScores} />
      )}
    </div>
  );
}
