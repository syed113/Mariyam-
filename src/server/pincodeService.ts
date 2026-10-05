import { PincodeInfo } from '../types';

interface PincodeRule {
  city: string;
  state: string;
  estimatedDays: number;
  isExpressAvailable: boolean;
  codAvailable: boolean;
  deliveryCharge: number;
}

const PINCODE_PREFIX_RULES: Record<string, PincodeRule> = {
  // Bengaluru Hubs (Primary)
  '560': {
    city: 'Bengaluru',
    state: 'Karnataka',
    estimatedDays: 1, // Next-day or same-day
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0, // Free or base
  },
  // Bhopal Hubs (Primary)
  '462': {
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    estimatedDays: 1, // Next-day from MP Nagar hub
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  // Indore Hub
  '452': {
    city: 'Indore',
    state: 'Madhya Pradesh',
    estimatedDays: 2,
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  // Mumbai
  '400': {
    city: 'Mumbai',
    state: 'Maharashtra',
    estimatedDays: 2,
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  // Delhi NCR
  '110': {
    city: 'New Delhi',
    state: 'Delhi',
    estimatedDays: 2,
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  '122': {
    city: 'Gurugram',
    state: 'Haryana',
    estimatedDays: 2,
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  // Hyderabad
  '500': {
    city: 'Hyderabad',
    state: 'Telangana',
    estimatedDays: 2,
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  // Pune
  '411': {
    city: 'Pune',
    state: 'Maharashtra',
    estimatedDays: 2,
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  // Chennai
  '600': {
    city: 'Chennai',
    state: 'Tamil Nadu',
    estimatedDays: 2,
    isExpressAvailable: true,
    codAvailable: true,
    deliveryCharge: 0,
  },
  // Kolkata
  '700': {
    city: 'Kolkata',
    state: 'West Bengal',
    estimatedDays: 3,
    isExpressAvailable: false,
    codAvailable: true,
    deliveryCharge: 0,
  },
};

export function lookupPincode(pincode: string): PincodeInfo {
  const cleanPin = pincode.replace(/\D/g, '').trim();

  if (cleanPin.length !== 6) {
    return {
      pincode: cleanPin,
      city: 'Unknown',
      state: 'India',
      serviceable: false,
      codAvailable: false,
      estimatedDays: 0,
      isExpressAvailable: false,
      deliveryCharge: 99,
    };
  }

  const prefix3 = cleanPin.substring(0, 3);
  const matched = PINCODE_PREFIX_RULES[prefix3];

  if (matched) {
    return {
      pincode: cleanPin,
      city: matched.city,
      state: matched.state,
      serviceable: true,
      codAvailable: matched.codAvailable,
      estimatedDays: matched.estimatedDays,
      isExpressAvailable: matched.isExpressAvailable,
      deliveryCharge: matched.deliveryCharge,
    };
  }

  // Pan-India fallback for standard 6-digit Indian PIN codes
  const firstDigit = cleanPin[0];
  let regionState = 'Rest of India';
  if (firstDigit === '1' || firstDigit === '2') regionState = 'Northern Region';
  if (firstDigit === '3' || firstDigit === '4') regionState = 'Western / Central Region';
  if (firstDigit === '5' || firstDigit === '6') regionState = 'Southern Region';
  if (firstDigit === '7' || firstDigit === '8') regionState = 'Eastern Region';

  return {
    pincode: cleanPin,
    city: `Region (${prefix3})`,
    state: regionState,
    serviceable: true,
    codAvailable: true,
    estimatedDays: 4,
    isExpressAvailable: false,
    deliveryCharge: 99,
  };
}
