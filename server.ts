import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { askBeautyAdvisor } from './src/server/aiService';
import { lookupPincode } from './src/server/pincodeService';
import { calculateCheckout, createOrderOnServer, verifyPaymentServer } from './src/server/checkoutService';
import {
  getServerProducts,
  addServerProduct,
  updateServerProduct,
  deleteServerProduct,
  getServerWarehouseInventory,
  updateWarehouseStock,
  getServerAuditLogs,
  calculateAnalytics,
  validateBulkImport,
  commitBulkImport,
} from './src/server/adminService';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // ==========================================
  // API ROUTES
  // ==========================================

  // Health & Environment info
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      brand: 'Mariyam Maquillage',
      tagline: 'Your Beauty, Your Power!',
      environment: process.env.NODE_ENV || 'development',
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      hubs: ['Bengaluru Central', 'Bhopal Regional', 'Pan-India Surface'],
      currency: 'INR (₹)',
      version: '1.0.0-production',
    });
  });

  // Pincode Serviceability Engine
  app.post('/api/pincode/check', (req: Request, res: Response) => {
    const { pincode } = req.body;
    if (!pincode) {
      return res.status(400).json({ error: 'Pincode is required.' });
    }
    const result = lookupPincode(pincode);
    res.json(result);
  });

  // Gemini AI Beauty Concierge
  app.post('/api/ai/advisor', async (req: Request, res: Response) => {
    try {
      const { message, userProfile, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message query is required.' });
      }
      const response = await askBeautyAdvisor({ message, userProfile, history });
      res.json(response);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to process AI beauty consultation.', details: err?.message });
    }
  });

  // Server-side Cart & Checkout Calculation (Strict price & tax validation)
  app.post('/api/checkout/calculate', (req: Request, res: Response) => {
    try {
      const result = calculateCheckout(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to calculate checkout values.', details: err?.message });
    }
  });

  // Secure Order Creation
  app.post('/api/checkout/create-order', (req: Request, res: Response) => {
    try {
      const { calculation, shippingAddress, paymentMethod, city, pincode } = req.body;
      if (!calculation || !shippingAddress || !paymentMethod) {
        return res.status(400).json({ error: 'Missing required order placement payload.' });
      }
      const order = createOrderOnServer({
        calculation,
        shippingAddress,
        paymentMethod,
        city,
        pincode,
      });
      res.status(201).json(order);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to create order on server.', details: err?.message });
    }
  });

  // Payment Verification
  app.post('/api/payment/verify', (req: Request, res: Response) => {
    try {
      const result = verifyPaymentServer(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Payment verification failed.', details: err?.message });
    }
  });

  // Admin: Catalog Management
  app.get('/api/admin/products', (_req: Request, res: Response) => {
    res.json(getServerProducts());
  });

  app.post('/api/admin/products', (req: Request, res: Response) => {
    try {
      const product = addServerProduct(req.body, req.headers['x-actor'] as string || 'admin');
      res.status(201).json(product);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to create product.', details: err?.message });
    }
  });

  app.put('/api/admin/products/:id', (req: Request, res: Response) => {
    const updated = updateServerProduct(req.params.id, req.body, req.headers['x-actor'] as string || 'admin');
    if (!updated) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(updated);
  });

  app.delete('/api/admin/products/:id', (req: Request, res: Response) => {
    const success = deleteServerProduct(req.params.id, req.headers['x-actor'] as string || 'admin');
    if (!success) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product removed from catalog.' });
  });

  // Admin: Warehouse Inventory
  app.get('/api/admin/inventory', (_req: Request, res: Response) => {
    res.json(getServerWarehouseInventory());
  });

  app.put('/api/admin/inventory/:productId', (req: Request, res: Response) => {
    const updated = updateWarehouseStock(req.params.productId, req.body, req.headers['x-actor'] as string || 'admin');
    if (!updated) {
      return res.status(404).json({ error: 'Inventory reference not found.' });
    }
    res.json(updated);
  });

  // Admin: Audit Logs
  app.get('/api/admin/audit-logs', (_req: Request, res: Response) => {
    res.json(getServerAuditLogs());
  });

  // Admin: Analytics
  app.get('/api/admin/analytics', (_req: Request, res: Response) => {
    res.json(calculateAnalytics());
  });

  // Admin: Bulk Import Validation & Commit
  app.post('/api/admin/bulk-import/validate', (req: Request, res: Response) => {
    try {
      const { rows } = req.body;
      if (!Array.isArray(rows)) {
        return res.status(400).json({ error: 'Rows array is required.' });
      }
      const report = validateBulkImport(rows);
      res.json(report);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to validate bulk import data.', details: err?.message });
    }
  });

  app.post('/api/admin/bulk-import/commit', (req: Request, res: Response) => {
    try {
      const { validRows } = req.body;
      if (!Array.isArray(validRows)) {
        return res.status(400).json({ error: 'Valid rows array is required.' });
      }
      const committed = commitBulkImport(validRows, req.headers['x-actor'] as string || 'admin');
      res.json({ success: true, count: committed.length, products: committed });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to commit bulk items.', details: err?.message });
    }
  });

  // ==========================================
  // FRONTEND INTEGRATION (Vite dev or Static dist)
  // ==========================================
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Mariyam Maquillage Server] Running on http://0.0.0.0:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
