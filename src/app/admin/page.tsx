"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Calendar,
  Mail,
  DollarSign,
  Plus,
  Trash2,
  Star,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  User,
} from "lucide-react";
import { MOCK_CARS } from "@/data/cars";
import { formatPriceLakh, formatKM } from "@/lib/formatters";
import { Car as CarType } from "@/lib/types";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"inventory" | "testdrives" | "leads">("inventory");
  const [inventoryList, setInventoryList] = useState<CarType[]>(MOCK_CARS);
  const [searchFilter, setSearchFilter] = useState("");
  const [addCarModal, setAddCarModal] = useState(false);

  // New car form mock state
  const [newBrand, setNewBrand] = useState("Honda");
  const [newModel, setNewModel] = useState("Elevate");
  const [newVariant, setNewVariant] = useState("ZX CVT");
  const [newYear, setNewYear] = useState(2023);
  const [newPrice, setNewPrice] = useState(1550000);
  const [newKm, setNewKm] = useState(18000);

  const toggleFeatured = (id: string) => {
    setInventoryList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c))
    );
  };

  const deleteCar = (id: string) => {
    if (confirm("Are you sure you want to remove this vehicle from inventory?")) {
      setInventoryList((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CarType = {
      id: `car-custom-${Date.now()}`,
      slug: `${newBrand.toLowerCase()}-${newModel.toLowerCase()}-${newYear}`,
      brand: newBrand,
      model: newModel,
      variant: newVariant,
      year: Number(newYear),
      price: Number(newPrice),
      kmDriven: Number(newKm),
      fuel: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      ownership: "1st Owner",
      location: "Chennai",
      color: "Crystal Black",
      engine: "1498 cc",
      power: "119 bhp",
      torque: "145 Nm",
      mileage: "16.9 kmpl",
      seatingCapacity: 5,
      insuranceValid: "Comprehensive valid until 2027",
      registrationYear: Number(newYear),
      featured: true,
      conditionScore: 94,
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=85&w=800",
      ],
      features: {
        comfort: ["Sunroof", "Automatic Climate Control"],
        safety: ["6 Airbags", "ABS", "ESC"],
        technology: ["Touchscreen", "Apple CarPlay"],
      },
      inspectionScores: {
        overall: 94,
        engine: 95,
        exterior: 93,
        interior: 94,
        tyres: 92,
        electrical: 96,
        documents: 100,
      },
      description: "Recently added inventory vehicle.",
      createdAt: new Date().toISOString(),
    };

    setInventoryList([created, ...inventoryList]);
    setAddCarModal(false);
  };

  const filteredCars = inventoryList.filter(
    (c) =>
      c.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.model.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <span>Admin Management Portal</span>
            </div>
            <h1 className="text-2xl font-black text-slate-950">
              DRIVEHUB Dealership Operations
            </h1>
            <p className="text-xs text-slate-500">
              Manage inventory, approve test drives, and view customer valuation leads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cars"
              target="_blank"
              className="inline-flex items-center gap-1 px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50"
            >
              <span>View Live Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setAddCarModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Inventory</span>
              <Car className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl font-black text-slate-950">
              {inventoryList.length} Cars
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">
              Ready for immediate handover
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Test Drive Requests</span>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-950">8 Pending</div>
            <span className="text-[11px] text-blue-600 font-semibold">
              3 scheduled for today
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Leads</span>
              <Mail className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-950">14 Enquiries</div>
            <span className="text-[11px] text-amber-600 font-semibold">
              5 high purchase intent
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Inventory Value</span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-950">
              ₹{(inventoryList.reduce((acc, c) => acc + c.price, 0) / 10000000).toFixed(2)} Cr
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              Across all locations
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="flex border-b border-slate-200 px-6 pt-4 gap-6 text-sm font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("inventory")}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === "inventory"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Inventory Management ({inventoryList.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("testdrives")}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === "testdrives"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Test Drive Bookings (8)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === "leads"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Customer Leads &amp; Valuations (14)
            </button>
          </div>

          {/* TAB 1: Inventory Table */}
          {activeTab === "inventory" && (
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="relative w-72">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Filter by brand or model..."
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-xs text-slate-500">
                  Showing {filteredCars.length} of {inventoryList.length} cars
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-4">Year &amp; KM</th>
                      <th className="py-3 px-4">Fuel / Transmission</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCars.map((car) => (
                      <tr key={car.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-9 rounded bg-slate-100 overflow-hidden shrink-0">
                              <Image src={car.images[0]} alt="" fill className="object-cover" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">
                                {car.brand} {car.model}
                              </span>
                              <span className="text-[11px] text-slate-500">{car.variant}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-slate-800 block">{car.year}</span>
                          <span className="text-slate-500">{formatKM(car.kmDriven)}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-slate-800 block">{car.fuel}</span>
                          <span className="text-slate-500">{car.transmission}</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-950">
                          {formatPriceLakh(car.price)}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{car.location}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => toggleFeatured(car.id)}
                            className={`p-1.5 rounded-md border ${
                              car.featured
                                ? "bg-amber-50 text-amber-600 border-amber-200"
                                : "bg-white text-slate-300 border-slate-200 hover:text-slate-500"
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${car.featured ? "fill-current" : ""}`} />
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/cars/${car.slug}`}
                              target="_blank"
                              className="px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-[11px]"
                            >
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => deleteCar(car.id)}
                              className="p-1 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Test Drive Requests */}
          {activeTab === "testdrives" && (
            <div className="p-6">
              <div className="space-y-3">
                {[
                  {
                    name: "Rahul Verma",
                    phone: "+91 98401 23456",
                    car: "Hyundai Creta SX (2022)",
                    date: "Today, 11:30 AM",
                    type: "Doorstep Drive (Anna Nagar)",
                    status: "Confirmed",
                  },
                  {
                    name: "Ananya Iyer",
                    phone: "+91 98200 87654",
                    car: "Toyota Innova Crysta (2021)",
                    date: "Today, 3:00 PM",
                    type: "Showroom Visit",
                    status: "Confirmed",
                  },
                  {
                    name: "Karthik Raja",
                    phone: "+91 97911 34567",
                    car: "Kia Seltos HTK+ (2023)",
                    date: "Tomorrow, 10:00 AM",
                    type: "Doorstep Drive (Indiranagar)",
                    status: "Pending",
                  },
                ].map((td, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{td.name}</span>
                        <span className="text-slate-500">&bull; {td.phone}</span>
                      </div>
                      <span className="font-semibold text-red-600 block mt-0.5">{td.car}</span>
                      <span className="text-slate-500 mt-0.5 block">{td.type} &bull; {td.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {td.status}
                      </span>
                      <button
                        type="button"
                        className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                      >
                        Contact Customer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Valuation & Customer Leads */}
          {activeTab === "leads" && (
            <div className="p-6">
              <div className="space-y-3">
                {[
                  {
                    type: "Valuation Request",
                    client: "Venkatesh S.",
                    phone: "+91 98840 11223",
                    details: "2020 Honda City VX (44,000 km)",
                    reg: "TN 07 CA 9821",
                    estimate: "₹9.20L – ₹10.10L",
                    time: "25 mins ago",
                  },
                  {
                    type: "Finance Enquiry",
                    client: "Meera Nair",
                    phone: "+91 97110 55443",
                    details: "Enquiring about 90% loan on Kia Seltos",
                    reg: "N/A",
                    estimate: "₹12L Loan Request",
                    time: "1 hour ago",
                  },
                ].map((lead, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px] uppercase">
                        {lead.type}
                      </span>
                      <div className="font-bold text-slate-900 text-sm mt-1">
                        {lead.client} &bull; {lead.phone}
                      </div>
                      <div className="text-slate-600 mt-0.5">
                        {lead.details} {lead.reg !== "N/A" && `(${lead.reg})`}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-slate-900 block text-sm">
                        {lead.estimate}
                      </span>
                      <span className="text-[10px] text-slate-400">{lead.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Car Modal */}
      {addCarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Add Vehicle to Dealership Inventory
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter vehicle credentials for live website deployment.
            </p>

            <form onSubmit={handleAddCar} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    required
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Variant
                  </label>
                  <input
                    type="text"
                    required
                    value={newVariant}
                    onChange={(e) => setNewVariant(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    required
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    step={10000}
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kilometers Driven
                  </label>
                  <input
                    type="number"
                    step={1000}
                    required
                    value={newKm}
                    onChange={(e) => setNewKm(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddCarModal(false)}
                  className="px-4 py-2 border rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
                >
                  Publish Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
