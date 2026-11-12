'use client';

import React from 'react';

interface DropStripProps {
  isStatic?: boolean;
}

const ITEMS = [
  'Free shipping',
  'All India delivery',
  'No cost EMI',
  'Zero interest',
  'Drop 01: 500 pairs',
  'Pre-colorway',
];

export function DropStrip({ isStatic = false }: DropStripProps) {
  return (
    <section
      id="drop-strip"
      data-anchor="drop-strip"
      className="relative w-full py-3.5 bg-volt text-volt-ink overflow-hidden border-y border-line select-none z-20 group"
    >
      <style jsx>{`
        @keyframes marqueeL2R {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeL2R 24s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Continuously auto-scrolling track from left to right */}
      <div className={`marquee-track ${isStatic ? 'transform-none' : ''}`}>
        {/* Render multiple sets to guarantee a seamless infinite loop */}
        {[0, 1, 2, 3].map((setIdx) => (
          <div key={setIdx} className="flex items-center shrink-0">
            {ITEMS.map((item, i) => (
              <div key={`${setIdx}-${i}`} className="flex items-center">
                <span className="font-display font-black text-xs md:text-sm tracking-wider uppercase px-4 whitespace-nowrap">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-volt-ink/80 inline-block shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
