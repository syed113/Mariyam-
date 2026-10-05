// ==========================================
// MARIYAM MAQUILLAGE — CORE TYPE SYSTEM
// ==========================================

export type Department =
  | 'Makeup'
  | 'Skincare'
  | 'Haircare'
  | 'Fragrance'
  | 'Bath & Body'
  | 'Men\'s Grooming'
  | 'Tools & Appliances'
  | 'Bridal & Gifting'
  | 'All';

export type ProductCategory = Department;

export interface ProductShade {
  id: string;
  name: string;
  hexCode: string;
  undertone?: 'cool' | 'warm' | 'neutral' | 'olive';
  description?: string;
  isAvailable?: boolean;
  image?: string;
  swatchUrl?: string;
}

export interface ProductImageSet {
  primaryImage: string;
  thumbnail: string;
  gallery: string[];
  lifestyleImage?: string;
  alternateViews?: string[];
  swatchImage?: string;
  shadeImages?: { shadeId: string; shadeName: string; imageUrl: string; swatchUrl?: string }[];
  videoThumbnail?: string;
}

export interface BrandInfo {
  brandId: string;
  brandName: string;
  logo: string;
  logoDark?: string;
  logoLight?: string;
  fallback: string;
  website: string;
  status: 'Active' | 'Featured' | 'Partner';
  origin?: 'Indian' | 'International' | 'Mariyam Signature';
  description?: string;
}

export type ProductStatus = 'Active' | 'Coming Soon' | 'Out of Stock' | 'Discontinued' | 'Restricted' | 'Location Limited';

export interface AuthenticityInfo {
  guaranteed: boolean;
  seller: string;
  manufacturer: string;
  importer?: string;
  countryOfOrigin: string;
  batchNumber: string;
  shelfLifeMonths: number;
  returnPolicy: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand: string;
  brandType: 'Indian' | 'International' | 'Mariyam Signature';
  department: Department;
  category: Department; // Alias for backwards compatibility
  subcategory: string;
  price: number; // In INR (₹)
  mrp: number; // Maximum Retail Price in INR (₹)
  compareAtPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  verifiedPurchaseCount?: number;
  images: string[];
  primaryImage?: string;
  thumbnail?: string;
  gallery?: string[];
  lifestyleImage?: string;
  alternateViews?: string[];
  swatchImage?: string;
  shades?: ProductShade[];
  shadeImages?: { shadeId: string; shadeName: string; imageUrl: string; swatchUrl?: string }[];
  videoThumbnail?: string;
  skinTypeCompatibility: ('Oily' | 'Dry' | 'Combination' | 'Normal' | 'Sensitive')[];
  hairTypeCompatibility?: ('Straight' | 'Wavy' | 'Curly' | 'Coily' | 'All Hair Types')[];
  undertones?: ('cool' | 'warm' | 'neutral' | 'olive')[];
  finish?: 'Matte' | 'Dewy' | 'Satin' | 'Natural' | 'Shimmer' | 'Metallic' | 'Glossy';
  coverage?: 'Sheer' | 'Medium' | 'Full' | 'Buildable';
  concerns: string[];
  keyIngredients: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  sizeVolume: string; // e.g. "30 ml", "50 g", "3.8 g"
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  inStock: boolean;
  stockCount: number;
  status: ProductStatus;
  isCrueltyFree?: boolean;
  isVegan?: boolean;
  authenticity: AuthenticityInfo;
  frequentlyBoughtTogetherIds?: string[];
  budgetAlternativeId?: string;
  premiumAlternativeId?: string;
  pincodeAvailability?: string[]; // Empty means pan-India
}

export interface CartItem {
  id: string; // unique item key (productId + shadeId)
  productId: string;
  name: string;
  brand: string;
  price: number;
  mrp?: number;
  compareAtPrice?: number;
  image: string;
  quantity: number;
  selectedShade?: ProductShade;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  mrp?: number;
  quantity: number;
  image: string;
  selectedShade?: string;
}

export interface TrackingStep {
  title: string;
  date: string;
  completed: boolean;
  description: string;
}

export type PaymentMethodType = 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Paid' | 'Pending COD' | 'Refunded';
  shippingAddress: ShippingAddress;
  trackingNumber: string;
  courierName?: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
  city: string;
  pincode: string;
}

