import React from "react";
import { Car } from "@/lib/types";

interface VehicleSpecsProps {
  car: Car;
}

export function VehicleSpecs({ car }: VehicleSpecsProps) {
  const leftCol = [
    { label: "Engine", value: car.engine.split(",")[0] },
    { label: "Power", value: car.power.split("@")[0] },
    { label: "Torque", value: car.torque.split("@")[0] },
    { label: "Mileage", value: car.mileage },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel Type", value: car.fuel },
  ];

  const rightCol = [
    { label: "Seating Capacity", value: `${car.seatingCapacity}` },
    { label: "Boot Space", value: car.bootSpace || "433 Litres" },
    { label: "Registration Year", value: String(car.registrationYear) },
    { label: "Ownership", value: car.ownership },
    { label: "Insurance", value: "Valid" },
    { label: "Color", value: car.color },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
      <h3 className="text-sm font-black text-slate-950">Specifications</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs">
        <div className="space-y-1.5">
          {leftCol.map((spec, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 border-b border-slate-100"
            >
              <span className="text-slate-500 font-medium">{spec.label}</span>
              <span className="font-semibold text-slate-900">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {rightCol.map((spec, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 border-b border-slate-100"
            >
              <span className="text-slate-500 font-medium">{spec.label}</span>
              <span className="font-semibold text-slate-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
