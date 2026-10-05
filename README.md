# Mariyam Maquillage — Luxury Indian Beauty-Commerce & AI Artistry Platform

> **"Your Beauty, Your Power!"**  
> A high-performance luxury beauty-commerce and cosmetic discovery web application engineered specifically for the Indian market, blending the discovery standards of Nykaa Luxe, Tira, and Sephora with algorithmic shade matching, multi-warehouse fulfillment, and bespoke bridal beauty planning.

---

## 💎 Key Capabilities & Highlights

- **Pan-Indian Commerce Architecture in INR (`₹`)**:
  - Full Indian Rupee catalog pricing across all items, taxes, shipping, bundles, and checkout receipts.
  - Multi-warehouse fulfillment optimized for **Bengaluru Indiranagar Hub (560xxx)**, **Bhopal MP Nagar Hub (462xxx)**, and pan-India surface routes.
  - Integrated 6-digit Indian PIN code validation with real-time transit calculation, COD availability, and express dispatch slots.
- **AI Beauty Concierge & Artistry Suite**:
  - Full-stack Gemini integration (`gemini-3.8-flash`) via `@google/genai` with strict cosmetic guardrails (no medical diagnoses; disclaimers for clinical dermatitis/acne).
  - 6-step chromatic skin depth & undertone analysis (olive, warm golden, peachy, neutral) benchmarking against top South Asian foundations (MAC Studio Fix, Kay Beauty, Estée Lauder).
  - Multi-step AM/PM Skincare & Haircare Routine Builder with bundle savings and 1-click bag additions.
- **Bespoke Luxury Shopping Experiences**:
  - **Bridal Beauty Studio (`/bridal-studio`)**: Curated ceremony kits for Engagement, Haldi, Mehendi, Main Ceremony, and Reception with preparation timelines.
  - **Bespoke Gifting Studio (`/gifting`)**: Recipient and occasion-based beauty gift boxes with custom handwritten calligraphy cards.
  - **Product Comparison (`/compare`)**: Side-by-side active ingredient and finish matrix.
  - **Verified Reviews & Questions**: Customer review submission with skin profile metadata.
- **Enterprise Operations & Admin Command Center (`/admin`)**:
  - Multi-role role-based access control (Super Admin, Catalog Lead, Order Manager, Support Agent).
  - Real-time analytics dashboard: Revenue, order velocity, AOV, warehouse stock breakdown.
  - Product catalog CRUD operations with audit trail logging.
  - Warehouse stock rebalancing across Central, Bengaluru, and Bhopal facilities.
  - Order fulfillment pipeline with status updates from `Confirmed` to `Delivered`.
  - Bulk CSV/JSON Product Ingestion Engine with pre-import validation reporting (valid, warnings, errors, duplicate SKUs).
- **Secure Server-Side Checkout Engine**:
  - Validates prices, quantities, coupon codes (`LUXE20`, `GLAM15`), and shipping thresholds (free above ₹999) exclusively on the server.
  - Razorpay-compatible payment abstraction with development sandbox simulation.

---

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript 5, Vite 5, Material-UI (MUI) v5, Emotion.
- **Backend / API**: Express 4 mounted with Vite middleware for dev, standalone static in production.
- **AI Engine**: `@google/genai` (SDK 0.x) with `gemini-3.8-flash`.
- **State Management**: React Context (`StoreContext`) with resilient local persistence and server API synchronization.
- **Testing**: Automated test suite executing on `tsx` (`npm run test`).
- **Deployment**: Vercel-ready with single-command build and SPA rewrites (`vercel.json`).

---

## 🚀 Local Installation & Quickstart

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Setup Commands

```bash
# 1. Clone repository
git clone https://github.com/your-org/mariyam-maquillage.git
cd mariyam-maquillage

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env

# 4. Start full-stack development server (Express + Vite on port 3000)
npm run dev

# 5. Run automated test suite
npm run test

# 6. Type-check & lint codebase
npm run type-check
npm run lint

# 7. Production build
npm run build
```

---

## 📂 Project Structure

