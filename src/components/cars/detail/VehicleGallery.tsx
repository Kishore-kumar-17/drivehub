"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  Heart,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface VehicleGalleryProps {
  images: string[];
  title: string;
  carId: string;
  conditionScore: number;
}

export function VehicleGallery({
  images,
  title,
  carId,
  conditionScore,
}: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(carId);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main Display Stage */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-md group">
          <Image
            src={images[activeIndex]}
            alt={`${title} - View ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover transition-all duration-300"
          />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Inspection Score: {conditionScore}/100
            </span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* Wishlist toggle */}
            <button
              type="button"
              onClick={() => toggleWishlist(carId)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "p-2.5 rounded-full backdrop-blur-md shadow-md transition-all active:scale-90",
                wishlisted
                  ? "bg-red-600 text-white"
                  : "bg-white/85 text-slate-800 hover:text-red-600 hover:bg-white"
              )}
            >
              <Heart
                className={cn("w-4 h-4", wishlisted && "fill-current")}
              />
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label="View fullscreen gallery"
              className="p-2.5 rounded-full bg-white/85 text-slate-800 hover:text-red-600 hover:bg-white backdrop-blur-md shadow-md transition-all active:scale-90"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Prev / Next navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-md active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-md active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Photo Counter */}
          <div className="absolute bottom-3 right-4 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-red-400" />
            <span>
              {activeIndex + 1} / {images.length} Photos
            </span>
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-slate-900",
                  activeIndex === idx
                    ? "border-red-600 ring-2 ring-red-500/20 shadow-sm"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold">{title}</span>
              <span className="text-xs text-slate-400">
                ({activeIndex + 1} of {images.length})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <Image
                src={images[activeIndex]}
                alt={title}
                fill
                className="object-contain"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails in lightbox */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative w-16 h-12 rounded-md overflow-hidden border-2 shrink-0",
                  activeIndex === idx ? "border-red-600" : "border-transparent opacity-50 hover:opacity-80"
                )}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
