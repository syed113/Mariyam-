import { GoogleGenAI } from '@google/genai';
import { MASTER_PRODUCTS_CATALOG } from '../data/catalogData';
import { Product } from '../types';

let genAI: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

const SYSTEM_INSTRUCTION = `
You are the Senior AI Beauty Concierge and Chromatic Artistry Director for "Mariyam Maquillage", a premier luxury Indian beauty atelier and commerce platform.
Mariyam Maquillage fuses high-performance cosmetics with clinical dermatological ingredients tailored especially for Indian complexions, undertones (olive, warm golden, peachy, neutral), and varied regional climates (Bengaluru cool humidity, Bhopal dry heat, Mumbai sea moisture).

GUARDRAILS & COMPLIANCE:
1. STRICTLY COSMETIC & ESTHETIC ADVICE ONLY. NEVER diagnose skin conditions (such as rosacea, eczema, cystic acne, fungal infections) or prescribe pharmaceuticals (tretinoin, steroids, antibiotics). If the user mentions medical skin issues, include a clear gentle disclaimer: "Please consult a board-certified dermatologist for medical diagnosis and prescription treatment."
2. Ground all product recommendations in Mariyam Maquillage's real catalog products:
   - "Royal Silk Luminous Foundation SPF 30" (₹2,499)
   - "Velvet Petal Matte Liquid Lipstick" (₹1,299)
   - "24K Golden Radiance Facial Elixir" (₹3,299)
   - "Glaze Peptide Lip Infusion Oil" (₹1,199)
   - "Damask Rose Botanical Hydrating Mist" (₹1,499)
   - "Cashmere Soft-Focus Setting Powder" (₹1,899)
   - "Saffron & Kumkumadi Glow Sculpting Cream" (₹2,899)
   - "Royal Oud & Kashmiri Saffron Extrait de Parfum" (₹4,499)
   - "Ceramide Barrier Recovery Cloud Cream" (₹2,199)
   - "Silk Infusion Bond-Repair Hair Mask" (₹1,999)
3. Always format prices in Indian Rupees (₹).
4. Tone: Refined, warm, professional, encouraging, editorial.
5. Offer concise shade matching, step-by-step skincare layering order (Cleanser -> Toner/Mist -> Serum/Elixir -> Moisturizer -> SPF), and bridal consultation plans.
`;

export interface AIAdvisorRequest {
  message: string;
  userProfile?: {
    skinType?: string;
    skinTone?: string;
    undertone?: string;
    concerns?: string[];
    preferredStyle?: string;
    budgetRange?: string;
  };
  history?: { role: 'user' | 'model'; text: string }[];
}

export interface AIAdvisorResponse {
  reply: string;
  recommendedProductIds: string[];
  recommendedProducts: Product[];
  actionType?: 'quiz' | 'shade' | 'routine' | 'bridal' | 'track';
  source: 'gemini' | 'catalog-engine';
}

