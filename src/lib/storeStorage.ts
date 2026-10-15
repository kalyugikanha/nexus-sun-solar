import { Product, Order, StoreSettings, AnalyticsSummary } from '@/types/store';

// Modern SVG Data URIs for store products to render crisp, branded visuals
export const PRODUCT_IMAGE_SVG = {
  poleKit: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f0f7fc"/>
          <stop offset="100%" stop-color="#dbeafe"/>
        </linearGradient>
        <linearGradient id="pole" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#94a3b8"/>
          <stop offset="50%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#64748b"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bg)"/>
      <!-- Solar Panel Background Elements -->
      <polygon points="40,280 200,200 360,280 200,360" fill="#1e3a8a" opacity="0.15"/>
      <!-- Pole -->
      <line x1="80" y1="340" x2="280" y2="80" stroke="url(#pole)" stroke-width="14" stroke-linecap="round"/>
      <line x1="90" y1="327" x2="290" y2="67" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>
      <!-- Brush Head -->
      <rect x="250" y="45" width="90" height="35" rx="8" transform="rotate(-35 295 62)" fill="#275b82"/>
      <!-- Bristles -->
      <path d="M 230,55 L 255,20 M 245,65 L 270,30 M 260,75 L 285,40 M 275,85 L 300,50 M 290,95 L 315,60 M 305,105 L 330,70" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <!-- Water Jets -->
      <circle cx="280" cy="30" r="5" fill="#38bdf8"/>
      <circle cx="295" cy="20" r="4" fill="#38bdf8"/>
      <circle cx="310" cy="15" r="3" fill="#38bdf8"/>
      <!-- Badge icon -->
      <circle cx="80" cy="80" r="32" fill="#275b82"/>
      <path d="M 68,80 L 76,88 L 94,70" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  `)}`,
  brushHead: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#f8fafc"/>
      <circle cx="200" cy="200" r="140" fill="#e0f2fe" opacity="0.6"/>
      <!-- Brush Body -->
      <rect x="100" y="160" width="200" height="50" rx="12" fill="#275b82"/>
      <!-- Brass connector -->
      <rect x="180" y="210" width="40" height="30" rx="4" fill="#f59e0b"/>
      <rect x="188" y="240" width="24" height="25" rx="3" fill="#d97706"/>
      <!-- Bristles Top -->
      <path d="M 110,160 L 110,100 M 130,160 L 130,95 M 150,160 L 150,90 M 170,160 L 170,90 M 190,160 L 190,85 M 210,160 L 210,85 M 230,160 L 230,90 M 250,160 L 250,90 M 270,160 L 270,95 M 290,160 L 290,100" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
      <!-- Water Droplets -->
      <path d="M 200,60 C 190,75 190,85 200,85 C 210,85 210,75 200,60 Z" fill="#0284c7"/>
      <path d="M 150,70 C 142,82 142,90 150,90 C 158,90 158,82 150,70 Z" fill="#38bdf8"/>
      <path d="M 250,70 C 242,82 242,90 250,90 C 258,90 258,82 250,70 Z" fill="#38bdf8"/>
    </svg>
  `)}`,
  cleaningLiquid: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#f0fdf4"/>
      <circle cx="200" cy="200" r="140" fill="#dcfce7" opacity="0.7"/>
      <!-- Canister Body -->
      <path d="M 130,160 L 130,330 C 130,345 140,355 155,355 L 245,355 C 260,355 270,345 270,330 L 270,160 C 270,140 250,120 230,120 L 230,85 L 170,85 L 170,120 C 150,120 130,140 130,160 Z" fill="#0284c7"/>
      <!-- Handle -->
      <path d="M 230,130 L 255,130 C 265,130 270,135 270,145 L 270,200 C 270,210 265,215 255,215 L 230,215" fill="none" stroke="#0369a1" stroke-width="12" stroke-linecap="round"/>
      <!-- Cap -->
      <rect x="165" y="65" width="40" height="20" rx="4" fill="#eab308"/>
      <!-- Label -->
      <rect x="145" y="180" width="110" height="110" rx="8" fill="#ffffff"/>
      <circle cx="200" cy="220" r="22" fill="#e0f2fe"/>
      <path d="M 200,208 C 193,218 193,226 200,226 C 207,226 207,218 200,208 Z" fill="#0284c7"/>
      <rect x="160" y="255" width="80" height="6" rx="3" fill="#275b82"/>
      <rect x="170" y="267" width="60" height="5" rx="2.5" fill="#94a3b8"/>
      <!-- Sparkles -->
      <polygon points="310,100 315,115 330,120 315,125 310,140 305,125 290,120 305,115" fill="#f59e0b"/>
      <polygon points="90,170 93,180 103,183 93,187 90,197 87,187 77,183 87,180" fill="#38bdf8"/>
    </svg>
  `)}`,
  drainClips: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#f8fafc"/>
      <!-- Solar Frame Section -->
      <rect x="50" y="240" width="300" height="40" rx="4" fill="#64748b"/>
      <polygon points="50,240 350,240 330,120 70,120" fill="#1e40af" opacity="0.8"/>
      <!-- Grid Lines on Panel -->
      <line x1="135" y1="120" x2="125" y2="240" stroke="#93c5fd" stroke-width="2"/>
      <line x1="200" y1="120" x2="200" y2="240" stroke="#93c5fd" stroke-width="2"/>
      <line x1="265" y1="120" x2="275" y2="240" stroke="#93c5fd" stroke-width="2"/>
      <line x1="60" y1="180" x2="340" y2="180" stroke="#93c5fd" stroke-width="2"/>
      <!-- Water Drain Clips Attached -->
      <!-- Clip 1 -->
      <path d="M 115,225 L 145,225 L 145,270 L 130,285 L 115,270 Z" fill="#275b82" stroke="#ffffff" stroke-width="2"/>
      <path d="M 130,285 L 130,320" stroke="#38bdf8" stroke-width="4" stroke-dasharray="6,4" stroke-linecap="round"/>
      <!-- Clip 2 -->
      <path d="M 255,225 L 285,225 L 285,270 L 270,285 L 255,270 Z" fill="#275b82" stroke="#ffffff" stroke-width="2"/>
      <path d="M 270,285 L 270,320" stroke="#38bdf8" stroke-width="4" stroke-dasharray="6,4" stroke-linecap="round"/>
      <!-- Water Drops exiting -->
      <circle cx="130" cy="335" r="5" fill="#0284c7"/>
      <circle cx="270" cy="335" r="5" fill="#0284c7"/>
    </svg>
  `)}`,
  rotaryBrush: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#fffbeb"/>
      <circle cx="200" cy="200" r="130" fill="#fef3c7" stroke="#fbbf24" stroke-width="3" stroke-dasharray="10,6"/>
      <!-- Central Hub -->
      <circle cx="200" cy="200" r="45" fill="#275b82"/>
      <circle cx="200" cy="200" r="20" fill="#f59e0b"/>
      <!-- Turbine Rotors / Rotating Bristles -->
      <path d="M 200,70 Q 230,130 200,160" stroke="#0284c7" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M 330,200 Q 270,230 240,200" stroke="#0284c7" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M 200,330 Q 170,270 200,240" stroke="#0284c7" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M 70,200 Q 130,170 160,200" stroke="#0284c7" stroke-width="12" stroke-linecap="round" fill="none"/>
      <!-- Rotation arrows -->
      <path d="M 270,120 A 100 100 0 0 1 310,180" stroke="#d97706" stroke-width="4" stroke-linecap="round" fill="none"/>
      <polygon points="310,180 320,165 302,168" fill="#d97706"/>
    </svg>
  `)}`,
  hosePipe: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#f8fafc"/>
      <!-- Coiled Hose -->
      <circle cx="200" cy="200" r="120" fill="none" stroke="#275b82" stroke-width="22" stroke-linecap="round"/>
      <circle cx="200" cy="200" r="90" fill="none" stroke="#0284c7" stroke-width="20" stroke-linecap="round"/>
      <circle cx="200" cy="200" r="60" fill="none" stroke="#38bdf8" stroke-width="18" stroke-linecap="round"/>
      <!-- Brass Quick Coupler End -->
      <rect x="290" y="165" width="35" height="22" rx="4" fill="#f59e0b"/>
      <rect x="325" y="169" width="15" height="14" rx="2" fill="#d97706"/>
      <!-- Other end -->
      <rect x="185" y="125" width="22" height="30" rx="4" fill="#f59e0b"/>
    </svg>
  `)}`,
  masterKit: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <linearGradient id="kitgrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1a3a5c"/>
          <stop offset="100%" stop-color="#275b82"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#f1f5f9"/>
      <!-- Toolkit Box Base -->
      <rect x="60" y="130" width="280" height="210" rx="16" fill="url(#kitgrad)"/>
      <rect x="70" y="140" width="260" height="40" rx="8" fill="#1e293b"/>
      <!-- Clasp & Handle -->
      <rect x="175" y="100" width="50" height="35" rx="6" fill="#eab308"/>
      <rect x="185" y="108" width="30" height="20" rx="4" fill="#f1f5f9"/>
      <circle cx="140" cy="200" r="10" fill="#f59e0b"/>
      <circle cx="260" cy="200" r="10" fill="#f59e0b"/>
      <!-- Pro Badge -->
      <rect x="120" y="240" width="160" height="36" rx="18" fill="#ffffff"/>
      <text x="200" y="264" font-family="sans-serif" font-weight="bold" font-size="14" fill="#275b82" text-anchor="middle">MASTER DIY KIT</text>
      <!-- Sparkle -->
      <polygon points="320,80 324,95 339,99 324,103 320,118 316,103 301,99 316,95" fill="#f59e0b"/>
    </svg>
  `)}`,
  squeegee: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#f8fafc"/>
      <circle cx="200" cy="200" r="130" fill="#eff6ff"/>
      <!-- Squeegee Handle -->
      <line x1="200" y1="200" x2="200" y2="340" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
      <rect x="188" y="290" width="24" height="45" rx="6" fill="#f59e0b"/>
      <!-- Squeegee Blade Holder -->
      <rect x="80" y="170" width="240" height="30" rx="6" fill="#275b82"/>
      <!-- Rubber / Microfiber Edge -->
      <rect x="75" y="155" width="250" height="18" rx="4" fill="#38bdf8"/>
      <!-- Water Droplets wiped -->
      <path d="M 120,135 Q 120,145 130,145 Q 140,145 140,135 Q 130,120 120,135 Z" fill="#0284c7"/>
      <path d="M 270,130 Q 270,140 280,140 Q 290,140 290,130 Q 280,115 270,130 Z" fill="#0284c7"/>
    </svg>
  `)}`,
  harness: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#fef2f2"/>
      <circle cx="200" cy="200" r="130" fill="#fee2e2"/>
      <!-- Harness Straps -->
      <path d="M 140,100 L 140,280 M 260,100 L 260,280" stroke="#dc2626" stroke-width="16" stroke-linecap="round"/>
      <line x1="130" y1="180" x2="270" y2="180" stroke="#dc2626" stroke-width="16" stroke-linecap="round"/>
      <line x1="120" y1="250" x2="280" y2="250" stroke="#dc2626" stroke-width="16" stroke-linecap="round"/>
      <!-- Alloy Carabiner Ring -->
      <circle cx="200" cy="180" r="24" fill="none" stroke="#f59e0b" stroke-width="8"/>
      <!-- Shield Check Icon -->
      <polygon points="200,90 230,105 230,145 200,165 170,145 170,105" fill="#16a34a"/>
      <path d="M 188,125 L 196,133 L 212,117" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>
  `)}`,
};

