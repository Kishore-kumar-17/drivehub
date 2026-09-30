"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { formatPriceLakh } from "@/lib/formatters";

interface FilterContentProps {
  onCloseMobileDrawer?: () => void;
}

const ALL_BRANDS = [
  "Hyundai",
  "Toyota",
  "Kia",
  "Maruti Suzuki",
  "Tata",
  "Honda",
  "Mahindra",
  "Volkswagen",
  "BMW",
  "Skoda",
  "MG",
];

export function FilterContent({ onCloseMobileDrawer }: FilterContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showAllBrands, setShowAllBrands] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const currentBrand = searchParams.get("brand") || "all";
  const currentFuel = searchParams.get("fuel") || "all";
  const currentTransmission = searchParams.get("transmission") || "all";
  const currentBodyType = searchParams.get("bodyType") || "all";
  const currentOwnership = searchParams.get("ownership") || "all";
  const currentLocation = searchParams.get("location") || "all";
  const currentMaxPrice = searchParams.get("maxPrice") || "5000000";
  const currentMinYear = searchParams.get("minYear") || "";
  const currentMaxYear = searchParams.get("maxYear") || "";
  const currentMaxKm = searchParams.get("maxKm") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`/cars?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setSearchInput("");
    router.push("/cars");
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", searchInput.trim());
  };

  const visibleBrands = showAllBrands ? ALL_BRANDS : ALL_BRANDS.slice(0, 6);

  return (
    <div className="space-y-5 text-xs text-slate-700">
      {/* Filters Title & Clear All */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h3 className="text-sm font-black text-slate-950">Filters</h3>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Search by brand or model */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by brand or model..."
          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
      </form>

      {/* Brand Checkboxes */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <span className="font-bold text-slate-900 block text-xs">Brand</span>
        <div className="space-y-1.5">
          {visibleBrands.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 cursor-pointer hover:text-slate-950 font-medium"
            >
              <input
                type="checkbox"
                checked={currentBrand.toLowerCase() === b.toLowerCase()}
                onChange={(e) => updateParam("brand", e.target.checked ? b : "all")}
                className="w-3.5 h-3.5 rounded text-red-600 focus:ring-red-500 border-slate-300"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAllBrands(!showAllBrands)}
          className="text-[11px] font-bold text-red-600 hover:underline pt-1 block"
        >
          {showAllBrands ? "- Show less" : "+ Show more"}
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 text-xs">Price Range</span>
          <span className="text-[11px] font-bold text-red-600">
            {formatPriceLakh(Number(currentMaxPrice))}
          </span>
        </div>
        <input
          type="range"
          min={500000}
          max={5000000}
          step={100000}
          value={currentMaxPrice}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
          className="w-full accent-red-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>₹0</span>
          <span>₹50 Lakh</span>
        </div>
      </div>

      {/* Year */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="font-bold text-slate-900 text-xs block">Year</span>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={currentMinYear}
            onChange={(e) => updateParam("minYear", e.target.value)}
            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px]"
          >
            <option value="">Min Year</option>
            {[2018, 2019, 2020, 2021, 2022, 2023].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={currentMaxYear}
            onChange={(e) => updateParam("maxYear", e.target.value)}
            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[11px]"
          >
            <option value="">Max Year</option>
            {[2020, 2021, 2022, 2023, 2024].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KM Driven */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="font-bold text-slate-900 text-xs block">KM Driven</span>
        <select
          value={currentMaxKm}
          onChange={(e) => updateParam("maxKm", e.target.value)}
          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs"
        >
          <option value="">Any KM</option>
          <option value="20000">Under 20,000 km</option>
          <option value="35000">Under 35,000 km</option>
          <option value="50000">Under 50,000 km</option>
        </select>
      </div>

      {/* Fuel Type */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="font-bold text-slate-900 text-xs block">Fuel Type</span>
        <div className="space-y-1.5">
          {["Petrol", "Diesel", "Electric", "Hybrid", "CNG"].map((f) => (
            <label
              key={f}
              className="flex items-center gap-2 cursor-pointer hover:text-slate-950 font-medium"
            >
              <input
                type="checkbox"
                checked={currentFuel.toLowerCase() === f.toLowerCase()}
                onChange={(e) => updateParam("fuel", e.target.checked ? f : "all")}
                className="w-3.5 h-3.5 rounded text-red-600 focus:ring-red-500 border-slate-300"
              />
              <span>{f}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="font-bold text-slate-900 text-xs block">Transmission</span>
        <div className="space-y-1.5">
          {["Automatic", "Manual"].map((t) => (
            <label
              key={t}
              className="flex items-center gap-2 cursor-pointer hover:text-slate-950 font-medium"
            >
              <input
                type="checkbox"
                checked={currentTransmission.toLowerCase() === t.toLowerCase()}
                onChange={(e) =>
                  updateParam("transmission", e.target.checked ? t : "all")
                }
                className="w-3.5 h-3.5 rounded text-red-600 focus:ring-red-500 border-slate-300"
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="font-bold text-slate-900 text-xs block">Body Type</span>
        <div className="space-y-1.5">
          {["SUV", "Sedan", "Hatchback", "MUV", "Luxury"].map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 cursor-pointer hover:text-slate-950 font-medium"
            >
              <input
                type="checkbox"
                checked={currentBodyType.toLowerCase() === b.toLowerCase()}
                onChange={(e) =>
                  updateParam("bodyType", e.target.checked ? b : "all")
                }
                className="w-3.5 h-3.5 rounded text-red-600 focus:ring-red-500 border-slate-300"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ownership */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="font-bold text-slate-900 text-xs block">Ownership</span>
        <div className="space-y-1.5">
          {["1st Owner", "2nd Owner"].map((o) => (
            <label
              key={o}
              className="flex items-center gap-2 cursor-pointer hover:text-slate-950 font-medium"
            >
              <input
                type="checkbox"
                checked={currentOwnership.toLowerCase() === o.toLowerCase()}
                onChange={(e) =>
                  updateParam("ownership", e.target.checked ? o : "all")
                }
                className="w-3.5 h-3.5 rounded text-red-600 focus:ring-red-500 border-slate-300"
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="font-bold text-slate-900 text-xs block">Location</span>
        <select
          value={currentLocation}
          onChange={(e) => updateParam("location", e.target.value)}
          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium"
        >
          <option value="all">Any Location</option>
          <option value="Chennai">Chennai</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi NCR">Delhi NCR</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pune">Pune</option>
        </select>
      </div>
    </div>
  );
}
