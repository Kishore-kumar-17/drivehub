"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Car,
  Tag,
  Fuel,
  Settings2,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { getFilterMetadata } from "@/lib/cars";

export function CarSearch() {
  const router = useRouter();
  const metadata = getFilterMetadata();

  const [activeTab, setActiveTab] = useState<"standard" | "advanced">("standard");
  const [brand, setBrand] = useState("all");
  const [model, setModel] = useState("all");
  const [budget, setBudget] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [transmission, setTransmission] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand && brand !== "all") params.set("brand", brand);
    if (model && model !== "all") params.set("model", model);
    if (fuel && fuel !== "all") params.set("fuel", fuel);
    if (transmission && transmission !== "all")
      params.set("transmission", transmission);
    if (budget && budget !== "all") params.set("maxPrice", budget);

    const query = params.toString();
    router.push(query ? `/cars?${query}` : "/cars");
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 sm:p-5 relative z-20">
      {/* Top Tabs Row */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-6 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("standard")}
            className={`pb-2 transition-all relative flex items-center gap-1.5 font-bold ${
              activeTab === "standard"
                ? "text-slate-900 border-b-2 border-red-600 font-bold"
                : "text-slate-400 hover:text-slate-700 font-medium"
            }`}
          >
            <span>Search Cars</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("advanced");
              router.push("/cars");
            }}
            className={`pb-2 transition-all font-medium ${
              activeTab === "advanced"
                ? "text-slate-900 border-b-2 border-red-600 font-bold"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <span>Advanced Search</span>
          </button>
        </div>

        <span className="text-[11px] font-medium text-slate-400 hidden sm:block tracking-wide font-sans">
          Find Your Perfect Car
        </span>
      </div>

      {/* Input Filters Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-11 gap-3 items-center"
      >
        {/* Make (2 cols) */}
        <div className="lg:col-span-2 relative border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Car className="w-3 h-3 text-slate-500" />
            <span>Make</span>
          </div>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer mt-0.5 pr-2"
          >
            <option value="all">Any Make</option>
            {metadata.brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Model (2 cols) */}
        <div className="lg:col-span-2 relative border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Tag className="w-3 h-3 text-slate-500" />
            <span>Model</span>
          </div>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer mt-0.5 pr-2"
          >
            <option value="all">Any Model</option>
            <option value="Creta">Creta</option>
            <option value="Innova Crysta">Innova Crysta</option>
            <option value="Seltos">Seltos</option>
            <option value="Baleno">Baleno</option>
            <option value="Nexon">Nexon</option>
            <option value="City">City</option>
            <option value="Thar">Thar</option>
          </select>
        </div>

        {/* Budget (2 cols) */}
        <div className="lg:col-span-2 relative border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <DollarSign className="w-3 h-3 text-slate-500" />
            <span>Budget</span>
          </div>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer mt-0.5 pr-2"
          >
            <option value="all">Any Budget</option>
            <option value="800000">Under ₹8 Lakh</option>
            <option value="1200000">Under ₹12 Lakh</option>
            <option value="1600000">Under ₹16 Lakh</option>
            <option value="2000000">Under ₹20 Lakh</option>
            <option value="3000000">Under ₹30 Lakh</option>
          </select>
        </div>

        {/* Fuel Type (2 cols) */}
        <div className="lg:col-span-2 relative border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Fuel className="w-3 h-3 text-slate-500" />
            <span>Fuel Type</span>
          </div>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer mt-0.5 pr-2"
          >
            <option value="all">Any Fuel</option>
            {metadata.fuels.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission (2 cols) */}
        <div className="lg:col-span-2 relative border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
            <Settings2 className="w-3 h-3 text-slate-500" />
            <span>Transmission</span>
          </div>
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer mt-0.5 pr-2"
          >
            <option value="all">Any Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Red Circular Search Button (1 col) */}
        <div className="lg:col-span-1 flex items-center justify-center pt-2 sm:pt-0">
          <button
            type="submit"
            aria-label="Search Inventory"
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 active:scale-90 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-all duration-200"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
