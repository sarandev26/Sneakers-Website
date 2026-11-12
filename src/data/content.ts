export const DROP_AT = "2026-10-31T19:00:00+05:30";
export const SHIPS_FROM = "7 Nov 2026";
export const BRAND_NAME = "AERO-SLATE";
export const MODEL_NAME = "A//EX Zero-G";
export const DROP_NAME = "ZERO-G DROP 01";
export const FOOTNOTE = "AERO-SLATE A//EX — ZERO-G DROP 01. Engineered for ultimate pavement performance.";

export interface Colourway {
  id: string;
  name: string;
  headlineAccent: string;
  tagline: string;
  price: number;
  edition: number;
  stockLeft: number;
  primaryAccent: string;
  secondaryAccent?: string;
  shoeImg: string;
  specs: {
    upper: string;
    sole: string;
    heelTab: string;
    edition: string;
    stock: string;
  };
}

// 4 core colorways, all using the same normalized primary shoe model
export const COLOURWAYS: Colourway[] = [
  {
    id: "neon",
    name: "CYBER NEON",
    headlineAccent: "orbital",
    tagline: "Volt on black. The flagship zero-gravity chassis.",
    price: 15999,
    edition: 500,
    stockLeft: 112,
    primaryAccent: "#C8F52E",
    secondaryAccent: "#43C071",
    shoeImg: "/assets/shoes/neon.webp",
    specs: {
      upper: "Kevlar-blend knit with volt underlay",
      sole: "Nitrogen foam with volt air pod",
      heelTab: "High-visibility molded volt TPU",
      edition: "Batch 01 of 500 numbered",
      stock: "112 pairs remaining in vault",
    },
  },
  {
    id: "infrared",
    name: "INFRARED",
    headlineAccent: "thermal",
    tagline: "Red sole, blacked-out upper.",
    price: 15999,
    edition: 500,
    stockLeft: 86,
    primaryAccent: "#E0343B",
    shoeImg: "/assets/shoes/neon.webp",
    specs: {
      upper: "Stealth matte carbon mesh",
      sole: "Molten infrared dual-density sole",
      heelTab: "Crimson reinforced cage loop",
      edition: "Batch 01 of 500 numbered",
      stock: "86 pairs remaining in vault",
    },
  },
  {
    id: "triple-black",
    name: "TRIPLE BLACK",
    headlineAccent: "stealth",
    tagline: "Total blackout. Zero noise.",
    price: 15999,
    edition: 500,
    stockLeft: 203,
    primaryAccent: "#EDEEE9",
    shoeImg: "/assets/shoes/neon.webp",
    specs: {
      upper: "Triple-density black ballistic knit",
      sole: "Blackout nitrogen injection unit",
      heelTab: "Matte graphite stability bracket",
      edition: "Batch 01 of 500 numbered",
      stock: "203 pairs remaining in vault",
    },
  },
  {
    id: "chrome",
    name: "LIQUID CHROME",
    headlineAccent: "mercury",
    tagline: "Mirror-plated accents. Limited batch.",
    price: 15999,
    edition: 250,
    stockLeft: 41,
    primaryAccent: "#BCC5D9",
    secondaryAccent: "#C8F52E",
    shoeImg: "/assets/shoes/neon.webp",
    specs: {
      upper: "Mirror electroplated vacuum cage",
      sole: "High-gloss chrome accent rim",
      heelTab: "Volt loop with chrome spine",
      edition: "Ultra-limited batch of 250",
      stock: "41 pairs remaining in vault",
    },
  },
];

export interface ShoeSize {
  uk: number;
  eu: number;
  cm: number;
  status: "in-stock" | "low-stock" | "sold-out";
}

export const SIZES: ShoeSize[] = [
  { uk: 6, eu: 40, cm: 24.5, status: "in-stock" },
  { uk: 7, eu: 41, cm: 25.4, status: "in-stock" },
  { uk: 8, eu: 42, cm: 26.2, status: "low-stock" },
  { uk: 9, eu: 43, cm: 27.1, status: "in-stock" },
  { uk: 10, eu: 44, cm: 27.9, status: "low-stock" },
  { uk: 11, eu: 45, cm: 28.8, status: "sold-out" },
  { uk: 12, eu: 46, cm: 29.7, status: "in-stock" },
];

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  tag: string;
  image: string;
}

