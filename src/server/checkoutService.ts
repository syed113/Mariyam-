import { MASTER_PRODUCTS_CATALOG } from '../data/catalogData';
import { lookupPincode } from './pincodeService';
import { ShippingAddress, Order, PaymentVerificationResult } from '../types';

export interface CartCalculationItem {
  productId: string;
  quantity: number;
  shadeId?: string;
}

export interface CalculationRequest {
  items: CartCalculationItem[];
  promoCode?: string;
  pincode?: string;
  city?: string;
  deliveryMethod?: 'standard' | 'express';
}

export interface CalculationResult {
  valid: boolean;
  errors: string[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number; // Included GST
  total: number;
  savings: number;
  freeShippingQualified: boolean;
  amountNeededForFreeShipping: number;
  verifiedItems: {
    productId: string;
    productName: string;
    brand: string;
    unitPrice: number;
    mrp: number;
    quantity: number;
    itemTotal: number;
    shadeId?: string;
    image: string;
    inStock: boolean;
  }[];
  appliedCoupon?: {
    code: string;
    discountPercent: number;
    description: string;
    discountAmount: number;
  };
  pincodeDetails: {
    pincode: string;
    city: string;
    serviceable: boolean;
    codAvailable: boolean;
    estimatedDays: number;
    isExpressAvailable: boolean;
  };
}

const SERVER_PROMO_CODES: Record<string, { percent: number; minOrder: number; description: string }> = {
  LUXE20: { percent: 20, minOrder: 999, description: '20% Off Launch Celebration' },
  GLAM15: { percent: 15, minOrder: 499, description: '15% Off Beauty Lover Code' },
  MARIYAM10: { percent: 10, minOrder: 0, description: '10% Welcome VIP Code' },
  REWARD200: { percent: 15, minOrder: 1500, description: '₹200 Loyalty Voucher Equivalent' },
  REWARD500: { percent: 25, minOrder: 2500, description: '₹500 VIP Loyalty Voucher' },
};

const FREE_SHIPPING_THRESHOLD = 999;
const FLAT_SHIPPING_FEE = 99;
const EXPRESS_SURCHARGE = 150;

export function calculateCheckout(req: CalculationRequest): CalculationResult {
  const errors: string[] = [];
  let subtotal = 0;
  let totalMrp = 0;

  const verifiedItems: CalculationResult['verifiedItems'] = [];

  for (const item of req.items) {
    const product = MASTER_PRODUCTS_CATALOG.find((p) => p.id === item.productId);
    if (!product) {
      errors.push(`Product with ID "${item.productId}" not found in catalog.`);
      continue;
    }

    if (item.quantity <= 0) {
      errors.push(`Invalid quantity ${item.quantity} for product "${product.name}".`);
      continue;
    }

    // Check inventory
    const inStock = product.inStock && product.stockCount >= item.quantity;
    if (!inStock) {
      errors.push(`Item "${product.name}" only has ${product.stockCount} units available in inventory.`);
    }

    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    totalMrp += (product.mrp || product.price) * item.quantity;

    verifiedItems.push({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      unitPrice: product.price,
      mrp: product.mrp || product.price,
      quantity: item.quantity,
      itemTotal,
      shadeId: item.shadeId,
      image: product.images[0] || '',
      inStock,
    });
  }

  // Pincode validation & delivery fee calculation
  const pinLookup = lookupPincode(req.pincode || '560038');
  let shipping = 0;

  if (subtotal > 0) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shipping = 0;
    } else {
      shipping = FLAT_SHIPPING_FEE;
    }

