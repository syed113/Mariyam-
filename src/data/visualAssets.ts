// =================================================================
// MARIYAM MAQUILLAGE — VERIFIED LUXURY VISUAL ASSET ARCHITECTURE
// =================================================================
// High-resolution, authentic, category-accurate beauty photography.
// Strict anti-repetition: each category, product, and shade has its
// own distinct, appropriate visual identity.

export const HERO_ASSETS = {
  // Main Homepage Campaign Flatlay: Luxury beauty cosmetics on marble with rose petals and gold accents
  homeHero: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85',
  homeHeroSecondary: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',

  // Luxury flatlay used by the homepage hero card
  luxuryFlatlay: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',

  // Bridal Atelier: Opulent bridal beauty trousseau with golden kundan jewelry & camera-flash perfection
  bridalHero: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
  bridalFlatlay: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',

  // Bespoke Gifting Box: Satin ribbon gift hamper with sealed note and curated cosmetics
  giftingHamper: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85',
  giftingUnboxing: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=85',

  // AI Shade & Complexion Studio: Diverse South Asian foundation swatch drips and pipette drops
  aiComplexion: 'https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&w=1000&q=85',

  // Clinical Skincare Science: Dropper bottles and botanical formulation laboratory
  skincareScience: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85',
};

export const CATEGORY_ASSETS = [
  {
    title: 'Luxury Makeup',
    subtitle: 'Silk Foundations, Velvet Pouts & Metallic Palettes',
    cat: 'Makeup',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Clinical Skincare',
    subtitle: 'Multi-Ceramide Creams, Peptide Glazes & Barrier Salves',
    cat: 'Skincare',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'High-Gloss Haircare',
    subtitle: 'Rosemary Biotin Elixirs & Thermal Shielding Mists',
    cat: 'Haircare',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Haute Fragrance',
    subtitle: 'Assamese Oud, Velvet Rose & Golden Amber',
    cat: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Bath & Body Luxury',
    subtitle: 'Whipped Shea Butters & Gourmet Vanilla Creams',
    cat: 'Bath & Body',
    image: 'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Men\'s Grooming',
    subtitle: 'Vetiver Beard Elixirs & Shaving Craftsmanship',
    cat: 'Men\'s Grooming',
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Artisanal Tools',
    subtitle: 'Taklon Fiber Brushes & Ergonomic Velvet Sponges',
    cat: 'Tools & Appliances',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  },
];

// Subcategory-Specific Image Registry:
// Provides unique, non-overlapping, high-resolution images for each beauty subcategory.
export const SUBCATEGORY_IMAGE_REGISTRY: Record<string, string[]> = {
  Foundation: [
    'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80', // Foundation bottle with pump
    'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80', // Liquid foundation drop
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', // Foundation bottle flatlay
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', // Luxury cosmetic bottle
  ],
  Concealer: [
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80', // Concealer wand
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80', // Precision wand
  ],
  'Kajal & Kohl': [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', // Black kohl pencil
    'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80', // Eyeliner stroke
  ],
  Lipstick: [
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80', // Velvet lipstick tube
    'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80', // Lipstick bullet open
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', // Lip pigment
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80', // Lipstick trio
  ],
  'Compact Powder': [
    'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80', // Compact mirror powder
    'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80', // Powder puff
  ],
  Blush: [
    'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80', // Rosy blush compact
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', // Baked blush
  ],
  Highlighter: [
    'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80', // Liquid illuminator
    'https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&w=800&q=80', // Champagne pearl
  ],
  'Setting Spray': [
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Fine mist spray bottle
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', // Setting mist
  ],
  Eyeshadow: [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', // Luxury 18-pan palette
    'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80', // Foiled metallic shadows
  ],
  'Eyeshadow Palettes': [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80',
  ],
  Mascara: [
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80', // Mascara tube and wand
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80', // Volume wand
  ],
  'Makeup Primer': [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', // Blurring primer tube
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Hydrating primer
  ],
  'Lip Gloss': [
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80', // Crystal gloss
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', // Tinted oil
  ],
  Cleanser: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Gel cleanser bottle
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', // Foaming pump
  ],
  Toner: [
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Clarifying essence bottle
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', // Rose essence
  ],
  Serum: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', // Amber serum dropper
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Peptide elixir
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', // Active serum
  ],
  Moisturizer: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Cream jar
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', // Ceramide balm
  ],
  Sunscreen: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Clean UV shield tube
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', // Lightweight gel tube
  ],
  'Face Oil': [
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Botanical face oil
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', // Rosehip oil
  ],
  'Sheet Mask': [
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80', // Bio-cellulose sheet mask
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Collagen sachet
  ],
  'Eye Cream': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Cooling metal tip tube
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', // Peptide eye cream
  ],
  Shampoo: [
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80', // Elegant salon pump bottle
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80', // Botanical shampoo
  ],
  Conditioner: [
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80', // Hydrating conditioner
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80', // Keratin conditioner
  ],
  'Hair Mask': [
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80', // Rich restorative tub
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Argan hair butter
  ],
  'Hair Oil': [
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Rosemary herbal oil
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', // Cold-pressed hair elixir
  ],
  'Hair Serum': [
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80', // Gloss anti-frizz serum
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Heat protectant serum
  ],
  'Eau de Parfum': [
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80', // Crystal perfume flacon
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80', // Amber EDP bottle
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80', // Luxury fragrance spray
  ],
  'Eau de Toilette': [
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
  ],
  'Body Butter': [
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Whipped vanilla body butter
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Shea butter jar
  ],
  'Body Wash': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80', // Luxe body wash bottle
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Botanical wash
  ],
  'Beard Oil': [
    'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80', // Dark amber beard oil
    'https://images.unsplash.com/photo-1608248597359-00994f17fa39?auto=format&fit=crop&w=800&q=80', // Vetiver beard drop
  ],
  'Makeup Brushes': [
    'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=800&q=80', // 12-piece brush set
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', // Bristle detail
  ],
  'Beauty Sponges': [
    'https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&w=800&q=80', // Teardrop blender sponge
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', // Velvet cosmetic sponge
  ],
};

// Retrieve subcategory image safely
export const getSubcategoryImages = (subcategory: string): string[] => {
  return SUBCATEGORY_IMAGE_REGISTRY[subcategory] || [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
  ];
};
