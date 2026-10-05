import { MASTER_PRODUCTS_CATALOG } from '../data/catalogData';
import {
  Product,
  Order,
  WarehouseStock,
  AuditLog,
  AnalyticsSummary,
  BulkImportReport,
  BulkImportRow,
  UserRole,
} from '../types';

// In-memory server state with initial seeds
const serverProducts: Product[] = [...MASTER_PRODUCTS_CATALOG];

const serverWarehouseInventory: Map<string, WarehouseStock> = new Map();
// Seed warehouse inventory for all catalog products
serverProducts.forEach((p) => {
  serverWarehouseInventory.set(p.id, {
    productId: p.id,
    sku: p.sku,
    central: Math.round(p.stockCount * 0.6),
    bengaluru: Math.round(p.stockCount * 0.25),
    bhopal: Math.round(p.stockCount * 0.15),
    lowStockThreshold: 15,
  });
});

const serverAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    actor: 'system_admin@mariyammaquillage.com',
    role: 'superadmin',
    action: 'SYSTEM_BOOTSTRAP',
    entity: 'Product',
    entityId: 'all',
    details: 'Initialized luxury Indian catalog with 18 master atelier references.',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    actor: 'inventory_mgr@mariyammaquillage.com',
    role: 'catalog_manager',
    action: 'INVENTORY_REBALANCE',
    entity: 'Inventory',
    entityId: 'hub-bengaluru',
    details: 'Allocated 25% stock to Indiranagar fulfillment hub.',
  },
];

export function logAuditAction(
  actor: string,
  role: UserRole,
  action: string,
  entity: AuditLog['entity'],
  entityId: string,
  details: string
): AuditLog {
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    actor,
    role,
    action,
    entity,
    entityId,
    details,
  };
  serverAuditLogs.unshift(log);
  if (serverAuditLogs.length > 200) {
    serverAuditLogs.pop();
  }
  return log;
}

export function getServerProducts(): Product[] {
  return serverProducts;
}

export function addServerProduct(product: Product, actor = 'admin'): Product {
  serverProducts.unshift(product);
  serverWarehouseInventory.set(product.id, {
    productId: product.id,
    sku: product.sku,
    central: Math.round(product.stockCount * 0.6),
    bengaluru: Math.round(product.stockCount * 0.25),
    bhopal: Math.round(product.stockCount * 0.15),
    lowStockThreshold: 15,
  });

  logAuditAction(actor, 'superadmin', 'PRODUCT_CREATE', 'Product', product.id, `Created product "${product.name}" (${product.sku}) at ₹${product.price}`);
  return product;
}

export function updateServerProduct(id: string, updates: Partial<Product>, actor = 'admin'): Product | null {
  const index = serverProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  serverProducts[index] = { ...serverProducts[index], ...updates };

  logAuditAction(actor, 'superadmin', 'PRODUCT_UPDATE', 'Product', id, `Updated attributes on "${serverProducts[index].name}"`);
  return serverProducts[index];
}

export function deleteServerProduct(id: string, actor = 'admin'): boolean {
  const index = serverProducts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  const name = serverProducts[index].name;
  serverProducts.splice(index, 1);
  serverWarehouseInventory.delete(id);

  logAuditAction(actor, 'superadmin', 'PRODUCT_DELETE', 'Product', id, `Removed product "${name}" from active catalog.`);
  return true;
}

export function getServerWarehouseInventory(): WarehouseStock[] {
  return Array.from(serverWarehouseInventory.values());
}

export function updateWarehouseStock(productId: string, stockUpdates: Partial<WarehouseStock>, actor = 'admin'): WarehouseStock | null {
  const current = serverWarehouseInventory.get(productId);
  if (!current) return null;

  const updated: WarehouseStock = { ...current, ...stockUpdates };
  serverWarehouseInventory.set(productId, updated);

  const product = serverProducts.find((p) => p.id === productId);
  if (product) {
    product.stockCount = updated.central + updated.bengaluru + updated.bhopal;
    product.inStock = product.stockCount > 0;
  }

  logAuditAction(actor, 'catalog_manager', 'STOCK_UPDATE', 'Inventory', productId, `Updated warehouse stocks (Central: ${updated.central}, BLR: ${updated.bengaluru}, BPL: ${updated.bhopal})`);
  return updated;
}

export function getServerAuditLogs(): AuditLog[] {
  return serverAuditLogs;
}

export function calculateAnalytics(orders: Order[] = []): AnalyticsSummary {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  let centralStockTotal = 0;
  let bengaluruStockTotal = 0;
  let bhopalStockTotal = 0;

  serverWarehouseInventory.forEach((w) => {
    centralStockTotal += w.central;
    bengaluruStockTotal += w.bengaluru;
    bhopalStockTotal += w.bhopal;
  });

  // Calculate categories
  const catMap = new Map<string, { count: number; revenue: number }>();
  serverProducts.forEach((p) => {
    const existing = catMap.get(p.department) || { count: 0, revenue: 0 };
    catMap.set(p.department, {
      count: existing.count + 1,
      revenue: existing.revenue + p.price * 10,
    });
  });

  const topCategories = Array.from(catMap.entries()).map(([category, val]) => ({
    category,
    count: val.count,
    revenue: val.revenue,
  }));

  const topProducts = serverProducts.slice(0, 5).map((p, i) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    unitsSold: (5 - i) * 140 + 85,
    revenue: ((5 - i) * 140 + 85) * p.price,
  }));

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    totalCustomers: 1240,
    conversionRate: 3.4,
    centralStockTotal,
    bengaluruStockTotal,
    bhopalStockTotal,
    topCategories,
    topProducts,
  };
}