// Initial Seed Products Catalog matching SunTech Store
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'SunTech Ultra-Reach Telescopic Solar Cleaning Pole Kit (6M / 20FT)',
    slug: 'suntech-telescopic-solar-pole-kit-6m',
    category: 'cleaning-kits',
    categoryName: 'Solar Cleaning Kits',
    price: 4499,
    mrp: 6999,
    discountPercent: 35,
    rating: 4.9,
    reviewCount: 186,
    image: PRODUCT_IMAGE_SVG.poleKit,
    gallery: [PRODUCT_IMAGE_SVG.poleKit, PRODUCT_IMAGE_SVG.brushHead, PRODUCT_IMAGE_SVG.hosePipe],
    shortDescription: 'Professional water-fed 6-meter telescopic pole with dual-jet soft nylon brush and angle adapter. Clean rooftop solar panels safely from ground.',
    description: 'Designed specifically for Indian rooftop solar arrays, the SunTech 6M Telescopic Pole is made from aerospace-grade aluminum alloy, making it extremely lightweight yet rigid under water pressure. The integrated internal water-fed hose feeds directly to the dual brass spray jets on the brush head, ensuring effortless cleaning without scratching delicate ARC glass coatings.',
    features: [
      'Extends smoothly from 1.8M to 6M (20 Feet)',
      'Water-fed internal polyurethane tubing included',
      'Dual brass spray jets for high-velocity rinse',
      '180° adjustable angle adapter for awkward pitch angles',
      'Universal brass garden hose quick-connect adaptor',
      'Non-slip ergonomic thermal grip handle'
    ],
    specifications: {
      'Extended Length': '6.0 Metres (20 Feet)',
      'Retracted Length': '1.8 Metres',
      'Material': 'Aerospace Grade 6063 Aluminum Alloy',
      'Pole Weight': '1.85 kg',
      'Brush Width': '30 cm (12 Inch)',
      'Warranty': '1 Year SunTech Manufacturer Warranty',
      'Compatibility': 'Residential & Commercial On-Grid/Off-Grid Panels'
    },
    whatsInTheBox: [
      '1x 4-Section Telescopic Aluminum Pole (6M)',
      '1x Professional Dual-Jet Solar Brush Head (Soft Bristle)',
      '1x 8M Water-Fed Polyurethane Hose with Fittings',
      '1x Angle Adapter with Tightening Knob',
      '1x Universal Brass Quick Coupler',
      '1x User & Maintenance Manual'
    ],
    inStock: true,
    stockCount: 42,
    badge: 'Best Seller',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'prod-2',
    name: 'SunTech Professional Soft-Bristle Solar Cleaning Brush (Dual Jet)',
    slug: 'suntech-professional-soft-bristle-solar-brush',
    category: 'brushes',
    categoryName: 'Solar Cleaning Brushes',
    price: 1899,
    mrp: 2799,
    discountPercent: 32,
    rating: 4.8,
    reviewCount: 214,
    image: PRODUCT_IMAGE_SVG.brushHead,
    gallery: [PRODUCT_IMAGE_SVG.brushHead, PRODUCT_IMAGE_SVG.poleKit],
    shortDescription: 'Zero-scratch split-tip feathered nylon bristles with built-in dual brass jets for anti-reflective solar glass panels.',
    description: 'Engineered in collaboration with solar maintenance engineers, this brush head features ultra-soft split-filament bristles that trap and lift stubborn bird droppings, mineral scale, and industrial dust without leaving micro-scratches on sensitive panel glass.',
    features: [
      'Feathered split-end bristles protect anti-reflective glass',
      'Twin brass high-pressure mist nozzles',
      'Standard Euro-thread screw fitting',
      'Chemical-resistant polymer core',
      'Lightweight 420g design reduces arm fatigue'
    ],
    specifications: {
      'Brush Head Width': '35 cm',
      'Bristle Material': 'Virgin Split-Tip Polypropylene / Nylon',
      'Jet Material': 'Solid Brass 2.0mm',
      'Thread Type': 'Standard Euro / ACME Thread',
      'Weight': '420 grams',
      'Warranty': '6 Months Replacement Warranty'
    },
    whatsInTheBox: [
      '1x Dual Jet Solar Cleaning Brush Head (35cm)',
      '2x Pre-installed Brass Jet Nozzles',
      '1x Y-Splitter Hose Connector'
    ],
    inStock: true,
    stockCount: 78,
    badge: 'Top Rated',
    createdAt: '2026-01-12T11:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'SunTech Deionized Solar Concentrated Cleaning Liquid (5 Litres)',
    slug: 'suntech-deionized-solar-cleaning-liquid-5l',
    category: 'cleaning-liquids',
    categoryName: 'Cleaning Solutions',
    price: 1299,
    mrp: 1899,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 98,
    image: PRODUCT_IMAGE_SVG.cleaningLiquid,
    gallery: [PRODUCT_IMAGE_SVG.cleaningLiquid],
    shortDescription: 'Anti-static, spot-free rinse formula. Prevents hard water stains, cuts grease, and slows down dust build-up by up to 40%.',
    description: 'Hard water leaves mineral deposits that act like frosted glass, reducing solar generation by up to 20%. SunTech Deionized Solar Cleaning Liquid is a neutral pH, biodegradable concentrate that chelates hard water minerals and leaves an anti-static coating that repels dry airborne dust.',
    features: [
      'High-yield concentrate (1:50 ratio makes 250 Litres)',
      'Non-acidic, pH neutral (safe for aluminum frames & seals)',
      'Anti-static protective shield extends cleaning cycle',
      '100% biodegradable and eco-friendly'
    ],
    specifications: {
      'Volume': '5 Litres Canister',
      'Dilution Ratio': '1:50 (makes 250 Litres of cleaning fluid)',
      'pH Level': '7.0 (Neutral)',
      'Biodegradability': '100% Organic Surfactants',
      'Shelf Life': '24 Months'
    },
    whatsInTheBox: [
      '1x 5L Canister of SunTech Solar Concentrated Formula',
      '1x 50ml Precision Measuring Dispenser Cap'
    ],
    inStock: true,
    stockCount: 65,
    badge: 'Hot Deal',
    createdAt: '2026-01-15T09:30:00Z',
  },
  {
    id: 'prod-4',
    name: 'SunTech Solar Panel Water Drainage & Sludge Clips (Pack of 20)',
    slug: 'suntech-drainage-sludge-clips-pack-20',
    category: 'drain-clips',
    categoryName: 'Drainage Clips',
    price: 799,
    mrp: 1299,
    discountPercent: 38,
    rating: 4.7,
    reviewCount: 310,
    image: PRODUCT_IMAGE_SVG.drainClips,
    gallery: [PRODUCT_IMAGE_SVG.drainClips],
    shortDescription: 'Patented capillary siphon clips that automatically drain dirty stagnant water from bottom panel frames, preventing mud bands.',
    description: 'When rain or dew condenses on solar panels, water pools at the bottom frame, forming an opaque sludge line that blocks bottom cells and causes hot spots. SunTech Drainage Clips use capillary siphoning to guide water over the aluminum lip, keeping bottom cells completely clear.',
    features: [
      'Capillary action drains pooling water automatically',
      'Eliminates bottom sludge belts and hotspot damage',
      'Boosts overall array efficiency by 4% to 11%',
      'Weatherproof UV-resistant polymer rated for 15+ years',
      'Tool-free snap-on installation in 10 seconds'
    ],
    specifications: {
      'Pack Size': '20 Pieces',
      'Frame Thickness': 'Compatible with 30mm and 35mm frames',
      'Material': 'High-Density UV-Stabilized Polymer',
      'Lifespan': '15+ Years Outdoors',
      'Color': 'Industrial Slate Grey / Black'
    },
    whatsInTheBox: [
      '20x SunTech Self-Draining Capillary Solar Clips',
      '1x Installation Guide Sheet'
    ],
    inStock: true,
    stockCount: 150,
    badge: 'Best Seller',
    createdAt: '2026-01-18T14:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'SunTech Solar Panel Water Drainage Clips (Pack of 50 - Commercial)',
    slug: 'suntech-drainage-sludge-clips-pack-50',
    category: 'drain-clips',
    categoryName: 'Drainage Clips',
    price: 1699,
    mrp: 2699,
    discountPercent: 37,
    rating: 4.8,
    reviewCount: 145,
    image: PRODUCT_IMAGE_SVG.drainClips,
    gallery: [PRODUCT_IMAGE_SVG.drainClips],
    shortDescription: 'Bulk pack for commercial rooftops, factories, and solar parks. Protects up to 25 large commercial panels.',
    description: 'Ideal for industrial solar installations, apartments, and solar EPC contractors. Installing 2 clips per panel ensures clean drainage across monsoon and winter dew cycles, eliminating manual squeegeeing of bottom edges.',
    features: [
      'Bulk savings for 10kW to 25kW rooftop installations',
      'Prevents PID (Potential Induced Degradation) from bottom shading',
      'Engineered for 35mm and 40mm heavy commercial panel frames',
      'Flame retardant UL94-V0 rated compound'
    ],
    specifications: {
      'Pack Size': '50 Pieces',
      'Frame Compatibility': '30mm / 35mm / 40mm Frames',
      'Material': 'UV-Resistant Polycarbonate Composite',
      'Warranty': '5 Years Weatherproof Guarantee'
    },
    whatsInTheBox: [
      '50x SunTech Commercial Drain Clips',
      '1x Frame Sizing Gauge Tool'
    ],
    inStock: true,
    stockCount: 90,
    badge: 'Featured',
    createdAt: '2026-01-20T16:00:00Z',
  },
  {
    id: 'prod-6',
    name: 'SunTech 360° Rotary Water-Powered Solar Cleaning Brush',
    slug: 'suntech-rotary-water-powered-solar-brush',
    category: 'brushes',
    categoryName: 'Solar Cleaning Brushes',
    price: 3299,
    mrp: 4999,
    discountPercent: 34,
    rating: 4.8,
    reviewCount: 89,
    image: PRODUCT_IMAGE_SVG.rotaryBrush,
    gallery: [PRODUCT_IMAGE_SVG.rotaryBrush, PRODUCT_IMAGE_SVG.brushHead],
    shortDescription: 'Water-turbine powered dual rotating head. Cleans 3x faster with zero electricity, effortless scrubbing.',
    description: 'Harness the kinetic pressure of your water hose to rotate two counter-revolving microfiber disc pads. Removes stubborn dried bird droppings and baked-in highway smog in a single pass without manual scrubbing pressure.',
    features: [
      'Hydro-powered internal gear drive — zero batteries or power cables',
      'Dual counter-rotating heads eliminate pole drag',
      'Removable microfiber pads (machine washable)',
      'Compatible with standard SunTech poles'
    ],
    specifications: {
      'Operating Pressure': '2.0 to 6.0 Bar',
      'Rotation Speed': 'Up to 240 RPM',
      'Cleaning Width': '32 cm',
      'Weight': '920 grams',
      'Warranty': '1 Year SunTech Warranty'
    },
    whatsInTheBox: [
      '1x Rotary Water Turbine Head Assembly',
      '2x Reusable High-Pile Microfiber Cleaning Discs',
      '1x Quick Coupler Adapter'
    ],
    inStock: true,
    stockCount: 35,
    badge: 'New Arrival',
    createdAt: '2026-02-01T12:00:00Z',
  },
  {
    id: 'prod-7',
    name: 'SunTech High-Pressure Braided Water Hose (20 Metres with Brass Couplers)',
    slug: 'suntech-high-pressure-braided-hose-20m',
    category: 'accessories',
    categoryName: 'Solar Accessories & Tools',
    price: 1199,
    mrp: 1799,
    discountPercent: 33,
    rating: 4.6,
    reviewCount: 122,
    image: PRODUCT_IMAGE_SVG.hosePipe,
    gallery: [PRODUCT_IMAGE_SVG.hosePipe],
    shortDescription: '3-layer anti-kink reinforced rooftop water hose with leakproof solid brass quick connectors.',
    description: 'Standard garden hoses burst or kink under hot rooftop conditions. SunTech braided hose features UV-resistant outer PVC with high-tensile polyester braid reinforcement, handling up to 15 bar burst pressure while remaining flexible.',
    features: [
      'Heavy-duty 20-meter length easily reaches rooftop arrays',
      'Solid brass leak-proof quick couplers pre-attached',
      'Withstands rooftop heat up to 70°C without softening',
      'Anti-kink internal ribbing ensures uninterrupted flow'
    ],
    specifications: {
      'Hose Length': '20 Metres (65 Feet)',
      'Diameter': '1/2 Inch (12.7mm)',
      'Burst Pressure': '15 Bar (220 PSI)',
      'Fittings': 'Solid Brass Quick-Click Male & Female Couplers'
    },
    whatsInTheBox: [
      '1x 20M Braided Solar Cleaning Hose',
      '2x Heavy-Duty Brass Quick-Lock Couplers',
      '1x 3/4" Tap Adapter'
    ],
    inStock: true,
    stockCount: 60,
    badge: 'Top Rated',
    createdAt: '2026-02-05T08:00:00Z',
  },
  {
    id: 'prod-8',
    name: 'SunTech Complete DIY Rooftop Solar Cleaning Master Kit',
    slug: 'suntech-complete-diy-solar-cleaning-master-kit',
    category: 'cleaning-kits',
    categoryName: 'Solar Cleaning Kits',
    price: 6999,
    mrp: 9999,
    discountPercent: 30,
    rating: 5.0,
    reviewCount: 240,
    image: PRODUCT_IMAGE_SVG.masterKit,
    gallery: [PRODUCT_IMAGE_SVG.masterKit, PRODUCT_IMAGE_SVG.poleKit, PRODUCT_IMAGE_SVG.cleaningLiquid, PRODUCT_IMAGE_SVG.drainClips],
    shortDescription: 'All-in-one ultimate rooftop setup: 6M Telescopic Pole + Dual Jet Brush + 5L Liquid + 20 Drain Clips + 20M Hose + Squeegee.',
    description: 'The definitive care package for every solar rooftop owner. Contains every tool, chemical, and accessory developed by SunTech over 11 years of professional solar maintenance. Keep your solar plant operating at peak efficiency year-round and save ₹15,000+ on professional cleaning charges.',
    features: [
      'Complete end-to-end solar cleaning solution',
      'Saves over ₹3,000 compared to buying components individually',
      'Includes enough cleaning concentrate for 2 years of maintenance',
      'Guaranteed safe on all monocrystalline and polycrystalline panels'
    ],
    specifications: {
      'Package Weight': '6.4 kg',
      'Included Pole': '6M Aerospace Aluminum Telescopic Pole',
      'Included Liquid': '5L Deionized Concentrate (1:50)',
      'Included Accessories': '20x Clips, 20M Hose, Brush, Squeegee',
      'Warranty': '2 Years Extended SunTech Warranty'
    },
    whatsInTheBox: [
      '1x 6M Telescopic Aluminum Pole',
      '1x Dual Jet Soft-Bristle Brush Head',
      '1x 5L Deionized Solar Concentrate',
      '20x Water Drainage & Sludge Clips',
      '1x 20M Braided High-Pressure Hose with Brass Couplers',
      '1x 45cm Streak-Free Squeegee Wiper',
      '1x Heavy-Duty Canvas Storage Bag'
    ],
    inStock: true,
    stockCount: 24,
    badge: 'Best Seller',
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'prod-9',
    name: 'SunTech Deionized Solar Concentrated Cleaning Liquid (1 Litre Trial Pack)',
    slug: 'suntech-deionized-solar-cleaning-liquid-1l',
    category: 'cleaning-liquids',
    categoryName: 'Cleaning Solutions',
    price: 399,
    mrp: 599,
    discountPercent: 33,
    rating: 4.7,
    reviewCount: 74,
    image: PRODUCT_IMAGE_SVG.cleaningLiquid,
    gallery: [PRODUCT_IMAGE_SVG.cleaningLiquid],
    shortDescription: 'Trial 1-litre bottle. Dilutes to make 50 litres of anti-static spotless solar cleaning solution.',
    description: 'Perfect for small 2kW to 5kW residential rooftop installations. Try SunTech proprietary anti-static rinse formula and see the dramatic difference in solar generation.',
    features: [
      'Makes 50 Litres of cleaning solution',
      'Leaves zero water spots or streaks',
      'Restores solar reflection transparency',
      'Safe on inverter gaskets and anodized aluminum'
    ],
    specifications: {
      'Volume': '1 Litre',
      'Dilution': '1:50',
      'Shelf Life': '24 Months',
      'Country of Origin': 'India'
    },
    whatsInTheBox: ['1x 1L SunTech Concentrated Bottle with Dosing Cap'],
    inStock: true,
    stockCount: 110,
    createdAt: '2026-02-14T09:00:00Z',
  },
  {
    id: 'prod-10',
    name: 'SunTech Microfiber Solar Panel Drying & Squeegee Wiper (45cm)',
    slug: 'suntech-microfiber-solar-squeegee-wiper-45cm',
    category: 'accessories',
    categoryName: 'Solar Accessories & Tools',
    price: 649,
    mrp: 999,
    discountPercent: 35,
    rating: 4.6,
    reviewCount: 88,
    image: PRODUCT_IMAGE_SVG.squeegee,
    gallery: [PRODUCT_IMAGE_SVG.squeegee],
    shortDescription: 'Dual-action 45cm silicone squeegee blade with absorbent microfiber drying pad for crystal-clear finish.',
    description: 'Wipe down residual water droplets after washing to prevent dust adhering to wet glass. Features a medical-grade silicone blade that will not harden under intense solar ultraviolet exposure.',
    features: [
      'Dual-sided: plush microfiber washer + silicone drying blade',
      'Rotates 180° for hard-to-reach panel angles',
      'Attaches to all standard SunTech telescopic poles'
    ],
    specifications: {
      'Blade Width': '45 cm (18 Inch)',
      'Blade Material': 'High-Elasticity Silicone Rubber',
      'Pad Material': 'Ultra-Absorbent Microfiber',
      'Weight': '290g'
    },
    whatsInTheBox: [
      '1x 45cm Solar Squeegee Head with Silicone Blade',
      '1x Removable Microfiber Washer Sleeve'
    ],
    inStock: true,
    stockCount: 45,
    createdAt: '2026-02-16T11:00:00Z',
  },
  {
    id: 'prod-11',
    name: 'SunTech Professional Rooftop Safety Harness & Anchor Rope Kit',
    slug: 'suntech-rooftop-safety-harness-kit',
    category: 'accessories',
    categoryName: 'Solar Accessories & Tools',
    price: 2499,
    mrp: 3899,
    discountPercent: 35,
    rating: 4.9,
    reviewCount: 67,
    image: PRODUCT_IMAGE_SVG.harness,
    gallery: [PRODUCT_IMAGE_SVG.harness],
    shortDescription: 'CE-certified full body safety harness with 15-meter kernmantle lifeline rope and steel carabiners for roof safety.',
    description: 'Safety first: rooftop solar maintenance requires reliable fall-protection equipment. Tested to withstand up to 22 kN breaking load, ensuring maximum safety on steep-pitched tin roofs, tile roofs, and RCC slabs.',
    features: [
      'CE & IS Certified Full Body Harness',
      '15-meter static kernmantle lifeline rope',
      'Double-locking alloy steel carabiners',
      'High-visibility reflective webbing'
    ],
    specifications: {
      'Rope Length': '15 Metres (12mm Diameter)',
      'Breaking Strength': '22 kN (2,200 kg)',
      'Certification': 'EN 361 / IS 3521:1999',
      'Weight Capacity': 'Up to 140 kg User + Equipment'
    },
    whatsInTheBox: [
      '1x Full Body Safety Harness',
      '1x 15M Lifeline Rope with Thimble Eyes',
      '2x Auto-Locking Carabiners',
      '1x High-Vis Carry Pouch'
    ],
    inStock: true,
    stockCount: 28,
    createdAt: '2026-02-18T13:00:00Z',
  },
  {
    id: 'prod-12',
    name: 'SunTech Replacement Brush Head with Dual Nozzle Assembly',
    slug: 'suntech-replacement-brush-head-assembly',
    category: 'spares',
    categoryName: 'Spare Parts & Replacements',
    price: 999,
    mrp: 1499,
    discountPercent: 33,
    rating: 4.7,
    reviewCount: 53,
    image: PRODUCT_IMAGE_SVG.brushHead,
    gallery: [PRODUCT_IMAGE_SVG.brushHead],
    shortDescription: 'Original replacement brush head with brass nozzles for 6M and 9M SunTech telescopic cleaning poles.',
    description: 'Keep your cleaning pole working like brand new with genuine factory replacement brush heads. Includes quick snap brass jets and 8mm push-fit water hose connector.',
    features: [
      'Exact factory fit for SunTech pole series',
      'Pre-installed water jet tubing',
      'Scratch-resistant soft bristles'
    ],
    specifications: {
      'Width': '30 cm',
      'Connector': 'ACME standard thread + 8mm push-fit',
      'Compatibility': 'SunTech 6M, 9M, and 12M Poles'
    },
    whatsInTheBox: [
      '1x Replacement Brush Head',
      '2x Brass Jet Nozzles',
      '1x 8mm T-Push Fitting'
    ],
    inStock: true,
    stockCount: 85,
    createdAt: '2026-02-20T15:00:00Z',
  }
];

