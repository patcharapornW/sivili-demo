'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type WishlistContextType = {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType>({
  ids: [],
  toggle: () => {},
  has: () => false,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sivili_wishlist');
    if (saved) {
      try { setIds(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const toggle = useCallback((productId: string) => {
    setIds((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('sivili_wishlist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
