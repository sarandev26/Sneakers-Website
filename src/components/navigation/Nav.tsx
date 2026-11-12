'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { RollNumber } from '@/components/engine/RollNumber';
import { Magnetic } from '@/components/engine/Magnetic';

interface NavProps {
  isStatic?: boolean;
}

export function Nav({ isStatic = false }: NavProps) {
  const { itemCount, toggleCart } = useCart();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navLinks = [
    { label: 'ZERO-G TECH', href: '#tech' },
    { label: 'THE MAKE', href: '#the-make' },
    { label: 'COLOURWAYS', href: '#lab' },
    { label: 'THE VAULT', href: '#vault' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between border-b border-line bg-obsidian/80 backdrop-blur-xl transition-colors duration-300">
      {/* Brand Wordmark & // mark */}
      <a href="#top" className="flex items-center gap-2 group focus:outline-none" aria-label="AERO-SLATE Home">
        <span className="font-display font-black text-xl tracking-tighter text-bone group-hover:text-volt transition-colors">
          AERO-SLATE
        </span>
        <span className="font-display font-black text-xl text-volt tracking-tight">//</span>
      </a>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-graphite/40 border border-line px-2 py-1.5 rounded-sm relative">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onMouseEnter={() => setHoveredNav(link.label)}
            onMouseLeave={() => setHoveredNav(null)}
            className="relative px-4 py-1.5 font-mono-tech text-xs tracking-wider text-bone/80 hover:text-bone transition-colors"
          >
            {hoveredNav === link.label && !isStatic && (
              <motion.span
                layoutId="navHover"
                className="absolute inset-0 bg-bone/10 border-b-2 border-volt rounded-sm pointer-events-none"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right Actions: Bag Counter + Magnetic Primary CTA */}
      <div className="flex items-center gap-4">
        {/* Cart Drawer Trigger */}
        <button
          onClick={toggleCart}
          data-cursor="CART"
          className="relative flex items-center gap-2 bg-graphite/60 border border-line px-3.5 py-2 hover:border-bone/40 transition-colors focus:outline-none focus:ring-1 focus:ring-volt"
          aria-label={`Open Bag with ${itemCount} items`}
        >
          <ShoppingBag className="w-4 h-4 text-bone" />
          <span className="font-mono-tech text-xs font-bold text-bone flex items-center gap-1">
            <span>BAG</span>
            <span>[</span>
            <RollNumber value={itemCount} isStatic={isStatic} className="text-volt" />
            <span>]</span>
          </span>
        </button>

        {/* Magnetic Primary Button */}
        <Magnetic strength={0.25}>
          <a
            href="#buy"
            data-cursor="SECURE"
            className="hidden sm:inline-flex items-center gap-2 bg-volt text-volt-ink font-display font-extrabold text-xs px-5 py-2.5 tracking-wider uppercase rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(200,245,46,0.3)] focus:outline-none focus:ring-2 focus:ring-volt"
          >
            <span>SECURE PAIR</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
