import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { WishlistProvider } from "@/context/WishlistContext";
import { ModalProvider } from "@/context/ModalContext";
import { TestDriveModal } from "@/components/modals/TestDriveModal";
import { EnquiryModal } from "@/components/modals/EnquiryModal";
import { DEALERSHIP_CONFIG } from "@/lib/config";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drivehubcars.com"),
  title: {
    default: `${DEALERSHIP_CONFIG.name} | ${DEALERSHIP_CONFIG.tagline}`,
    template: `%s | ${DEALERSHIP_CONFIG.name}`,
  },
  description:
    "Explore certified second-hand pre-owned cars at transparent prices. 150-point inspection, verified documentation, warranty, and easy financing on top brands like Hyundai, Toyota, Kia, Tata, and Honda.",
  keywords: [
    "used cars",
    "pre-owned cars",
    "buy used car",
    "second hand cars",
    "certified pre-owned",
    "car dealership",
    "car finance",
    "DRIVEHUB",
  ],
  openGraph: {
    title: `${DEALERSHIP_CONFIG.name} - ${DEALERSHIP_CONFIG.tagline}`,
    description:
      "Quality inspected pre-owned cars at transparent prices with 150+ point certification and doorstep test drive.",
    url: "https://drivehubcars.com",
    siteName: DEALERSHIP_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=85&w=1200",
        width: 1200,
        height: 630,
        alt: "DRIVEHUB Certified Pre-Owned Cars",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DEALERSHIP_CONFIG.name} - ${DEALERSHIP_CONFIG.tagline}`,
    description: "Quality inspected pre-owned cars at transparent prices.",
    images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=85&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-red-500 selection:text-white">
        <WishlistProvider>
          <ModalProvider>
            <Navbar />
            <main className="flex-1 pb-16 sm:pb-0">{children}</main>
            <Footer />
            <StickyMobileBar />
            <WhatsAppButton variant="floating" />
            <TestDriveModal />
            <EnquiryModal />
          </ModalProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