// Bulk CSV/JSON Import Validator
export function validateBulkImport(rawRows: any[]): BulkImportReport {
  const rows: BulkImportRow[] = [];
  const existingSkus = new Set(serverProducts.map((p) => p.sku.toUpperCase()));
  const seenInBatch = new Set<string>();

  let validCount = 0;
  let warningCount = 0;
  let errorCount = 0;
  let duplicateCount = 0;

  for (const raw of rawRows) {
    const sku = String(raw.sku || raw.SKU || '').trim().toUpperCase();
    const name = String(raw.name || raw.Name || raw.title || '').trim();
    const brand = String(raw.brand || raw.Brand || 'Mariyam Maquillage').trim();
    const department = String(raw.department || raw.category || raw.Department || 'Makeup').trim();
    const subcategory = String(raw.subcategory || raw.Subcategory || 'Cosmetics').trim();
    const price = Number(raw.price || raw.Price || 0);
    const mrp = Number(raw.mrp || raw.MRP || price || 0);
    const stock = Number(raw.stock || raw.inventory || raw.quantity || 50);

    const errors: string[] = [];
    const warnings: string[] = [];

    if (!sku) {
      errors.push('Missing required SKU code.');
    }
    if (!name) {
      errors.push('Missing product name.');
    }
    if (price <= 0) {
      errors.push('Price must be greater than ₹0.');
    }
    if (mrp < price) {
      warnings.push(`MRP (₹${mrp}) is lower than Selling Price (₹${price}); adjusted MRP to match price.`);
    }

    let isDup = false;
    if (sku) {
      if (existingSkus.has(sku)) {
        errors.push(`SKU "${sku}" already exists in active store catalog.`);
        isDup = true;
      }
      if (seenInBatch.has(sku)) {
        errors.push(`Duplicate SKU "${sku}" repeated within this upload batch.`);
        isDup = true;
      }
      seenInBatch.add(sku);
    }

    let status: BulkImportRow['status'] = 'valid';
    if (isDup) {
      status = 'duplicate';
      duplicateCount++;
    } else if (errors.length > 0) {
      status = 'error';
      errorCount++;
    } else if (warnings.length > 0) {
      status = 'warning';
      warningCount++;
    } else {
      validCount++;
    }

    rows.push({
      sku,
      name: name || 'Unnamed Item',
      brand,
      department,
      subcategory,
      price,
      mrp: mrp >= price ? mrp : price,
      stock,
      status,
      errors,
      warnings,
    });
  }

  return {
    totalRows: rawRows.length,
    validCount,
    warningCount,
    errorCount,
    duplicateCount,
    rows,
  };
}

export function commitBulkImport(validRows: BulkImportRow[], actor = 'admin'): Product[] {
  const importedProducts: Product[] = [];

  for (const row of validRows) {
    if (row.status === 'valid' || row.status === 'warning') {
      const newProduct: Product = {
        id: `mm-prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        sku: row.sku,
        name: row.name,
        slug: row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        brand: row.brand,
        brandType: 'Mariyam Signature',
        department: row.department as any,
        category: row.department as any,
        subcategory: row.subcategory,
        price: row.price,
        mrp: row.mrp,
        rating: 4.8,
        reviewCount: 1,
        images: [
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        ],
        skinTypeCompatibility: ['Oily', 'Combination', 'Normal'],
        concerns: ['Hydration', 'Radiance'],
        keyIngredients: ['Damask Rose', 'Hyaluronic Acid'],
        shortDescription: `Artisanal ${row.name} handcrafted for Indian beauty standards.`,
        description: `Premium ${row.name} formulated by Mariyam Maquillage. Dermatologically evaluated and tested under Indian climatic conditions.`,
        benefits: ['Long-wearing', 'Hydrating', 'Lightweight'],
        ingredients: 'Aqua, Glycerin, Niacinamide, Squalane, Rosa Damascena Flower Extract, Phenoxyethanol.',
        howToUse: 'Apply gently onto cleansed skin. Blend with fingertips or beauty sponge.',
        sizeVolume: '30 ml',
        inStock: row.stock > 0,
        stockCount: row.stock,
        status: 'Active',
        authenticity: {
          guaranteed: true,
          seller: 'Mariyam Maquillage Atelier India Pvt Ltd',
          manufacturer: 'Maquillage Laboratories Pvt Ltd',
          countryOfOrigin: 'India',
          batchNumber: `MM-26-${Math.floor(1000 + Math.random() * 9000)}`,
          shelfLifeMonths: 24,
          returnPolicy: '15-Day Easy Returns on Unopened Packages',
        },
      };

      addServerProduct(newProduct, actor);
      importedProducts.push(newProduct);
    }
  }

  logAuditAction(actor, 'catalog_manager', 'BULK_IMPORT_COMMIT', 'BulkImport', `batch-${Date.now()}`, `Committed ${importedProducts.length} validated items to catalog.`);
  return importedProducts;
}
