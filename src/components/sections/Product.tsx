'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Ruler, Plus, Check } from 'lucide-react';
import { COLOURWAYS, SIZES, TECHNICAL_SPECS, formatINR } from '@/data/content';
import { useCart } from '@/context/CartContext';
import { RollNumber } from '@/components/engine/RollNumber';
import { Magnetic } from '@/components/engine/Magnetic';

interface ProductProps {
  isStatic?: boolean;
}

export function Product({ isStatic = false }: ProductProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedColourway, addItem } = useCart();
  const activeColourway = COLOURWAYS.find((c) => c.id === selectedColourway) || COLOURWAYS[0];

  const [selectedSize, setSelectedSize] = useState<number>(9);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeDrawerOpen, setIsSizeDrawerOpen] = useState(false);
  const [footCm, setFootCm] = useState(27.1);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);
  const [scrollZoom, setScrollZoom] = useState(1);

  // Gallery items: Active colourway shoe + 3 close-up crops
  const galleryImages = [
    { src: activeColourway.shoeImg, label: 'PROFILE VIEW' },
    { src: '/assets/crops/heel.webp', label: 'HEEL TAB MACRO' },
    { src: '/assets/crops/mesh.webp', label: 'KEVLAR KNIT MESH' },
    { src: '/assets/crops/sole-edge.webp', label: 'NITROGEN MIDSOLE EDGE' },
  ];

  // Subtle scroll-scrubbed zoom as section enters view
  useEffect(() => {
    if (isStatic) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top <= viewH && rect.bottom >= 0) {
        const factor = Math.min(1, Math.max(0, (viewH - rect.top) / (viewH + rect.height)));
        setScrollZoom(0.96 + factor * 0.08); // smooth 0.96 -> 1.04 zoom
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isStatic]);

  // Loupe Magnifier Motion Coordinates
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const loupeX = useMotionValue(0);
  const loupeY = useMotionValue(0);
  const springLoupeX = useSpring(loupeX, { stiffness: 260, damping: 25 });
  const springLoupeY = useSpring(loupeY, { stiffness: 260, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isStatic || !galleryRef.current) return;
    const rect = galleryRef.current.getBoundingClientRect();
    loupeX.set(e.clientX - rect.left);
    loupeY.set(e.clientY - rect.top);
  };

  const getRecommendedSize = (cm: number) => {
    if (cm <= 24.8) return 6;
    if (cm <= 25.8) return 7;
    if (cm <= 26.6) return 8;
    if (cm <= 27.5) return 9;
    if (cm <= 28.3) return 10;
    if (cm <= 29.2) return 11;
    return 12;
  };
  const recommendedSize = getRecommendedSize(footCm);

  const handleAddToBag = () => {
    addItem({
      type: 'pair',
      title: `A//EX Zero-G`,
      colourwayId: activeColourway.id,
      colourwayName: activeColourway.name,
      sizeUk: selectedSize,
      price: activeColourway.price,
      quantity: 1,
      image: activeColourway.shoeImg,
    });
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  const emiPerMonth = Math.ceil(activeColourway.price / 12);

  return (
    <section
      ref={containerRef}
      id="buy"
      className="relative w-full bg-obsidian border-b border-line p-6 md:p-12 z-20 m-0"
    >
      {/* Background Carbon Texture */}
      <div
        className="absolute inset-0 bg-[url('/tex/carbon.webp')] bg-repeat opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="border-b border-line pb-4 flex items-start justify-between">
          <div>
            <div className="volt-chip mb-2">ALLOCATION COMMERCE</div>
            <h2 className="font-display font-black text-2xl md:text-4xl text-bone tracking-tight">
              100% ORIGINAL <span className="font-accent text-volt lowercase">sneaker architecture.</span>
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-steel uppercase text-right">
            <span>DROP OPENS 31 OCT</span>
            <span className="block text-volt font-bold mt-0.5">DIRECT ATELIER FULFILLMENT</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery with Hover Loupe & Scroll Zoom */}
          <div className="lg:col-span-7 space-y-4 select-none">
            {/* Main Inspection View */}
            <div
              ref={galleryRef}
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              onMouseMove={handleMouseMove}
              data-cursor="ZOOM"
              className="relative w-full aspect-[4/3] bg-concrete/60 border border-line p-8 flex items-center justify-center overflow-hidden group cursor-crosshair shadow-lg"
            >
              <div className="volt-chip absolute top-4 left-4 z-20">
                {galleryImages[activeImageIndex].label}
              </div>

              {/* Main Image with scroll-scrubbed scale */}
              <div
                className="relative w-full h-full will-change-transform transition-transform duration-300"
                style={{
                  transform: `scale(${scrollZoom})`,
                }}
              >
                <Image
                  src={galleryImages[activeImageIndex].src}
                  alt="A//EX Sneaker Preview"
                  fill
                  className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                  priority
                />
              </div>

              {/* Hover Loupe Magnifier Bubble */}
              {isHoveringImage && !isStatic && (
                <motion.div
                  style={{
                    left: springLoupeX,
                    top: springLoupeY,
                  }}
                  className="pointer-events-none absolute w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-volt bg-obsidian overflow-hidden shadow-2xl z-30 hidden md:block"
                >
                  <div
                    className="absolute w-[400%] h-[400%]"
                    style={{
                      left: `${-((loupeX.get() / (galleryRef.current?.clientWidth || 1)) * 400 - 50)}%`,
                      top: `${-((loupeY.get() / (galleryRef.current?.clientHeight || 1)) * 400 - 50)}%`,
                    }}
                  >
                    <Image
                      src={galleryImages[activeImageIndex].src}
                      alt="Magnified View"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/3] bg-concrete/40 border p-2 overflow-hidden transition-all ${
                    idx === activeImageIndex
                      ? 'border-volt shadow-[0_0_12px_rgba(200,245,46,0.25)]'
                      : 'border-line hover:border-bone/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt={img.label} fill className="object-contain p-1" />
                </button>
              ))}
            </div>

            {/* Technical Specifications Table */}
            <div className="mt-8 border border-line bg-graphite/40 p-6 backdrop-blur-md">
              <h4 className="font-display font-black text-sm text-bone uppercase tracking-wider mb-4 border-b border-line pb-2 flex items-center justify-between">
                <span>ENGINEERING SPECIFICATIONS</span>
                <span className="font-mono-tech text-[10px] text-volt">CAD CERTIFIED</span>
              </h4>
              <div className="divide-y divide-line/40 font-mono-tech text-xs">
                {TECHNICAL_SPECS.map((spec) => (
                  <div key={spec.label} className="py-2.5 flex items-center justify-between">
                    <span className="text-steel">{spec.label}</span>
                    <span className="text-bone font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Buy Panel with Brushed Metal Texture */}
          <div className="lg:col-span-5 relative bg-graphite border border-line p-6 md:p-8 shadow-2xl overflow-hidden sticky top-24">
            {/* Brushed Metal Background Texture */}
            <div
              className="absolute inset-0 bg-[url('/tex/metal.webp')] bg-cover opacity-15 pointer-events-none mix-blend-screen"
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-6">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span className="volt-chip">LIMITED 500 // DROP 01</span>
                <span className="font-mono-tech text-[11px] text-volt font-bold">
                  ● LIVE FOR ALLOCATION
                </span>
              </div>

              {/* Title & Colourway */}
              <div>
                <h1 className="font-display font-black text-3xl md:text-4xl text-bone tracking-tight">
                  A//EX <span className="font-accent text-volt lowercase font-normal">Zero-G</span>
                </h1>
                <p className="font-mono-tech text-xs text-steel uppercase tracking-wider mt-1">
                  COLOURWAY: <span className="text-bone font-bold">{activeColourway.name}</span>
                </p>
              </div>

              {/* Price & No-Cost EMI */}
              <div className="border-y border-line py-4 space-y-1">
                <div className="flex items-baseline gap-3">
                  <div className="font-display font-black text-4xl text-bone flex items-center">
                    <span>₹</span>
                    <RollNumber value={activeColourway.price} isStatic={isStatic} />
                  </div>
                  <span className="font-mono-tech text-xs text-steel">INCLUSIVE OF ALL TAXES</span>
                </div>
                <p className="font-mono-tech text-xs text-volt">
                  From {formatINR(emiPerMonth)}/month (12 mo No-Cost EMI on select cards)
                </p>
              </div>

              {/* Stock Bar */}
              <div className="space-y-1.5 font-mono-tech text-xs">
                <div className="flex justify-between text-steel text-[11px]">
                  <span>VAULT INVENTORY</span>
                  <span className="text-volt font-bold">{activeColourway.stockLeft} OF 500 LEFT</span>
                </div>
                <div className="w-full h-1.5 bg-obsidian border border-line overflow-hidden">
                  <div
                    className="h-full bg-volt transition-all duration-700"
                    style={{ width: `${(activeColourway.stockLeft / 500) * 100}%` }}
                  />
                </div>
              </div>

              {/* Size Selector Grid (UK/India 6-12) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-steel tracking-wider uppercase">
                    SELECT SIZE [UK / INDIA]
                  </span>
                  <button
                    onClick={() => setIsSizeDrawerOpen(true)}
                    className="font-mono-tech text-xs text-volt hover:underline flex items-center gap-1 focus:outline-none"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Find my size</span>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {SIZES.map((s) => {
                    const isSelected = selectedSize === s.uk;
                    const isSoldOut = s.status === 'sold-out';
                    return (
                      <button
                        key={s.uk}
                        disabled={isSoldOut}
                        onClick={() => setSelectedSize(s.uk)}
                        className={`relative py-3 border font-mono-tech text-xs text-center transition-all ${
                          isSoldOut
                            ? 'border-line/40 text-steel/30 line-through cursor-not-allowed bg-obsidian/40'
                            : isSelected
                            ? 'border-volt text-volt-ink bg-volt font-bold shadow-md'
                            : 'border-line text-bone hover:border-bone/60 bg-obsidian/60'
                        }`}
                      >
                        <span>{s.uk}</span>
                      </button>
                    );
                  })}
                </div>
                <span className="font-mono-tech text-[10px] text-steel block">
                  Sample size chart · UK sizing corresponds to standard Indian sizing
                </span>
              </div>

              {/* Add to Bag CTA */}
              <div className="pt-2">
                <Magnetic strength={0.2} className="w-full">
                  <button
                    onClick={handleAddToBag}
                    data-cursor="ADD"
                    className="w-full py-4 bg-volt text-volt-ink font-display font-black text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(200,245,46,0.35)] focus:outline-none focus:ring-2 focus:ring-volt"
                  >
                    {isAddedAnimation ? (
                      <>
                        <Check className="w-5 h-5 stroke-[3]" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 stroke-[3]" />
                        <span>ADD TO BAG // {formatINR(activeColourway.price)}</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-4 border-t border-line space-y-2 font-mono-tech text-[11px] text-steel">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-volt shrink-0" />
                  <span>Free express shipping PAN-India · Ships from 7 Nov 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-volt shrink-0" />
                  <span>7-day complimentary size exchange on unworn pairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-volt shrink-0" />
                  <span>CYBER-SEC holographic verification tag embedded</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-volt shrink-0" />
                  <span>UPI, Cards, NetBanking, No-Cost EMI, Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Find My Size Modal */}
      <AnimatePresence>
        {isSizeDrawerOpen && (
          <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeDrawerOpen(false)}
              className="fixed inset-0 bg-obsidian/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-graphite border border-line p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between border-b border-line pb-4">
                <div>
                  <h4 className="font-display font-black text-lg text-bone uppercase">FIND MY SIZE</h4>
                  <p className="font-mono-tech text-xs text-steel mt-0.5">Foot-length calibration</p>
                </div>
                <button
                  onClick={() => setIsSizeDrawerOpen(false)}
                  className="text-steel hover:text-bone font-mono-tech text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 font-mono-tech">
                <div className="flex justify-between text-xs">
                  <span className="text-steel">FOOT LENGTH:</span>
                  <span className="text-volt font-bold">{footCm.toFixed(1)} CM</span>
                </div>
                <input
                  type="range"
                  min="23.5"
                  max="30.5"
                  step="0.1"
                  value={footCm}
                  onChange={(e) => setFootCm(parseFloat(e.target.value))}
                  className="w-full accent-volt h-2 bg-obsidian border border-line cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-steel">
                  <span>23.5 CM</span>
                  <span>30.5 CM</span>
                </div>
              </div>

              <div className="bg-obsidian border border-line p-4 flex items-center justify-between">
                <div>
                  <span className="font-mono-tech text-[10px] text-steel block">RECOMMENDED FIT</span>
                  <span className="font-display font-bold text-sm text-bone">TRUE TO UK SIZE</span>
                </div>
                <div className="flex items-baseline gap-1 text-volt font-display font-black text-3xl">
                  <span>UK</span>
                  <RollNumber value={recommendedSize} isStatic={isStatic} />
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSize(recommendedSize);
                  setIsSizeDrawerOpen(false);
                }}
                className="w-full py-3 bg-volt text-volt-ink font-display font-bold text-xs uppercase tracking-wider hover:brightness-110"
              >
                APPLY UK {recommendedSize} TO PAIR
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
