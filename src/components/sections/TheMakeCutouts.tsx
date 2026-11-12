'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Video } from 'lucide-react';
import { RollNumber } from '@/components/engine/RollNumber';

interface TheMakeCutoutsProps {
  isStatic?: boolean;
}

const MAKE_STAGES = [
  {
    num: '01',
    tag: 'STAGE 01 // PATTERNING',
    title: 'PRECISION LASER CUTTING',
    desc: 'Automated laser cutting of high-tensile Kevlar sheets ensures zero fraying and micron-level seam tolerances.',
  },
  {
    num: '02',
    tag: 'STAGE 02 // WEAVE',
    title: 'BALLISTIC LOOM WEAVING',
    desc: 'Multi-density yarns woven under intense computerized tension to produce targeted flex and high-abrasion zones.',
  },
  {
    num: '03',
    tag: 'STAGE 03 // FUSION',
    title: 'NITROGEN SOLE MOLDING',
    desc: 'Cryogenic supercritical nitrogen gas injected into the heated sole matrix, yielding closed-cell micro-cushion pods.',
  },
  {
    num: '04',
    tag: 'STAGE 04 // ATELIER',
    title: 'MASTER HAND ASSEMBLY',
    desc: 'Final upper-to-sole vulcanized bonding and individual hand-finishing by master atelier shoemakers.',
  },
];

export function TheMakeCutouts({ isStatic = false }: TheMakeCutoutsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (isStatic) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      if (scrollDistance <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollDistance));
      const idx = Math.min(3, Math.floor(p * 4));
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isStatic]);

  const activeStage = MAKE_STAGES[activeIdx];

  return (
    <section
      ref={containerRef}
      id="the-make"
      className={`relative w-full ${isStatic ? 'h-auto py-20' : 'h-[250vh]'} bg-obsidian border-b border-line`}
    >
      {/* Sticky Viewport Stage - Pure plain black bg-obsidian */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10 bg-obsidian">
        {/* Section Header */}
        <div className="relative z-20 flex items-start justify-between border-b border-line pb-4">
          <div>
            <div className="volt-chip mb-2">CRAFTSMANSHIP SEQUENCE</div>
            <h2 className="font-display font-black text-2xl md:text-4xl text-bone tracking-tight">
              THE <span className="font-accent text-volt lowercase">make.</span>
            </h2>
            <p className="font-mono-tech text-xs text-steel mt-1 max-w-md">
              Step-by-step master shoemaking and material engineering process.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono-tech text-xs text-steel">
            <span>SEQUENCE</span>
            <div className="text-3xl md:text-4xl font-display font-black text-volt">
              <RollNumber value={activeStage.num} isStatic={isStatic} />
            </div>
            <span>/ 04</span>
          </div>
        </div>

        {/* Center Display: Empty Video Placeholder Container */}
        <div className="relative flex-1 flex items-center justify-center my-6">
          <div className="relative w-full max-w-4xl h-[52vh] bg-graphite/20 border border-line p-6 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            {/* Dedicated Video Placeholder Container */}
            <div
              id="the-make-video-placeholder"
              className="relative w-full md:w-3/5 h-full rounded-sm border-2 border-dashed border-steel/40 bg-obsidian flex flex-col items-center justify-center p-6 text-center transition-colors hover:border-volt/60 group"
            >
              <div className="w-10 h-10 rounded-full border border-steel/40 flex items-center justify-center mb-2.5 text-steel group-hover:text-volt group-hover:border-volt transition-colors">
                <Video className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="font-display font-bold text-sm text-bone tracking-wider uppercase mb-1">
                Add video here
              </span>
              <p className="font-mono-tech text-[11px] text-steel max-w-xs leading-relaxed">
                Sneaker manufacturing / atelier craft process video container.
              </p>
              <div className="mt-3 font-mono-tech text-[10px] text-volt bg-graphite/60 px-2.5 py-1 border border-line">
                ACTIVE STEP: {activeStage.num} // {activeStage.title}
              </div>
            </div>

            {/* Stage Specs (Text rewritten for sneaker making) */}
            <div className="w-full md:w-2/5 space-y-4">
              <span className="font-mono-tech text-[10px] text-volt border border-volt/30 px-2.5 py-1 inline-block">
                {activeStage.tag}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-bone uppercase tracking-tight">
                {activeStage.title}
              </h3>
              <p className="font-mono-tech text-xs md:text-sm text-steel leading-relaxed">
                {activeStage.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Footer */}
        <div className="relative z-20 flex items-center justify-between border-t border-line pt-4 font-mono-tech text-xs text-steel">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span>4-PHASE ATELIER EXECUTION</span>
          </div>
          <div className="flex gap-2">
            {MAKE_STAGES.map((_, i) => (
              <span
                key={i}
                className={`w-8 h-1 ${i === activeIdx ? 'bg-volt' : 'bg-steel/30'} transition-colors`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
