"use client";

import React from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { DEALERSHIP_CONFIG } from "@/lib/config";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useModals } from "@/context/ModalContext";

export function StickyMobileBar() {
  const { openTestDriveModal } = useModals();

  const whatsappUrl = buildWhatsAppLink(
    "Hi DRIVEHUB, I am checking your pre-owned inventory and would like assistance."
  );

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 sm:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Dealer */}
        <a
          href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-slate-700" />
          <span className="text-[11px] font-semibold mt-0.5">Call</span>
        </a>

        {/* WhatsApp Dealer */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 active:scale-95 transition-all text-center"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
          <span className="text-[11px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Test Drive CTA */}
        <button
          type="button"
          onClick={() => openTestDriveModal()}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-95 transition-all text-center shadow-sm"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span className="text-[11px] font-bold mt-0.5">Test Drive</span>
        </button>
      </div>
    </div>
  );
}
