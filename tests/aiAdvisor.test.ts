import { describe, it, expect } from 'vitest';
import { askBeautyAdvisor } from '../src/server/aiService';

describe('AI Beauty Concierge & Artistry Advisor', () => {
  it('returns grounded catalog product recommendations for foundation requests', async () => {
    const res = await askBeautyAdvisor({
      message: 'Which foundation suits medium warm South Asian skin?',
      userProfile: {
        skinType: 'Combination',
        skinTone: 'Medium',
        undertone: 'warm',
      },
    });

    expect(res.reply).toBeDefined();
    expect(res.reply.length).toBeGreaterThan(10);
    expect(res.recommendedProductIds.length).toBeGreaterThan(0);
    expect(res.actionType).toBe('shade');
  });

  it('suggests skincare routine steps when asked for dry skin routine', async () => {
    const res = await askBeautyAdvisor({
      message: 'What skincare routine should I follow for hydration and barrier repair?',
    });

    expect(res.reply).toBeDefined();
    expect(res.recommendedProducts.length).toBeGreaterThan(0);
  });

  it('returns bridal kit recommendations for wedding ceremony queries', async () => {
    const res = await askBeautyAdvisor({
      message: 'What should I buy for my wedding reception makeup?',
    });

    expect(res.reply).toBeDefined();
    expect(res.recommendedProducts.length).toBeGreaterThan(0);
  });
});
