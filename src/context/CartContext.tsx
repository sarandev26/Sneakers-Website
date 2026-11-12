'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLOURWAYS, ADD_ONS } from '@/data/content';

export interface CartItem {
  id: string; // unique cart line ID
  type: 'pair' | 'addon';
  title: string;
  colourwayId?: string;
  colourwayName?: string;
  sizeUk?: number;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  hasPair: boolean;
  selectedColourway: string;
  setSelectedColourway: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColourway, setSelectedColourway] = useState('neon');
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aero_cart_v1');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('aero_cart_v1', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not persist cart to localStorage', e);
    }
  }, [items, isHydrated]);

  // Dynamic CSS variable accent tween when colourway changes
  useEffect(() => {
    const cw = COLOURWAYS.find((c) => c.id === selectedColourway) || COLOURWAYS[0];
    document.documentElement.style.setProperty('--accent', cw.primaryAccent);
    if (cw.secondaryAccent) {
      document.documentElement.style.setProperty('--accent-secondary', cw.secondaryAccent);
    } else {
      document.documentElement.style.setProperty('--accent-secondary', cw.primaryAccent);
    }
  }, [selectedColourway]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setItems((prev) => {
      // If pair, check match on colourway and size
      if (newItem.type === 'pair') {
        const existingIdx = prev.findIndex(
          (i) => i.type === 'pair' && i.colourwayId === newItem.colourwayId && i.sizeUk === newItem.sizeUk
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          // Cap at 2 pairs
          const newQty = Math.min(2, updated[existingIdx].quantity + newItem.quantity);
          updated[existingIdx].quantity = newQty;
          return updated;
        }
      } else {
        // Add-on check
        const existingIdx = prev.findIndex((i) => i.type === 'addon' && i.title === newItem.title);
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += newItem.quantity;
          return updated;
        }
      }

      const id = `${newItem.type}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      return [{ ...newItem, id }, ...prev];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const maxQ = i.type === 'pair' ? 2 : 10;
          return { ...i, quantity: Math.min(maxQ, qty) };
        }
        return i;
      })
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasPair = items.some((i) => i.type === 'pair');

  // Add-ons get 10% discount if pair is in cart
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = hasPair
    ? items.filter((i) => i.type === 'addon').reduce((sum, item) => sum + item.price * item.quantity * 0.1, 0)
    : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        itemCount,
        subtotal,
        discount,
        total,
        hasPair,
        selectedColourway,
        setSelectedColourway,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