// Initial Seed Orders for Realistic Admin Analytics & Order Management
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ST-2026-9841',
    customer: {
      fullName: 'Rajesh Patel',
      email: 'rajesh.patel@gmail.com',
      phone: '+91 98251 44210',
      address: 'B-402, Samruddhi Heights, Near Deep Chambers',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390011',
      notes: 'Please call before delivery. Ring bell twice.'
    },
    items: [
      {
        productId: 'prod-8',
        productName: 'SunTech Complete DIY Rooftop Solar Cleaning Master Kit',
        price: 6999,
        mrp: 9999,
        quantity: 1,
        image: PRODUCT_IMAGE_SVG.masterKit,
        category: 'cleaning-kits'
      }
    ],
    subtotal: 6999,
    discount: 500,
    couponCode: 'SUNTECH10',
    shippingFee: 0,
    tax: 0,
    total: 6499,
    paymentMethod: 'part_payment',
    paymentStatus: 'partially_paid',
    paidAmount: 1950, // 30% upfront
    remainingAmount: 4549, // 70% balance on delivery
    partPaymentPercentage: 30,
    status: 'out_for_delivery',
    courierPartner: 'SunTech Express Fleet',
    trackingNumber: 'ST-EXP-48912',
    estimatedDelivery: 'Today, by 5:00 PM',
    createdAt: '2026-10-14T09:15:00Z',
    updatedAt: '2026-10-15T08:30:00Z',
    timeline: [
      { status: 'pending', title: 'Order Placed', description: 'Order received with 30% advance deposit', timestamp: '2026-10-14 09:15 AM' },
      { status: 'confirmed', title: 'Order Confirmed', description: 'Verified by SunTech operations team', timestamp: '2026-10-14 11:20 AM' },
      { status: 'shipped', title: 'Dispatched', description: 'Handed over to local delivery executive', timestamp: '2026-10-15 06:45 AM' },
      { status: 'out_for_delivery', title: 'Out For Delivery', description: 'Driver Pratik (98244-12345) is on the way', timestamp: '2026-10-15 08:30 AM' }
    ],
    adminNotes: 'Customer verified phone. Balance ₹4,549 to collect in Cash/UPI.'
  },
  {
    id: 'ST-2026-9840',
    customer: {
      fullName: 'Vikramaditya Shah',
      email: 'vikram.shah@solarenergy.in',
      phone: '+91 98980 12345',
      address: 'Plot 18, GIDC Industrial Estate, Makarpura',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390010',
      notes: 'Gate 2 security entrance for factory roof.'
    },
    items: [
      {
        productId: 'prod-5',
        productName: 'SunTech Solar Panel Water Drainage Clips (Pack of 50 - Commercial)',
        price: 1699,
        mrp: 2699,
        quantity: 2,
        image: PRODUCT_IMAGE_SVG.drainClips,
        category: 'drain-clips'
      },
      {
        productId: 'prod-3',
        productName: 'SunTech Deionized Solar Concentrated Cleaning Liquid (5 Litres)',
        price: 1299,
        mrp: 1899,
        quantity: 2,
        image: PRODUCT_IMAGE_SVG.cleaningLiquid,
        category: 'cleaning-liquids'
      }
    ],
    subtotal: 5996,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 5996,
    paymentMethod: 'prepaid',
    paymentStatus: 'paid',
    paidAmount: 5996,
    remainingAmount: 0,
    status: 'delivered',
    courierPartner: 'Delhivery Surface',
    trackingNumber: 'DEL-88492019',
    estimatedDelivery: 'Delivered on Oct 14',
    createdAt: '2026-10-12T14:20:00Z',
    updatedAt: '2026-10-14T16:45:00Z',
    timeline: [
      { status: 'pending', title: 'Order Placed', description: 'Pre-paid via UPI (Razorpay)', timestamp: '2026-10-12 02:20 PM' },
      { status: 'confirmed', title: 'Confirmed & Packed', description: 'Packed at Vadodara Central Hub', timestamp: '2026-10-12 04:00 PM' },
      { status: 'shipped', title: 'Shipped', description: 'In transit via Delhivery', timestamp: '2026-10-13 09:30 AM' },
      { status: 'out_for_delivery', title: 'Out For Delivery', description: 'With courier agent', timestamp: '2026-10-14 11:00 AM' },
      { status: 'delivered', title: 'Delivered', description: 'Signed by Vikramaditya Shah', timestamp: '2026-10-14 04:45 PM' }
    ],
    adminNotes: 'Commercial tax invoice issued. GSTIN provided.'
  },
  {
    id: 'ST-2026-9839',
    customer: {
      fullName: 'Dr. Anita Joshi',
      email: 'anita.joshi@gmail.com',
      phone: '+91 97123 55432',
      address: '74, Alkapuri Society, Near Railway Station',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390007',
    },
    items: [
      {
        productId: 'prod-1',
        productName: 'SunTech Ultra-Reach Telescopic Solar Cleaning Pole Kit (6M / 20FT)',
        price: 4499,
        mrp: 6999,
        quantity: 1,
        image: PRODUCT_IMAGE_SVG.poleKit,
        category: 'cleaning-kits'
      },
      {
        productId: 'prod-4',
        productName: 'SunTech Solar Panel Water Drainage & Sludge Clips (Pack of 20)',
        price: 799,
        mrp: 1299,
        quantity: 1,
        image: PRODUCT_IMAGE_SVG.drainClips,
        category: 'drain-clips'
      }
    ],
    subtotal: 5298,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 5298,
    paymentMethod: 'part_payment',
    paymentStatus: 'partially_paid',
    paidAmount: 1590, // 30% upfront
    remainingAmount: 3708,
    partPaymentPercentage: 30,
    status: 'shipped',
    courierPartner: 'BlueDart Air',
    trackingNumber: 'BD-7731920',
    estimatedDelivery: 'Tomorrow, Oct 16',
    createdAt: '2026-10-14T17:40:00Z',
    updatedAt: '2026-10-15T10:10:00Z',
    timeline: [
      { status: 'pending', title: 'Order Placed', description: 'Part payment authorized', timestamp: '2026-10-14 05:40 PM' },
      { status: 'confirmed', title: 'Confirmed', description: 'Inventory reserved', timestamp: '2026-10-14 06:15 PM' },
      { status: 'shipped', title: 'Shipped', description: 'Departed Vadodara sorting facility', timestamp: '2026-10-15 10:10 AM' }
    ]
  },
  {
    id: 'ST-2026-9838',
    customer: {
      fullName: 'Kiran Desai',
      email: 'kiran.desai@yahoo.com',
      phone: '+91 99042 88710',
      address: '12, Sunrise Bungalows, Vasna Road',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390015',
    },
    items: [
      {
        productId: 'prod-2',
        productName: 'SunTech Professional Soft-Bristle Solar Cleaning Brush (Dual Jet)',
        price: 1899,
        mrp: 2799,
        quantity: 1,
        image: PRODUCT_IMAGE_SVG.brushHead,
        category: 'brushes'
      }
    ],
    subtotal: 1899,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 1899,
    paymentMethod: 'prepaid',
    paymentStatus: 'paid',
    paidAmount: 1899,
    remainingAmount: 0,
    status: 'confirmed',
    courierPartner: 'SunTech Express Fleet',
    estimatedDelivery: 'Oct 17, 2026',
    createdAt: '2026-10-15T08:22:00Z',
    updatedAt: '2026-10-15T09:00:00Z',
    timeline: [
      { status: 'pending', title: 'Order Placed', description: 'Paid in full via NetBanking', timestamp: '2026-10-15 08:22 AM' },
      { status: 'confirmed', title: 'Order Confirmed', description: 'Ready for packaging', timestamp: '2026-10-15 09:00 AM' }
    ]
  },
  {
    id: 'ST-2026-9837',
    customer: {
      fullName: 'Mahesh Solanki',
      email: 'mahesh.solanki@gmail.com',
      phone: '+91 94260 77123',
      address: 'Flat 501, Royal Enclave, Gotri',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390021',
    },
    items: [
      {
        productId: 'prod-4',
        productName: 'SunTech Solar Panel Water Drainage & Sludge Clips (Pack of 20)',
        price: 799,
        mrp: 1299,
        quantity: 1,
        image: PRODUCT_IMAGE_SVG.drainClips,
        category: 'drain-clips'
      }
    ],
    subtotal: 799,
    discount: 0,
    shippingFee: 99,
    tax: 0,
    total: 898,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    paidAmount: 0,
    remainingAmount: 898,
    status: 'pending',
    estimatedDelivery: 'Oct 18, 2026',
    createdAt: '2026-10-15T11:05:00Z',
    updatedAt: '2026-10-15T11:05:00Z',
    timeline: [
      { status: 'pending', title: 'Order Placed', description: 'Cash on delivery requested', timestamp: '2026-10-15 11:05 AM' }
    ]
  },
  {
    id: 'ST-2026-9836',
    customer: {
      fullName: 'Bhavin Mehta',
      email: 'bhavin.mehta@solarpower.com',
      phone: '+91 98250 99882',
      address: 'C-103, Gokul Residency, Manjalpur',
      city: 'Vadodara',
      state: 'Gujarat',
      pincode: '390011',
    },
    items: [
      {
        productId: 'prod-6',
        productName: 'SunTech 360° Rotary Water-Powered Solar Cleaning Brush',
        price: 3299,
        mrp: 4999,
        quantity: 1,
        image: PRODUCT_IMAGE_SVG.rotaryBrush,
        category: 'brushes'
      },
      {
        productId: 'prod-7',
        productName: 'SunTech High-Pressure Braided Water Hose (20 Metres with Brass Couplers)',
        price: 1199,
        mrp: 1799,
        quantity: 1,
        image: PRODUCT_IMAGE_SVG.hosePipe,
        category: 'accessories'
      }
    ],
    subtotal: 4498,
    discount: 0,
    shippingFee: 0,
    tax: 0,
    total: 4498,
    paymentMethod: 'prepaid',
    paymentStatus: 'paid',
    paidAmount: 4498,
    remainingAmount: 0,
    status: 'delivered',
    courierPartner: 'Delhivery Surface',
    trackingNumber: 'DEL-8839001',
    estimatedDelivery: 'Delivered on Oct 11',
    createdAt: '2026-10-09T10:15:00Z',
    updatedAt: '2026-10-11T15:20:00Z',
    timeline: [
      { status: 'pending', title: 'Order Placed', description: 'Full online payment received', timestamp: '2026-10-09 10:15 AM' },
      { status: 'confirmed', title: 'Confirmed', description: 'Order packed', timestamp: '2026-10-09 12:00 PM' },
      { status: 'shipped', title: 'Shipped', description: 'Dispatched via Delhivery', timestamp: '2026-10-10 09:00 AM' },
      { status: 'out_for_delivery', title: 'Out For Delivery', description: 'With delivery rider', timestamp: '2026-10-11 11:30 AM' },
      { status: 'delivered', title: 'Delivered', description: 'Delivered successfully', timestamp: '2026-10-11 03:20 PM' }
    ]
  }
];

