"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Car as CarIcon, CheckCircle2, Phone, Sparkles } from "lucide-react";
import { useModals } from "@/context/ModalContext";
import { MOCK_CARS } from "@/data/cars";
import { DEALERSHIP_CONFIG } from "@/lib/config";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function TestDriveModal() {
  const { isTestDriveOpen, selectedCarForTestDrive, closeTestDriveModal } = useModals();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(selectedCarForTestDrive?.id || "");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (10:00 AM - 1:00 PM)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync selected car when modal opens
  React.useEffect(() => {
    if (selectedCarForTestDrive) {
      setSelectedCarId(selectedCarForTestDrive.id);
    } else if (MOCK_CARS.length > 0 && !selectedCarId) {
      setSelectedCarId(MOCK_CARS[0].id);
    }
  }, [selectedCarForTestDrive]);

  if (!isTestDriveOpen) return null;

  const activeCar = MOCK_CARS.find((c) => c.id === selectedCarId) || selectedCarForTestDrive;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Realistic mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleClose = () => {
    setIsSuccess(false);
    closeTestDriveModal();
  };

  const whatsappMessage = activeCar
    ? `Hi DRIVEHUB, I booked a test drive online for ${activeCar.brand} ${activeCar.model} (${activeCar.year}). My phone is ${phone || DEALERSHIP_CONFIG.phone}.`
    : `Hi DRIVEHUB, I would like to schedule a test drive.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-950 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Doorstep or Showroom Test Drive</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">Book a Test Drive</h3>
            <p className="text-xs text-slate-400 mt-1">
              Experience the performance and comfort firsthand with zero commitment.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Your Test-Drive Request Has Been Received!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{name || "Valued Customer"}</span>.
                Our vehicle specialist will call you at{" "}
                <span className="font-semibold text-slate-900">{phone}</span> within 30 minutes to confirm your scheduled slot for the{" "}
                <span className="font-semibold text-red-600">
                  {activeCar ? `${activeCar.brand} ${activeCar.model}` : "selected vehicle"}
                </span>.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={buildWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold text-center transition-colors"
                >
                  Confirm Instant via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Car preview */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Selected Vehicle
                </label>
                <div className="relative">
                  <select
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                  >
                    {MOCK_CARS.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.brand} {car.model} {car.variant} ({car.year}) &bull; ₹{(car.price / 100000).toFixed(2)} Lakh
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arun Kumar"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. arun@example.com"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Slot *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:30 PM)">Evening (4:00 PM - 7:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Booking your slot...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Book Test Drive</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                Doorstep test drive subject to service radius. Valid driving licence required at test drive time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
