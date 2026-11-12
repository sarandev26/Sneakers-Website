# ASSET MANIFEST — AERO-SLATE A//EX (ZERO-G DROP 01)

Comprehensive inventory, visual inspection, brand-safety audit, and post-processing record for all 36 source workspace assets and 119 hero sequence frames.

---

## 1. Hero Scroll Sequence

- **Source Location**: `Video_frames-Hero/` (119 frames, `frame_000004.jpg` to `frame_000122.jpg`)
- **Dimensions**: 1280 × 732 px, 24-bit RGB JPEG
- **Visual Content**: A Cyber Neon A//EX sneaker hovering in zero-gravity in front of a dark brutalist concrete wall. Sequence begins hovering, laces and Kevlar upper lift upward, the nitrogen midsole and carbon outsole separate into exploded layers, holds at maximum separation, and reassembles tightly onto pavement.
- **Luminance Inspection**: Sequence mean brightness across all 119 frames is stable between 35.94 and 43.34. Frame-to-frame delta is <= 1.74. Zero light-grey reference frames detected; the sequence already begins on the stable concrete stage.
- **Brand Safety**: Heel tab, tongue badge, and outsole lugs inspected at 100%. No Nike swooshes, no third-party logos or trademarks.
- **Processing & Destination**: Converted to WebP (quality 82, 1280 × 732 px), renumbered to `public/frames/hero/f_0001.webp` through `f_0119.webp`. Manifest metadata written to `public/frames/hero/frames.json` (`count: 119, width: 1280, height: 732`).

---

## 2. Colourway Profile Shoes (6 Assets)

All shoes inspected at 100% resolution for logos, swooshes, and third-party markings. All six shoes are original concept renders with zero third-party branding. Processed via GrabCut segmentation, edge despill, and normalized onto a unified `1600 × 1000 px` transparent WebP canvas with identical scale and baseline at `y = 820`.

| Source File | Dimensions | Alpha | Visual Content | Colourway | Problems & Brand Check | Applied Fix & Destination |
|---|---|---|---|---|---|---|
| `36-clean.png` | 2744 × 1568 | None (RGBA, a=255) | Black runner with lime heel tab & lime sole accents | **Cyber Neon** | Studio grey backdrop; ground shadow plane | GrabCut segmented, despilled, normalized to `public/assets/shoes/neon.webp`. Also extracted close-up crops `heel.webp`, `mesh.webp`, `sole-edge.webp`. |
| `32-clean.png` | 2752 × 1536 | None (RGBA, a=255) | Black runner with crimson red sole & red heel tab | **Infrared** | Studio grey backdrop | GrabCut segmented, despilled, normalized to `public/assets/shoes/infrared.webp`. |
| `34-clean.png` | 2752 × 1536 | None (RGBA, a=255) | Stealth blacked-out runner, matte/gloss textures | **Triple Black** | Studio grey backdrop | GrabCut segmented, despilled, normalized to `public/assets/shoes/triple-black.webp`. |
| `33-clean.png` | 2752 × 1536 | None (RGBA, a=255) | Black runner with mirror chrome panels & lime tab | **Liquid Chrome** | High specular reflections on chrome edge | GrabCut segmented, despilled, normalized to `public/assets/shoes/chrome.webp`. |
| `02-clean.png` | 2752 × 1536 | None (RGBA, a=255) | Tan and tactical olive green runner | **Desert Sand** | Tan studio backdrop; potential bottom-right star watermark | Watermark area verified clear; GrabCut segmented, despilled, normalized to `public/assets/shoes/desert.webp`. |
| `01-clean.png` | 2752 × 1536 | None (RGBA, a=255) | Graphite camo runner with cyan accent heel and sole | **Acid Wash** | Studio grey backdrop | GrabCut segmented, despilled, normalized to `public/assets/shoes/acid-wash.webp`. |

---

## 3. Exploded Parts on White Studio Backdrop (15 Assets)

All 15 parts processed using OpenCV floodFill edge separation, erosion-assisted despill (color decontamination), and bounding-box trimming to transparent WebP. Inspected for forbidden brand names (`M / TOKYO`, `VLT`, `8K CARBON`, `BK`, cleats/studs).

