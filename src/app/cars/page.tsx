import { Metadata } from "next";
import Image from "next/image";
import { getCars } from "@/lib/cars";
import { FilterSidebar } from "@/components/cars/FilterSidebar";
import { InventoryView } from "@/components/cars/InventoryView";

export const metadata: Metadata = {
  title: "Explore 42 Quality Pre-Owned Cars | DRIVEHUB",
  description:
    "Browse verified pre-owned cars in Chennai, Bengaluru, Mumbai, Delhi NCR, and Hyderabad. Filter by brand, budget, transmission, fuel, and year.",
};

interface CarsPageProps {
  searchParams: Promise<{
    search?: string;
    brand?: string;
    model?: string;
    fuel?: string;
    transmission?: string;
    bodyType?: string;
    ownership?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    minYear?: string;
    maxYear?: string;
    maxKm?: string;
    sort?: "recommended" | "price-asc" | "price-desc" | "year-desc" | "km-asc";
  }>;
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const resolvedParams = await searchParams;

  const cars = await getCars({
    search: resolvedParams.search,
    brand: resolvedParams.brand,
    model: resolvedParams.model,
    fuel: resolvedParams.fuel,
    transmission: resolvedParams.transmission,
    bodyType: resolvedParams.bodyType,
    ownership: resolvedParams.ownership,
    location: resolvedParams.location,
    minPrice: resolvedParams.minPrice ? Number(resolvedParams.minPrice) : undefined,
    maxPrice: resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : undefined,
    minYear: resolvedParams.minYear ? Number(resolvedParams.minYear) : undefined,
    maxYear: resolvedParams.maxYear ? Number(resolvedParams.maxYear) : undefined,
    maxKm: resolvedParams.maxKm ? Number(resolvedParams.maxKm) : undefined,
    sort: resolvedParams.sort,
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Hero Banner matching screenshot */}
      <div className="bg-white border-b border-slate-200/90 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left copy */}
            <div className="md:col-span-7 space-y-2">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-red-600">
                Buy a Car
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-slate-950 leading-tight">
                Explore 42 Quality <br />
                Pre-Owned Cars
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Verified. Inspected. Ready for the road.
              </p>
            </div>

            {/* Right showroom photo banner */}
            <div className="md:col-span-5 relative aspect-[16/8] rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=85&w=800"
                alt="Great Cars, Greater Stories"
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-right">
                <span className="font-handwriting text-lg text-white font-normal block leading-tight">
                  Great Cars, <br />
                  Greater Stories.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container: Sidebar + Inventory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FilterSidebar />
          <InventoryView initialCars={cars} />
        </div>
      </div>
    </div>
  );
}
