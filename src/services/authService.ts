import { AppUser, UserRole } from '../types';

const STORAGE_KEY = 'mm_current_user';

export const DEMO_ACCOUNTS: { email: string; name: string; role: UserRole; phone: string }[] = [
  {
    email: 'admin@mariyammaquillage.com',
    name: 'Mariyam K. (Atelier Director)',
    role: 'superadmin',
    phone: '+91 98450 11000',
  },
  {
    email: 'catalog@mariyammaquillage.com',
    name: 'Devika Sharma (Catalog Lead)',
    role: 'catalog_manager',
    phone: '+91 98450 22000',
  },
  {
    email: 'orders@mariyammaquillage.com',
    name: 'Vikram Joshi (Fulfillment Lead)',
    role: 'order_manager',
    phone: '+91 98450 33000',
  },
  {
    email: 'support@mariyammaquillage.com',
    name: 'Pooja Nair (Senior Concierge)',
    role: 'support_agent',
    phone: '+91 98450 44000',
  },
  {
    email: 'aanya.sen@example.com',
    name: 'Aanya Sen',
    role: 'customer',
    phone: '+91 98450 12345',
  },
];

export function getCurrentUser(): AppUser {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }

  // Default initial guest/customer user
  const defaultUser: AppUser = {
    id: 'usr-customer-1',
    email: 'aanya.sen@example.com',
    name: 'Aanya Sen',
    phone: '+91 98450 12345',
    role: 'customer',
    rewardPoints: 450,
    loyaltyTier: 'Luxe',
    createdAt: '2026-01-15T09:30:00Z',
    addresses: [
      {
        fullName: 'Aanya Sen',
        phone: '+91 98450 12345',
        addressLine1: 'Villa 14, Palm Meadows, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560038',
        country: 'India',
        isDefault: true,
      },
    ],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
  return defaultUser;
}

export function setCurrentUser(user: AppUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function loginWithDemoRole(role: UserRole): AppUser {
  const demo = DEMO_ACCOUNTS.find((a) => a.role === role) || DEMO_ACCOUNTS[0];
  const user: AppUser = {
    id: `usr-${role}-${Date.now()}`,
    email: demo.email,
    name: demo.name,
    phone: demo.phone,
    role: demo.role,
    rewardPoints: role === 'customer' ? 450 : 2500,
    loyaltyTier: role === 'superadmin' ? 'Elite' : 'Luxe',
    createdAt: new Date().toISOString(),
    addresses: [
      {
        fullName: demo.name,
        phone: demo.phone,
        addressLine1: role === 'customer' ? 'Villa 14, Palm Meadows, Indiranagar' : 'Mariyam Maquillage Atelier HQ, UB City, Vittal Mallya Rd',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India',
        isDefault: true,
      },
    ],
  };

  setCurrentUser(user);
  return user;
}

export function logoutUser(): AppUser {
  const guest: AppUser = {
    id: `usr-guest-${Date.now()}`,
    email: 'guest@mariyammaquillage.com',
    name: 'Guest Customer',
    phone: '+91 98000 00000',
    role: 'customer',
    rewardPoints: 0,
    loyaltyTier: 'Glow',
    createdAt: new Date().toISOString(),
    addresses: [],
  };

  setCurrentUser(guest);
  return guest;
}
