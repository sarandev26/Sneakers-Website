'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';

interface TravellerLayerProps {
  isStatic?: boolean;
}

export function TravellerLayer({ isStatic = false }: TravellerLayerProps) {
  // Hidden in ?static=1
  if (isStatic) return null;

  const { scrollYProgress } = useScroll();

  // T1: Lace Lock
  // Hero (0 - 0.15) -> Drop Strip (0.15 - 0.25) -> Anatomy 01 (0.25 - 0.40) -> Product Buy (0.55 - 0.70)
  const t1Y = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.45, 0.60, 0.75, 1], ['25vh', '40vh', '50vh', '110vh', '50vh', '110vh', '110vh']);
  const t1X = useTransform(scrollYProgress, [0, 0.18, 0.30, 0.45, 0.60, 0.75, 1], ['80vw', '50vw', '28vw', '28vw', '70vw', '70vw', '70vw']);
  const t1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.38, 0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0, 0, 1, 0]);
  const t1Rotate = useTransform(scrollYProgress, [0, 0.3, 0.6], [12, 0, 45]);

  // T2: Zip-Tie
  // Hero (0 - 0.15) -> Drop Strip 360 loop (0.18 - 0.24) -> Anatomy 02 (0.28 - 0.38) -> Making Loom (0.42 - 0.52)
  const t2Y = useTransform(scrollYProgress, [0, 0.15, 0.22, 0.32, 0.45, 0.55, 1], ['65vh', '50vh', '50vh', '40vh', '60vh', '110vh', '110vh']);
  const t2X = useTransform(scrollYProgress, [0, 0.15, 0.22, 0.32, 0.45, 0.55, 1], ['15vw', '30vw', '70vw', '68vw', '45vw', '45vw', '45vw']);
  const t2Rotate = useTransform(scrollYProgress, [0.15, 0.22, 0.32, 0.48], [0, 360, 0, -15]);
  const t2Opacity = useTransform(scrollYProgress, [0, 0.05, 0.48, 0.55], [0, 1, 1, 0]);

  // T3: Air-Pod
  // Anatomy 03 (0.30 - 0.42) -> Colourway Lab (0.48 - 0.58) -> Product (0.60 - 0.72)
  const t3Y = useTransform(scrollYProgress, [0.25, 0.35, 0.50, 0.65, 0.75], ['60vh', '55vh', '50vh', '65vh', '110vh']);
  const t3X = useTransform(scrollYProgress, [0.25, 0.35, 0.50, 0.65, 0.75], ['10vw', '35vw', '75vw', '30vw', '30vw']);
  const t3Opacity = useTransform(scrollYProgress, [0.25, 0.30, 0.70, 0.76], [0, 1, 1, 0]);

  // T4: Holographic Tag
  // Product (0.60 - 0.70) -> Complete Pair (0.72 - 0.82) -> Vault (0.83 - 0.92)
  const t4Y = useTransform(scrollYProgress, [0.58, 0.68, 0.78, 0.88, 0.95], ['80vh', '70vh', '45vh', '50vh', '110vh']);
  const t4X = useTransform(scrollYProgress, [0.58, 0.68, 0.78, 0.88, 0.95], ['85vw', '75vw', '40vw', '25vw', '25vw']);
  const t4Rotate = useTransform(scrollYProgress, [0.58, 0.78, 0.88], [15, -10, 20]);
  const t4Opacity = useTransform(scrollYProgress, [0.58, 0.64, 0.90, 0.95], [0, 1, 1, 0]);

  // T5: Carbon Swatch
  // Anatomy 02 (0.28 - 0.38) -> Making Loom (0.42 - 0.52) -> Numbers (0.78 - 0.88)
  const t5Y = useTransform(scrollYProgress, [0.28, 0.45, 0.78, 0.86, 0.92], ['35vh', '50vh', '60vh', '60vh', '110vh']);
  const t5X = useTransform(scrollYProgress, [0.28, 0.45, 0.78, 0.86, 0.92], ['65vw', '50vw', '60vw', '82vw', '82vw']);
  const t5Opacity = useTransform(scrollYProgress, [0.28, 0.34, 0.86, 0.92], [0, 1, 1, 0]);

  // T6: Eyelet Ring
  // Reviews (0.82 - 0.88) -> FAQ (0.89 - 0.94) -> Footer O dock (0.95 - 1.0)
  const t6Y = useTransform(scrollYProgress, [0.82, 0.90, 0.97, 1.0], ['20vh', '50vh', '80vh', '88vh']);
  const t6X = useTransform(scrollYProgress, [0.82, 0.90, 0.97, 1.0], ['80vw', '50vw', '38vw', '38vw']);
  const t6Rotate = useTransform(scrollYProgress, [0.82, 1.0], [0, 720]);
  const t6Opacity = useTransform(scrollYProgress, [0.80, 0.85, 1.0], [0, 1, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden" aria-hidden="true">
      {/* T1: Lace Lock */}
      <motion.div
        style={{
          top: t1Y,
          left: t1X,
          opacity: t1Opacity,
          rotate: t1Rotate,
        }}
        className="absolute w-20 md:w-28 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2"
      >
        <Image src="/parts/lace-lock.webp" alt="T1 Lace Lock" width={120} height={80} className="object-contain" />
      </motion.div>

      {/* T2: Zip-Tie */}
      <motion.div
        style={{
          top: t2Y,
          left: t2X,
          opacity: t2Opacity,
          rotate: t2Rotate,
        }}
        className="absolute w-24 md:w-32 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2"
      >
        <Image src="/parts/zip-ties.webp" alt="T2 Zip-Tie" width={140} height={90} className="object-contain" />
      </motion.div>

      {/* T3: Air-Pod */}
      <motion.div
        style={{
          top: t3Y,
          left: t3X,
          opacity: t3Opacity,
        }}
        className="absolute w-28 md:w-36 filter drop-shadow-[0_0_20px_rgba(200,245,46,0.4)] -translate-x-1/2 -translate-y-1/2"
      >
        <Image src="/parts/air-pod.webp" alt="T3 Air-Pod" width={150} height={90} className="object-contain" />
      </motion.div>

      {/* T4: Holo Tag */}
      <motion.div
        style={{
          top: t4Y,
          left: t4X,
          opacity: t4Opacity,
          rotate: t4Rotate,
        }}
        className="absolute w-20 md:w-28 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2"
      >
        <Image src="/parts/holo-tag.webp" alt="T4 Holo Tag" width={130} height={80} className="object-contain" />
      </motion.div>

      {/* T5: Carbon Swatch */}
      <motion.div
        style={{
          top: t5Y,
          left: t5X,
          opacity: t5Opacity,
        }}
        className="absolute w-20 md:w-28 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2"
      >
        <Image src="/parts/carbon-weave.webp" alt="T5 Carbon Swatch" width={120} height={80} className="object-contain" />
      </motion.div>

      {/* T6: Eyelet Ring */}
      <motion.div
        style={{
          top: t6Y,
          left: t6X,
          opacity: t6Opacity,
          rotate: t6Rotate,
        }}
        className="absolute w-12 md:w-16 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2"
      >
        <Image src="/parts/eyelet.webp" alt="T6 Eyelet" width={80} height={80} className="object-contain" />
      </motion.div>
    </div>
  );
}
