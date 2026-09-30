"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Info, IndianRupee } from "lucide-react";
import { calculateEMI, formatINR, formatPriceLakh } from "@/lib/formatters";

interface EMICalculatorProps {
  initialPrice: number;
}

export function EMICalculator({ initialPrice }: EMICalculatorProps) {
  const [carPrice, setCarPrice] = useState(initialPrice);
  // Default down payment = 20%
  const [downPayment, setDownPayment] = useState(Math.round(initialPrice * 0.2));
  const [tenureYears, setTenureYears] = useState(5); // 5 years = 60 months
  const [interestRate, setInterestRate] = useState(9.5);

  const loanAmount = Math.max(0, carPrice - downPayment);
  const tenureMonths = tenureYears * 12;

  const result = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureMonths);
  }, [loanAmount, interestRate, tenureMonths]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Estimate Your Monthly EMI
          </h3>
        </div>

        <Link
          href="/finance"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          <span>View Finance Partners</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders & Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Car Price */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Vehicle Price</span>
              <span className="font-bold text-slate-900 text-sm">
                {formatINR(carPrice)}
              </span>
            </div>
            <input
              type="range"
              min={300000}
              max={5000000}
              step={25000}
              value={carPrice}
              onChange={(e) => {
                const newPrice = Number(e.target.value);
                setCarPrice(newPrice);
                if (downPayment > newPrice) setDownPayment(Math.round(newPrice * 0.2));
              }}
              className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Down Payment ({Math.round((downPayment / carPrice) * 100)}%)</span>
              <span className="font-bold text-slate-900 text-sm">
                {formatINR(downPayment)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={carPrice * 0.8}
              step={10000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Min: ₹0</span>
              <span>Max: {formatPriceLakh(carPrice * 0.8)} (80%)</span>
            </div>
          </div>

          {/* Loan Duration */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Loan Duration</span>
              <span className="font-bold text-slate-900 text-sm">
                {tenureYears} Years ({tenureMonths} Months)
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {[2, 3, 4, 5, 6, 7].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTenureYears(yr)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    tenureYears === yr
                      ? "bg-slate-950 text-white border-slate-950 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {yr}Y
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Annual Interest Rate</span>
              <span className="font-bold text-slate-900 text-sm">
                {interestRate.toFixed(1)}% p.a.
              </span>
            </div>
            <input
              type="range"
              min={7.5}
              max={16.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>7.5% (Prime)</span>
              <span>16.0% (Standard)</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Estimated Monthly EMI
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight text-red-500">
              {formatINR(result.monthlyEMI)}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>

            <div className="space-y-3 mt-6 pt-5 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Principal Loan Amount</span>
                <span className="font-semibold text-white">
                  {formatINR(result.loanAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Interest Payable</span>
                <span className="font-semibold text-white">
                  {formatINR(result.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-800/80">
                <span className="text-slate-400">Total Amount Payable</span>
                <span className="font-bold text-emerald-400">
                  {formatINR(result.totalPayable)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <Link
              href="/finance"
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs text-center flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Check Financing Options</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>
                Calculation is an estimate. Final loan approval and interest rates depend on credit score &amp; bank terms.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
