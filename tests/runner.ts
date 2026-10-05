/**
 * Production Test Runner for Mariyam Maquillage
 * Executes unit & integration tests directly via tsx.
 */

import { lookupPincode } from '../src/server/pincodeService';
import { calculateCheckout, createOrderOnServer, verifyPaymentServer } from '../src/server/checkoutService';
import {
  getServerProducts,
  addServerProduct,
  updateServerProduct,
  deleteServerProduct,
  getServerWarehouseInventory,
  validateBulkImport,
  calculateAnalytics,
} from '../src/server/adminService';
import { askBeautyAdvisor } from '../src/server/aiService';
import { MASTER_PRODUCTS_CATALOG } from '../src/data/catalogData';
import { Product } from '../src/types';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

async function runAllTests() {
  console.log('\n======================================================');
  console.log(' MARIYAM MAQUILLAGE — AUTOMATED TEST SUITE');
  console.log('======================================================\n');

  console.log('[1. Indian Pincode Serviceability & Regional Hubs]');
  {
    const blr = lookupPincode('560038');
    assert(blr.serviceable === true, 'Bengaluru Hub (560038) is serviceable');
    assert(blr.city === 'Bengaluru', 'Bengaluru city matched');
    assert(blr.isExpressAvailable === true, 'Express 24-hr delivery available in Bengaluru');
    assert(blr.codAvailable === true, 'COD available in Bengaluru');

    const bpl = lookupPincode('462001');
    assert(bpl.serviceable === true, 'Bhopal Regional Hub (462001) is serviceable');
    assert(bpl.city === 'Bhopal', 'Bhopal city matched');
    assert(bpl.isExpressAvailable === true, 'Express 24-48 hr delivery available in Bhopal');

    const mum = lookupPincode('400001');
    assert(mum.serviceable === true, 'Mumbai (400001) is serviceable');

    const inv = lookupPincode('123');
    assert(inv.serviceable === false, 'Invalid pincode (123) correctly rejected');
  }

  console.log('\n[2. Server-Side Checkout & Pricing Calculations]');
  {
    const targetProduct = MASTER_PRODUCTS_CATALOG[0];
    const calc = calculateCheckout({
      items: [{ productId: targetProduct.id, quantity: 1 }],
      pincode: '560038',
    });
    assert(calc.valid === true, 'Checkout calculation valid for catalog item');
    assert(calc.subtotal === targetProduct.price, `Subtotal ₹${calc.subtotal} equals price ₹${targetProduct.price}`);
    assert(calc.shipping === 0, 'Free shipping applied for order over ₹999');

    // Promo code test
    const promoCalc = calculateCheckout({
      items: [{ productId: targetProduct.id, quantity: 1 }],
      promoCode: 'LUXE20',
      pincode: '560038',
    });
    assert(promoCalc.appliedCoupon?.code === 'LUXE20', 'LUXE20 coupon recognized');
    assert(promoCalc.discount === Math.round((targetProduct.price * 20) / 100), '20% discount correctly computed');

    // Server Order creation
    const order = createOrderOnServer({
      calculation: promoCalc,
      shippingAddress: {
        fullName: 'Priya Sen',
        phone: '+91 98450 12345',
        addressLine1: 'Indiranagar 100ft Rd',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560038',
        country: 'India',
      },
      paymentMethod: 'UPI',
      city: 'Bengaluru',
      pincode: '560038',
    });
    assert(order.orderNumber.startsWith('MM-IN-'), `Order number format valid: ${order.orderNumber}`);
    assert(order.paymentStatus === 'Paid', 'UPI payment marked Paid on server');
    assert(order.trackingSteps.length >= 4, 'Fulfillment tracking stages generated');

    // Payment verification
    const payVerify = verifyPaymentServer({
      orderId: order.id,
      paymentMethod: 'UPI',
    });
    assert(payVerify.verified === true, 'Payment verification returns verified status');
  }

  console.log('\n[3. Admin Catalog, Warehouse Inventory & Audit Logs]');
  {
    const prods = getServerProducts();
    assert(prods.length > 0, `Catalog loaded with ${prods.length} active products`);

    const inv = getServerWarehouseInventory();
    assert(inv.length > 0, `Warehouse tracking active for ${inv.length} items`);
    assert(inv[0].central > 0, 'Central warehouse allocated stock');
    assert(inv[0].bengaluru > 0, 'Bengaluru hub allocated stock');
    assert(inv[0].bhopal > 0, 'Bhopal hub allocated stock');

    // Add and delete product
    const testProd: Product = {
      id: 'mm-test-auto-1',
      sku: 'MM-TEST-AUTO-1',
      name: 'Automated Test Luxury Serum',
      slug: 'automated-test-luxury-serum',
      brand: 'Mariyam Maquillage',
      brandType: 'Mariyam Signature',
      department: 'Skincare',
      category: 'Skincare',
      subcategory: 'Serum',
      price: 2499,
      mrp: 2999,
      rating: 5,
      reviewCount: 0,
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e'],
      skinTypeCompatibility: ['All' as any],
      concerns: ['Radiance'],
      keyIngredients: ['Rose'],
      shortDescription: 'Test',
      description: 'Test description',
      benefits: ['Glow'],
      ingredients: 'Aqua',
      howToUse: 'Apply',
      sizeVolume: '30 ml',
      inStock: true,
      stockCount: 50,
      status: 'Active',
      authenticity: {
        guaranteed: true,
        seller: 'Mariyam Maquillage',
        manufacturer: 'Maquillage Lab',
        countryOfOrigin: 'India',
        batchNumber: 'MM-26-TEST',
        shelfLifeMonths: 24,
        returnPolicy: '15-Day',
      },
    };
    addServerProduct(testProd, 'admin@mariyammaquillage.com');
    assert(getServerProducts().some((p) => p.id === 'mm-test-auto-1'), 'Product created in server store');

    updateServerProduct('mm-test-auto-1', { price: 2799 }, 'admin@mariyammaquillage.com');
    assert(getServerProducts().find((p) => p.id === 'mm-test-auto-1')?.price === 2799, 'Product price updated');

    deleteServerProduct('mm-test-auto-1', 'admin@mariyammaquillage.com');
    assert(!getServerProducts().some((p) => p.id === 'mm-test-auto-1'), 'Product deleted from server store');

    // Bulk Import validation
    const bulkReport = validateBulkImport([
      { sku: 'MM-VALID-01', name: 'Valid Item 1', price: 999, mrp: 1299, stock: 50 },
      { sku: 'MM-VALID-01', name: 'Duplicate SKU Item', price: 999 },
      { sku: '', name: 'Missing SKU Item', price: 999 },
    ]);
    assert(bulkReport.validCount === 1, 'Bulk validator identified 1 valid item');
    assert(bulkReport.duplicateCount === 1, 'Bulk validator identified 1 duplicate SKU');
    assert(bulkReport.errorCount === 1, 'Bulk validator identified 1 error item');

    const analytics = calculateAnalytics();
    assert(analytics.totalCustomers > 0, 'Analytics customer aggregation computed');
    assert(analytics.topCategories.length > 0, 'Analytics category breakdown computed');
  }

  console.log('\n[4. AI Beauty Concierge & Medical Guardrails]');
  {
    const shadeAdvice = await askBeautyAdvisor({
      message: 'What foundation should I buy for medium warm South Asian skin?',
      userProfile: { skinType: 'Combination', skinTone: 'Medium', undertone: 'warm' },
    });
    assert(shadeAdvice.reply.length > 20, 'AI advisor generated substantive recommendation');
    assert(shadeAdvice.recommendedProducts.length > 0, 'AI recommendations grounded in catalog');
    assert(shadeAdvice.actionType === 'shade', 'Action type classified as shade matching');

    const routineAdvice = await askBeautyAdvisor({
      message: 'What skincare routine should I follow for dry skin?',
    });
    assert(routineAdvice.recommendedProducts.length > 0, 'Skincare routine products recommended');
  }

  console.log('\n======================================================');
  console.log(` RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
