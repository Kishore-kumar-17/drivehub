import React from "react";

export function CarCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs animate-pulse">
      <div className="aspect-[16/10] bg-slate-200" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-3.5 bg-slate-200 rounded w-1/3" />
          <div className="h-5 bg-slate-300 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100">
          <div className="h-3 bg-slate-200 rounded" />
          <div className="h-3 bg-slate-200 rounded" />
          <div className="h-3 bg-slate-200 rounded" />
        </div>
        <div className="pt-2 flex items-center justify-between">
          <div className="h-6 bg-slate-300 rounded w-1/3" />
          <div className="h-9 bg-slate-200 rounded w-28" />
        </div>
      </div>
    </div>
  );
}