// Initial Settings
export const INITIAL_SETTINGS: StoreSettings = {
  allowPartPayment: true,
  minPartPaymentPercentage: 30, // 30% advance deposit by default
  minOrderValueForPartPayment: 500,
  freeShippingThreshold: 999,
  shippingFee: 99,
  storeName: 'SunTech Store',
  supportPhone: '+91 9998546315',
  supportEmail: 'store@suntechapp.com',
  announcement: '⚡ Special Offer: Free Delivery on all orders above ₹999 + Part-payment (30% advance) option available!'
};

const STORAGE_KEYS = {
  PRODUCTS: 'suntech_store_products_v1',
  ORDERS: 'suntech_store_orders_v1',
  SETTINGS: 'suntech_store_settings_v1',
};

function triggerStorageEvent() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('suntech_storage_update'));
  }
}

// ---------------- PRODUCTS REPOSITORY ----------------
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    triggerStorageEvent();
  } catch (e) {
    console.error('Failed to save products', e);
  }
}

export function getProductById(id: string): Product | undefined {
  const products = getStoredProducts();
  return products.find((p) => p.id === id || p.slug === id);
}

export function addProduct(newProduct: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getStoredProducts();
  const product: Product = {
    ...newProduct,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [product, ...products];
  saveProducts(updated);
  return product;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getStoredProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updatedProduct = { ...products[index], ...updates };
  products[index] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
}

export function deleteProduct(id: string): boolean {
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

// ---------------- ORDERS REPOSITORY ----------------
export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    triggerStorageEvent();
  } catch (e) {
    console.error('Failed to save orders', e);
  }
}

