# AERO-SLATE A//EX // ZERO-G DROP 01 — DESIGN SPECIFICATION

Art direction, motion choreography, design rationale, interaction contracts, and cinematic orchestration for the flagship AERO-SLATE drop website.

---

## 1. Design Choices & Art Direction Rationale

### 1.1 Philosophy & Conceptual Frame
- **Core Narrative**: Sneaker architecture engineered in zero gravity. The shoe is not a static footwear product; it is a weightless kinetic assembly that disassembles, hovers, and locks into pavement-grade streetwear.
- **Aesthetic Stance**: Brutalist, high-contrast, technical streetwear tailored for Indian sneaker culture (18–35). Sharp 0–2px corners, 1px technical hairlines, crosshair `+` intersections, monochrome hierarchy accented with high-voltage Volt (`#C8F52E`).
- **Anti-Copy Guardrails**: Strict avoidance of soft organic / juice / food tropes. No cream/kraft paper, no orange/warm earth gradients, no handwritten marker scripts, no chalkboard textures, no floating fruit or splash loaders. Everything is machined, anodized, woven, and calibrated.

### 1.2 Color Architecture
- **Base Environment**:
  - `--obsidian`: `#08090A` — Void background that absorbs surrounding elements and maximizes sneaker silhouettes.
  - `--concrete`: `#23282A` — Industrial brutalist texture staging the hero scrub.
  - `--graphite`: `#2F3437` — Precision card housings and drawer backings.
  - `--steel`: `#8A929A` — Subdued technical annotations, leader lines, and secondary stats.
  - `--bone`: `#EDEEE9` — High-visibility display text and structural labels.
- **Accent Orchestration**:
  - Main brand accent: **Volt** (`#C8F52E`). High energy, instantly recognizable on dark themes.
  - Dynamic Colorway Accent: When a user switches colourways, the CSS variable `--accent` smoothly tweens across the entire DOM:
    - *Cyber Neon*: `#C8F52E` + `#43C071`
    - *Infrared*: `#E0343B`
    - *Triple Black*: `#EDEEE9`
    - *Liquid Chrome*: `#BCC5D9`
    - *Desert Sand*: `#A39075` + `#4A4F34`
    - *Acid Wash*: `#17A3CB` + `#5253BB`
  - Only one accent colorway is active at any time.

### 1.3 Typography System
- **Display**: `Unbounded` (Weights 800–900, uppercase, `-0.03em` tracking). Brutal, wide geometric sans providing monumental impact.
- **Editorial Contrast**: `Instrument Serif` (Italic). Exactly one word per key headline is set in Instrument Serif to create sudden editorial elegance within the brutalist structure (`DEFY *gravity*`, `BONDED *pressure*`).
- **Body & UI**: `Space Grotesk`. Crisp modern monospace-influenced readability.
- **Data & Specs**: `JetBrains Mono` (Uppercase, `+0.08em` tracking, minimum 12px). Evokes aerospace flight displays, telemetry, and batch certification.

---

## 2. Section-by-Section Plan & Page Map

1. **Loader (00)**: Real asset loading progress (00–100) driven by hero frames and core images. Thin SVG lace draws with `pathLength`, thickens into the header underline, and cleanly wipes upward (`clip-path`).
2. **Navigation (01)**: Floating slim glass bar with `layoutId` sliding hover pill, `RollNumber` dynamic cart indicator, magnetic `[ SECURE PAIR ]` CTA.
3. **Hero Stage (02)**: 400vh scroll container pinned to 100vh. Canvas-based `FramePlayer` scrubs 119 frames with linear fractional frame blending. Giant horizontal parallax outlined "ZERO-G" text behind shoe. Three depth layers of floating exploded parts responsive to mouse pointer tilt (`useSpring`).
4. **Drop Strip (03)**: Velocity-linked marquee displaying live drop telemetry, shipping notes, and edition caps with kinetic skew on rapid scrub.
5. **Anatomy (04)**: Pinned 5-step interactive breakdown (`01 LACE LOCK`, `02 WOVEN UPPER`, `03 MIDSOLE`, `04 INSOLE`, `05 OUTSOLE`). Exploded parts fly along curved scroll trajectories (`x, y, rotate`) into assembly slots around the central shoe.
6. **The Making (05)**: Horizontal scroll translation (`useTransform`) traversing 5 industrial manufacture stages (`01 GENERATIVE CAD`, `02 KEVLAR WEAVE`, `03 NITROGEN FUSION`, `04 HAND FINISHING`, `05 VAULT BOXING`) with inner card parallax.
7. **Colourway Lab (06)**: Full-bleed split viewport. Left: technical specs, edition counter, price, and color chips. Right: normalized sneaker model over animated smoke bursts. Directional `clip-path` wipe transitions.
8. **Product & Buy (07)**: Brushed metal sticky commerce engine. Real-time Indian currency pricing (`₹15,999`), no-cost EMI calculator, UK/India size selector with `layoutId`, foot measurement drawer (23.5–30.5 cm slider), macro loupe magnifier, and animated fly-to-cart shoe trajectory.
9. **Complete the Pair (08)**: Add-on bundle configurator with 3D perspective spring cards. Automatic 10% bundle discount when sneaker is present.
10. **The Vault (09)**: Radial `clip-path` spotlight reveal showcasing the numbered collector packaging, dynamic edition allocation counter (`Pair No. 0147 / 500`), and acrylic case specs.
11. **Numbers (10)**: Comparative metric benchmarks (Weight, Energy Return, Wet Grip, Abrasion Life) using scroll-linked bar width growth and live rolling digits.
12. **Reviews (11)**: Inertial horizontal drag carousel (`drag="x"`) containing real sneakerhead feedback from Mumbai, Bengaluru, Delhi, Chennai, and Pune.
13. **FAQ (12)**: Technical accordion with auto-measured height springs and rotating `+` crosshairs covering sizing, authenticity, PAN-India logistics, and care.
14. **Footer (13)**: Monolithic outlined `AERO-SLATE` wordmark revealing through a per-letter scroll mask, docking the T6 eyelet actor into the letter "O".

