"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { DEALERSHIP_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Get in Touch Contact Info (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <h1 className="font-editorial text-3xl font-normal text-slate-950 tracking-tight">
                  Get in Touch
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  We&apos;d love to hear from you. Visit our dealership or send us a message.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Address</span>
                    <span className="text-slate-500 mt-0.5 block leading-relaxed">
                      {DEALERSHIP_CONFIG.address.street}, {DEALERSHIP_CONFIG.address.city}, {DEALERSHIP_CONFIG.address.state} &ndash; {DEALERSHIP_CONFIG.address.pincode}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Phone</span>
                    <span className="text-slate-500 mt-0.5 block">
                      {DEALERSHIP_CONFIG.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">Email</span>
                    <span className="text-slate-500 mt-0.5 block">
                      hello@drivehub.in
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Business Hours
                    </span>
                    <span className="text-slate-500 mt-0.5 block leading-relaxed">
                      Mon &ndash; Sat: 9:00 AM &ndash; 8:00 PM <br />
                      Sunday: 10:00 AM &ndash; 6:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column: Styled Map Graphic (4 cols) */}
            <div className="lg:col-span-4 relative aspect-[4/4] sm:aspect-auto sm:h-full min-h-[280px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 bg-[#E8ECEF] opacity-90" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />

              {/* Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <MapPin className="w-4 h-4 fill-current" />
                </div>
                <div className="mt-1 px-2.5 py-1 bg-white rounded-md shadow-md text-center border border-slate-200">
                  <span className="text-[10px] font-black text-slate-950 block">
                    DRIVEHUB
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (4 cols) */}
            <div className="lg:col-span-4">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Enquiry Sent!
                  </h3>
                  <p className="text-xs text-slate-500">
                    We will get back to you within 30 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Send Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
