"use client";

import React from "react";
import { FilterContent } from "./FilterContent";

export function FilterSidebar() {
  return (
    <aside className="w-72 shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
        <FilterContent />
      </div>
    </aside>
  );
}
