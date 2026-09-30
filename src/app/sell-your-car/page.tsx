"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  Clock,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { formatPriceLakh } from "@/lib/formatters";
import { getValuationWhatsAppLink } from "@/lib/whatsapp";

export default function SellYourCarPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form fields
  const [regNumber, setRegNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2022);
  const [kmDriven, setKmDriven] = useState(30000);
  const [condition, setCondition] = useState("Good");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const perks = [
    { title: "Free Car Valuation", icon: Tag },
    { title: "Quick & Easy Process", icon: Clock },
    { title: "Best Market Price", icon: Zap },
    { title: "No Obligations", icon: ShieldCheck },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSuccess(true);
    }
  };

  const estimatedMin = Math.max(350000, 1200000 - (2026 - year) * 90000 - Math.round(kmDriven * 4));
  const estimatedMax = Math.round(estimatedMin * 1.15);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner with Red Sports Car Background */}
      <div className="relative bg-[#0D1117] text-white py-14 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=85&w=1600"
            alt="Red Sports Car"
            fill
            priority
            className="object-cover object-right opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-red-500 block">
              Get the Best Value
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Sell Your Car
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              Get a fair valuation from our team. Quick, safe, transparent and hassle-free.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area: Left Perks + Right Valuation Form Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Perk Pills */}
          <div className="lg:col-span-4 space-y-3.5">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3.5"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {perk.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Multi-step Valuation Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-950">
                  Estimated Valuation for Your Car
                </h3>
                <div className="p-5 rounded-2xl bg-slate-950 text-white max-w-sm mx-auto my-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Estimated Resale Value
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-red-500 my-1">
                    {formatPriceLakh(estimatedMin)} &ndash; {formatPriceLakh(estimatedMax)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Based on market condition &bull; Free doorstep inspection
                  </span>
                </div>
                <a
                  href={getValuationWhatsAppLink(regNumber, `${year} ${brand} ${model}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Confirm on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleNext} className="space-y-6">
                {/* Step Indicators: 1 Vehicle Details • 2 Condition • 3 Contact • 4 Photos */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-semibold">
                  {[
                    { num: 1, label: "Vehicle Details" },
                    { num: 2, label: "Condition" },
                    { num: 3, label: "Contact" },
                    { num: 4, label: "Photos" },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className={`flex items-center gap-1.5 ${
                        currentStep === s.num
                          ? "text-red-600 font-bold"
                          : currentStep > s.num
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          currentStep === s.num
                            ? "bg-red-600 text-white"
                            : currentStep > s.num
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {s.num}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* STEP 1: Vehicle Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        required
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                        placeholder="e.g. TN-01-AB-1234"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold uppercase focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Brand
                        </label>
                        <select
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          required
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-600"
                        >
                          <option value="">Select Brand</option>
                          <option value="Hyundai">Hyundai</option>
                          <option value="Toyota">Toyota</option>
                          <option value="Kia">Kia</option>
                          <option value="Maruti Suzuki">Maruti Suzuki</option>
                          <option value="Tata">Tata</option>
                          <option value="Honda">Honda</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Model
                        </label>
                        <input
                          type="text"
                          required
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          placeholder="Select Model or Type"
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Year
                        </label>
                        <select
                          value={year}
                          onChange={(e) => setYear(Number(e.target.value))}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-600"
                        >
                          {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          KM Driven
                        </label>
                        <input
                          type="number"
                          step={1000}
                          value={kmDriven}
                          onChange={(e) => setKmDriven(Number(e.target.value))}
                          placeholder="Enter KM Driven"
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-red-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Condition */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <span className="block text-xs font-bold text-slate-900">
                      Overall Condition
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {["Excellent", "Good", "Fair", "Needs Repair"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCondition(c)}
                          className={`p-3 rounded-lg border text-xs font-bold transition-all ${
                            condition === c
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-slate-50 border-slate-200 text-slate-700"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact */}
                {currentStep === 3 && (
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Photos */}
                {currentStep === 4 && (
                  <div className="space-y-4 text-center py-4">
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                      <span className="text-xs font-bold text-slate-800 block">
                        Upload Vehicle Photos (Optional)
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Upload front, rear, and interior views for higher estimate precision.
                      </span>
                    </div>
                  </div>
                )}

                {/* Next Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>{currentStep === 4 ? "Get Valuation" : "Next Step"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
