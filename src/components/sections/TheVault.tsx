'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { COLOURWAYS } from '@/data/content';
import { useCart } from '@/context/CartContext';
import { RollNumber } from '@/components/engine/RollNumber';
import { Magnetic } from '@/components/engine/Magnetic';
import { Shield, Sparkles, ChevronRight } from 'lucide-react';

interface TheVaultProps {
  isStatic?: boolean;
}

export function TheVault({ isStatic = false }: TheVaultProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedColourway } = useCart();
  const activeColourway = COLOURWAYS.find((c) => c.id === selectedColourway) || COLOURWAYS[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Radial clip-path spotlight tied to scroll
  const spotlightRadius = useTransform(scrollYProgress, [0.2, 0.6], [30, 140]);

  return (
    <section
      ref={containerRef}
      id="vault"
      data-anchor="vault-section"
      className="relative w-full min-h-screen bg-obsidian border-b border-line p-6 md:p-12 z-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Dark Ambience */}
      <div
        className="absolute inset-0 bg-radial-at-center from-graphite/30 to-obsidian opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Collector Box Empty Placeholder Container */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div
            id="vault-asset-placeholder"
            data-anchor="vault-box"
            className="relative w-full aspect-[16/10] border-2 border-dashed border-steel/40 bg-graphite/20 flex flex-col items-center justify-center p-8 rounded-sm text-center transition-colors hover:border-volt/60 group shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full border border-steel/40 flex items-center justify-center mb-3 text-steel group-hover:text-volt group-hover:border-volt transition-colors">
              <Shield className="w-6 h-6 stroke-[1.5]" />
            </div>

            <span className="font-display font-bold text-sm md:text-base text-bone tracking-wider uppercase mb-1">
              Add vault image here
            </span>

            <p className="font-mono-tech text-xs text-steel max-w-sm leading-relaxed">
              Collector packaging / acrylic display case image container (16:10 aspect ratio).
            </p>

            {/* Corner Technical Watermarks */}
            <div className="absolute top-4 left-4 font-mono-tech text-[10px] text-volt border border-volt/30 px-2 py-0.5 bg-obsidian/80">
              PACKAGING SPEC // ARCHIVAL GRADE
            </div>
            <div className="absolute bottom-4 right-4 font-mono-tech text-[10px] text-steel">
              CODENAME: A//EX
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry, Stock Allocation, Serial */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <span className="volt-chip">VAULT STATUS // LIVE</span>
            <span className="font-mono-tech text-xs text-steel">RESTRICTED ALLOCATION</span>
          </div>

          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-bone tracking-tight">
              THE <span className="font-accent text-volt lowercase">vault.</span>
            </h2>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-mono-tech text-sm text-steel">NEXT SERIAL:</span>
              <span className="font-display font-bold text-2xl text-volt flex items-center">
                <span>PAIR NO.&nbsp;</span>
                <RollNumber value="0147" isStatic={isStatic} />
                <span className="text-steel font-normal text-sm ml-1">/ 500</span>
              </span>
            </div>
          </div>

          <p className="font-mono-tech text-xs md:text-sm text-steel leading-relaxed">
            Every pair ships in a magnetic collector box with an acrylic display case, a numbered certificate of provenance, and an embedded CYBER-SEC holographic verification tag.
          </p>

          {/* Allocation Bar for active colourway */}
          <div className="bg-graphite/60 border border-line p-5 space-y-3 font-mono-tech text-xs">
            <div className="flex justify-between items-center">
              <span className="text-steel uppercase">{activeColourway.name} VAULT INVENTORY</span>
              <span className="text-volt font-bold">
                <RollNumber value={activeColourway.stockLeft} isStatic={isStatic} /> OF 500 LEFT
              </span>
            </div>
            <div className="w-full h-2 bg-obsidian border border-line overflow-hidden">
              <div
                className="h-full bg-volt transition-all duration-700"
                style={{ width: `${(activeColourway.stockLeft / 500) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-steel">
              <span>BATCH 01 OPENS 31 OCT</span>
              <span>SHIPS FROM 7 NOV 2026</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Magnetic strength={0.3}>
              <a
                href="#buy"
                data-cursor="SECURE"
                className="inline-flex items-center gap-3 bg-volt text-volt-ink font-display font-black text-xs md:text-sm px-8 py-4 uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(200,245,46,0.3)]"
              >
                <span>SECURE YOUR PAIR</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
