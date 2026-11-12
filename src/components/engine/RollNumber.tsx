'use client';

import React from 'react';
import { motion } from 'motion/react';

interface RollNumberProps {
  value: string | number;
  className?: string;
  isStatic?: boolean;
}

export function RollNumber({ value, className = '', isStatic = false }: RollNumberProps) {
  const str = String(value);
  const chars = str.split('');

  if (isStatic) {
    return <span className={`inline-flex items-center font-mono-tech tabular-nums ${className}`}>{str}</span>;
  }

  return (
    <span className={`inline-flex items-center overflow-hidden font-mono-tech tabular-nums select-none ${className}`}>
      {chars.map((char, idx) => {
        const isDigit = !isNaN(parseInt(char, 10));
        if (!isDigit) {
          return (
            <span key={`char-${idx}`} className="inline-block px-[1px]">
              {char}
            </span>
          );
        }

        const digit = parseInt(char, 10);
        return (
          <span
            key={`col-${idx}`}
            className="inline-block h-[1.16em] overflow-hidden leading-[1.15em] relative w-[0.62em] text-center"
          >
            <motion.span
              className="flex flex-col absolute top-0 left-0 w-full"
              initial={false}
              animate={{ y: `-${digit * 10}%` }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 20,
                mass: 0.8,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="h-[1.15em] flex items-center justify-center">
                  {n}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
