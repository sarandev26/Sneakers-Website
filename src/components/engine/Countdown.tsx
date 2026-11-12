'use client';

import React, { useState, useEffect } from 'react';
import { DROP_AT } from '@/data/content';
import { RollNumber } from '@/components/engine/RollNumber';

interface CountdownProps {
  isStatic?: boolean;
}

export function Countdown({ isStatic = false }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: '16',
    hours: '03',
    minutes: '59',
    seconds: '45',
  });

  useEffect(() => {
    if (isStatic) return;

    const target = new Date(DROP_AT).getTime();

    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isStatic]);

  return (
    <div className="flex items-center gap-3 font-mono-tech text-xs tracking-wider text-bone/90 bg-graphite/60 border border-line px-3 py-2 backdrop-blur-md">
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-steel">T-MINUS</span>
        <span className="w-1.5 h-1.5 rounded-full bg-volt animate-ping" />
      </div>
      <div className="h-3 w-[1px] bg-line" />
      <div className="flex items-center gap-2">
        <div className="flex items-baseline">
          <RollNumber value={timeLeft.days} isStatic={isStatic} className="text-volt font-bold" />
          <span className="text-[9px] text-steel ml-0.5">D</span>
        </div>
        <span className="text-steel">:</span>
        <div className="flex items-baseline">
          <RollNumber value={timeLeft.hours} isStatic={isStatic} className="text-bone font-bold" />
          <span className="text-[9px] text-steel ml-0.5">H</span>
        </div>
        <span className="text-steel">:</span>
        <div className="flex items-baseline">
          <RollNumber value={timeLeft.minutes} isStatic={isStatic} className="text-bone font-bold" />
          <span className="text-[9px] text-steel ml-0.5">M</span>
        </div>
        <span className="text-steel">:</span>
        <div className="flex items-baseline">
          <RollNumber value={timeLeft.seconds} isStatic={isStatic} className="text-steel font-bold" />
          <span className="text-[9px] text-steel ml-0.5">S</span>
        </div>
      </div>
    </div>
  );
}