---

## 3. Motion Map: Section Techniques & Mechanics

Every scroll-linked state is a pure, deterministic function of scroll position:

| Section | Framer Motion Technique | Choreography & Execution |
|---|---|---|
| **00 Loader** | `motion.path` with `pathLength`, `clip-path` | Lace line draws `0 -> 1` tied to real load percentage; wipes `inset(0 0 100% 0)` to reveal hero on 100% completion. |
| **01 Nav** | `layoutId="navHover"`, `useTransform` | Hover indicator pill glides between anchor links; header background blurs and densifies on scroll down. |
| **02 Hero** | `useScroll`, `useTransform`, `useSpring` | Scroll progress `[0, 1]` maps to frame index `[0, 118.99]`. Three parallax layers drift at factors `0.2`, `0.5`, `0.8` with pointer mouse spring. |
| **03 Drop Strip** | `useVelocity`, `useSpring`, `useTransform` | Scroll velocity drives continuous marquee speed multiplier and subtle `skewX(-5deg to 5deg)` on fast scroll. |
| **04 Anatomy** | `useScroll`, `useTransform` with keyframe arrays | Scroll progress `0.0 to 1.0` partitioned into 5 steps. Each step rolls a giant numeral and routes part along cubic Bezier coordinates. |
| **05 The Making** | `useScroll`, `useTransform` (X-axis translation) | Pinned wrapper maps vertical scroll `0 -> 1` to horizontal track `translateX(0% -> -80%)`; inner card images translate oppositely at `15%`. |
| **06 Colourway Lab** | `AnimatePresence`, `motion.div` `clip-path` | Colourway switch triggers directional wipe (`polygon(...)`) from chip direction; CSS variables tween via `animate()`. |
| **07 Product** | `useMotionValue`, `layoutId`, custom arc trajectory | Pointer motion coordinates drive magnifier loupe transform; Add to Cart triggers detached clone flying along quadratic Bezier curve into nav. |
| **08 Complete Pair** | `whileInView`, `variants` with staggered springs | Cards enter with perspective `rotateX(15deg) -> rotateX(0deg)` and opacity; toggle triggers `RollNumber` total rollup. |
| **09 The Vault** | `useTransform` mapping to `clipPath: circle(...)` | Scroll expands spotlight iris from 0% to 120% radius centered on collector acrylic box. |
| **10 Numbers** | `useTransform` mapping to `scaleX` & width | Stat bars grow from 0% to measured ratio (e.g., 71% vs 58%) anchored left (`originX: 0`). |
| **11 Reviews** | `drag="x"`, `dragConstraints`, `dragElastic` | Infinite feel horizontal rail with momentum spring release and cursor state changes. |
| **12 FAQ** | `AnimatePresence`, `layout="position"`, `rotate` | Accordion panels expand smoothly via `height: "auto"` with rotating `+` icon (`0deg -> 45deg`). |
| **13 Footer** | `useTransform` per-letter mask, velocity skew | Outlined wordmark letters unmask sequentially as page reaches bottom; letters skew slightly with remaining scroll inertia. |

---

## 4. Traveller Layer Architecture (T1–T6)

The `TravellerLayer` is a fixed, full-viewport overlay (`pointer-events: none; z-index: 60`). Each traveller's path is defined by anchor elements tagged with `data-anchor` across the DOM. Positions are queried via `getBoundingClientRect()`, cached in document coordinates, and updated on resize and asset load.