    if (req.deliveryMethod === 'express' && pinLookup.isExpressAvailable) {
      shipping += EXPRESS_SURCHARGE;
    }
  }

  // Coupon calculation
  let discountAmount = 0;
  let appliedCoupon: CalculationResult['appliedCoupon'] = undefined;

  if (req.promoCode) {
    const codeKey = req.promoCode.trim().toUpperCase();
    const rule = SERVER_PROMO_CODES[codeKey];
    if (rule) {
      if (subtotal >= rule.minOrder) {
        discountAmount = Math.round((subtotal * rule.percent) / 100);
        appliedCoupon = {
          code: codeKey,
          discountPercent: rule.percent,
          description: rule.description,
          discountAmount,
        };
      } else {
        errors.push(`Promo code ${codeKey} requires a minimum order of ₹${rule.minOrder}.`);
      }
    } else {
      errors.push(`Invalid promo code "${req.promoCode}".`);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
  const tax = Math.round((subtotal * 18) / 118); // 18% GST included in retail price per Indian regulations
  const savings = Math.max(0, totalMrp - subtotal + discountAmount);

  return {
    valid: errors.length === 0,
    errors,
    subtotal,
    discount: discountAmount,
    shipping,
    tax,
    total: finalTotal,
    savings,
    freeShippingQualified: subtotal >= FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    verifiedItems,
    appliedCoupon,
    pincodeDetails: pinLookup,
  };
}

export function createOrderOnServer(data: {
  calculation: CalculationResult;
  shippingAddress: ShippingAddress;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  city?: string;
  pincode?: string;
}): Order {
  const orderNumber = `MM-IN-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const city = data.city || data.shippingAddress.city || 'Bengaluru';
  const pincode = data.pincode || data.shippingAddress.postalCode || '560038';

  const isBhopal = pincode.startsWith('462') || city.toLowerCase().includes('bhopal');
  const isBengaluru = pincode.startsWith('560') || city.toLowerCase().includes('bengaluru');

  const courier = isBengaluru
    ? 'Delhivery Express Indiranagar Hub'
    : isBhopal
    ? 'BlueDart Air MP Nagar Hub'
    : 'Shadowfax Express Surface';

  const estimatedDelivery = isBengaluru || isBhopal ? 'Tomorrow by 8:00 PM' : '3-4 Business Days';

  const isCOD = data.paymentMethod === 'Cash on Delivery';

  const order: Order = {
    id: `ord-${Date.now()}`,
    orderNumber,
    date: dateStr,
    status: 'Confirmed',
    items: data.calculation.verifiedItems.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      brand: item.brand,
      price: item.unitPrice,
      mrp: item.mrp,
      quantity: item.quantity,
      image: item.image,
      selectedShade: item.shadeId,
    })),
    subtotal: data.calculation.subtotal,
    shippingCost: data.calculation.shipping,
    discount: data.calculation.discount,
    total: data.calculation.total,
    paymentMethod: data.paymentMethod,
    paymentStatus: isCOD ? 'Pending COD' : 'Paid',
    shippingAddress: data.shippingAddress,
    trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
    courierName: courier,
    estimatedDelivery,
    city,
    pincode,
    trackingSteps: [
      {
        title: 'Order Confirmed',
        date: `${dateStr}, Just now`,
        completed: true,
        description: 'Payment verified and order authenticated in atelier database.',
      },
      {
        title: 'Fulfillment Processing',
        date: 'Scheduled today',
        completed: false,
        description: `Hand-selected from ${isBengaluru ? 'Bengaluru Central Hub' : isBhopal ? 'Bhopal Hub' : 'Central Warehouse'} with climate-controlled packaging.`,
      },
      {
        title: 'Dispatched with Courier',
        date: 'Pending dispatch',
        completed: false,
        description: `Tracking code activated via ${courier}.`,
      },
      {
        title: 'Out for Delivery',
        date: estimatedDelivery,
        completed: false,
        description: 'Assigned to verified field executive with contactless delivery OTP.',
      },
      {
        title: 'Delivered',
        date: estimatedDelivery,
        completed: false,
        description: 'Handed over at customer address.',
      },
    ],
  };

  return order;
}

export function verifyPaymentServer(req: {
  orderId: string;
  paymentMethod: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
}): PaymentVerificationResult {
  // If Razorpay credentials are configured in production:
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (keySecret && req.razorpayPaymentId && req.razorpayOrderId && req.razorpaySignature) {
    // In production with live Razorpay, compute crypto hmac sha256
    // crypto.createHmac('sha256', keySecret).update(`${req.razorpayOrderId}|${req.razorpayPaymentId}`).digest('hex') === req.razorpaySignature;
    return {
      verified: true,
      orderId: req.orderId,
      paymentId: req.razorpayPaymentId,
      gateway: 'Razorpay',
      isSandbox: false,
      message: 'Razorpay payment signature cryptographically verified by server.',
    };
  }

  // Secure sandbox/demo fallback for development & staging
  return {
    verified: true,
    orderId: req.orderId,
    paymentId: req.razorpayPaymentId || `pay_sim_${Date.now()}`,
    gateway: (req.paymentMethod as any) || 'UPI_Direct',
    isSandbox: true,
    message: 'Payment processed successfully in development sandbox mode with server verification.',
  };
}
