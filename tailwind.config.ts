import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--obsidian, #08090A)',
        concrete: 'var(--concrete, #23282A)',
        graphite: 'var(--graphite, #2F3437)',
        steel: 'var(--steel, #8A929A)',
        bone: 'var(--bone, #EDEEE9)',
        volt: 'var(--volt, #C8F52E)',
        'volt-ink': 'var(--volt-ink, #0B0D05)',
        line: 'var(--line, rgba(237, 238, 233, 0.12))',
        accent: 'var(--accent, #C8F52E)',
        'accent-secondary': 'var(--accent-secondary, #43C071)',
      },
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        accent: ['"Instrument Serif"', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        wideMono: '0.08em',
      },
      borderRadius: {
        DEFAULT: '1px',
        sm: '1px',
        md: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
