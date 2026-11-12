'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { RollNumber } from '@/components/engine/RollNumber';

interface AnatomyProps {
  isStatic?: boolean;
}

const STEPS = [
  {
    num: '01',
    title: 'QUICK-LOCK ERGONOMICS',
    desc: 'Titanium quick-lock closure. Zero slip under high-impact pavement load.',
  },
  {
    num: '02',
    title: 'TRI-ZONE BALLISTIC WEAVE',
    desc: 'Kevlar-blend knit engineered with targeted high-tensile flex zones.',
  },
  {
    num: '03',
    title: 'SUPERCRITICAL NITROGEN MATRIX',
    desc: 'Infused nitrogen air capsule yielding 71% continuous kinetic rebound.',
  },
  {
    num: '04',
    title: 'VISCOELASTIC STABILITY BED',
    desc: 'Clear gel arch-mapped insole dampens shock across all foot strikes.',
  },
  {
    num: '05',
    title: 'CARBON-RUBBER TRACTION GRID',
    desc: 'Multi-directional street lugs tested on wet Indian monsoon pavement.',
  },
];

export function Anatomy({ isStatic = false }: AnatomyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (isStatic) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      if (scrollDistance <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollDistance));
      const idx = Math.min(4, Math.floor(p * 5));
      setActiveStepIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isStatic]);

  const jumpToStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollDistance = rect.height - window.innerHeight;
    const stepTargetTop = window.scrollY + rect.top + (index / 5) * scrollDistance + 10;
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(stepTargetTop, { duration: 1.0 });
    } else {
      window.scrollTo({ top: stepTargetTop, behavior: 'smooth' });
    }
  };

  const activeStep = STEPS[activeStepIndex];

  return (
    <section
      ref={containerRef}
      id="tech"
      className={`relative w-full ${isStatic ? 'h-auto py-20' : 'h-[300vh]'} bg-obsidian border-b border-line`}
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10 bg-obsidian">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 bg-[url('/tex/carbon.webp')] bg-repeat opacity-[0.04] pointer-events-none"
          aria-hidden="true"
        />

        {/* Section Header */}
        <div className="relative z-20 flex items-start justify-between border-b border-line pb-4">
          <div>
            <div className="volt-chip mb-2">SIGNATURE ARCHITECTURE</div>
            <h2 className="font-display font-black text-2xl md:text-4xl text-bone tracking-tight">
              ZERO-G <span className="font-accent text-volt lowercase">anatomy.</span>
            </h2>
            <p className="font-mono-tech text-xs text-steel mt-1 max-w-md">
              Five-step structural breakdown of the A//EX flagship chassis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-steel hidden sm:inline">STEP</span>
            <div className="text-3xl md:text-4xl font-display font-black text-volt">
              <RollNumber value={activeStep.num} isStatic={isStatic} />
            </div>
            <span className="font-mono-tech text-xs text-steel">/ 05</span>
          </div>
        </div>

        {/* Center Stage: Re-spaced prominent single shoe showcase (No popup modules) */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center">
            {/* Ambient halo glow */}
            <div className="absolute w-[500px] h-[300px] bg-volt/5 rounded-full blur-3xl pointer-events-none" />

            {/* Same single shoe model used across the entire site */}
            <Image
              src="/assets/shoes/neon.webp"
              alt="AERO-SLATE A//EX Cyber Neon Chassis"
              fill
              className="object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] transition-transform duration-500 will-change-transform"
              priority
            />
          </div>
        </div>

        {/* Bottom Bar: Re-spaced Step Telemetry & Navigation */}
        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-t border-line pt-4 bg-obsidian/80 backdrop-blur-md">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1.5 font-mono-tech text-xs text-volt font-bold">
              <span className="w-2 h-2 rounded-full bg-volt" />
              <span>STEP {activeStep.num} // {activeStep.title}</span>
            </div>
            <p className="font-display font-bold text-lg md:text-xl text-bone uppercase tracking-tight leading-snug">
              {activeStep.desc}
            </p>
          </div>

          {/* Interactive Step Jump Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                onClick={() => jumpToStep(i)}
                data-cursor={`STEP ${s.num}`}
                className={`font-mono-tech text-xs px-3.5 py-2 border transition-all ${
                  i === activeStepIndex
                    ? 'border-volt text-volt-ink bg-volt font-bold shadow-md'
                    : 'border-line text-steel hover:text-bone hover:border-bone/50 bg-graphite/40'
                }`}
              >
                <span>{s.num}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
