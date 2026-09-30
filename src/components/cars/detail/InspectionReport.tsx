import React from "react";
import { ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import { InspectionScores } from "@/lib/types";

interface InspectionReportProps {
  scores: InspectionScores;
}

export function InspectionReport({ scores }: InspectionReportProps) {
  const CATEGORIES = [
    { label: "Engine & Transmission", score: scores.engine },
    { label: "Exterior Body & Paint", score: scores.exterior },
    { label: "Interior & Cabin Trim", score: scores.interior },
    { label: "Tyres, Brakes & Suspension", score: scores.tyres },
    { label: "Electricals & Battery Health", score: scores.electrical },
    { label: "RTO & Legal Documentation", score: scores.documents },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>150+ Point Comprehensive Audit</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Certified Inspection Report
          </h3>
        </div>

        {/* Overall score badge */}
        <div className="flex items-center gap-3 bg-slate-950 text-white px-4 py-2 rounded-xl self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Overall Score
            </span>
            <span className="text-2xl font-black text-emerald-400">
              {scores.overall}
              <span className="text-xs text-slate-400 font-normal">/100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bars for Categories */}
      <div className="space-y-4">
        {CATEGORIES.map((cat, idx) => {
          let barColor = "bg-emerald-600";
          if (cat.score < 90) barColor = "bg-amber-500";
          if (cat.score < 80) barColor = "bg-red-500";

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-700">{cat.label}</span>
                <span className="font-bold text-slate-950">{cat.score}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Disclaimer notice */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-semibold text-slate-700">Sample/Demo Data:</span>{" "}
          This inspection score represents the standard 150-point checklist performed by certified DRIVEHUB master mechanics. Full PDF report available upon booking a test drive.
        </p>
      </div>
    </div>
  );
}
