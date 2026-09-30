import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Car as CarIcon } from "lucide-react";
import { getCarBySlug, getSimilarCars } from "@/lib/cars";
import { formatPriceLakh } from "@/lib/formatters";
import { VehicleGallery } from "@/components/cars/detail/VehicleGallery";
import { VehicleActionPanel } from "@/components/cars/detail/VehicleActionPanel";
import { VehicleHighlights } from "@/components/cars/detail/VehicleHighlights";
import { VehicleSpecs } from "@/components/cars/detail/VehicleSpecs";
import { VehicleDetailTabs } from "@/components/cars/detail/VehicleDetailTabs";
import { SimilarCars } from "@/components/cars/detail/SimilarCars";
import { DEALERSHIP_CONFIG } from "@/lib/config";

interface CarDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return {
      title: "Car Not Found | DRIVEHUB",
    };
  }

  const title = `${car.brand} ${car.model} ${car.variant} | DRIVEHUB`;
  const description = `Buy certified ${car.year} ${car.brand} ${car.model} in ${car.location} for ${formatPriceLakh(car.price)}. 150-point inspection passed.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: car.images[0],
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <CarIcon className="w-12 h-12 text-slate-300 mb-3" />
        <h1 className="text-xl font-bold text-slate-900 mb-2">Car Not Found</h1>
        <Link
          href="/cars"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Available Cars</span>
        </Link>
      </div>
    );
  }

  const similarCars = await getSimilarCars(car, 4);

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation: Home > Cars > Hyundai Creta SX */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/cars" className="hover:text-slate-900 transition-colors">
            Cars
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900 truncate">
            {car.brand} {car.model}
          </span>
        </nav>

        {/* 2-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Gallery, Highlights, Specs, Tabs */}
          <div className="lg:col-span-8 space-y-6">
            <VehicleGallery
              images={car.images}
              title={`${car.brand} ${car.model}`}
              carId={car.id}
              conditionScore={car.conditionScore}
            />

            <VehicleHighlights car={car} />

            <VehicleSpecs car={car} />

            <VehicleDetailTabs car={car} />
          </div>

          {/* Right Column (4 cols): Sticky Action Panel + Embedded EMI Calculator */}
          <div className="lg:col-span-4">
            <VehicleActionPanel car={car} />
          </div>
        </div>

        {/* Similar Cars Section */}
        <div className="mt-14">
          <SimilarCars cars={similarCars} />
        </div>
      </div>
    </div>
  );
}
