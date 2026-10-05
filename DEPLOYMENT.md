# Deployment Guide — Mariyam Maquillage

This document describes the production release pipeline and deployment process for Mariyam Maquillage.

## Target Platform: Vercel

Mariyam Maquillage is configured for seamless deployment to Vercel.

### 1. Vercel Configuration (`vercel.json`)
The application includes a root `vercel.json` configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Rewrites**: All web routes (`/shop`, `/bridal-studio`, `/admin`, `/quiz`, etc.) route to `/index.html`.
- **API Pass-through**: `/api/*` routes are handled without static asset intercept.
- **Security Headers**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`.

### 2. Required Production Environment Variables
Configure the following variables in your Vercel Project Settings under **Settings > Environment Variables**:

| Variable Name | Environment | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | Production | Set to `production` |
| `GEMINI_API_KEY` | Production, Preview | Google Gemini API key for live AI advisor |
| `RAZORPAY_KEY_ID` | Production | Razorpay public key ID for real transactions |
| `RAZORPAY_KEY_SECRET` | Production | Razorpay secret key (never exposed to browser) |
| `VITE_SITE_URL` | Production | Canonical site URL (`https://www.mariyammaquillage.com`) |

### 3. Verification Steps Before Release
Always run the validation suite before triggering a production merge:

```bash
# 1. Type check
npm run type-check

# 2. Lint check
npm run lint

# 3. Automated tests
npm run test

# 4. Production build test
npm run build
```

### 4. Custom Domain Setup
In your domain registrar (e.g., Cloudflare, GoDaddy, Namecheap):
- Point `CNAME` for `www` to `cname.vercel-dns.com`
- Point `A` record for apex `@` to `76.76.21.21` (Vercel IP)
- Vercel automatically issues and renews an SSL/TLS certificate via Let's Encrypt.
