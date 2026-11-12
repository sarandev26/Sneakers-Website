import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { NoiseGrain } from '@/components/engine/NoiseGrain';

export const metadata: Metadata = {
  metadataBase: new URL('https://aeroslate.com'),
  title: 'AERO-SLATE A//EX — ZERO-G DROP 01 | Engineered in Zero Gravity',
  description:
    'Flagship limited-edition sneaker drop engineered in zero gravity. High-performance Kevlar upper, nitrogen-infused midsole, carbon traction lug. 500 pairs per colourway. Drop opens 31 Oct 2026, 7:00 PM IST.',
  keywords: ['AERO-SLATE', 'A//EX Zero-G', 'Sneakers', 'Streetwear India', 'Zero Gravity Footwear', 'Limited Sneaker Drop'],
  openGraph: {
    title: 'AERO-SLATE A//EX — ZERO-G DROP 01',
    description: 'Engineered in zero gravity. Built for pavement. 500 pairs per colourway.',
    url: 'https://aeroslate.com',
    siteName: 'AERO-SLATE',
    images: [
      {
        url: '/assets/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'AERO-SLATE A//EX Zero-G',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian text-bone selection:bg-volt selection:text-volt-ink">
        <CartProvider>
          <NoiseGrain />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
