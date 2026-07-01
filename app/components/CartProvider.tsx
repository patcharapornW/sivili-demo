'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  nameTh: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sivili_cart');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const persist = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('sivili_cart', JSON.stringify(newItems));
  };

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
            : i
        );
      } else {
        updated = [...prev, { ...item, id: `ci_${Date.now()}` }];
      }
      localStorage.setItem('sivili_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.productId !== productId);
      localStorage.setItem('sivili_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => {
      const updated = prev.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, Math.min(qty, i.stock)) } : i
      );
      localStorage.setItem('sivili_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem('sivili_cart');
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