| Source File | Dimensions | Target Part Name | Usage Location | Brand Safety & Text Inspection | Fix & Output Path |
|---|---|---|---|---|---|
| `08-clean.png` | 2816 × 1536 | `lace-lock` | Anatomy 01, Traveller T1, Size Finder | Titanium lock marked "TITANIUM 03.101 // TITANIUM-ID" (allowed technical detail) | Despilled, trimmed -> `public/parts/lace-lock.webp` |
| `09-clean.png` | 2816 × 1536 | `cord` | Floating layer, Anatomy | Braided reflective silver cord, no markings | Despilled, trimmed -> `public/parts/cord.webp` |
| `10-clean.png` | 2816 × 1536 | `heel-counter` | Anatomy, Floating layer | Marked "TPU-REINFORCED // STABILITY SYSTEM" (allowed technical detail) | Despilled, trimmed -> `public/parts/heel-counter.webp` |
| `07-clean.png` | 2816 × 1536 | `insole` | Anatomy 04, Spec row | Translucent blue-grey clear gel insole, no logos | Softness alpha tuned -> `public/parts/insole.webp` |
| `12-clean.png` | 2816 × 1536 | `foam` | Anatomy 03 | Rough porous nitrogen foam brick, no logos | Despilled, trimmed -> `public/parts/foam.webp` |
| `14-clean.png` | 2816 × 1536 | `eyelet` | Anatomy, Traveller T6 | Anodized black hexagonal eyelet ring, no logos | Despilled, trimmed -> `public/parts/eyelet.webp` |
| `15-clean.png` | 2816 × 1536 | `laces` | Anatomy, Complete Pair | Green/black rope laces with gunmetal aglets | Despilled, trimmed -> `public/parts/laces.webp` |
| `25-clean.png` | 2816 × 1536 | `zip-ties` | Anatomy 02, Traveller T2 | Bright volt/green technical zip-ties | Despilled, trimmed -> `public/parts/zip-ties.webp` |
| `26-clean.png` | 2816 × 1536 | `air-pod` | Anatomy 03, Traveller T3 | Translucent lime nitrogen air capsule | Softness alpha tuned -> `public/parts/air-pod.webp` |
| `13-clean.png` | 2816 × 1536 | `holo-tag` | Vault, Complete Pair, Traveller T4 | Marked "CYBER-SEC // AUTHENTICATED", "UNIT-9" (explicitly allowed) | Despilled, trimmed -> `public/parts/holo-tag.webp` |
| `11-clean.png` | 2816 × 1536 | `barcode-strap` | Anatomy, Traveller layer | Marked "PT-N-GRY-BLK-0041 // MFG. DATE: 11/2023" (allowed technical detail) | Despilled, trimmed -> `public/parts/barcode-strap.webp` |
| `19-clean.png` | 2816 × 1536 | `velcro` | Anatomy, Floating layer | Marked "UNIT-7 / TACTICAL SNEAKER SYSTEM" (explicitly allowed) | Despilled, trimmed -> `public/parts/velcro.webp` |
| `05-clean.png` | 2816 × 1536 | `carbon-weave` | Anatomy 02, Traveller T5, Numbers | High-tensile carbon weave swatch, no markings | Despilled, trimmed -> `public/parts/carbon-weave.webp` |
| `03-clean.png` | 2816 × 1536 | `patch` | Anatomy, Story | Black rubber patch with embossed "//" mark. Faint watermark in corner | White corner watermark eliminated via bounding box crop -> `public/parts/patch.webp` |
| `04-clean.png` | 2816 × 1536 | `soles` | Anatomy 05, Hero layer | Urban herringbone traction lug pattern. No cleats or studs (safe) | Despilled, trimmed -> `public/parts/soles.webp` |

---

## 4. Atmospheric Smoke Bursts (6 Assets)

All converted to WebP (quality 85, max width 1920 px) with deep obsidian backgrounds (`#08090A`).

