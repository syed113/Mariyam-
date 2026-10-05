export type LookCategory = 'All' | 'Bridal' | 'Editorial' | 'Red Carpet' | 'Natural Glow' | 'Creative';

export interface PortfolioLook {
  id: string;
  title: string;
  category: LookCategory;
  description: string;
  imageUrl: string;
  beforeAfterUrl?: string;
  clientType: string;
  productsUsed: string[];
  keyTechnique: string;
  duration: string;
  featured?: boolean;
}

export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  duration: string;
  category: 'Bridal' | 'Special Event' | 'Masterclass' | 'Editorial';
  description: string;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Tutorial {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  coverImage: string;
  steps: { stepNumber: number; title: string; instruction: string }[];
  proTips: string[];
  recommendedTools: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrEvent: string;
  rating: number;
  comment: string;
  photoUrl: string;
  date: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  eventDate: string;
  eventTime: string;
  locationType: 'studio' | 'on-location';
  eventAddress?: string;
  partySize: number;
  selectedAddOns: string[];
  specialRequests: string;
}
