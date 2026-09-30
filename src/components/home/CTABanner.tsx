import React from "react";
import Link from "next/link";
import { Car, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { DEALERSHIP_CONFIG } from "@/lib/config";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function CTABanner() {
  const whatsappUrl = buildWhatsAppLink(
    "Hi DRIVEHUB, I would like to schedule an appraisal to sell my car."
  );

  return (
    <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-red-950/60 to-slate-900/90 border border-red-900/40 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-400">
              Ready to Upgrade or Sell?
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mt-2 leading-tight">
              Get an Instant, Fair Market Valuation for Your Current Car
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Skip third-party dealer haggling. DRIVEHUB offers best-in-market pricing, same-day payment, and free doorstep RC transfer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
            <Link
              href="/sell-your-car"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all active:scale-95"
            >
              <Car className="w-4 h-4" />
              <span>Get Valuation Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>WhatsApp Specialist</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
