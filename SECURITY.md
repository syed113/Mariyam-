# Security Policy — Mariyam Maquillage

## 1. Secrets & Credential Management
- **Never commit `.env` or `.env.local` files**: The repository `.gitignore` explicitly bans all local environment files and key pairs.
- **Server-Side Key Isolation**: `GEMINI_API_KEY` and `RAZORPAY_KEY_SECRET` are accessed strictly within Node.js / Express server modules (`src/server/*`). They are never bundled into client-side JavaScript or exposed via `window` objects.

## 2. Payment Data & Privacy Protection
- **No Plaintext Card Storage**: Credit/Debit card numbers are never stored in plain text or local storage.
- **Payment Verification Gateways**: Orders are validated against cryptographic payment signatures.
- **Customer Confidentiality**: Addresses, contact numbers, and order histories are scoped to authenticated sessions.

## 3. Input Validation & Guardrails
- **Cart & Pricing Tamper Resistance**: Cart subtotal, discounts, and item pricing are verified on the server.
- **Medical & Clinical Safety Disclaimers**: AI recommendations explicitly disclaim medical diagnostic authority and refer users with skin pathology to qualified dermatologists.
- **Bulk CSV/JSON Sanitization**: Uploaded inventory and product records are schema-checked, stripped of script injections, and verified for unique SKU compliance before database commit.
