import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  ProductShade,
  CartItem,
  Order,
  BeautyProfile,
  ShippingAddress,
  SupportTicket,
  AppUser,
  UserRole,
  WarehouseStock,
  AuditLog,
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/initialCatalog';
import { getCurrentUser, loginWithDemoRole, logoutUser } from '../services/authService';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: ShippingAddress;
  rewardPoints: number;
  loyaltyTier: 'Silver Member' | 'Gold VIP' | 'Atelier Platinum';
}

interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
}

const VALID_PROMOS: Record<string, PromoCode> = {
  LUXE20: { code: 'LUXE20', discountPercent: 20, description: '20% Off Launch Special' },
  GLAM15: { code: 'GLAM15', discountPercent: 15, description: '15% Off Beauty Lover Discount' },
  MARIYAM10: { code: 'MARIYAM10', discountPercent: 10, description: '10% Welcome VIP Code' },
  REWARD200: { code: 'REWARD200', discountPercent: 15, description: '₹200 Loyalty Voucher' },
  REWARD500: { code: 'REWARD500', discountPercent: 25, description: '₹500 VIP Loyalty Voucher' },
};

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-1',
    ticketId: 'MM-TKT-89241',
    orderNumber: 'MM-IN-98412',
    customerName: 'Aanya Sen',
    email: 'aanya.sen@example.com',
    phone: '+91 98450 12345',
    category: 'Track Order',
    subject: 'Requesting express courier delivery OTP details for Koramangala hub',
    message: 'My order is marked out for delivery today. Could you confirm delivery executive details and verify my contactless delivery?',
    status: 'In Progress',
    createdAt: 'Today, 11:20 AM',
    replyNote: 'Delivery executive assigned: Rajesh Kumar (Delhivery Express). Courier contact: +91 98450 99881. Handover OTP will be verified upon arrival.',
  },
  {
    id: 'tkt-2',
    ticketId: 'MM-TKT-78210',
    orderNumber: 'MM-IN-91204',
    customerName: 'Aanya Sen',
    email: 'aanya.sen@example.com',
    phone: '+91 98450 12345',
    category: 'Beauty Advice',
    subject: 'Undertone recommendation for Royal Silk Foundation in sunlight vs banquet flash',
    message: 'I have subtle olive-warm nuances. Is Golden Sand 25W or Warm Almond 35W better for evening wedding receptions?',
    status: 'Resolved',
    createdAt: 'Sep 29, 2026',
    replyNote: 'Mariyam recommends Golden Sand 25W for the center of the face with Warm Almond 35W along perimeter jawlines for dimensional radiant warmth with zero camera flashback.',
  },
];

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  user: UserProfile;
  currentUser: AppUser;
  loginAsRole: (role: UserRole) => AppUser;
  logout: () => void;
  beautyProfile: BeautyProfile | null;
  // Delivery location & City
  selectedCity: string;
  selectedPincode: string;
  setSelectedCityAndPincode: (city: string, pin: string) => void;
  // Comparison
  compareList: string[];
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  // Search & Navigation
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAdvisorOpen: boolean;
  setIsAdvisorOpen: (open: boolean) => void;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  isShadeModalOpen: boolean;
  setIsShadeModalOpen: (open: boolean) => void;
  shadeModalProduct: Product | null;
  openShadeModal: (product?: Product) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  // Tickets
  tickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketId' | 'status' | 'createdAt'>) => SupportTicket;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status'], replyNote?: string) => void;
  // Promo & Cart
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  addToCart: (product: Product, quantity?: number, shade?: ProductShade) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  saveBeautyProfile: (profile: BeautyProfile) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  createOrder: (data: { shippingAddress: ShippingAddress; paymentMethod: any }) => Order;
  // Admin Operations
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  warehouseInventory: WarehouseStock[];
  updateWarehouseStockCount: (productId: string, stockUpdates: Partial<WarehouseStock>) => void;
  auditLogs: AuditLog[];
  // Calculations
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  cartSavings: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mm_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Auth User
  const [currentUser, setCurrentUser] = useState<AppUser>(() => getCurrentUser());

  const loginAsRole = (role: UserRole) => {
    const logged = loginWithDemoRole(role);
    setCurrentUser(logged);
    setUser((prev) => ({
      ...prev,
      name: logged.name,
      email: logged.email,
      phone: logged.phone,
    }));
    return logged;
  };

  const logout = () => {
    const guest = logoutUser();
    setCurrentUser(guest);
  };

  // Load cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Load wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('mm_wishlist');
    return saved ? JSON.parse(saved) : ['mm-prod-1', 'mm-prod-3'];
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mm_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Load user profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mm_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Aanya Sen',
          email: 'aanya.sen@example.com',
          phone: '+91 98450 12345',
          address: {
            fullName: 'Aanya Sen',
            phone: '+91 98450 12345',
            addressLine1: 'Villa 14, Palm Meadows, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            postalCode: '560038',
            country: 'India',
          },
          rewardPoints: 450,
          loyaltyTier: 'Gold VIP',
        };
  });

  // Load beauty profile
  const [beautyProfile, setBeautyProfile] = useState<BeautyProfile | null>(() => {
    const saved = localStorage.getItem('mm_beauty_profile');
    return saved
      ? JSON.parse(saved)
      : {
          skinType: 'Combination',
          skinTone: 'Medium',
          undertone: 'warm',
          concerns: ['Hydration', 'Dark Spots', 'Uneven Tone'],
          makeupExperience: 'Intermediate',
          preferredStyle: 'Natural Dewy',
          budgetRange: '₹1,000 – ₹2,500',
          hairType: 'Wavy',
          hairConcerns: ['Frizz Control', 'Shine'],
          fragrancePreferences: ['Warm Florals', 'Amber Woods'],
          recommendedProductIds: ['mm-prod-1', 'mm-prod-2', 'mm-prod-3', 'mm-prod-5'],
        };
  });

  // Location / City state
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    return localStorage.getItem('mm_city') || 'Bengaluru';
  });
  const [selectedPincode, setSelectedPincode] = useState<string>(() => {
    return localStorage.getItem('mm_pincode') || '560038';
  });

  const setSelectedCityAndPincode = (city: string, pin: string) => {
    setSelectedCity(city);
    setSelectedPincode(pin);
    localStorage.setItem('mm_city', city);
    localStorage.setItem('mm_pincode', pin);
  };

  // Compare List
  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('mm_compare');
    return saved ? JSON.parse(saved) : ['mm-prod-1', 'mm-prod-2'];
  });

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => setCompareList([]);
  const isInCompare = (productId: string) => compareList.includes(productId);

  // Recent Searches
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('mm_recent_searches');
    return saved
      ? JSON.parse(saved)
      : ['Silk foundation warm undertone', 'Damask rose mist', 'Ceramide cream', 'Wedding bridal kit'];
  });

  const addRecentSearch = (query: string) => {
    if (!query || !query.trim()) return;
    const clean = query.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 8);
      localStorage.setItem('mm_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('mm_recent_searches');
  };

  // Support Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('mm_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const createSupportTicket = (
    data: Omit<SupportTicket, 'id' | 'ticketId' | 'status' | 'createdAt'>
  ): SupportTicket => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newTicket: SupportTicket = {
      ...data,
      id: `tkt-${Date.now()}`,
      ticketId: `MM-TKT-${randomNum}`,
      status: 'Open',
      createdAt: 'Just now',
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status'], replyNote?: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId || t.ticketId === ticketId
          ? { ...t, status, ...(replyNote ? { replyNote } : {}) }
          : t
      )
    );
  };

  // Warehouse Inventory State
  const [warehouseInventory, setWarehouseInventory] = useState<WarehouseStock[]>(() => {
    const saved = localStorage.getItem('mm_warehouse_inventory');
    if (saved) return JSON.parse(saved);
    return products.map((p) => ({
      productId: p.id,
      sku: p.sku,
      central: Math.round(p.stockCount * 0.6),
      bengaluru: Math.round(p.stockCount * 0.25),
      bhopal: Math.round(p.stockCount * 0.15),
      lowStockThreshold: 15,
    }));
  });

  const updateWarehouseStockCount = (productId: string, stockUpdates: Partial<WarehouseStock>) => {
    setWarehouseInventory((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId ? { ...item, ...stockUpdates } : item
      );
      localStorage.setItem('mm_warehouse_inventory', JSON.stringify(updated));
      return updated;
    });

    // Update product overall stock
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const w = warehouseInventory.find((item) => item.productId === productId);
          const totalStock =
            (stockUpdates.central ?? w?.central ?? 0) +
            (stockUpdates.bengaluru ?? w?.bengaluru ?? 0) +
            (stockUpdates.bhopal ?? w?.bhopal ?? 0);
          return { ...p, stockCount: totalStock, inStock: totalStock > 0 };
        }
        return p;
      })
    );
  };

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('mm_audit_logs');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'log-init-1',
            timestamp: new Date().toISOString(),
            actor: 'admin@mariyammaquillage.com',
            role: 'superadmin',
            action: 'CATALOG_AUDIT_PASS',
            entity: 'Product',
            entityId: 'all',
            details: 'Verified 18 master luxury catalog formulations and INR pricing calibration.',
          },
        ];
  });

  // Admin Product Operations
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    setWarehouseInventory((prev) => [
      {
        productId: newProd.id,
        sku: newProd.sku,
        central: Math.round(newProd.stockCount * 0.6),
        bengaluru: Math.round(newProd.stockCount * 0.25),
        bhopal: Math.round(newProd.stockCount * 0.15),
        lowStockThreshold: 15,
      },
      ...prev,
    ]);

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: currentUser.email,
        role: currentUser.role,
        action: 'PRODUCT_CREATE',
        entity: 'Product',
        entityId: newProd.id,
        details: `Created new catalog product "${newProd.name}" (${newProd.sku}) at ₹${newProd.price}`,
      },
      ...prev,
    ]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: currentUser.email,
        role: currentUser.role,
        action: 'PRODUCT_UPDATE',
        entity: 'Product',
        entityId: id,
        details: `Updated product properties for ID: ${id}`,
      },
      ...prev,
    ]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setWarehouseInventory((prev) => prev.filter((item) => item.productId !== id));
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: currentUser.email,
        role: currentUser.role,
        action: 'PRODUCT_DELETE',
        entity: 'Product',
        entityId: id,
        details: `Deleted product from catalog ID: ${id}`,
      },
      ...prev,
    ]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          return {
            ...o,
            status,
            trackingSteps: o.trackingSteps.map((step) => {
              if (status === 'Processing' && step.title.includes('Processing')) {
                return { ...step, completed: true };
              }
              if (status === 'Shipped' && (step.title.includes('Processing') || step.title.includes('Dispatched'))) {
                return { ...step, completed: true };
              }
              if (status === 'Out for Delivery' && !step.title.includes('Delivered')) {
                return { ...step, completed: true };
              }
              if (status === 'Delivered') {
                return { ...step, completed: true };
              }
              return step;
            }),
          };
        }
        return o;
      })
    );

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: currentUser.email,
        role: currentUser.role,
        action: 'ORDER_STATUS_UPDATE',
        entity: 'Order',
        entityId: orderId,
        details: `Updated order fulfillment status to "${status}"`,
      },
      ...prev,
    ]);
  };

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isShadeModalOpen, setIsShadeModalOpen] = useState(false);
  const [shadeModalProduct, setShadeModalProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  const openShadeModal = (product?: Product) => {
    setShadeModalProduct(product || products[0]);
    setIsShadeModalOpen(true);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('mm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mm_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mm_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('mm_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('mm_warehouse_inventory', JSON.stringify(warehouseInventory));
  }, [warehouseInventory]);

  useEffect(() => {
    localStorage.setItem('mm_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (beautyProfile) {
      localStorage.setItem('mm_beauty_profile', JSON.stringify(beautyProfile));
    }
  }, [beautyProfile]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, shade?: ProductShade) => {
    const shadeKey = shade ? shade.id : 'default';
    const itemId = `${product.id}-${shadeKey}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        mrp: product.mrp,
        image: product.images[0] || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
        quantity,
        selectedShade: shade,
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Promo code
  const applyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (VALID_PROMOS[upper]) {
      setAppliedPromo(VALID_PROMOS[upper]);
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Beauty profile
  const saveBeautyProfile = (profile: BeautyProfile) => {
    setBeautyProfile(profile);
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  // Create order
  const createOrder = ({
    shippingAddress,
    paymentMethod,
  }: {
    shippingAddress: ShippingAddress;
    paymentMethod: any;
  }) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `MM-IN-${randomSuffix}`;

    const orderItems = cart.map((c) => ({
      productId: c.productId,
      productName: c.name,
      brand: c.brand,
      price: c.price,
      quantity: c.quantity,
      image: c.image,
      selectedShade: c.selectedShade ? c.selectedShade.name : undefined,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed',
      items: orderItems,
      subtotal: cartSubtotal,
      shippingCost: cartShipping,
      discount: cartDiscount,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid',
      city: shippingAddress.city || selectedCity || 'Bengaluru',
      pincode: shippingAddress.postalCode || selectedPincode || '560038',
      shippingAddress,
      trackingNumber: `MM-TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      courierName: `${selectedCity} Hub Delhivery Express`,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      trackingSteps: [
        {
          title: 'Order Confirmed & Payment Verified',
          date: 'Just now',
          completed: true,
          description: 'Payment authorized with 100% authenticity guarantee and invoice generated.',
        },
        {
          title: `Atelier Packing at ${selectedCity} Fulfilment Hub`,
          date: 'Within 6 hours',
          completed: false,
          description: 'Sanitized clinical packing in thermal eco-luxury protective boxes.',
        },
        {
          title: 'Dispatched with Delhivery Express Courier',
          date: 'Tomorrow, 09:00 AM',
          completed: false,
          description: 'Carrier tracking scan and executive contact SMS dispatched.',
        },
        {
          title: `Doorstep Delivery in ${shippingAddress.city}`,
          date: 'In 1-2 business days',
          completed: false,
          description: 'Contactless OTP delivery verified on arrival.',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Award rewards points: 1 point per ₹10 spent
    const earnedPoints = Math.round(cartTotal / 10);
    setUser((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints + earnedPoints,
    }));

    clearCart();
    return newOrder;
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Total compareAt / MRP savings
  const totalMrp = cart.reduce((sum, item) => {
    const orig = item.compareAtPrice || item.mrp || item.price;
    return sum + orig * item.quantity;
  }, 0);
  const baseSavings = Math.max(0, totalMrp - cartSubtotal);

  const cartDiscount = appliedPromo
    ? Math.round(((cartSubtotal * appliedPromo.discountPercent) / 100) * 100) / 100
    : 0;

  const freeShippingThreshold = 999;
  const cartShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = Math.max(0, Math.round((cartSubtotal - cartDiscount + cartShipping) * 100) / 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const cartSavings = baseSavings + cartDiscount;

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        user,
        currentUser,
        loginAsRole,
        logout,
        beautyProfile,
        selectedCity,
        selectedPincode,
        setSelectedCityAndPincode,
        compareList,
        toggleCompare,
        clearCompare,
        isInCompare,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        isAdvisorOpen,
        setIsAdvisorOpen,
        isCityModalOpen,
        setIsCityModalOpen,
        isShadeModalOpen,
        setIsShadeModalOpen,
        shadeModalProduct,
        openShadeModal,
        quickViewProduct,
        setQuickViewProduct,
        tickets,
        createSupportTicket,
        updateTicketStatus,
        appliedPromo,
        applyPromo,
        removePromo,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        saveBeautyProfile,
        updateUserProfile,
        createOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        warehouseInventory,
        updateWarehouseStockCount,
        auditLogs,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        freeShippingThreshold,
        amountToFreeShipping,
        cartSavings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
