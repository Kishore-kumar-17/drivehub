"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlist: string[]; // array of car IDs
  toggleWishlist: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
  count: 0,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("drivehub_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // LocalStorage not available or error parsing
    }
  }, []);

  const toggleWishlist = (carId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];
      try {
        localStorage.setItem("drivehub_wishlist", JSON.stringify(next));
      } catch {
        // error handling
      }
      return next;
    });
  };

  const isInWishlist = (carId: string) => wishlist.includes(carId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        count: mounted ? wishlist.length : 0,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
