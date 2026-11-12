'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, Video } from 'lucide-react';
import { Countdown } from '@/components/engine/Countdown';
import { Magnetic } from '@/components/engine/Magnetic';

interface HeroProps {
  isStatic?: boolean;
}

// 4 distinct states mapped across a 10-15 second scroll-scrubbed timeline
const HERO_STATES = [
  {
    range: [0.0, 0.25],
    badge: '01 // ZERO-G LAUNCH',
    headline: 'ENGINEERED IN ZERO GRAVITY.',
    sub: 'The limited flagship sneaker chassis. Built for high-impact urban pavement.',
    cta: 'EXPLORE DROP 01',
    href: '#drop-strip',
  },
  {
    range: [0.25, 0.55],
    badge: '02 // SUPERCRITICAL REBOUND',
    headline: 'NITROGEN FUSION SOLE.',
    sub: 'Cryogenic gas expanded inside a sealed matrix for 71% continuous energy return.',
    cta: 'INSPECT CRAFTSMANSHIP',
    href: '#tech',
  },
  {
    range: [0.55, 0.8],
    badge: '03 // BALLISTIC WEAVE',
    headline: 'KEVLAR TRI-ZONE KNIT.',
    sub: 'High-tensile aramid fibers woven under laser tension for zero-strain lockdown.',
    cta: 'VIEW SPECIFICATIONS',
    href: '#tech',
  },
  {
    range: [0.8, 1.0],
    badge: '04 // BATCH 01 ALLOCATION',
    headline: '500 NUMBERED PAIRS.',
    sub: 'Sequentially engraved provenance. Drop opens October 31, 2026.',
    cta: 'SECURE YOUR PAIR',
    href: '#buy',
  },
];

export function Hero({ isStatic = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(isStatic ? 0.5 : 0);

  useEffect(() => {
    if (isStatic) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      if (scrollDistance <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollDistance));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isStatic]);

  // Determine current active text state based on scrub progress
  const activeState =
    HERO_STATES.find((s) => progress >= s.range[0] && progress <= s.range[1]) ||
    HERO_STATES[0];

  return (
    <section
      ref={containerRef}
      id="top"
      className={`relative w-full ${isStatic ? 'h-screen' : 'h-[350vh]'} bg-obsidian border-b border-line`}
    >
      {/* Sticky 100vh Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10 bg-obsidian">
        {/* Top Header Telemetry Row */}
        <div className="w-full pt-16 flex items-start justify-between z-30 pointer-events-none">
          <div className="volt-chip">{activeState.badge}</div>
          <Countdown isStatic={isStatic} />
        </div>

        {/* Center: Hero Video Placeholder Container */}
        <div className="relative flex-1 flex items-center justify-center my-4 z-20 pointer-events-auto">
          <div
            id="hero-video-placeholder"
            className="relative w-full max-w-4xl aspect-video border-2 border-dashed border-steel/40 bg-graphite/20 flex flex-col items-center justify-center p-8 rounded-sm text-center shadow-2xl transition-colors hover:border-volt/60 group"
          >
            <div className="w-12 h-12 rounded-full border border-steel/40 flex items-center justify-center mb-3 text-steel group-hover:text-volt group-hover:border-volt transition-colors">
              <Video className="w-6 h-6 stroke-[1.5]" />
            </div>

            <span className="font-display font-black text-sm md:text-base text-bone tracking-wider uppercase mb-1">
              Add video here
            </span>

            <p className="font-mono-tech text-xs text-steel max-w-md leading-relaxed">
              10–15s scroll-scrubbed hero video container. Framed for 16:9 4K or canvas sequence.
            </p>

            {/* Real-time scroll timeline telemetry indicator */}
            <div className="mt-4 flex items-center gap-3 font-mono-tech text-[10px] text-steel bg-obsidian/80 px-3 py-1.5 border border-line">
              <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
              <span>TIMELINE: {Math.round(progress * 12 + 1)}s / 15s</span>
              <span className="text-volt font-bold">({(progress * 100).toFixed(0)}%)</span>
            </div>
          </div>
        </div>

        {/* Bottom Split Row: Dynamic Scrubbed Copy & Sequence Indicators */}
        <div className="relative z-30 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-line/50 pt-4 bg-obsidian/80 backdrop-blur-md">
          {/* Headline & Supporting Copy that updates with scroll */}
          <div className="max-w-xl">
            <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tighter text-bone leading-[1.05] transition-all duration-300">
              {activeState.headline}
            </h1>

            <p className="font-mono-tech text-xs md:text-sm text-steel tracking-wide mt-2 leading-relaxed transition-all duration-300">
              {activeState.sub}
            </p>
          </div>

          {/* Action CTA & Progress Bar */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <Magnetic strength={0.25}>
              <a
                href={activeState.href}
                className="inline-flex items-center gap-2 bg-volt text-volt-ink font-display font-black text-xs px-6 py-3 tracking-wider uppercase rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(200,245,46,0.3)]"
              >
                <span>{activeState.cta}</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </a>
            </Magnetic>

            <div className="flex items-center gap-2 font-mono-tech text-[10px] text-steel">
              <span>SCRUB PROGRESS:</span>
              <div className="w-24 h-1.5 bg-graphite border border-line overflow-hidden">
                <div
                  className="h-full bg-volt transition-all duration-75"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-volt font-bold">{(progress * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
