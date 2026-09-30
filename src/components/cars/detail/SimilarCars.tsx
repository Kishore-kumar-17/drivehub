import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Car } from "@/lib/types";
import { CarCard } from "@/components/cars/CarCard";

interface SimilarCarsProps {
  cars: Car[];
}

export function SimilarCars({ cars }: SimilarCarsProps) {
  if (!cars || cars.length === 0) return null;

  return (
    <section className="pt-12 sm:pt-16 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-slate-950">
            Similar Pre-Owned Vehicles
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Other certified cars in the same segment you might like
          </p>
        </div>

        <Link
          href="/cars"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