```text
mariyam-maquillage/
├── server.ts                    # Full-stack Express server with Vite middleware integration
├── index.html                   # HTML entry point with luxury typography & SEO tags
├── package.json                 # Scripts and production dependencies
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite build tool configuration
├── vercel.json                  # Vercel deployment & security headers routing
├── public/
│   ├── robots.txt               # Search crawler indexing policy
│   └── sitemap.xml              # XML sitemap for SEO discovery
├── tests/
│   ├── runner.ts                # Production test runner
│   ├── pincode.test.ts          # Indian pincode serviceability tests
│   ├── checkout.test.ts         # Checkout, pricing & coupon tests
│   ├── admin.test.ts            # Admin catalog & warehouse tests
│   └── aiAdvisor.test.ts        # AI Beauty Advisor guardrail tests
├── src/
│   ├── server/                  # Server-side business logic (Express API routes)
│   │   ├── aiService.ts         # Gemini AI beauty concierge with catalog grounding
│   │   ├── pincodeService.ts    # Indian pincode & regional hub calculator
│   │   ├── checkoutService.ts   # Secure cart, tax & payment verification
│   │   └── adminService.ts      # Product CRUD, warehouse stocks, audit logs & bulk import
│   ├── services/                # Client-side API abstraction & session managers
│   │   ├── apiClient.ts         # Unified HTTP fetch client with resilient fallback
│   │   └── authService.ts       # Role-based auth & demo accounts
│   ├── context/
│   │   └── StoreContext.tsx     # Global store state with persistent local storage
│   ├── types/
│   │   └── index.ts             # Typed data contracts (Products, Orders, Users, Warehouses)
│   ├── pages/                   # Application route pages
│   │   ├── HomePage.tsx         # Campaign hero, categories, bestsellers, AI concierge
│   │   ├── ProductsPage.tsx     # Product listing with multi-faceted filtering
│   │   ├── ProductDetailPage.tsx# Shade picker, confidence matrix, complete the look
│   │   ├── BeautyQuizPage.tsx   # Progressive consultation diagnostic
│   │   ├── RoutineBuilderPage.tsx# AM/PM Skincare & Haircare builder
│   │   ├── BridalStudioPage.tsx # Event-based Indian wedding kits & checklist
│   │   ├── GiftingPage.tsx      # Bespoke gift box curator
│   │   ├── ComparePage.tsx      # Product comparison table
│   │   ├── SupportPage.tsx      # Support ticket submission & FAQ center
│   │   ├── AccountPage.tsx      # Customer account, loyalty tiers & order history
│   │   ├── CheckoutPage.tsx     # Multi-step checkout with UPI, Card & COD
│   │   ├── OrderSuccessPage.tsx # Live order receipt & courier fulfillment tracker
│   │   ├── AdminDashboardPage.tsx# Multi-tab operations suite with bulk CSV/JSON import
│   │   └── NotFoundPage.tsx     # 404 error page
│   └── components/
│       ├── Navbar.tsx           # Luxury header with city switcher & search overlay
│       ├── Footer.tsx           # Brand story, authenticity badges & links
│       ├── common/
│       │   ├── MobileBottomNav.tsx # Responsive mobile bottom navigation
│       │   └── SeoHead.tsx      # Dynamic title, OpenGraph & Schema.org JSON-LD
│       ├── ai/
│       │   ├── BeautyAdvisorChatbot.tsx # Floating AI beauty concierge
│       │   └── FindMyShadeModal.tsx     # 6-step chromatic shade diagnosis
│       ├── cart/
│       │   └── CartDrawer.tsx   # Slide-out bag with free shipping tracker & cross-sells
│       └── product/
│           ├── ProductCard.tsx  # Product card with hover actions & shade dots
│           └── QuickViewModal.tsx# Fast product preview modal
```

---

## 🔐 Demo Credentials for Operator Testing

In the Admin Suite (`/admin`), you can instantly switch between verified roles using the top-right toolbar or login with the following test profiles:

| Role | Email | Name | Capabilities |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@mariyammaquillage.com` | Mariyam K. | Full catalog CRUD, stock rebalance, order fulfillment, audit logs |
| **Catalog Lead** | `catalog@mariyammaquillage.com` | Devika Sharma | Product management, bulk CSV/JSON import, inventory adjustments |
| **Order Manager** | `orders@mariyammaquillage.com` | Vikram Joshi | Live fulfillment pipeline, courier assignments, status transitions |
| **Support Agent** | `support@mariyammaquillage.com` | Pooja Nair | Customer ticket response, order resolution, courier inquiries |
| **Customer** | `aanya.sen@example.com` | Aanya Sen | Shopping, loyalty points, saved addresses in Bengaluru |

---

## ☁️ Deployment Instructions

### Vercel Deployment (Recommended)
1. Push repository to your connected GitHub repository.
2. In Vercel, click **"Add New Project"** and select the repository.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Configure Environment Variables in Vercel:
   - `GEMINI_API_KEY`: Your Gemini API key.
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID (optional in sandbox).
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret (optional in sandbox).
8. Click **Deploy**. Vercel will build and serve the application with full SPA rewrites configured via `vercel.json`.

---

## 📜 License
Copyright © 2026 Mariyam Maquillage Atelier India Pvt Ltd. All rights reserved.
