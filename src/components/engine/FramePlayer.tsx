'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { heroFramesCache } from '@/utils/frameCache';

interface FramePlayerProps {
  progress?: number; // 0 to 1
  isStatic?: boolean;
  className?: string;
}

const TOTAL_FRAMES = 119;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 732;

export function FramePlayer({ progress = 0, isStatic = false, className = '' }: FramePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);

  // IntersectionObserver to pause rendering when completely off-screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const drawFrame = useCallback(
    (prog: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !isVisibleRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const cw = canvas.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1280);
      const ch = canvas.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 732);

      if (cw === 0 || ch === 0) return;

      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cw, ch);

      const clampedProg = Math.max(0, Math.min(1, prog));
      const floatIndex = clampedProg * (TOTAL_FRAMES - 1);
      const baseIndex = Math.floor(floatIndex);
      const nextIndex = Math.min(baseIndex + 1, TOTAL_FRAMES - 1);
      const blend = floatIndex - baseIndex;

      // Use preloaded frames cache or load fallback on-demand
      let img1 = heroFramesCache[baseIndex];
      let img2 = heroFramesCache[nextIndex];

      if (!img1 && typeof window !== 'undefined') {
        const numStr = String(baseIndex + 1).padStart(4, '0');
        const fallback = new window.Image();
        fallback.onload = () => drawFrame(prog);
        fallback.src = `/frames/hero/f_${numStr}.webp`;
        heroFramesCache[baseIndex] = fallback;
        img1 = fallback;
      }

      // Cover / contain fit calculation
      const scale = Math.min((cw * 0.78) / FRAME_WIDTH, (ch * 0.78) / FRAME_HEIGHT);
      const targetW = FRAME_WIDTH * scale;
      const targetH = FRAME_HEIGHT * scale;
      const dx = (cw - targetW) / 2;
      const dy = (ch - targetH) / 2;

      if (img1 && img1.complete && img1.naturalWidth > 0) {
        ctx.globalAlpha = 1;
        ctx.drawImage(img1, dx, dy, targetW, targetH);
      }

      if (blend > 0.02 && img2 && img2.complete && img2.naturalWidth > 0) {
        ctx.globalAlpha = blend;
        ctx.drawImage(img2, dx, dy, targetW, targetH);
      }

      // Soft vignette feathering into concrete (#23282A)
      const grad = ctx.createRadialGradient(
        cw / 2,
        ch / 2,
        Math.min(cw, ch) * 0.3,
        cw / 2,
        ch / 2,
        Math.min(cw, ch) * 0.65
      );
      grad.addColorStop(0, 'rgba(35, 40, 42, 0)');
      grad.addColorStop(0.7, 'rgba(35, 40, 42, 0.45)');
      grad.addColorStop(1, 'rgba(35, 40, 42, 1)');

      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);

      ctx.restore();
    },
    []
  );

  useEffect(() => {
    drawFrame(isStatic ? 0.5 : progress);
  }, [progress, isStatic, drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(isStatic ? 0.5 : progress);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [progress, isStatic, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block select-none pointer-events-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
