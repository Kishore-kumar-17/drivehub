import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { DEALERSHIP_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-[#0B0F17] text-slate-400 text-xs pt-12 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Brand & Tagline (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="inline-block">
              <span className="font-black text-2xl tracking-tighter text-white">
                DRIVE<span className="text-red-600">HUB</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
              &ldquo;{DEALERSHIP_CONFIG.tagline}&rdquo;
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-white transition-colors">
                  Buy a Car
                </Link>
              </li>
              <li>
                <Link href="/sell-your-car" className="hover:text-white transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/finance" className="hover:text-white transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/cars" className="hover:text-white transition-colors">
                  Used Cars
                </Link>
              </li>
              <li>
                <Link href="/sell-your-car" className="hover:text-white transition-colors">
                  Car Valuation
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-white transition-colors">
                  Test Drive
                </Link>
              </li>
              <li>
                <Link href="/finance" className="hover:text-white transition-colors">
                  Car Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`} className="hover:text-white">
                  {DEALERSHIP_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href="mailto:hello@drivehub.in" className="hover:text-white">
                  hello@drivehub.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                <span>Chennai, Tamil Nadu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span>&copy; 2026 DRIVEHUB. All rights reserved.</span>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-slate-400">
              Terms &amp; Conditions
            </Link>
          </div>

          <div className="font-semibold text-slate-400">
            Built by <span className="text-white font-bold">ALX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