export const ADD_ONS: AddOn[] = [
  {
    id: "care-kit",
    name: "Care Kit",
    price: 1299,
    description: "Foam cleaner, hog-bristle brush, microfibre cloth.",
    tag: "MAINTENANCE",
    image: "/parts/foam.webp",
  },
  {
    id: "spare-laces",
    name: "Spare Lace Set",
    price: 799,
    description: "2 pairs: Reflective silver cord + Neon Kevlar rope with metal aglets.",
    tag: "CUSTOMIZE",
    image: "/parts/laces.webp",
  },
  {
    id: "vault-upgrade",
    name: "Vault Box Upgrade",
    price: 2499,
    description: "Magnetic collector box, UV-filtering acrylic display case, numbered certificate.",
    tag: "FLAGSHIP",
    image: "/vault/box.webp",
  },
  {
    id: "shoe-trees",
    name: "Cedar Shoe Trees",
    price: 1199,
    description: "Solid aromatic cedar trees to preserve toe-box shape and absorb moisture.",
    tag: "SHAPE CARE",
    image: "/parts/insole.webp",
  },
];

export const TECHNICAL_SPECS = [
  { label: "Upper Construction", value: "Kevlar-blend 3-zone engineered knit" },
  { label: "Midsole Unit", value: "Nitrogen-infused supercritical foam + lime air capsule" },
  { label: "Outsole Traction", value: "Carbon-rubber multi-directional street lug" },
  { label: "Net Weight", value: "298 g (UK 8 single shoe)" },
  { label: "Heel-to-Toe Drop", value: "8 mm zero-strain biomechanical taper" },
  { label: "Closure Mechanism", value: "Titanium quick-lock single-hand lace system" },
  { label: "Insole System", value: "Clear viscoelastic arch-mapped gel insole" },
];

export const REVIEWS = [
  {
    name: "Aarav M.",
    city: "Bengaluru",
    rating: 5,
    quote: "Zero break-in required. The nitrogen foam rebound makes 15,000 steps feel effortless.",
    verified: "Batch 01 #0042",
  },
  {
    name: "Diya S.",
    city: "Mumbai",
    rating: 5,
    quote: "Unreal pavement grip on wet asphalt. The silhouette turns heads across Bandra.",
    verified: "Batch 01 #0109",
  },
  {
    name: "Karthik R.",
    city: "Chennai",
    rating: 5,
    quote: "The engineered Kevlar knit breathes perfectly in humidity. Build quality is top-tier.",
    verified: "Batch 01 #0211",
  },
  {
    name: "Ishaan K.",
    city: "Delhi",
    rating: 5,
    quote: "Unmatched street aesthetic and featherlight comfort. Hands down the best drop of 2026.",
    verified: "Batch 01 #0088",
  },
  {
    name: "Meera P.",
    city: "Hyderabad",
    rating: 5,
    quote: "Molded arch support locked my feet in perfectly. Zero fatigue after all-day wear.",
    verified: "Batch 01 #0345",
  },
  {
    name: "Rohan T.",
    city: "Pune",
    rating: 5,
    quote: "The one-hand lace lock is genius engineering. Snug lockdown without any pinching.",
    verified: "Batch 01 #0176",
  },
];

// Single-line concise Q&A for clean typography
export const FAQS = [
  {
    question: "How does A//EX sizing fit?",
    answer: "Runs true to standard UK sneaker sizing; order your regular sports shoe size.",
  },
  {
    question: "Are all pairs authentic and numbered?",
    answer: "Guaranteed 100% authentic with an embedded NFC chip and numbered certificate.",
  },
  {
    question: "What is delivery timeline across India?",
    answer: "Dispatched in 24 hours with express 2–4 day delivery to all major Indian cities.",
  },
  {
    question: "What is your return or exchange policy?",
    answer: "7-day unworn size exchange guarantee with complimentary doorstep reverse pickup.",
  },
  {
    question: "Are zero-interest EMI options available?",
    answer: "Yes, 3, 6, and 12-month zero-cost EMI available at checkout with all major banks.",
  },
  {
    question: "When does Drop 01 officially open?",
    answer: "Batch 01 opens October 31, 2026 at 7:00 PM IST, restricted to 500 numbered pairs.",
  },
];

export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}
