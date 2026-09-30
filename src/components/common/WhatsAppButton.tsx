"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { DEALERSHIP_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  variant?: "primary" | "outline" | "floating" | "compact";
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  message = "Hi DRIVEHUB, I would like to inquire about your pre-owned cars.",
  variant = "primary",
  className,
  children,
}: WhatsAppButtonProps) {
  const url = buildWhatsAppLink(message, DEALERSHIP_CONFIG.whatsappNumber);

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DRIVEHUB on WhatsApp"
        className={cn(
          "fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 hover:scale-105 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2",
          className
        )}
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors duration-150 border border-emerald-300",
          className
        )}
      >
        <MessageCircle className="w-3.5 h-3.5 fill-current" />
        {children || "WhatsApp"}
      </a>
    );
  }

  if (variant === "outline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 transition-colors duration-150",
          className
        )}
      >
        <MessageCircle className="w-4 h-4 fill-emerald-600" />
        {children || "WhatsApp Us"}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-sm transition-all duration-150",
        className
      )}
    >
      <MessageCircle className="w-4 h-4 fill-current" />
      {children || "WhatsApp Us"}
    </a>
  );
}
