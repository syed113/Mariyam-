# Mariyam Maquillage — AI-Powered Luxury Beauty Commerce Platform

A comprehensive implementation plan to transform Mariyam Maquillage into a premier beauty e-commerce destination inspired by Nykaa, Sephora, and Hayah Laboratories. The platform delivers an omnichannel shopping experience with advanced catalog browsing, shade matching, bespoke skincare routine builders, an AI Beauty Advisor chatbot, a seamless cart-to-checkout flow, a customer account portal, and an editorial beauty journal.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following core product decisions have been synthesized and confirmed through initial discovery:

- **Confirmed Decision 1 (Storefront & Brand Model)**: Build a full-scale beauty e-commerce store with hero campaign banners, category navigations, interactive AI consultation tools, and product spotlights. The catalog features a three-tier brand matrix: Mariyam Maquillage proprietary luxury line, prestige partner brands (e.g., Dior, Charlotte Tilbury, Huda Beauty), and accessible essentials across Makeup, Skincare, Haircare, Fragrance, and Bath & Body.
- **Confirmed Decision 2 (AI Beauty Suite Priority)**: Implement the complete suite of interactive AI tools front-and-center:
  1. *AI Beauty Advisor Chatbot*: 24/7 conversational beauty concierge advising on product compatibility, shade matching, and application techniques.
  2. *Interactive 6-Step Beauty Profile & Shade Matcher*: Diagnosing skin type, depth, undertone, coverage preference, and generating tailored color harmonies.
  3. *AM/PM Skincare Routine Builder*: Generating personalized morning and evening regimens with step-by-step product layering.
- **Confirmed Decision 3 (Customer Experience & Reference Architecture)**: Incorporate a sophisticated customer account hub inspired by Hayah Laboratories (`/my-account`), including order history with real-time status tracking, saved beauty profiles, interactive wishlist, addresses, and loyalty rewards points.

---

## 1. Overview & Core Concept

- **What It Does**: Mariyam Maquillage is an AI-driven beauty commerce platform offering curated cosmetics, clean skincare, haircare, and bespoke beauty consultations. Shoppers can seamlessly browse categorized collections, filter by skin type, price, ingredients, and finish, test foundation shades virtually, build tailored routines, chat with an intelligent beauty concierge, and purchase products with transparent checkout and order tracking.
- **Target Audience / Persona**:
  - *Beauty Enthusiasts & Everyday Shoppers*: Seeking curated, authentic cosmetics, clear ingredient transparency, and guidance on what suits their skin.
  - *Brides & Special Occasion Clients*: Looking for long-wear, camera-flash-tested bridal glam kits, setting mists, and luxury touch-up essentials.
  - *Skincare Seekers*: In search of simplified AM/PM regimens tailored to specific barrier concerns (acne, dehydration, hyperpigmentation, anti-aging).
- **Key Value Proposition**: "Your Beauty, Your Power!" — Eliminating shade-matching uncertainty and product overwhelm by combining Sephora-grade AI personalization with Nykaa's comprehensive catalog depth and Hayah Laboratories' elegant account management.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Discovery & Exploration Flow**:
   - The user arrives on a high-fashion, clean editorial storefront featuring hero campaign banners, quick category pills (Face, Eyes, Lips, Skincare, Fragrance), trending bestsellers, and an interactive "Find Your Match" entry point.
   - Global search bar with autocomplete, instant category filtering, and drawer-based shopping bag counter.
2. **Product Detail & Shade Selection Flow (PDP)**:
   - High-definition image gallery with interactive swatch selector (e.g., Honey Beige, Warm Almond, Rose Petal).
   - Sticky contiguous purchase module displaying live inventory status, price with discount calculations, shade picker, quantity stepper, "Add to Bag", and "Save to Wishlist".
   - Structured tabbed accordion for Product Details, Ingredients List, How to Use, and Verified Customer Reviews with star ratings and photo uploads.
3. **AI Beauty Advisor & Quiz Flow**:
   - *Beauty Quiz*: 6-step questionnaire capturing skin type, tone, concerns, experience, preferred finish, and budget, outputting a personalized product routine.
   - *Beauty Advisor Chatbot*: Accessible via a floating widget with suggested starter prompts ("Find foundation for olive undertones", "Best routine for dry winter skin").
   - *Routine Builder*: Custom AM and PM step-by-step regimen with 1-click "Add Full Routine to Cart".
4. **Cart, Checkout & Order Tracking**:
   - Slide-over mini-cart drawer displaying free shipping progress bar, promo code validation, itemized subtotal, and direct checkout CTA.
   - Multi-step checkout: Shipping Address, Delivery Method, Payment Selection (Credit/Debit Card, UPI, Netbanking, Cash on Delivery), and instant Order Confirmation with live tracking status.
5. **Customer Account Portal (Hayah Laboratories Inspired)**:
   - Dedicated `/account` center with sidebar tabs: Overview, Order History & Live Tracking, Saved Beauty Profile, Wishlist Items, Saved Addresses, and Loyalty Rewards Points.

### Visual Identity & Theme

- **Aesthetic Direction**: Modern Luxury & Editorial Chic — warm minimalism, refined editorial framing, crisp whitespace, and delicate rose gold / champagne accents that echo high-end French cosmetic ateliers.
- **Color Tokens (60-30-10 Distribution)**:
  - *Canvas (60%)*: Crisp Off-White `#FFFFFF` and Soft Cream `#FAF8F5` backgrounds.
  - *Structural Surfaces (30%)*: Deep Charcoal `#1A1A1A` for high-contrast headers, muted stone `#F4EFEA` for soft cards and hairline dividers (`rgba(183, 110, 121, 0.15)`).
  - *Accent Budget (10%)*: Signature Rose Gold `#B76E79`, Radiant Champagne Gold `#D4A373`, and Vibrant Rose `#E91E63` for primary CTAs, active indicators, and special offer tags.
