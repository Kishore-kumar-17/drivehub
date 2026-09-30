"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import { Car } from "@/lib/types";
import { formatPriceLakh, calculateEMI, formatINR } from "@/lib/formatters";
import { getCarWhatsAppLink } from "@/lib/whatsapp";
import { DEALERSHIP_CONFIG } from "@/lib/config";
import { useModals } from "@/context/ModalContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface VehicleActionPanelProps {
  car: Car;
}

export function VehicleActionPanel({ car }: VehicleActionPanelProps) {
  const { openTestDriveModal, openEnquiryModal } = useModals();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(car.id);
  const whatsappUrl = getCarWhatsAppLink(car);

  // Embedded EMI Calculator State
  const [carPrice, setCarPrice] = useState(car.price);
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.2));
  const [tenureYears, setTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(9.0);

  const loanAmount = Math.max(0, carPrice - downPayment);
  const emiResult = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureYears * 12);
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div className="space-y-6 sticky top-20">
      {/* Top Details & CTA Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        {/* Title, Year, Subtitle & Heart */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-xl font-extrabold text-slate-950 tracking-tight">
              {car.brand} {car.model}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {car.year} &bull; {car.kmDriven.toLocaleString("en-IN")} km &bull; {car.bodyType}
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(car.id)}
            aria-label="Wishlist"
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors"
          >
            <Heart
              className={cn(
                "w-4 h-4",
                wishlisted && "fill-red-600 text-red-600"
              )}
            />
          </button>
        </div>

        {/* Pricing in Large Bold Red */}
        <div>
          <div className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
            {formatPriceLakh(car.price)}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-0.5">
            EMI from <span className="font-bold text-slate-800">{formatINR(emiResult.monthlyEMI)}/month</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{car.location}</span>
          </div>
        </div>

        {/* Main CTA Buttons */}
        <div className="space-y-2 pt-1">
          {/* Book a Test Drive (Red) */}
          <button
            type="button"
            onClick={() => openTestDriveModal(car)}
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-bold rounded-lg text-xs shadow-xs transition-all text-center"
          >
            Book a Test Drive
          </button>

          {/* WhatsApp (Green) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] active:scale-98 text-white font-bold rounded-lg text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Call Dealer | Send Enquiry */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs text-center flex items-center justify-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-slate-600" />
              <span>Call Dealer</span>
            </a>

            <button
              type="button"
              onClick={() => openEnquiryModal(car)}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs text-center flex items-center justify-center gap-1 transition-colors"
            >
              <Mail className="w-3 h-3 text-slate-600" />
              <span>Send Enquiry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded EMI Calculator Card matching Screenshot */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-black text-slate-950">EMI Calculator</h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Vehicle Price</span>
            <span className="font-bold text-slate-900">{formatINR(carPrice)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">
              Down Payment ({Math.round((downPayment / carPrice) * 100)}%)
            </span>
            <span className="font-bold text-slate-900">{formatINR(downPayment)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={carPrice * 0.8}
            step={10000}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-red-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          />

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Loan Duration</span>
            <span className="font-bold text-slate-900">{tenureYears} Years</span>
          </div>
          <div className="grid grid-cols-5 gap-1 text-[11px]">
            {[3, 4, 5, 6, 7].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setTenureYears(yr)}
                className={`py-1 rounded border font-semibold ${
                  tenureYears === yr
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                {yr}Y
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Interest Rate</span>
            <span className="font-bold text-slate-900">{interestRate}%</span>
          </div>
        </div>

        {/* Monthly EMI Large Red Box */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">
            Monthly EMI
          </span>
          <div className="text-2xl font-black text-red-600 tracking-tight">
            {formatINR(emiResult.monthlyEMI)}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            * This is an estimated calculation.
          </span>
        </div>

        <button
          type="button"
          onClick={() => openTestDriveModal(car)}
          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors"
        >
          Check Financing Options
        </button>
      </div>
    </div>
  );
}
