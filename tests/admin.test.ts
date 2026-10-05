import { describe, it, expect } from 'vitest';
import {
  getServerProducts,
  addServerProduct,
  updateServerProduct,
  deleteServerProduct,
  updateWarehouseStock,
  validateBulkImport,
} from '../src/server/adminService';
import { Product } from '../src/types';

describe('Admin Service & Inventory Governance', () => {
  it('retrieves active catalog products from server repository', () => {
    const prods = getServerProducts();
    expect(prods.length).toBeGreaterThan(0);
    expect(prods[0].currency || 'INR').toBe('INR');
  });

  it('adds and deletes a new product with full audit logging', () => {
    const testProd: Product = {
      id: 'mm-test-prod-1',
      sku: 'MM-TEST-SKU-99',
      name: '24K Gold Saffron Glow Oil',
      slug: '24k-gold-saffron-glow-oil',
      brand: 'Mariyam Maquillage',
      brandType: 'Mariyam Signature',
      department: 'Skincare',
      category: 'Skincare',
      subcategory: 'Facial Oil',
      price: 2999,
      mrp: 3499,
      rating: 4.9,
      reviewCount: 1,
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e'],
      skinTypeCompatibility: ['Dry', 'Normal'],
      concerns: ['Hydration', 'Glow'],
      keyIngredients: ['Kashmiri Saffron', 'Kumkumadi'],
      shortDescription: 'Pure Kashmiri Saffron Glow Elixir.',
      description: 'Artisanal cold-pressed face oil.',
      benefits: ['Instant Radiance'],
      ingredients: 'Crocus Sativus, Santalum Album, Sesamum Indicum.',
      howToUse: 'Warm 2 drops in palms and press onto cheeks.',
      sizeVolume: '30 ml',
      inStock: true,
      stockCount: 80,
      status: 'Active',
      authenticity: {
        guaranteed: true,
        seller: 'Mariyam Maquillage Atelier India Pvt Ltd',
        manufacturer: 'Maquillage Laboratories Pvt Ltd',
        countryOfOrigin: 'India',
        batchNumber: 'MM-26-9999',
        shelfLifeMonths: 24,
        returnPolicy: '15-Day Returns',
      },
    };

    const added = addServerProduct(testProd, 'tester@mariyammaquillage.com');
    expect(added.id).toBe('mm-test-prod-1');

    const updated = updateServerProduct('mm-test-prod-1', { price: 3199 }, 'tester@mariyammaquillage.com');
    expect(updated?.price).toBe(3199);

    const deleted = deleteServerProduct('mm-test-prod-1', 'tester@mariyammaquillage.com');
    expect(deleted).toBe(true);
  });

  it('updates stock for Bengaluru & Bhopal warehouses', () => {
    const prods = getServerProducts();
    const target = prods[0];
    const updated = updateWarehouseStock(target.id, { bengaluru: 45, bhopal: 30 });
    expect(updated?.bengaluru).toBe(45);
    expect(updated?.bhopal).toBe(30);
  });

  it('validates bulk product import rows and catches duplicate SKUs', () => {
    const testRows = [
      {
        sku: 'MM-BULK-VALID-1',
        name: 'Velvet Plum Lip Glaze',
        brand: 'Mariyam Maquillage',
        price: 1299,
        mrp: 1599,
        stock: 50,
      },
      {
        sku: 'MM-BULK-VALID-1', // Duplicate in batch
        name: 'Velvet Plum Lip Glaze Repeat',
        brand: 'Mariyam Maquillage',
        price: 1299,
        mrp: 1599,
        stock: 50,
      },
      {
        sku: '', // Missing SKU
        name: 'Invalid Item Without SKU',
        price: 999,
      },
    ];

    const report = validateBulkImport(testRows);
    expect(report.totalRows).toBe(3);
    expect(report.validCount).toBe(1);
    expect(report.duplicateCount).toBe(1);
    expect(report.errorCount).toBe(1);
  });
});
