'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { REVIEWS } from '@/data/content';

interface ReviewsProps {
  isStatic?: boolean;
}

export function Reviews({ isStatic = false }: ReviewsProps) {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="reviews"
      data-anchor="reviews-section"
      className="relative w-full min-h-screen bg-obsidian border-b border-line p-6 md:p-12 z-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Background Carbon Weave */}
      <div
        className="absolute inset-0 bg-[url('/tex/carbon.webp')] bg-repeat opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* Header & Rating Breakdown */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between border-b border-line pb-6 gap-8">
        <div>
          <div className="volt-chip mb-2">FIELD VERIFICATION</div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-bone tracking-tight">
            WORN IN <span className="font-accent text-volt lowercase">the wild.</span>
          </h2>
          <p className="font-mono-tech text-xs text-steel mt-2">
            Verified wearer telemetry from urban pavement across Indian metros.
          </p>
        </div>

        {/* 4.8 Rating Summary Card */}
        <div className="flex items-center gap-6 bg-graphite/60 border border-line p-4 backdrop-blur-md">
          <div className="text-center pr-6 border-r border-line">
            <span className="font-display font-black text-4xl text-bone">4.8</span>
            <div className="flex items-center justify-center gap-0.5 text-volt mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-volt" />
              ))}
            </div>
            <span className="font-mono-tech text-[10px] text-steel block mt-1">
              SAMPLE RATINGS
            </span>
          </div>

          {/* Distribution Bars */}
          <div className="space-y-1 font-mono-tech text-[10px] text-steel w-32">
            <div className="flex items-center gap-2">
              <span>5★</span>
              <div className="flex-1 h-1.5 bg-obsidian overflow-hidden">
                <div className="h-full bg-volt w-[84%]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>4★</span>
              <div className="flex-1 h-1.5 bg-obsidian overflow-hidden">
                <div className="h-full bg-volt/60 w-[14%]" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>3★</span>
              <div className="flex-1 h-1.5 bg-obsidian overflow-hidden">
                <div className="h-full bg-steel/30 w-[2%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Drag Rail of Tall Quote Cards */}
      <div
        ref={railRef}
        className="relative z-10 my-10 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        data-cursor="DRAG"
      >
        <motion.div
          drag={isStatic ? false : 'x'}
          dragConstraints={railRef}
          dragElastic={0.15}
          className={`flex gap-6 ${isStatic ? 'overflow-x-auto w-full' : 'will-change-transform'}`}
        >
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="w-[80vw] sm:w-[360px] md:w-[400px] h-[360px] bg-concrete/60 border border-line p-6 shrink-0 flex flex-col justify-between hover:border-volt/50 transition-colors backdrop-blur-sm"
            >
              {/* Card Top: Stars & Batch Tag */}
              <div>
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div className="flex items-center gap-1 text-volt">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-volt" />
                    ))}
                  </div>
                  <span className="font-mono-tech text-[10px] text-volt border border-volt/30 px-2 py-0.5">
                    {rev.verified}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-display font-bold text-lg md:text-xl text-bone uppercase tracking-tight mt-6 leading-snug">
                  "{rev.quote}"
                </p>
              </div>

              {/* Card Bottom: User & Metro */}
              <div className="pt-4 border-t border-line/40 flex items-center justify-between font-mono-tech text-xs">
                <div>
                  <span className="text-bone font-bold block">{rev.name}</span>
                  <span className="text-steel text-[11px]">{rev.city}, INDIA</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-steel">
                  <ShieldCheck className="w-3.5 h-3.5 text-volt" />
                  <span>VERIFIED PAIR</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Rail Instructions */}
      <div className="relative z-10 flex items-center justify-between border-t border-line pt-4 font-mono-tech text-xs text-steel">
        <div className="flex items-center gap-2">
          <span>DRAG HORIZONTALLY TO INSPECT REVIEWS</span>
          <ArrowRight className="w-3.5 h-3.5 text-volt" />
        </div>
        <span>6 OF 6 COMMUNITY REPORTS</span>
      </div>
    </section>
  );
}
