"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Heart, ChevronRight } from "lucide-react";
import { DEALERSHIP_CONFIG } from "@/lib/config";
import { useModals } from "@/context/ModalContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Buy a Car" },
  { href: "/sell-your-car", label: "Sell Your Car" },
  { href: "/finance", label: "Finance" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openTestDriveModal } = useModals();
  const { count: wishlistCount } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // In the reference mockup, /sell-your-car and /finance have dark headers matching their dark hero
  const isDarkNavbar = pathname === "/sell-your-car" || pathname === "/finance";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isDarkNavbar
            ? "bg-[#0B0F19] border-b border-slate-800/80 text-white"
            : "bg-white border-b border-slate-100 text-slate-900",
          isScrolled ? "py-2.5 shadow-sm" : "py-3 sm:py-3.5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Left: DRIVEHUB Logo */}
            <Link
              href="/"
              className="flex items-center gap-1 group focus:outline-none"
            >
              <span
                className={cn(
                  "font-black text-xl sm:text-2xl tracking-tighter",
                  isDarkNavbar ? "text-white" : "text-slate-950"
                )}
              >
                DRIVE<span className="text-red-600">HUB</span>
              </span>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-[13px] font-medium tracking-normal transition-colors",
                      isActive
                        ? "text-red-600 font-bold"
                        : isDarkNavbar
                        ? "text-slate-300 hover:text-white"
                        : "text-slate-600 hover:text-slate-950"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Phone Number & Book a Test Drive Button */}
            <div className="hidden md:flex items-center gap-5 xl:gap-6">
              {/* Wishlist Icon */}
              <Link
                href="/cars?wishlistOnly=true"
                aria-label="Wishlist"
                className={cn(
                  "relative p-1.5 transition-colors",
                  isDarkNavbar
                    ? "text-slate-400 hover:text-red-500"
                    : "text-slate-500 hover:text-red-600"
                )}
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Phone with icon */}
              <a
                href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors",
                  isDarkNavbar
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-700 hover:text-slate-950"
                )}
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{DEALERSHIP_CONFIG.phone}</span>
              </a>

              {/* Red CTA Button */}
              <button
                type="button"
                onClick={() => openTestDriveModal()}
                className="px-4.5 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-all duration-150 active:scale-95 whitespace-nowrap"
              >
                Book a Test Drive
              </button>
            </div>

            {/* Mobile Menu & Wishlist */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/cars?wishlistOnly=true"
                aria-label="Wishlist"
                className={cn(
                  "relative p-1",
                  isDarkNavbar ? "text-slate-300" : "text-slate-700"
                )}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "p-1.5 focus:outline-none",
                  isDarkNavbar ? "text-white" : "text-slate-900"
                )}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[53px] z-40 lg:hidden bg-slate-950/60 backdrop-blur-xs">
          <div
            className={cn(
              "border-b p-5 shadow-2xl transition-colors",
              isDarkNavbar
                ? "bg-[#0B0F19] border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            )}
          >
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                      isActive
                        ? "text-red-600 font-bold bg-red-500/10"
                        : isDarkNavbar
                        ? "text-slate-200 hover:bg-slate-800/60"
                        : "text-slate-800 hover:bg-slate-50"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </nav>

            <div
              className={cn(
                "mt-5 pt-4 border-t space-y-3",
                isDarkNavbar ? "border-slate-800" : "border-slate-100"
              )}
            >
              <a
                href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg",
                  isDarkNavbar
                    ? "bg-slate-800 text-slate-200"
                    : "bg-slate-100 text-slate-800"
                )}
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Call {DEALERSHIP_CONFIG.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openTestDriveModal();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
              >
                Book a Test Drive
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
