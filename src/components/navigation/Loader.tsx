'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RollNumber } from '@/components/engine/RollNumber';
import { preloadAllFrames } from '@/utils/frameCache';

interface LoaderProps {
  onComplete?: () => void;
  isStatic?: boolean;
}

export function Loader({ onComplete, isStatic = false }: LoaderProps) {
  const [progress, setProgress] = useState(isStatic ? 100 : 0);
  const [isDone, setIsDone] = useState(isStatic);

  useEffect(() => {
    if (isStatic) {
      if (onComplete) onComplete();
      return;
    }

    const startTime = Date.now();
    const minDuration = 1400; // smooth telemetry display
    let realPct = 0;

    preloadAllFrames((pct) => {
      realPct = pct;
    });

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(1, elapsed / minDuration);
      // Smoothly advance progress based on both time and actual assets loaded
      const target = Math.min(100, Math.floor(Math.max(timeRatio * 100, realPct)));

      setProgress(target);

      if (target >= 100 && elapsed >= minDuration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 250);
      }
    }, 25);

    // Hard fallback so loader never hangs forever under any circumstance
    const fallbackTimeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 150);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, [isStatic, onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-[100] bg-obsidian flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Top telemetry */}
          <div className="flex items-center justify-between border-b border-line pb-4 font-mono-tech text-xs text-steel">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
              <span className="text-volt font-bold">SYSTEM TELEMETRY INITIALIZING</span>
            </div>
            <span>ZERO-G DROP 01 // AERO-SLATE</span>
          </div>

          {/* Center Brand and Lace Line */}
          <div className="max-w-2xl mx-auto w-full text-center space-y-6">
            <h2 className="font-display font-black text-4xl md:text-6xl text-bone tracking-tighter">
              AERO-SLATE <span className="text-volt">//</span>
            </h2>
            <p className="font-mono-tech text-xs text-steel tracking-widest uppercase">
              CALIBRATING SUPERCRITICAL NITROGEN AT ZERO-G
            </p>

            {/* SVG Lace Drawing Line */}
            <div className="relative w-full h-8 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 20">
                <path
                  d="M 0 10 Q 150 0 300 10 T 600 10"
                  fill="none"
                  stroke="#2F3437"
                  strokeWidth="1.5"
                />
                <motion.path
                  d="M 0 10 Q 150 0 300 10 T 600 10"
                  fill="none"
                  stroke="#C8F52E"
                  strokeWidth="2"
                  style={{
                    pathLength: progress / 100,
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Bottom Counter */}
          <div className="flex items-end justify-between border-t border-line pt-4 font-mono-tech">
            <div className="text-xs text-steel">
              <span>PRELOADED 119 ZERO-G FRAMES</span>
              <span className="block text-[10px] text-bone/60 mt-0.5">READY FOR SCRUB</span>
            </div>

            <div className="flex items-baseline font-display font-black text-4xl md:text-5xl text-volt">
              <RollNumber value={String(progress).padStart(2, '0')} isStatic={isStatic} />
              <span className="text-base text-steel ml-1 font-mono-tech font-normal">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