export interface BeautyProfile {
  skinType: 'Oily' | 'Dry' | 'Combination' | 'Normal' | 'Sensitive' | '';
  skinTone: 'Fair' | 'Light' | 'Medium' | 'Tan' | 'Dusky' | 'Deep' | '';
  undertone: 'cool' | 'warm' | 'neutral' | 'olive' | '';
  concerns: string[];
  makeupExperience: 'Beginner' | 'Intermediate' | 'Advanced' | '';
  preferredStyle: 'Natural Dewy' | 'Velvet Soft-Matte' | 'High Glamour' | 'French Minimalist' | 'Bridal Radiance' | '';
  budgetRange: 'Under ₹999' | '₹1,000 – ₹2,500' | 'Luxury Prestige (₹2,500+)' | '';
  hairType?: 'Straight' | 'Wavy' | 'Curly' | 'Coily' | '';
  hairConcerns?: string[];
  fragrancePreferences?: string[];
  recommendedProductIds: string[];
}

export interface UserReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  skinType?: string;
  skinTone?: string;
  undertone?: string;
  shadeUsed?: string;
  photoUrl?: string;
}

export interface ProductQuestion {
  id: string;
  productId: string;
  question: string;
  askedBy: string;
  date: string;
  answer?: string;
  answeredBy?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Skincare Science' | 'Makeup Tutorials' | 'Bridal Secrets' | 'Seasonal Trends' | 'Indian Skin Tones' | 'Haircare Rituals';
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  tags: string[];
  author: string;
  recommendedProductIds: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
  actionType?: 'quiz' | 'shade' | 'routine' | 'bridal' | 'track';
}

export type CityLocation = 'Bengaluru' | 'Bhopal' | 'Delhi NCR' | 'Mumbai' | 'Hyderabad' | 'Other India';

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  serviceable: boolean;
  codAvailable: boolean;
  estimatedDays: number;
  isExpressAvailable: boolean;
  deliveryCharge: number;
}

export type LoyaltyTierName = 'Glow' | 'Luxe' | 'Elite';

export interface LoyaltyLedgerItem {
  id: string;
  date: string;
  points: number;
  type: 'earned' | 'redeemed';
  reason: string;
}

export interface SupportTicket {
  id: string;
  ticketId: string;
  orderNumber?: string;
  customerName: string;
  email: string;
  phone: string;
  category: 'Track Order' | 'Returns & Refunds' | 'Authenticity Query' | 'Damaged/Missing Item' | 'Payment Issue' | 'Beauty Advice';
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  replyNote?: string;
}

export interface BridalPlan {
  brideName: string;
  weddingDate: string;
  eventType: 'Engagement' | 'Mehendi & Sangeet' | 'Wedding Ceremony' | 'Reception' | 'Complete Bridal Suite';
  skinType: string;
  makeupStyle: string;
  budgetTier: 'Under ₹5,000' | '₹5,000 – ₹15,000' | 'Luxury Royal (₹15,000+)';
  recommendedProducts: Product[];
  prepTimeline: { weeksOut: string; title: string; advice: string }[];
  totalEstimate: number;
}

// Legacy Portfolio Types preserved for full compatibility
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

// ==========================================
// ENTERPRISE & PRODUCTION DATABASE MODELS
// ==========================================

export type UserRole = 'customer' | 'superadmin' | 'catalog_manager' | 'order_manager' | 'support_agent';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  rewardPoints: number;
  loyaltyTier: LoyaltyTierName;
  addresses: ShippingAddress[];
  createdAt: string;
}

export interface WarehouseStock {
  productId: string;
  sku: string;
  central: number;
  bengaluru: number;
  bhopal: number;
  lowStockThreshold: number;
}

export interface CouponItem {
  id: string;
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
  expiryDate?: string;
  usageCount: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  entity: 'Product' | 'Order' | 'Inventory' | 'User' | 'Coupon' | 'Review' | 'SupportTicket' | 'BulkImport';
  entityId: string;
  details: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCustomers: number;
  conversionRate: number;
  centralStockTotal: number;
  bengaluruStockTotal: number;
  bhopalStockTotal: number;
  topCategories: { category: string; count: number; revenue: number }[];
  topProducts: { id: string; name: string; brand: string; unitsSold: number; revenue: number }[];
}

export interface BulkImportRow {
  sku: string;
  name: string;
  brand: string;
  department: string;
  subcategory: string;
  price: number;
  mrp: number;
  stock: number;
  status: 'valid' | 'warning' | 'error' | 'duplicate';
  errors: string[];
  warnings: string[];
}

export interface BulkImportReport {
  totalRows: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  duplicateCount: number;
  rows: BulkImportRow[];
}

export interface PaymentVerificationResult {
  verified: boolean;
  orderId: string;
  paymentId: string;
  gateway: 'Razorpay' | 'UPI_Direct' | 'NetBanking' | 'CashOnDelivery';
  isSandbox: boolean;
  message: string;
}