```
+-----------------------------------------------------------------------------------------+
|                                     TRAVELLER ACTORS                                    |
+-----------------------------------------------------------------------------------------+
| [T1 Lace Lock]      Hero (Float)  --> Drop Strip (Glide) --> Anatomy 01 (Snap & Shine)  |
|                                                                 --> Size Slider (Knob)  |
+-----------------------------------------------------------------------------------------+
| [T2 Zip-Tie]        Hero (Float)  --> Drop Strip (360° Loop) --> Anatomy 02 (Cinch)    |
|                                                                 --> Loom Panel (Sway)   |
+-----------------------------------------------------------------------------------------+
| [T3 Air-Pod]        Anatomy 03 (Dock Glow) --> Lab (Background Hover)                  |
|                                                --> Product Spec Row (Hover)             |
+-----------------------------------------------------------------------------------------+
| [T4 Holo Tag]       Product (Buy Button)   --> Complete Pair (Card Pin)                |
|                                                --> Vault Collector Box (Swinging Tag)   |
+-----------------------------------------------------------------------------------------+
| [T5 Carbon Swatch]  Anatomy 02 (Mesh Dock) --> Making Loom (Feed Slide)                 |
|                                                --> Numbers Abrasion Cap (Lock)          |
+-----------------------------------------------------------------------------------------+
| [T6 Eyelet Ring]    Reviews (Drop)         --> FAQ (Glide Through)                      |
|                                                --> Footer Wordmark ("O" Dock & Rotate)  |
+-----------------------------------------------------------------------------------------+
```

### Arrival Moments:
- **T1 Lace Lock**: Magnetic snap with radiant radial flare when docking into Anatomy step 01.
- **T2 Zip-Tie**: Elastic cinch squash when anchoring into the Kevlar weave panel.
- **T3 Air-Pod**: High-intensity Volt glow pulse when slotting into nitrogen midsole cavity.
- **T4 Holo Tag**: Pendulum swing oscillation with chromatic dispersion sheen.
- **T5 Carbon Swatch**: Mechanical slide and lock into the abrasion metric bar.
- **T6 Eyelet Ring**: Small gravitational bounce before settling into the letter "O" of AERO-SLATE.

---

## 5. Section Transition Contracts

Transitions are scroll-linked mask reveals avoiding repetition:

1. **Hero -> Drop Strip**: `Diagonal Slice` — `clipPath: polygon(0 0, 100% 5%, 100% 100%, 0 95%)`
2. **Drop Strip -> Anatomy**: `Bar Wipe` — Vertical 4-bar alternating shutter wipe.
3. **Anatomy -> The Making**: `Circle Iris` — Circular expand from center crosshair.
4. **The Making -> Colourway Lab**: `Inset Reveal` — Inset box wipe from `inset(10% 10%)` to `inset(0%)`.
5. **Colourway Lab -> Product (Buy)**: `Split Doors` — Left and right panel slide separation.
6. **Product -> Complete Pair**: `Reverse Diagonal` — Opposite angle slice (`polygon(0 5%, 100% 0, 100% 100%, 0 100%)`).
7. **Complete Pair -> The Vault**: `Spotlight Iris` — Radial circular beam reveal.
8. **The Vault -> Numbers**: `Horizontal Blinds` — 6-stripe interleaved horizontal blinds.
9. **Numbers -> Reviews**: `Inset Box Reveal` — Border-contracting technical frame.
10. **Reviews -> FAQ**: `Angular Slice` — Sharp 12-degree knife wipe.
11. **FAQ -> Footer**: `Rising Monolith Panel` — Upward vertical sweep uncovering outlined wordmark.

---

## 6. Interactive Hover System & Micro-Animations

- **Cursor Contract**: Fixed crosshair cursor with dual concentric rings and contextual typography:
  - Default: Fine crosshair with 1px dot
  - Over Shoe / Images: `VIEW`
  - Over Reviews Rail: `DRAG`
  - Over Add to Bag: `ADD`
  - Over Colourway Chips / Sizes: `PICK`
- **Magnetic Buttons**: Secondary CTA and primary `[ SECURE PAIR ]` pull toward pointer within a 40px threshold using `useSpring(stiffness: 150, damping: 15)`.
- **Card Tilt**: Add-on cards and Review cards feature 3D perspective tilt (`rotateX`, `rotateY`) reacting to mouse position relative to card center.
- **Active Size Chips**: UK size chips display a crisp sliding border frame (`layoutId="activeSize"`).

---

## 7. Record Mode (`?record=1`) Autonomous Director Plan

When initialized with URL parameter `?record=1`:
1. Custom cursor and system scrollbars are suppressed.
2. A high-contrast virtual director cursor is spawned.
3. The viewport auto-scrolls down the page over ~38 seconds following a cubic-bezier easing profile with momentary holds (<= 1.2s) at key storytelling milestones.
4. Virtual cursor glides between elements designated with `data-hover-demo`:
   - **Moment 1** (`data-hover-demo="hover"`): Hero floating sneaker hover, triggering 3D tilt.
   - **Moment 2** (`data-hover-demo="click"`): Colourway chip click (switching to Infrared with red smoke burst).
   - **Moment 3** (`data-hover-demo="click"`): Size selector click (selecting UK 9 with sliding frame).
   - **Moment 4** (`data-hover-demo="click"`): Add to Bag click (triggering ballistic shoe arc into nav bag).
   - **Moment 5** (`data-hover-demo="hover"`): Add-on Vault Box Upgrade card hover with 3D tilt and price update.