- **Typography & Hierarchy**:
  - *Display / Hero / Brand Face*: `Cormorant Garamond` & `Playfair Display` for luxurious, editorial titles and brand elegance.
  - *Body Prose & UI Controls*: `Montserrat` & `Inter` for crisp legibility, single-line buttons, and accessibility.
  - *Data & Pricing*: Tabular numbers (`font-variant-numeric: tabular-nums`) for currency, quantities, and order timestamps.
- **Component Styling & Layout**:
  - Top Bar Contract: 3 distinct zones (Single text wordmark `MARIYAM MAQUILLAGE`, clean text navigation links, search & cart affordances).
  - Zero-Pill Metadata Discipline: Clean unboxed labels separated by quiet typographic bullets (`·`).
  - No broken images: Resilient styled fallback containers with product icons.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Robust State Engine with Local Storage Persistence**:
  - *Chosen Approach*: Maintain product catalog, cart state, customer account profile, wishlists, and order records in a reactive state store backed by `localStorage`.
  - *Why*: Provides instant client-side responsiveness, zero network lag, offline resilience, and persistent user sessions without requiring external database provisioning or authentication keys.
  - *Alternatives Considered*: Firebase or PostgreSQL setup — reserved as an optional backend sync layer once production deployment is scheduled.
- **Decision 2: Comprehensive Multi-Brand Catalog Structure**:
  - *Chosen Approach*: Deliver 24+ rich, diverse products categorized across Makeup (Foundations, Lipsticks, Palettes), Skincare (Serums, Creams, Cleansers), Haircare, and Fragrance, featuring both Mariyam Maquillage Signature items and curated prestige partner brands.
  - *Why*: Directly satisfies the user's requirement ("all of the three") and creates an authentic Nykaa/Sephora marketplace feel.
- **Decision 3: Integrated AI Beauty Concierge & Routine Engine**:
  - *Chosen Approach*: Built-in expert rule engine and contextual AI beauty advisor with instant intelligence for skin undertones, product compatibility, and multi-step routines, equipped with fallback knowledge bases.
  - *Why*: Ensures 100% uptime, zero API key blocking for demo users, and instantaneous recommendation output.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MARIYAM MAQUILLAGE STOREFRONT                    │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │   Top Navigation Bar (Wordmark · Search · Categories · Cart · Acc)│  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────┐ │
│  │    Product Catalog    │ │  AI Beauty Suite  │ │  Customer Portal  │ │
│  │   • Filter & Search   │ │  • Beauty Quiz    │ │  • Profile Details│ │
│  │   • Grid & PDP View   │ │  • Routine Gen    │ │  • Order History  │ │
│  │   • Shade Swatches    │ │  • AI Advisor Chat│ │  • Saved Wishlist │ │
│  └───────────┬───────────┘ └─────────┬─────────┘ └─────────┬─────────┘ │
│              │                       │                     │           │
│              ▼                       ▼                     ▼           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Cart & Checkout Engine                        │  │
│  │   • Mini-Cart Drawer  • Promo Codes  • Multi-Payment (Card/COD)  │  │
│  │   • Order Creation & Real-Time Tracking                          │  │
│  └───────────────────────────────────┬──────────────────────────────┘  │
│                                      │                                 │
│                                      ▼                                 │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │          Reactive Application State & LocalStorage Store         │  │
│  │   (Products · CartItems · Orders · Wishlist · BeautyProfile)     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Entities

- **Product**: `id`, `name`, `slug`, `brand`, `category`, `price`, `compareAtPrice`, `rating`, `reviewCount`, `images`, `shades`, `skinTypeCompatibility`, `undertones`, `description`, `ingredients`, `howToUse`, `isBestseller`, `isNew`.
- **CartItem**: `productId`, `variantId`, `shadeName`, `name`, `price`, `quantity`, `image`.
- **Order**: `orderNumber`, `date`, `status` ('Confirmed' | 'Processing' | 'Shipped' | 'Delivered'), `items`, `shippingAddress`, `paymentMethod`, `subtotal`, `shippingCost`, `discount`, `total`, `trackingSteps`.
- **BeautyProfile**: `skinType`, `skinTone`, `concerns`, `experience`, `preferredStyle`, `budgetRange`, `recommendedProducts`.
- **Review**: `id`, `productId`, `author`, `rating`, `date`, `title`, `comment`, `verifiedPurchase`.

### Interactive Component & State Mapping

- **Product Filter & Search**: Real-time filtering by category, brand, price slider, and search term without full page reloads.
- **Cart Drawer & Badges**: Navbar badge auto-updates on item addition; drawer opens with slide-in animation and real-time total computation.
- **Beauty Quiz & Routine Generator**: Step progression bar with radio cards, instant generation of AM/PM routine, and 1-click cart bundling.
- **Account Dashboard**: Tabbed view matching Hayah Laboratories layout (`Dashboard`, `Orders`, `Beauty Profile`, `Wishlist`, `Addresses`).

---

## 5. Verification Plan

- **Compilation Verification**: Run `compile_applet` to confirm zero TypeScript compilation errors and seamless bundle creation.
- **Linter Verification**: Run `lint_applet` to ensure standard ESLint compliance with zero warnings.
- **Functional Verification**:
  1. Browse and filter product catalog across multiple categories and shade selections.
  2. Complete the 6-step Beauty Quiz and generate tailored product recommendations.
  3. Interact with the Beauty Advisor Chatbot.
  4. Add items to cart, test promo codes, and complete checkout.
  5. Inspect the `/account` section to verify order history and tracking updates.
