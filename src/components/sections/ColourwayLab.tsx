'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Box } from 'lucide-react';
import { COLOURWAYS } from '@/data/content';
import { useCart } from '@/context/CartContext';

interface ColourwayLabProps {
  isStatic?: boolean;
}

export function ColourwayLab({ isStatic = false }: ColourwayLabProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedColourway, setSelectedColourway } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);

  // Sync scroll to colorway index (0 to 3 for 4 colorways)
  useEffect(() => {
    if (isStatic) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      if (scrollDistance <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollDistance));
      const idx = Math.min(COLOURWAYS.length - 1, Math.floor(p * COLOURWAYS.length));
      setActiveIdx(idx);
      const targetCw = COLOURWAYS[idx];
      if (targetCw && targetCw.id !== selectedColourway) {
        setSelectedColourway(targetCw.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isStatic, selectedColourway, setSelectedColourway]);

  const activeColourway = COLOURWAYS[activeIdx] || COLOURWAYS[0];

  const handleChipClick = (index: number) => {
    setActiveIdx(index);
    setSelectedColourway(COLOURWAYS[index].id);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollDistance = rect.height - window.innerHeight;
    const targetTop = window.scrollY + rect.top + (index / COLOURWAYS.length) * scrollDistance + 10;
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetTop, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="lab"
      className={`relative w-full ${isStatic ? 'h-auto py-20' : 'h-[300vh]'} bg-obsidian border-b border-line`}
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10 bg-obsidian">
        {/* Dynamic Background Accent Lighting */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none transition-colors duration-500"
          style={{
            background: `radial-gradient(circle at 75% 50%, ${activeColourway.primaryAccent}, transparent 65%)`,
          }}
        />

        {/* Header */}
        <div className="relative z-20 flex items-start justify-between border-b border-line pb-4">
          <div>
            <div className="volt-chip mb-2">CHROMATIC ENGINEERING</div>
            <h2 className="font-display font-black text-2xl md:text-4xl text-bone tracking-tight">
              COLOURWAY <span className="font-accent text-volt lowercase">lab.</span>
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-steel uppercase text-right">
            <span>SPECIMEN {String(activeIdx + 1).padStart(2, '0')} // 04</span>
            <span
              className="block mt-0.5 font-bold transition-colors"
              style={{ color: activeColourway.primaryAccent }}
            >
              ACTIVE: {activeColourway.name}
            </span>
          </div>
        </div>

        {/* Split Screen Grid */}
        <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
          {/* Left Details (Kept intact, pricing completely removed) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="flex items-baseline gap-4">
              <span className="font-display font-black text-6xl md:text-8xl text-outline opacity-40 leading-none">
                {String(activeIdx + 1).padStart(2, '0')}
              </span>
              <div>
                <span className="font-mono-tech text-xs text-volt font-bold tracking-widest block">
                  EDITION ALLOCATION
                </span>
                <span className="font-mono-tech text-xs text-steel">
                  {activeColourway.specs.edition}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-display font-black text-3xl md:text-4xl text-bone uppercase tracking-tight">
                {activeColourway.name}
              </h3>
              <p className="font-mono-tech text-xs text-steel uppercase tracking-wider mt-1.5">
                {activeColourway.tagline}
              </p>
            </div>

            {/* Technical Specs List */}
            <div className="space-y-2 font-mono-tech text-xs bg-graphite/60 border border-line p-4 backdrop-blur-md">
              <div className="flex justify-between border-b border-line/40 pb-1.5">
                <span className="text-steel">UPPER KNIT</span>
                <span className="text-bone text-right">{activeColourway.specs.upper}</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-1.5">
                <span className="text-steel">MIDSOLE</span>
                <span className="text-bone text-right">{activeColourway.specs.sole}</span>
              </div>
              <div className="flex justify-between border-b border-line/40 pb-1.5">
                <span className="text-steel">HEEL TAB</span>
                <span className="text-bone text-right">{activeColourway.specs.heelTab}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-steel">VAULT STOCK</span>
                <span className="text-volt font-bold text-right">{activeColourway.specs.stock}</span>
              </div>
            </div>

            {/* 4 Colourway Swatches - Clicking updates active colorway state */}
            <div>
              <span className="font-mono-tech text-[10px] text-steel tracking-widest block mb-2 uppercase">
                SELECT PROFILE [4 COLORWAYS]
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COLOURWAYS.map((c, i) => {
                  const isSelected = i === activeIdx;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleChipClick(i)}
                      data-cursor={c.name}
                      className={`relative p-2.5 border font-mono-tech text-[11px] text-center transition-all ${
                        isSelected
                          ? 'border-volt text-bone bg-white/10 font-bold shadow-lg scale-105'
                          : 'border-line text-steel hover:text-bone hover:border-bone/40 bg-graphite/40'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full mx-auto mb-1.5 block border border-black/40 shadow-sm"
                        style={{ backgroundColor: c.primaryAccent }}
                      />
                      <span className="truncate block">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Empty 3D Model / Video Placeholder Container (No fake imagery) */}
          <div className="lg:col-span-7 relative h-[45vh] md:h-[55vh] flex items-center justify-center select-none">
            <div
              id="colorway-3d-model-placeholder"
              data-active-colorway={activeColourway.id}
              className="relative w-full h-full rounded-sm border-2 border-dashed border-steel/40 bg-graphite/20 flex flex-col items-center justify-center p-8 text-center transition-all hover:border-volt/60 group shadow-2xl"
            >
              <div
                className="w-14 h-14 rounded-full border border-steel/40 flex items-center justify-center mb-3 transition-colors group-hover:scale-105"
                style={{ borderColor: activeColourway.primaryAccent, color: activeColourway.primaryAccent }}
              >
                <Box className="w-7 h-7 stroke-[1.5]" />
              </div>

              <span className="font-display font-black text-sm md:text-base text-bone tracking-wider uppercase mb-1">
                Add 3D model or video here
              </span>

              <p className="font-mono-tech text-xs text-steel max-w-sm leading-relaxed">
                Interactive 3D canvas / colorway video container. Responsive to swatch selection.
              </p>

              {/* Dynamic State Wiring Indicator */}
              <div className="mt-4 flex items-center gap-3 font-mono-tech text-[10px] bg-obsidian/90 px-3.5 py-1.5 border border-line">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: activeColourway.primaryAccent }}
                />
                <span className="text-steel">ACTIVE STATE:</span>
                <span className="text-volt font-bold uppercase">{activeColourway.name} [{activeColourway.id}]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20 flex items-center justify-between border-t border-line pt-4 font-mono-tech text-xs text-steel">
          <span>4 PROFILES AVAILABLE IN ZERO-G DROP 01</span>
          <span className="text-volt font-bold">PROFILE {activeIdx + 1} OF 4 ACTIVE</span>
        </div>
      </div>
    </section>
  );
}
