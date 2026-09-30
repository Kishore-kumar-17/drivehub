"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Percent,
  Calendar,
  Zap,
  FileText,
  ArrowRight,
} from "lucide-react";
import { calculateEMI, formatINR } from "@/lib/formatters";

export default function FinancePage() {
  // Calculator state
  const [vehiclePrice, setVehiclePrice] = useState(1425000);
  const [downPayment, setDownPayment] = useState(285000); // 20%
  const [tenureYears, setTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(9.0);

  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const emiResult = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureYears * 12);
  }, [loanAmount, interestRate, tenureYears]);

  const perks = [
    { title: "Competitive Interest Rates", icon: Percent },
    { title: "Flexible Tenure Options", icon: Calendar },
    { title: "Quick Approval", icon: Zap },
    { title: "Minimal Documentation", icon: FileText },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero with Silver Sedan Image */}
      <div className="relative bg-[#0D1117] text-white py-14 sm:py-18 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=85&w=1600"
            alt="Silver Luxury Sedan"
            fill
            priority
            className="object-cover object-right opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/85 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-red-500 block">
              Flexible Financing
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Make Your Dream Car <br />
              More Affordable.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              Flexible financing options with competitive rates and simple documentation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* 4 Feature Circles Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {perk.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* EMI Calculator Card matching Screenshot */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-950 mb-6">
            EMI Calculator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Inputs Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vehicle Price
                  </label>
                  <input
                    type="number"
                    step={10000}
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Down Payment (20%)
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Loan Duration
                  </label>
                  <select
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  >
                    {[2, 3, 4, 5, 6, 7].map((yr) => (
                      <option key={yr} value={yr}>
                        {yr} Years
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Box (4 cols) */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-3">
              <span className="text-[11px] uppercase font-bold text-slate-400 block">
                Monthly EMI
              </span>
              <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight">
                {formatINR(emiResult.monthlyEMI)}
              </div>
              <span className="text-[10px] text-slate-400 block">
                * This is an estimated calculation.
              </span>

              <button
                type="button"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
