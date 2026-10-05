# Architecture Specification — Mariyam Maquillage

## 1. Architectural Philosophy
Mariyam Maquillage is built on a layered, domain-driven full-stack architecture that cleanly isolates presentation (UI), client state, server endpoints, business domain services, and external integrations (AI & Payments).

```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                          │
│   React 18 SPA · Material-UI Theme · Emotion · React Router  │
│   StoreContext State · Local Storage Persistence Cache       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON
┌──────────────────────────────▼──────────────────────────────┐
│                    API Gateway / Express                    │
│   server.ts · CORS · JSON Middleware · Vite Dev Proxy        │
└──────────┬───────────────────┬───────────────────┬──────────┘
           │                   │                   │
┌──────────▼────────┐ ┌────────▼────────┐ ┌────────▼────────┐
│   Checkout Engine │ │   Pincode Hub   │ │ AI Beauty Suite │
│  Server-side Cart │ │  6-Digit Indian │ │ @google/genai   │
│  Pricing & Tax    │ │  Bengaluru/Bhopal│ │ Catalog Grounded│
│  Promo Codes      │ │  Transit Matrix │ │ Medical Guard   │
└───────────────────┘ └─────────────────┘ └─────────────────┘
           │                   │                   │
┌──────────▼───────────────────▼───────────────────▼──────────┐
│                   Admin & Data Management                   │
│   Multi-Warehouse Inventory (Central, Bengaluru, Bhopal)    │
│   Order Fulfillment Lifecycle · Bulk CSV/JSON Import        │
│   Chronological Audit Logging · Role-Based Access Control    │
└─────────────────────────────────────────────────────────────┘
```

## 2. Server-Side Security & Pricing Guarantee
To prevent client-side price tampering or inventory race conditions:
1. **Cart & Price Calculation (`/api/checkout/calculate`)**:
   - Clients send only `{ productId, quantity, shadeId }` arrays.
   - Prices, discounts, and item availability are verified against the authoritative server catalog (`MASTER_PRODUCTS_CATALOG`).
   - Shipping fee (flat ₹99, complimentary for orders $\ge$ ₹999) and taxes (18% inclusive GST per Indian regulations) are computed on the server.
2. **Order Verification & Signature Checking**:
   - Order tokens are generated with unique identifiers (`MM-IN-xxxxxx`).
   - Payment signatures are processed through the server payment verification gateway before transitioning status to `Confirmed`.

## 3. Multi-Warehouse Inventory Architecture
Inventory is tracked across three distinct fulfillment hubs:
- **Central Storage Warehouse**: Main repository for national buffer stock.
- **Bengaluru Hub (Indiranagar)**: Dedicated to Karnataka & Southern Indian fulfillment with next-day and express dispatch.
- **Bhopal Regional Hub (MP Nagar)**: Dedicated to Central & Northern Indian regional fulfillment with 24–48 hour transit windows.

## 4. AI Artistry & Guardrail Architecture
- Built on modern `@google/genai` TypeScript SDK using `gemini-3.8-flash`.
- Uses system instructions and prompt grounding: the model receives product names, prices, active ingredients, and customer skin profiles.
- Strict cosmetic boundaries: If inquiries suggest clinical skin pathology (cystic acne, eczema, fungal infections), the system injects medical referral disclaimers advising consultation with a certified dermatologist.
- Resilient fallback: If external API limits are encountered, the built-in catalog recommendation engine handles chromatic shade matching and routine generation with zero user interruption.
