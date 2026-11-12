'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'motion/react';
import { FOOTNOTE } from '@/data/content';
import { ArrowUpRight, Check } from 'lucide-react';
import { Magnetic } from '@/components/engine/Magnetic';

interface FooterProps {
  isStatic?: boolean;
}

const LETTERS = ['A', 'E', 'R', 'O', '-', 'S', 'L', 'A', 'T', 'E'];

export function Footer({ isStatic = false }: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 200 });
  const letterSkew = useTransform(smoothVelocity, [-1500, 0, 1500], [-6, 0, 6]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <footer
      ref={containerRef}
      id="footer"
      className="relative w-full bg-obsidian text-bone border-t border-line overflow-hidden pt-16 pb-12 z-20"
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 bg-radial-at-bottom from-graphite/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Top: Newsletter & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-line pb-12">
          <div className="lg:col-span-6 space-y-4">
            <span className="volt-chip">COMMUNICATION RADAR</span>
            <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight text-bone">
              GET DROP <span className="font-accent text-volt lowercase">alerts.</span>
            </h3>
            <p className="font-mono-tech text-xs text-steel max-w-md leading-relaxed">
              Sign up for priority batch allocation access, secret colorway drops, and telemetry debriefs.
            </p>

            <form onSubmit={handleSubscribe} className="flex max-w-md mt-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL FREQUENCY"
                className="flex-1 bg-graphite/60 border border-line px-4 py-3 font-mono-tech text-xs text-bone placeholder:text-steel/60 focus:outline-none focus:ring-1 focus:ring-volt"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-volt text-volt-ink font-display font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shrink-0"
              >
                {isSubscribed ? <Check className="w-4 h-4 stroke-[3]" /> : 'JOIN'}
              </button>
            </form>
            {isSubscribed && (
              <span className="font-mono-tech text-xs text-volt block mt-1">
                ✓ YOU ARE ON THE ZERO-G PRIORITY RADAR.
              </span>
            )}
          </div>

          {/* Nav Columns: Shop, Help, Company */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-6 font-mono-tech text-xs">
            <div>
              <span className="text-volt font-bold block mb-4 uppercase tracking-wider">SHOP</span>
              <ul className="space-y-2.5 text-steel">
                <li><a href="#lab" className="hover:text-bone transition-colors">The Lab</a></li>
                <li><a href="#buy" className="hover:text-bone transition-colors">Product</a></li>
                <li><a href="#vault" className="hover:text-bone transition-colors">The Vault</a></li>
                <li><a href="#pair" className="hover:text-bone transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div>
              <span className="text-volt font-bold block mb-4 uppercase tracking-wider">HELP</span>
              <ul className="space-y-2.5 text-steel">
                <li><a href="#buy" className="hover:text-bone transition-colors">Size Guide</a></li>
                <li><a href="#faq" className="hover:text-bone transition-colors">Shipping</a></li>
                <li><a href="#faq" className="hover:text-bone transition-colors">Exchanges</a></li>
                <li><a href="#faq" className="hover:text-bone transition-colors">Track Order</a></li>
              </ul>
            </div>

            <div>
              <span className="text-volt font-bold block mb-4 uppercase tracking-wider">COMPANY</span>
              <ul className="space-y-2.5 text-steel">
                <li><a href="#the-make" className="hover:text-bone transition-colors">Craftsmanship</a></li>
                <li><a href="#tech" className="hover:text-bone transition-colors">Zero-G Tech</a></li>
                <li><a href="#reviews" className="hover:text-bone transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-bone transition-colors">Protocols</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monolithic Outlined AERO-SLATE Wordmark with Velocity Skew */}
        <div className="relative w-full flex items-center justify-between select-none overflow-hidden my-4 py-4">
          <motion.div
            style={{ skewX: isStatic ? 0 : letterSkew }}
            className="w-full flex items-center justify-between font-display font-black text-[12vw] leading-none text-outline-strong tracking-tighter"
          >
            {LETTERS.map((char, idx) => {
              const isEyeletO = char === 'O';
              return (
                <span
                  key={idx}
                  data-anchor={isEyeletO ? 'footer-eyelet-o' : undefined}
                  className="relative inline-block hover:text-volt transition-colors duration-300"
                >
                  {char}
                </span>
              );
            })}
          </motion.div>
        </div>

        {/* Payment Chips Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 font-mono-tech text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-steel mr-2">PAYMENT GATEWAYS:</span>
            {['UPI (GPAY / PHONEPE)', 'VISA', 'MASTERCARD', 'RUPAY', 'NO-COST EMI', 'CASH ON DELIVERY'].map((gate) => (
              <span
                key={gate}
                className="border border-line bg-graphite/40 px-2.5 py-1 text-[10px] text-bone/80 tracking-wider"
              >
                {gate}
              </span>
            ))}
          </div>

          <div className="text-steel text-[11px]">
            <span>INDIAN SNEAKER CULTURE // ENGINEERED IN ZERO-G</span>
          </div>
        </div>

        {/* Mandatory Concept Site Disclaimer */}
        <div className="border-t border-line/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left font-mono-tech text-[11px] text-steel">
          <p>{FOOTNOTE}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-bone cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-bone cursor-pointer">TERMS OF DROP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
