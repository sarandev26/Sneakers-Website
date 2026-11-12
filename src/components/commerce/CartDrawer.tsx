'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/data/content';
import { RollNumber } from '@/components/engine/RollNumber';

interface CartDrawerProps {
  isStatic?: boolean;
}

export function CartDrawer({ isStatic = false }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, discount, total, hasPair } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key & manage focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag"
            className="relative z-10 w-full max-w-md h-full bg-graphite border-l border-line flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-line flex items-center justify-between bg-obsidian/40">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-tight text-bone">BAG</span>
                <span className="font-mono-tech text-xs text-volt font-bold">[{items.length} ITEMS]</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-steel hover:text-bone hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-volt"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Callout */}
            <div className="bg-volt/10 border-b border-volt/20 px-6 py-2.5 flex items-center gap-2 text-volt font-mono-tech text-xs tracking-wider">
              <Truck className="w-4 h-4 shrink-0" />
              <span>FREE EXPEDITED SHIPPING PAN-INDIA UNLOCKED</span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 border border-line flex items-center justify-center text-steel">
                    <span className="font-display text-2xl font-black">0</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-bone text-sm uppercase tracking-wider">Bag is Empty</h4>
                    <p className="font-mono-tech text-xs text-steel mt-1">Configure your A//EX Zero-G pair or add accessories to begin.</p>
                  </div>
                  <a
                    href="#buy"
                    onClick={closeCart}
                    className="mt-4 px-6 py-2.5 bg-volt text-volt-ink font-display font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    Select Colourway
                  </a>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-obsidian/50 border border-line flex gap-4 relative group hover:border-bone/20 transition-colors"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 bg-concrete/50 border border-line shrink-0 flex items-center justify-center p-1 relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display font-bold text-xs text-bone uppercase tracking-tight truncate">
                            {item.title}
                          </h4>
                          {item.colourwayName && (
                            <p className="font-mono-tech text-[10px] text-volt tracking-wider uppercase mt-0.5">
                              {item.colourwayName}
                            </p>
                          )}
                          {item.sizeUk && (
                            <p className="font-mono-tech text-[11px] text-steel mt-0.5">
                              SIZE: <span className="text-bone font-bold">UK {item.sizeUk}</span>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-steel hover:text-red-400 p-1 transition-colors"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-line/40">
                        <div className="flex items-center border border-line bg-graphite/40">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-volt text-steel transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono-tech text-xs px-2.5 text-bone font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-volt text-steel transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="font-mono-tech font-bold text-sm text-bone">
                          {formatINR(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bundle Discount Banner */}
            {hasPair && discount > 0 && (
              <div className="px-6 py-2 bg-volt/10 border-t border-b border-volt/20 flex items-center justify-between text-xs font-mono-tech text-volt">
                <span>BUNDLE SAVINGS (-10% ADD-ONS)</span>
                <span>-{formatINR(discount)}</span>
              </div>
            )}

            {/* Footer Summary */}
            <div className="p-6 border-t border-line bg-obsidian/80 space-y-4">
              <div className="space-y-1.5 font-mono-tech text-xs">
                <div className="flex justify-between text-steel">
                  <span>SUBTOTAL</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-volt">
                    <span>BUNDLE SAVINGS</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-steel">
                  <span>ESTIMATED TAXES (INCL.)</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between text-base text-bone font-bold pt-2 border-t border-line">
                  <span className="font-display uppercase tracking-wider">TOTAL</span>
                  <div className="text-volt flex items-center">
                    <RollNumber value={formatINR(total)} isStatic={isStatic} />
                  </div>
                </div>
              </div>

              {/* Checkout Button with Concept Site Note */}
              <button
                disabled
                className="w-full py-4 bg-bone/20 text-steel font-display font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-not-allowed border border-line"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="font-mono-tech text-[10px] text-center text-steel tracking-wide">
                * Checkout is not enabled on this concept site.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