| Source File | Colour Accent | Destination Path | Usage |
|---|---|---|---|
| `28-clean.png` | Emerald Green / Volt | `public/bursts/neon.webp` | Cyber Neon backdrop in Colourway Lab |
| `06-clean.png` | Crimson Red | `public/bursts/infrared.webp` | Infrared backdrop in Colourway Lab |
| `18-clean.png` | Monochromatic Black / Liquid | `public/bursts/triple-black.webp` | Triple Black backdrop in Colourway Lab |
| `24-clean.png` | Metallic Chrome / Silver | `public/bursts/chrome.webp` | Liquid Chrome backdrop in Colourway Lab |
| `22-clean.png` | Warm Sand / Tan | `public/bursts/desert.webp` | Desert Sand backdrop in Colourway Lab |
| `23-clean.png` | Purple-Blue / Cyan | `public/bursts/acid-wash.webp` | Acid Wash backdrop in Colourway Lab |

---

## 5. Industrial Textures (3 Assets)

Converted to WebP (quality 85, max width 1920 px) for performance-efficient background and panel compositing.

| Source File | Texture Type | Destination Path | Usage |
|---|---|---|---|
| `20-clean.png` | Carbon Weave | `public/tex/carbon.webp` | 6% ambient background opacity across content sections |
| `31-clean.png` | Brushed Metal | `public/tex/metal.webp` | Sticky buy panel surface texture |
| `35-clean.png` | Dark Concrete | `public/tex/concrete.webp` | Hero scroll background and transition base |

---

## 6. The Making Story Sequence & Vault Packaging (6 Assets)

High-fidelity manufacturing cinematography stills. Converted to WebP (quality 85, max width 1920 px).

| Source File | Story Step / Title | Destination Path | Narrative Content |
|---|---|---|---|
| `21-clean.png` | `01-cad` | `public/story/01-cad.webp` | Generative 3D CAD wireframe hologram simulating 4,200 iterations |
| `30-clean.png` | `02-loom` | `public/story/02-loom.webp` | High-speed automated Kevlar loom weaving upper with flying sparks |
| `17-clean.png` | `03-fusion` | `public/story/03-fusion.webp` | Robotic nitrogen gas injection into midsole mould in cryogenic lab |
| `27-clean.png` | `04-finish` | `public/story/04-finish.webp` | Master craftsman airbrushing and distress-finishing the sole by hand |
| `29-clean.png` | `05-vault` | `public/story/05-vault.webp` | White-gloved vault boxing with inside lid featuring "//" mark |
| `16-clean.png` | `box` | `public/vault/box.webp` | Collector box marked "CODENAME: A//EX" with acrylic display case |

---

## 7. Generated & Code-Created Brand Assets

1. **Brand Wordmark SVG** (`public/assets/logo.svg`):
   - Typeface: Unbounded 800 uppercase
   - Accent mark: Dual slanted Volt bars (`//`) in `#C8F52E`
2. **Brand Icon Mark SVG** (`public/assets/logo-mark.svg` & `public/favicon.svg`):
   - Dual slanted Volt bars (`//`) on Obsidian rounded square
3. **Favicon ICO** (`public/favicon.ico`):
   - Multi-resolution ICO container generated from the dual volt bars
4. **OpenGraph Social Preview** (`public/assets/og-image.webp`):
   - 1200 × 630 px composite combining Hero frame, brand typography, technical crosshairs, and drop announcement
5. **Macro Detail Crops** (`public/assets/crops/{heel,mesh,sole-edge}.webp`):
   - Extracted directly from 2.7K Cyber Neon source image for product gallery inspection loupe

---

## 8. Brand Safety Audit Summary

- **Nike Trademarks / Swooshes**: 0 instances detected across 36 assets and 119 frames.
- **Third-Party Names (`M / TOKYO`, `VLT`, `8K CARBON`, `BK`)**: 0 instances.
- **Cleats / Studs**: Outsoles are street herringbone and multi-directional lugs, 0 athletic cleats.
- **In-World Technical Nomenclature Verified**:
  - Box: "CODENAME: A//EX" (Permitted)
  - Tag: "CYBER-SEC // AUTHENTICATED" (Permitted)
  - Straps: "UNIT-7 / TACTICAL SNEAKER SYSTEM" (Permitted)
  - Webbing: "PT-N-GRY-BLK-0041" (Permitted)
  - Heel counter: "TPU-REINFORCED // STABILITY SYSTEM" (Permitted)
