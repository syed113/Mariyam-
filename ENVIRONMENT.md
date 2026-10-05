# Environment Variables Specification — Mariyam Maquillage

This document defines all environment variables utilized across local development, preview deployments, and production releases.

## Variable Reference

### `PORT`
- **Default**: `3000`
- **Scope**: Server only
- **Description**: Port on which the Express application server listens for incoming HTTP requests.

### `NODE_ENV`
- **Allowed Values**: `development`, `test`, `production`
- **Scope**: Server and Build
- **Description**: Controls bundling optimizations, error detail verbosity, and static asset serving mode.

### `GEMINI_API_KEY`
- **Required**: Yes (for live Gemini API calls; fallback catalog engine handles requests when omitted)
- **Scope**: Server only
- **Description**: API key for Google Gemini models (`gemini-3.8-flash`) used by the AI Beauty Advisor. In Google AI Studio Build, this is injected automatically.

### `RAZORPAY_KEY_ID`
- **Required**: Optional in sandbox, required for live payments
- **Scope**: Server
- **Description**: Razorpay Merchant Key ID.

### `RAZORPAY_KEY_SECRET`
- **Required**: Optional in sandbox, required for live payments
- **Scope**: Server only (CRITICAL)
- **Description**: Razorpay secret used to cryptographically verify payment signatures.

### `VITE_SITE_URL`
- **Default**: `https://www.mariyammaquillage.com`
- **Scope**: Client & Server
- **Description**: Canonical public base URL used for OpenGraph cards, sitemap URLs, and Schema.org metadata.