export function getOrderById(id: string): Order | undefined {
  const orders = getStoredOrders();
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

export function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>): Order {
  const orders = getStoredOrders();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `ST-2026-${randomSuffix}`;
  const now = new Date().toISOString();
  
  const paymentText =
    orderData.paymentMethod === 'part_payment'
      ? `Part-payment accepted (Paid ₹${orderData.paidAmount}, remaining ₹${orderData.remainingAmount} on delivery)`
      : orderData.paymentMethod === 'prepaid'
      ? `100% Pre-paid online (₹${orderData.total})`
      : `Cash on Delivery (₹${orderData.total})`;

  const newOrder: Order = {
    ...orderData,
    id: orderId,
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        status: 'pending',
        title: 'Order Placed',
        description: paymentText,
        timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
      }
    ]
  };

  const updatedOrders = [newOrder, ...orders];
  saveOrders(updatedOrders);

  // Decrement product stock count
  const products = getStoredProducts();
  const updatedProducts = products.map((prod) => {
    const matched = orderData.items.find((item) => item.productId === prod.id);
    if (matched) {
      const newStock = Math.max(0, prod.stockCount - matched.quantity);
      return { ...prod, stockCount: newStock, inStock: newStock > 0 };
    }
    return prod;
  });
  saveProducts(updatedProducts);

  return newOrder;
}

