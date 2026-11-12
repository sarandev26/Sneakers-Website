'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function RecordMode() {
  const [isRecord, setIsRecord] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorAction, setCursorAction] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('record') !== '1') return;

    setIsRecord(true);
    document.body.classList.add('record-mode');

    // Run 38-second automated cinematic scroll and interaction routine
    const demoTargets = Array.from(document.querySelectorAll('[data-hover-demo]')) as HTMLElement[];
    const totalDuration = 38000;
    const startTime = Date.now();

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    let targetIndex = 0;
    let nextActionTime = 3000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= totalDuration) {
        clearInterval(timer);
        return;
      }

      // Smooth cubic bezier scroll
      const progress = elapsed / totalDuration;
      // Ease in-out
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, eased * scrollHeight);

      // Check next interaction moment
      if (elapsed > nextActionTime && targetIndex < demoTargets.length) {
        const el = demoTargets[targetIndex];
        const rect = el.getBoundingClientRect();

        // Move virtual cursor
        setCursorPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        const type = el.getAttribute('data-hover-demo');
        setCursorAction(type === 'click' ? 'CLICKING...' : 'INSPECTING...');

        // Trigger real interaction
        el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

        if (type === 'click') {
          setTimeout(() => {
            el.click();
          }, 300);
        }

        targetIndex++;
        nextActionTime += 6500; // Next target ~6.5s later
      }
    }, 50);

    return () => {
      clearInterval(timer);
      document.body.classList.remove('record-mode');
    };
  }, []);

  if (!isRecord) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[120]">
      {/* Telemetry Record Indicator */}
      <div className="fixed top-20 right-6 bg-red-600/90 text-white font-mono-tech text-[10px] px-3 py-1 flex items-center gap-2 border border-red-400 backdrop-blur-md shadow-lg">
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span>DIRECTOR RECORD MODE // 38S RUN</span>
      </div>

      {/* Virtual Director Cursor */}
      <motion.div
        animate={{ x: cursorPos.x, y: cursorPos.y }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
      >
        <div className="w-10 h-10 rounded-full border-2 border-volt bg-volt/20 flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 rounded-full bg-volt" />
        </div>
        {cursorAction && (
          <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-volt text-volt-ink font-mono-tech text-[9px] px-2 py-0.5 font-bold whitespace-nowrap shadow-md">
            {cursorAction}
          </span>
        )}
      </motion.div>
    </div>
  );
}
