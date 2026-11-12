'use client';

import React from 'react';
import { FAQS } from '@/data/content';

interface FAQProps {
  isStatic?: boolean;
}

export function FAQ({ isStatic = false }: FAQProps) {
  return (
    <section
      id="faq"
      data-anchor="faq-section"
      className="relative w-full bg-concrete border-b border-line p-6 md:p-12 z-20 flex flex-col justify-between"
    >
      {/* Background Subtle Texture */}
      <div
        className="absolute inset-0 bg-[url('/tex/concrete.webp')] bg-cover opacity-15 pointer-events-none mix-blend-overlay"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-line pb-6 gap-4">
        <div>
          <div className="volt-chip mb-2">INTELLIGENCE BRIEFING</div>
          <h2 className="font-display font-black text-2xl md:text-4xl text-bone tracking-tight">
            SYSTEM <span className="font-accent text-volt lowercase">protocols.</span>
          </h2>
          <p className="font-mono-tech text-xs text-steel mt-1 max-w-md">
            Frequently queried parameters: sizing, provenance, PAN-India logistics, and exchanges.
          </p>
        </div>
        <div className="font-mono-tech text-xs text-steel">
          6 PROTOCOLS ACTIVE // SINGLE-LINE TELEMETRY
        </div>
      </div>

      {/* Single-Line Q&A Protocol List (Strictly one line per question & answer, no multi-line wrapping) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-8 divide-y divide-line border-y border-line">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="py-4.5 px-3 flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-8 transition-colors hover:bg-white/[0.03] group overflow-hidden"
          >
            {/* Question (Strictly single line) */}
            <div className="flex items-center gap-3 shrink-0 overflow-hidden">
              <span className="font-mono-tech text-xs text-volt font-bold">
                {String(idx + 1).padStart(2, '0')} //
              </span>
              <span className="font-display font-bold text-sm md:text-base text-bone uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                {faq.question}
              </span>
            </div>

            {/* Answer (Strictly single line with text-ellipsis) */}
            <div className="font-mono-tech text-xs text-steel whitespace-nowrap overflow-hidden text-ellipsis lg:text-right pl-7 lg:pl-0">
              <span className="group-hover:text-bone transition-colors">{faq.answer}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Support Prompt */}
      <div className="relative z-10 flex items-center justify-between border-t border-line pt-4 font-mono-tech text-xs text-steel">
        <span>AUTHENTICITY GUARANTEED // EMBEDDED CYBER-SEC NFC CHIP</span>
        <span className="text-volt font-bold">EXPRESS PAN-INDIA FULFILLMENT</span>
      </div>
    </section>
  );
}
