'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 350, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch screens or static mode
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('record') === '1' || urlParams.get('static') === '1') return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setLabel(cursorTarget.getAttribute('data-cursor'));
      } else {
        setLabel(null);
      }

      const clickable = target.closest('button, a, input, select, [role="button"]');
      setIsPointer(!!clickable);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible, mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
    >
      {/* Outer crosshairs */}
      <div className={`relative flex items-center justify-center transition-transform duration-200 ${isPointer ? 'scale-125' : 'scale-100'}`}>
        <div className="w-8 h-8 rounded-full border border-bone/40 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-volt" />
        </div>
        {/* Crosshair ticks */}
        <span className="absolute -top-1 w-[1px] h-2 bg-bone/60" />
        <span className="absolute -bottom-1 w-[1px] h-2 bg-bone/60" />
        <span className="absolute -left-1 w-2 h-[1px] bg-bone/60" />
        <span className="absolute -right-1 w-2 h-[1px] bg-bone/60" />

        {/* Action badge label */}
        {label && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 bg-volt text-volt-ink px-2 py-0.5 text-[9px] font-mono-tech font-bold tracking-widest whitespace-nowrap shadow-lg border border-bone/20"
          >
            {label}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
