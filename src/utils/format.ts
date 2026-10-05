/**
 * Utility functions for currency and date formatting across Mariyam Maquillage
 */

export const formatCurrency = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const formatPriceNumber = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) return '0';
  return Math.round(amount).toLocaleString('en-IN');
};
