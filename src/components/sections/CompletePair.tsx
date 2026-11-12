'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Check, Plus, Sparkles, Shield, Tag } from 'lucide-react';
import { ADD_ONS, formatINR } from '@/data/content';
import { useCart } from '@/context/CartContext';
import { RollNumber } from '@/components/engine/RollNumber';
import { Magnetic } from '@/components/engine/Magnetic';

interface CompletePairProps {
  isStatic?: boolean;
}

export function CompletePair({ isStatic = false }: CompletePairProps) {
  const { addItem, hasPair } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['vault-upgrade']);
  const [selectedEmiMonths, setSelectedEmiMonths] = useState<number>(6);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate bundle total
  const selectedItems = ADD_ONS.filter((a) => selectedAddons.includes(a.id));
  const rawTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscount = hasPair ? Math.round(rawTotal * 0.1) : 0;
  const bundleFinalTotal = rawTotal - bundleDiscount;
  const emiPerMonth = Math.ceil(bundleFinalTotal / selectedEmiMonths);

  const handleAddBundle = () => {
    selectedItems.forEach((addon) => {
      addItem({
        type: 'addon',
        title: addon.name,
        price: addon.price,
        quantity: 1,
        image: addon.image,
      });
    });
  };

  return (
    <section
      id="pair"
      data-anchor="complete-pair"
      className="relative w-full min-h-screen bg-concrete border-b border-line p-6 md:p-12 z-20 flex flex-col justify-between"
    >
      {/* Background Concrete Texture */}
      <div
        className="absolute inset-0 bg-[url('/tex/concrete.webp')] bg-cover opacity-20 pointer-events-none mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-line pb-6 gap-4">
        <div>
          <div className="volt-chip mb-2">TACTICAL ACCESSORIES</div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-bone tracking-tight">
            COMPLETE <span className="font-accent text-volt lowercase">the pair.</span>
          </h2>
          <p className="font-mono-tech text-xs text-steel mt-2">
            Engineered companion modules. Automatic 10% bundle discount applied with any sneaker pair.
          </p>
        </div>

        {/* EMI Month Selector Chips */}
        <div className="flex items-center gap-2 bg-graphite/60 border border-line p-1">
          <span className="font-mono-tech text-[10px] text-steel px-2">SPLIT PAY:</span>
          {[3, 6, 12].map((mo) => (
            <button
              key={mo}
              onClick={() => setSelectedEmiMonths(mo)}
              className={`relative px-3 py-1 font-mono-tech text-xs transition-colors ${
                selectedEmiMonths === mo ? 'text-volt-ink font-bold' : 'text-bone hover:text-volt'
              }`}
            >
              {selectedEmiMonths === mo && !isStatic && (
                <motion.span
                  layoutId="emiPill"
                  className="absolute inset-0 bg-volt rounded-sm pointer-events-none"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{mo} MO</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4 Add-On Cards with Staggered Entrance */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10"
      >
        {ADD_ONS.map((addon) => {
          const isSelected = selectedAddons.includes(addon.id);
          return (
            <motion.div
              key={addon.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              onClick={() => toggleAddon(addon.id)}
              data-cursor={isSelected ? 'DESELECT' : 'SELECT'}
              data-hover-demo={addon.id === 'vault-upgrade' ? 'hover' : undefined}
              className={`relative bg-obsidian border p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 group select-none ${
                isSelected
                  ? 'border-volt shadow-[0_0_20px_rgba(200,245,46,0.15)] -translate-y-1'
                  : 'border-line hover:border-bone/40'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tech text-[10px] text-volt border border-volt/30 px-2 py-0.5">
                    {addon.tag}
                  </span>
                  <div
                    className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                      isSelected ? 'border-volt bg-volt text-volt-ink' : 'border-line'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Thumbnail Image */}
                <div className="relative w-full h-36 my-2 flex items-center justify-center overflow-hidden">
                  <Image
                    src={addon.image}
                    alt={addon.name}
                    width={180}
                    height={130}
                    className="object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-display font-black text-lg text-bone uppercase tracking-tight mt-2">
                  {addon.name}
                </h3>
                <p className="font-mono-tech text-xs text-steel mt-1.5 leading-relaxed">
                  {addon.description}
                </p>
              </div>

              {/* Price & Selection Footer */}
              <div className="mt-6 pt-4 border-t border-line/40 flex items-center justify-between font-mono-tech">
                <span className="text-sm font-bold text-bone">{formatINR(addon.price)}</span>
                <span
                  className={`text-[10px] uppercase tracking-wider ${
                    isSelected ? 'text-volt font-bold' : 'text-steel'
                  }`}
                >
                  {isSelected ? '[ INCLUDED ]' : '+ ADD TO BUNDLE'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Running Total & Add Bundle CTA */}
      <div className="relative z-10 bg-graphite border border-line p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-6 font-mono-tech text-xs">
          <div>
            <span className="text-steel block text-[10px]">SELECTED ACCESSORIES</span>
            <span className="font-display font-black text-lg text-bone">
              {selectedAddons.length} MODULES
            </span>
          </div>
          <div className="h-8 w-[1px] bg-line hidden sm:block" />
          <div>
            <span className="text-steel block text-[10px]">BUNDLE TOTAL</span>
            <div className="font-display font-black text-2xl text-volt flex items-center">
              <span>₹</span>
              <RollNumber value={bundleFinalTotal} isStatic={isStatic} />
            </div>
          </div>
          {bundleDiscount > 0 && (
            <div className="bg-volt/10 border border-volt/30 px-3 py-1.5 text-volt text-[11px] font-bold">
              10% BUNDLE SAVINGS APPLIED (-{formatINR(bundleDiscount)})
            </div>
          )}
          <div className="text-steel text-[11px]">
            <span>OR {formatINR(emiPerMonth)}/MO × {selectedEmiMonths} MONTHS</span>
          </div>
        </div>

        <Magnetic strength={0.2}>
          <button
            onClick={handleAddBundle}
            disabled={selectedAddons.length === 0}
            data-cursor="BUNDLE"
            className="px-8 py-4 bg-volt text-volt-ink font-display font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(200,245,46,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ADD BUNDLE TO BAG // {formatINR(bundleFinalTotal)}
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