export function updateOrder(
  orderId: string,
  updates: Partial<Order>,
  statusNote?: string
): Order | null {
  const orders = getStoredOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  const currentOrder = orders[index];
  const now = new Date();
  const timestampStr = now.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const statusTitles: Record<Order['status'], string> = {
    pending: 'Order Placed',
    confirmed: 'Order Confirmed',
    shipped: 'Order Shipped / In Transit',
    out_for_delivery: 'Out For Delivery',
    delivered: 'Order Delivered',
    cancelled: 'Order Cancelled'
  };

  const statusDescriptions: Record<Order['status'], string> = {
    pending: 'Order is under review.',
    confirmed: 'Inventory verified and order is packed for dispatch.',
    shipped: (updates.courierPartner || currentOrder.courierPartner)
      ? `Dispatched via ${updates.courierPartner || currentOrder.courierPartner}. Tracking: ${updates.trackingNumber || currentOrder.trackingNumber || 'N/A'}`
      : 'Handed over to logistics carrier.',
    out_for_delivery: 'Delivery executive is out for delivery to your address.',
    delivered: 'Package successfully delivered and handed over to customer.',
    cancelled: statusNote || 'Order has been cancelled.'
  };

  const newStatus = updates.status ?? currentOrder.status;
  const isStatusChanging = updates.status && updates.status !== currentOrder.status;

  const updatedTimeline = isStatusChanging || statusNote
    ? [
        ...currentOrder.timeline,
        {
          status: newStatus,
          title: statusTitles[newStatus],
          description: statusNote || statusDescriptions[newStatus],
          timestamp: timestampStr,
        }
      ]
    : currentOrder.timeline;

  // Handle payment auto-reconciliation on delivery if not overridden
  let paymentStatus = updates.paymentStatus ?? currentOrder.paymentStatus;
  let paidAmount = updates.paidAmount ?? currentOrder.paidAmount;
  let remainingAmount = updates.remainingAmount ?? currentOrder.remainingAmount;

  if (newStatus === 'delivered' && !updates.paymentStatus) {
    if (currentOrder.paymentMethod === 'part_payment' || currentOrder.paymentMethod === 'cod') {
      paymentStatus = 'paid';
      paidAmount = currentOrder.total;
      remainingAmount = 0;
    }
  }

  // If paymentStatus manually marked as paid without setting amounts
  if (updates.paymentStatus === 'paid' && updates.paidAmount === undefined) {
    paidAmount = currentOrder.total;
    remainingAmount = 0;
  }

  const updatedOrder: Order = {
    ...currentOrder,
    ...updates,
    status: newStatus,
    paymentStatus,
    paidAmount,
    remainingAmount,
    timeline: updatedTimeline,
    updatedAt: now.toISOString(),
  };

  orders[index] = updatedOrder;
  saveOrders(orders);
  return updatedOrder;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: Order['status'],
  note?: string,
  courier?: string,
  trackingNo?: string
): Order | null {
  return updateOrder(
    orderId,
    {
      status: newStatus,
      courierPartner: courier,
      trackingNumber: trackingNo,
    },
    note
  );
}

