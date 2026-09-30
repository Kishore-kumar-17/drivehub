"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Car } from "@/lib/types";
import { CarCard } from "@/components/cars/CarCard";
import { FilterDrawer } from "@/components/cars/FilterDrawer";
import { useWishlist } from "@/context/WishlistContext";
import {
  Car as CarIcon,
  RotateCcw,
  LayoutGrid,
  List,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface InventoryViewProps {
  initialCars: Car[];
}

const ITEMS_PER_PAGE = 6;

export function InventoryView({ initialCars }: InventoryViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { wishlist } = useWishlist();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const isWishlistOnly = searchParams.get("wishlistOnly") === "true";
  const currentPage = Math.max(1, Number(searchParams.get("page") || "1"));
  const currentSort = searchParams.get("sort") || "recommended";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/cars?${params.toString()}`);
  };

  const displayedCars = useMemo(() => {
    if (isWishlistOnly) {
      return initialCars.filter((c) => wishlist.includes(c.id));
    }
    return initialCars;
  }, [initialCars, isWishlistOnly, wishlist]);

  const totalItems = displayedCars.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedCars = displayedCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearAllFilters = () => {
    router.push("/cars");
  };

  const navigatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-base sm:text-lg font-black text-slate-950">
          42 Cars Available
        </h2>

        <div className="flex items-center gap-3">
          <FilterDrawer activeFilterCount={0} />

          {/* Sort by dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-2xs focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Newest Year</option>
                <option value="km-asc">Lowest KM</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Grid / List switcher */}
          <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded ${
                viewMode === "grid"
                  ? "bg-red-600 text-white"
                  : "text-slate-400 hover:text-slate-800"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1 rounded ${
                viewMode === "list"
                  ? "bg-red-600 text-white"
                  : "text-slate-400 hover:text-slate-800"
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Cars */}
      {paginatedCars.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginatedCars.map((car, idx) => (
              <CarCard key={car.id} car={car} priority={idx < 3} />
            ))}
          </div>

          {/* Exact Numbered Pagination from Screenshot: [1] 2 3 ... 7 > */}
          <div className="flex items-center justify-center gap-1.5 pt-10">
            <button
              type="button"
              onClick={() => navigatePage(1)}
              className="w-8 h-8 rounded-lg text-xs font-bold bg-red-600 text-white shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => navigatePage(2)}
              className="w-8 h-8 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => navigatePage(3)}
              className="w-8 h-8 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              3
            </button>
            <span className="px-1 text-slate-400 text-xs">...</span>
            <button
              type="button"
              onClick={() => navigatePage(7)}
              className="w-8 h-8 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => navigatePage(Math.min(totalPages, currentPage + 1))}
              className="w-8 h-8 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
          <CarIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">
            No Cars Matching Selected Filters
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Try resetting your filters to explore our full inventory.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
