"use client";

import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterContent } from "./FilterContent";

interface FilterDrawerProps {
  activeFilterCount: number;
}

export function FilterDrawer({ activeFilterCount }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 transition-colors"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer container */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-slate-950 text-sm">
                  Vehicle Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              <FilterContent onCloseMobileDrawer={() => setIsOpen(false)} />
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 bg-red-600 text-white font-bold rounded-lg text-xs shadow-sm hover:bg-red-700"
              >
                Apply Filters &amp; View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