export function updateOrderDetails(orderId: string, updates: Partial<Order>): Order | null {
  return updateOrder(orderId, updates);
}

// ---------------- STORE SETTINGS ----------------
export function getStoredSettings(): StoreSettings {
  if (typeof window === 'undefined') return INITIAL_SETTINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return { ...INITIAL_SETTINGS, ...JSON.parse(data) };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: StoreSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    triggerStorageEvent();
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

// ---------------- ANALYTICS CALCULATOR ----------------
export function computeAnalytics(orders: Order[]): AnalyticsSummary {
  const totalOrders = orders.length;
  let totalRevenue = 0;
  let pendingOrders = 0;
  let inTransitOrders = 0;
  let deliveredOrders = 0;
  let partPaymentOrdersCount = 0;
  let prepaidOrdersCount = 0;
  let codOrdersCount = 0;
  let dueTodayCount = 0;
  let totalCollected = 0;
  let totalPendingBalance = 0;

  for (const o of orders) {
    if (o.status !== 'cancelled') {
      totalRevenue += o.total;
      totalCollected += o.paidAmount;
      totalPendingBalance += o.remainingAmount;
    }

    if (o.status === 'pending' || o.status === 'confirmed') pendingOrders++;
    else if (o.status === 'shipped' || o.status === 'out_for_delivery') inTransitOrders++;
    else if (o.status === 'delivered') deliveredOrders++;

    if (o.paymentMethod === 'part_payment') partPaymentOrdersCount++;
    else if (o.paymentMethod === 'prepaid') prepaidOrdersCount++;
    else if (o.paymentMethod === 'cod') codOrdersCount++;

    // Check if scheduled for delivery today or out for delivery
    if (
      o.status === 'out_for_delivery' ||
      (o.estimatedDelivery && o.estimatedDelivery.toLowerCase().includes('today'))
    ) {
      dueTodayCount++;
    }
  }

  const validOrders = orders.filter((o) => o.status !== 'cancelled');
  const averageOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
  const cancelledCount = orders.length - validOrders.length;
  const deliverySuccessRate = (deliveredOrders + cancelledCount) > 0
    ? Math.round((deliveredOrders / (deliveredOrders + cancelledCount)) * 100)
    : 100;

  return {
    totalRevenue,
    totalOrders,
    pendingOrders,
    inTransitOrders,
    deliveredOrders,
    averageOrderValue,
    partPaymentOrdersCount,
    prepaidOrdersCount,
    codOrdersCount,
    dueTodayCount,
    deliverySuccessRate: isNaN(deliverySuccessRate) ? 100 : Math.min(100, deliverySuccessRate),
    totalCollected,
    totalPendingBalance,
  };
}
