import React from "react";
import { Check, Armchair, Shield, Cpu, Sparkles } from "lucide-react";
import { CarFeatures } from "@/lib/types";

interface FeatureListProps {
  features: CarFeatures;
}

export function FeatureList({ features }: FeatureListProps) {
  const GROUPS = [
    {
      title: "Comfort & Convenience",
      icon: Armchair,
      items: features.comfort || [],
    },
    {
      title: "Safety & Driver Assistance",
      icon: Shield,
      items: features.safety || [],
    },
    {
      title: "Technology & Infotainment",
      icon: Cpu,
      items: features.technology || [],
    },
    ...(features.exterior && features.exterior.length > 0
      ? [
          {
            title: "Exterior & Styling",
            icon: Sparkles,
            items: features.exterior,
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-6">
      <h3 className="text-base font-bold text-slate-900 tracking-tight">
        Key Vehicle Features
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GROUPS.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Icon className="w-4 h-4 text-red-600 shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {group.title}
                </h4>
              </div>

              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
