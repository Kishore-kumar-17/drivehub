"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Fuel,
  Settings2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Car } from "@/lib/types";
import { formatPriceLakh, formatKM, getEstimatedMonthlyEMI, formatINR } from "@/lib/formatters";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  priority?: boolean;
  badgeLabel?: string;
}

export function CarCard({ car, priority = false, badgeLabel }: CarCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(car.id);
  const emi = getEstimatedMonthlyEMI(car.price);

  // Badge logic matching screenshot
  let displayBadge = badgeLabel;
  if (!displayBadge) {
    if (car.featured) displayBadge = "Featured";
    else if (car.kmDriven < 25000) displayBadge = "Low KM";
    else if (car.price < 1000000) displayBadge = "Best Value";
    else displayBadge = "Popular";
  }

  let badgeBg = "bg-amber-500 text-white";
  if (displayBadge === "Featured") badgeBg = "bg-amber-600 text-white";
  if (displayBadge === "Best Value") badgeBg = "bg-emerald-600 text-white";
  if (displayBadge === "Low KM") badgeBg = "bg-blue-600 text-white";
  if (displayBadge === "Popular") badgeBg = "bg-orange-500 text-white";

  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image Stage */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Link href={`/cars/${car.slug}`} className="relative block w-full h-full">
          <Image
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className="object-cover group-hover:scale-103 transition-transform duration-300"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          {displayBadge && (
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide shadow-xs",
                badgeBg
              )}
            >
              {displayBadge}
            </span>
          )}

          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(car.id);
            }}
            aria-label="Save to Wishlist"
            className="pointer-events-auto p-1.5 rounded-full bg-slate-950/40 hover:bg-slate-950/70 text-white backdrop-blur-xs transition-colors"
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                wishlisted && "fill-red-500 text-red-500"
              )}
            />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Year • KM */}
          {(() => {
            const variantTrim = car.variant ? car.variant.split(" ")[0] : "";
            const showVariant = variantTrim && !car.model.toLowerCase().includes(variantTrim.toLowerCase()) && variantTrim !== "1.5" && variantTrim !== "2.4";
            const cardTitle = `${car.brand} ${car.model}${showVariant ? ` ${variantTrim}` : ""}`;
            return (
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                <Link href={`/cars/${car.slug}`}>
                  {cardTitle}
                </Link>
              </h3>
            );
          })()}
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
            {car.year} &bull; {formatKM(car.kmDriven)}
          </p>

          {/* Price (BOLD RED) and EMI */}
          <div className="mt-2.5 mb-3">
            <div className="text-base font-bold text-red-600 tracking-tight">
              {formatPriceLakh(car.price)}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              EMI from {formatINR(emi)}/mo
            </div>
          </div>

          {/* Spec Chips with Icons */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 py-2 border-t border-slate-100 font-medium">
            <div className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.fuel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.location}</span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="pt-2">
          <Link
            href={`/cars/${car.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#0B0F19] text-white text-[11px] font-semibold hover:bg-slate-800 transition-colors duration-150"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