export async function askBeautyAdvisor(req: AIAdvisorRequest): Promise<AIAdvisorResponse> {
  const queryLower = req.message.toLowerCase();

  // Find relevant products from catalog
  const matchedProducts: Product[] = [];

  if (queryLower.includes('foundation') || queryLower.includes('shade') || queryLower.includes('match')) {
    matchedProducts.push(...MASTER_PRODUCTS_CATALOG.filter((p) => p.subcategory === 'Foundation'));
  }
  if (queryLower.includes('lipstick') || queryLower.includes('lip')) {
    matchedProducts.push(...MASTER_PRODUCTS_CATALOG.filter((p) => p.subcategory === 'Lipstick' || p.subcategory === 'Lip Treatment'));
  }
  if (queryLower.includes('routine') || queryLower.includes('skin') || queryLower.includes('serum') || queryLower.includes('cream')) {
    matchedProducts.push(...MASTER_PRODUCTS_CATALOG.filter((p) => p.department === 'Skincare'));
  }
  if (queryLower.includes('wedding') || queryLower.includes('bridal') || queryLower.includes('haldi') || queryLower.includes('sangeet')) {
    matchedProducts.push(...MASTER_PRODUCTS_CATALOG.filter((p) => p.isFeatured || p.isBestseller).slice(0, 3));
  }
  if (queryLower.includes('hair') || queryLower.includes('frizz') || queryLower.includes('curl')) {
    matchedProducts.push(...MASTER_PRODUCTS_CATALOG.filter((p) => p.department === 'Haircare'));
  }
  if (queryLower.includes('fragrance') || queryLower.includes('perfume') || queryLower.includes('oud')) {
    matchedProducts.push(...MASTER_PRODUCTS_CATALOG.filter((p) => p.department === 'Fragrance'));
  }

  // Ensure unique top 3
  const uniqueProducts = Array.from(new Set(matchedProducts.map((p) => p.id)))
    .map((id) => MASTER_PRODUCTS_CATALOG.find((p) => p.id === id)!)
    .filter(Boolean)
    .slice(0, 3);

  // If no specific match, recommend bestsellers
  const finalRecommended = uniqueProducts.length > 0
    ? uniqueProducts
    : MASTER_PRODUCTS_CATALOG.filter((p) => p.isBestseller).slice(0, 3);

  // Try calling Gemini if API key is configured
  const client = getGeminiClient();
  if (client) {
    try {
      const contentsPayload = [
        {
          role: 'user',
          parts: [
            {
              text: `Customer Query: "${req.message}"
Customer Context:
- Skin Type: ${req.userProfile?.skinType || 'Not specified'}
- Skin Tone: ${req.userProfile?.skinTone || 'Not specified'}
- Undertone: ${req.userProfile?.undertone || 'Not specified'}
- Concerns: ${req.userProfile?.concerns?.join(', ') || 'Not specified'}
- Budget Preference: ${req.userProfile?.budgetRange || 'Flexible'}

Catalog Products Available for Recommendation:
${finalRecommended.map((p) => `- ${p.name} (${p.brand}) at ₹${p.price}. Key benefits: ${p.shortDescription}`).join('\n')}

Provide an expert, concise, warm response. Mention recommended products by name with prices in ₹. If the user asks for medical skin treatment, include a disclaimer.`,
            },
          ],
        },
      ];

      const response = await client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentsPayload,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const generatedText = response.text || '';
      if (generatedText.trim().length > 0) {
        return {
          reply: generatedText,
          recommendedProductIds: finalRecommended.map((p) => p.id),
          recommendedProducts: finalRecommended,
          source: 'gemini',
          actionType: (queryLower.includes('shade') || queryLower.includes('foundation'))
            ? 'shade'
            : queryLower.includes('routine')
            ? 'routine'
            : queryLower.includes('bridal')
            ? 'bridal'
            : undefined,
        };
      }
    } catch (err) {
      console.warn('Gemini API call skipped or errored; falling back to curated beauty advisor intelligence:', err);
    }
  }

  // Graceful, high-quality curated advisor response when Gemini key is not configured or in sandbox
  let fallbackReply = `Hello darling. Welcome to Mariyam Maquillage. `;
  let action: 'quiz' | 'shade' | 'routine' | 'bridal' | 'track' | undefined = undefined;

  if (queryLower.includes('foundation') || queryLower.includes('shade') || queryLower.includes('skin tone')) {
    fallbackReply = `For South Asian complexions, the secret to seamless wear lies in identifying your undertone. We formulate our Royal Silk Luminous Foundation with micro-milled olive and warm golden pigments that melt into the skin with zero ashy flashback. I recommend launching our AI Precision Shade Matcher to find your exact swatch number!`;
    action = 'shade';
  } else if (queryLower.includes('routine') || queryLower.includes('skincare') || queryLower.includes('dry') || queryLower.includes('oil')) {
    fallbackReply = `A truly transformative skincare regimen focuses on barrier restoration: Start with a pH-balanced cleanser, mist with Damask Rose, apply 24K Saffron Elixir, and seal with our Ceramide Barrier Recovery Cream. Tap "Routine Builder" below to generate a tailored AM/PM routine!`;
    action = 'routine';
  } else if (queryLower.includes('wedding') || queryLower.includes('bridal') || queryLower.includes('haldi')) {
    fallbackReply = `Congratulations on your upcoming celebration! For Indian weddings with multi-day events (Haldi, Mehendi, Sangeet, Ceremony, Reception), we have engineered our Bridal Beauty Studio kits with 14-hour humidity-resistant wear and flashback-free pigments.`;
    action = 'bridal';
  } else if (queryLower.includes('gift') || queryLower.includes('wife') || queryLower.includes('mother')) {
    fallbackReply = `Our bespoke Gifting Studio lets you curate hand-selected luxury beauty coffrets with handwritten calligraphy notes and silk-lined keepsake presentation boxes.`;
  } else {
    fallbackReply = `I am delighted to assist your beauty journey today. Based on your interest in luxury formulations, I've curated these exceptional artisanal staples for your consideration. Let me know if you would like me to analyze your skin undertone or build a customized skincare regimen!`;
  }

  return {
    reply: fallbackReply,
    recommendedProductIds: finalRecommended.map((p) => p.id),
    recommendedProducts: finalRecommended,
    actionType: action,
    source: 'catalog-engine',
  };
}
