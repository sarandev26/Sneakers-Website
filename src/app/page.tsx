'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SmoothScroll } from '@/components/engine/SmoothScroll';
import { Cursor } from '@/components/engine/Cursor';
import { RecordMode } from '@/components/engine/RecordMode';
import { Loader } from '@/components/navigation/Loader';
import { Nav } from '@/components/navigation/Nav';
import { Hero } from '@/components/sections/Hero';
import { DropStrip } from '@/components/sections/DropStrip';
import { Anatomy } from '@/components/sections/Anatomy';
import { TheMakeCutouts } from '@/components/sections/TheMakeCutouts';
import { ColourwayLab } from '@/components/sections/ColourwayLab';
import { Product } from '@/components/sections/Product';
import { CompletePair } from '@/components/sections/CompletePair';
import { TheVault } from '@/components/sections/TheVault';
import { Reviews } from '@/components/sections/Reviews';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';
import { CartDrawer } from '@/components/commerce/CartDrawer';

function MainExperience() {
  const searchParams = useSearchParams();
  const isStatic = searchParams.get('static') === '1';

  return (
    <SmoothScroll isStatic={isStatic}>
      <Loader isStatic={isStatic} />
      <Nav isStatic={isStatic} />
      <Cursor />
      <RecordMode />
      <CartDrawer isStatic={isStatic} />

      {/* Main container without overflow-x-hidden to ensure native position: sticky functions properly */}
      <main className="relative w-full">
        {/* 01. Hero Sequence Pinned Stage with Video Placeholder */}
        <Hero isStatic={isStatic} />

        {/* 02. Left-to-Right Drop Strip Marquee */}
        <DropStrip isStatic={isStatic} />

        {/* 03. Signature Architecture / Anatomy (5 Steps) */}
        <Anatomy isStatic={isStatic} />

        {/* 04. The Make / Sneaker Crafting (With Video Placeholder) */}
        <TheMakeCutouts isStatic={isStatic} />

        {/* 05. Colourway Lab (With 3D Model / Video Placeholder) */}
        <ColourwayLab isStatic={isStatic} />

        {/* 06. 100% Original Sneaker Architecture (Single Shoe, Size Picker + Add to Bag) */}
        <Product isStatic={isStatic} />

        {/* 07. Complete the Pairs (Add-Ons with Cedar Shoe Trees) */}
        <CompletePair isStatic={isStatic} />

        {/* 08. The Vault (With Asset Placeholder) */}
        <TheVault isStatic={isStatic} />

        {/* 09. Worn In The Wild (Pavement Feedback) */}
        <Reviews isStatic={isStatic} />

        {/* 10. Technical FAQ (Single-Line Q&A) */}
        <FAQ isStatic={isStatic} />

        {/* 11. Monolithic Footer */}
        <Footer isStatic={isStatic} />
      </main>
    </SmoothScroll>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="bg-obsidian min-h-screen" />}>
      <MainExperience />
    </Suspense>
  );
}
