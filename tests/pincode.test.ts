import { describe, it, expect } from 'vitest';
import { lookupPincode } from '../src/server/pincodeService';

describe('Pincode Serviceability Engine', () => {
  it('correctly identifies Bengaluru Indiranagar Hub (560038) with express availability', () => {
    const result = lookupPincode('560038');
    expect(result.serviceable).toBe(true);
    expect(result.city).toBe('Bengaluru');
    expect(result.state).toBe('Karnataka');
    expect(result.isExpressAvailable).toBe(true);
    expect(result.codAvailable).toBe(true);
    expect(result.estimatedDays).toBe(1);
  });

  it('correctly identifies Bhopal Regional Hub (462001) with express availability', () => {
    const result = lookupPincode('462001');
    expect(result.serviceable).toBe(true);
    expect(result.city).toBe('Bhopal');
    expect(result.state).toBe('Madhya Pradesh');
    expect(result.isExpressAvailable).toBe(true);
    expect(result.codAvailable).toBe(true);
    expect(result.estimatedDays).toBe(1);
  });

  it('correctly identifies Mumbai Hub (400001)', () => {
    const result = lookupPincode('400001');
    expect(result.serviceable).toBe(true);
    expect(result.city).toBe('Mumbai');
    expect(result.state).toBe('Maharashtra');
  });

  it('rejects invalid pincodes with non-6 digits', () => {
    const result = lookupPincode('123');
    expect(result.serviceable).toBe(false);
  });
});
