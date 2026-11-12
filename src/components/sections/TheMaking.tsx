'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';

interface TheMakingProps {
  isStatic?: boolean;
}

const PANELS = [
  {
    num: '01',
    title: 'GENERATIVE CAD',
    copy: '4,200 simulated iterations find the lightest shape that still holds.',
    img: '/story/01-cad.webp',
    tag: 'SIMULATION // 01',
    anchor: 'making-cad',
  },
  {
    num: '02',
    title: 'KEVLAR WEAVE',
    copy: 'Woven on a high-speed loom, sparks and all.',
    img: '/story/02-loom.webp',
    tag: 'TENSILE // 02',
    anchor: 'making-loom',
  },
  {
    num: '03',
    title: 'NITROGEN FUSION',
    copy: 'Gas is injected into the midsole mould for a foam that springs back.',
    img: '/story/03-fusion.webp',
    tag: 'CRYOGENIC // 03',
    anchor: 'making-fusion',
  },
  {
    num: '04',
    title: 'HAND FINISHING',
    copy: 'Every pair is airbrushed and distressed by hand. No two edges match.',
    img: '/story/04-finish.webp',
    tag: 'ATELIER // 04',
    anchor: 'making-finish',
  },
  {
    num: '05',
    title: 'VAULT BOXING',
    copy: 'White-gloved packing. Numbered. Sealed. Shipped.',
    img: '/story/05-vault.webp',
    tag: 'ARCHIVE // 05',
    anchor: 'making-vault',
  },
];

export function TheMaking({ isStatic = false }: TheMakingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll progress to horizontal translation
  // 5 panels total (each ~75vw wide)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%']);

  return (
    <section
      ref={containerRef}
      id="making"
      className={`relative w-full ${isStatic ? 'h-auto py-24' : 'h-[300vh]'} bg-concrete border-b border-line`}
    >
      <div className={`${isStatic ? 'relative' : 'sticky top-0'} w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10`}>
        {/* Header */}
        <div className="relative z-20 flex items-start justify-between border-b border-line pb-4">
          <div>
            <div className="volt-chip mb-2">MANUFACTURING TELEMETRY</div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-bone tracking-tight">
              THE <span className="font-accent text-volt lowercase">making.</span>
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-steel uppercase tracking-widest text-right">
            <span>5-PHASE PRODUCTION</span>
            <span className="block text-bone/60 mt-0.5">FROM SIMULATION TO VAULT</span>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="relative flex-1 flex items-center overflow-hidden my-6">
          <motion.div
            style={{ x: isStatic ? '0%' : x }}
            className={`flex gap-8 ${isStatic ? 'overflow-x-auto w-full' : 'will-change-transform'}`}
          >
            {PANELS.map((panel, idx) => (
              <div
                key={panel.num}
                data-anchor={panel.anchor}
                className="relative w-[75vw] md:w-[48vw] h-[55vh] shrink-0 bg-obsidian border border-line p-6 flex flex-col justify-between overflow-hidden group hover:border-volt/60 transition-colors select-none"
              >
                {/* Background Manufacturing Still */}
                <div className="absolute inset-0 overflow-hidden z-0">
                  <Image
                    src={panel.img}
                    alt={panel.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                </div>

                {/* Giant Outlined Step Number */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono-tech text-xs text-volt font-bold bg-obsidian/80 px-2.5 py-1 border border-volt/30">
                    {panel.tag}
                  </span>
                  <span className="font-display font-black text-7xl md:text-8xl text-outline opacity-40 leading-none">
                    {panel.num}
                  </span>
                </div>

                {/* Panel Footer Specs */}
                <div className="relative z-10 bg-obsidian/85 border border-line p-5 backdrop-blur-md">
                  <h3 className="font-display font-black text-xl md:text-2xl text-bone uppercase tracking-tight">
                    {panel.title}
                  </h3>
                  <p className="font-mono-tech text-xs text-steel mt-2 leading-relaxed">
                    {panel.copy}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer Navigation Indicator */}
        <div className="relative z-20 flex items-center justify-between border-t border-line pt-4 font-mono-tech text-xs text-steel">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span>01 TO 05 KINETIC TRACK</span>
          </div>
          <span>HORIZONTAL TRANSLATION // 300VH</span>
        </div>
      </div>
    </section>
  );
}
