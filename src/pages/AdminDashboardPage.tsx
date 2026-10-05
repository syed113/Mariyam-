import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';
import { Product, Department, UserRole, Order } from '../types';
import { validateBulkImport, commitBulkImport } from '../server/adminService';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    addProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    warehouseInventory,
    updateWarehouseStockCount,
    tickets,
    updateTicketStatus,
    auditLogs,
    currentUser,
    loginAsRole,
  } = useStore();

  const [activeTab, setActiveTab] = useState(0);

  // Add Product Dialog State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    sku: '',
    brand: 'Mariyam Maquillage',
    department: 'Makeup' as Department,
    subcategory: 'Foundation',
    price: 1999,
    mrp: 2499,
    stockCount: 100,
    shortDescription: '',
    benefits: 'Long-wearing, Radiance, Skin Barrier Support',
  });

  // Bulk Import State
  const [bulkInputText, setBulkInputText] = useState(
    JSON.stringify(
      [
        {
          sku: 'MM-SAMPLE-01',
          name: 'Rose Gold Shimmer Setting Mist',
          brand: 'Mariyam Maquillage',
          department: 'Makeup',
          subcategory: 'Setting Spray',
          price: 1699,
          mrp: 2199,
          stock: 60,
        },
        {
          sku: 'MM-SAMPLE-02',
          name: 'Kashmiri Saffron Under-Eye Balm',
          brand: 'Mariyam Maquillage',
          department: 'Skincare',
          subcategory: 'Eye Treatment',
          price: 2299,
          mrp: 2799,
          stock: 45,
        },
      ],
      null,
      2
    )
  );

  const [bulkReport, setBulkReport] = useState<any>(null);
  const [bulkSuccessMessage, setBulkSuccessMessage] = useState<string | null>(null);

  // Ticket Reply Dialog State
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketReplyNote, setTicketReplyNote] = useState('');

  // Search in Products
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(productSearch.toLowerCase());
      const matchCat = categoryFilter === 'All' || p.department === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, productSearch, categoryFilter]);

  // Handle Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.sku) return;

    const newProd: Product = {
      id: `mm-prod-${Date.now()}`,
      sku: newProductForm.sku.toUpperCase(),
      name: newProductForm.name,
      slug: newProductForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: newProductForm.brand,
      brandType: 'Mariyam Signature',
      department: newProductForm.department,
      category: newProductForm.department,
      subcategory: newProductForm.subcategory,
      price: Number(newProductForm.price),
      mrp: Number(newProductForm.mrp),
      rating: 5.0,
      reviewCount: 0,
      images: [
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      ],
      skinTypeCompatibility: ['Oily', 'Combination', 'Normal', 'Dry'],
      concerns: ['Radiance', 'Hydration'],
      keyIngredients: ['Damask Rose', 'Hyaluronic Acid'],
      shortDescription: newProductForm.shortDescription || `Luxury ${newProductForm.name} formulated by Mariyam Maquillage.`,
      description: `Artisanal ${newProductForm.name} engineered for South Asian skin and tested in diverse Indian climates.`,
      benefits: newProductForm.benefits.split(',').map((b) => b.trim()),
      ingredients: 'Aqua, Glycerin, Rosa Damascena Flower Water, Niacinamide, Sodium Hyaluronate.',
      howToUse: 'Smooth evenly onto cleansed skin using clean fingertips or a precision brush.',
      sizeVolume: '30 ml',
      inStock: newProductForm.stockCount > 0,
      stockCount: Number(newProductForm.stockCount),
      status: 'Active',
      authenticity: {
        guaranteed: true,
        seller: 'Mariyam Maquillage Atelier India Pvt Ltd',
        manufacturer: 'Maquillage Laboratories Pvt Ltd',
        countryOfOrigin: 'India',
        batchNumber: `MM-26-${Math.floor(1000 + Math.random() * 9000)}`,
        shelfLifeMonths: 24,
        returnPolicy: '15-Day Easy Returns',
      },
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
    setNewProductForm({
      name: '',
      sku: '',
      brand: 'Mariyam Maquillage',
      department: 'Makeup',
      subcategory: 'Foundation',
      price: 1999,
      mrp: 2499,
      stockCount: 100,
      shortDescription: '',
      benefits: 'Long-wearing, Radiance, Skin Barrier Support',
    });
  };

  // Bulk validation
  const handleValidateBulk = () => {
    try {
      const parsed = JSON.parse(bulkInputText);
      const report = validateBulkImport(Array.isArray(parsed) ? parsed : [parsed]);
      setBulkReport(report);
      setBulkSuccessMessage(null);
    } catch (err: any) {
      alert(`Invalid JSON format: ${err.message}`);
    }
  };

  // Bulk commit
  const handleCommitBulk = () => {
    if (!bulkReport) return;
    const validRows = bulkReport.rows.filter((r: any) => r.status === 'valid' || r.status === 'warning');
    const committed = commitBulkImport(validRows, currentUser.email);
    committed.forEach((p) => addProduct(p));
    setBulkSuccessMessage(`Successfully added ${committed.length} validated products into the active catalog.`);
    setBulkReport(null);
  };

  // Totals for overview
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <Box sx={{ bgcolor: '#FAF8F5', minHeight: '90vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Top Header & Role Switcher */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            mb: 4,
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography
                variant="overline"
                sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.15em' }}
              >
                Atelier Governance Suite
              </Typography>
              <Chip
                label="LIVE SYSTEM ACTIVE"
                size="small"
                sx={{
                  bgcolor: '#1a1a1a',
                  color: '#D4A373',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  height: 20,
                }}
              />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              Operations & Fulfillment Command
            </Typography>
          </Box>

          {/* Role Switcher Toolbar */}
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: '#ffffff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: '#888', display: 'block', fontWeight: 600 }}>
                Logged In Operator
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                {currentUser.name} ({currentUser.role})
              </Typography>
            </Box>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="role-select-label">Switch Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={currentUser.role}
                label="Switch Role"
                onChange={(e) => loginAsRole(e.target.value as UserRole)}
              >
                <MenuItem value="superadmin">Super Admin</MenuItem>
                <MenuItem value="catalog_manager">Catalog Manager</MenuItem>
                <MenuItem value="order_manager">Order Manager</MenuItem>
                <MenuItem value="support_agent">Support Agent</MenuItem>
                <MenuItem value="customer">Customer View</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Box>

        {/* Tab Navigation */}
        <Paper sx={{ borderRadius: 3, mb: 4, bgcolor: '#ffffff', overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                textTransform: 'none',
                minHeight: 56,
                fontSize: '0.92rem',
              },
            }}
          >
            <Tab icon={<DashboardIcon />} iconPosition="start" label="Overview" />
            <Tab icon={<Inventory2Icon />} iconPosition="start" label={`Products (${products.length})`} />
            <Tab icon={<WarehouseIcon />} iconPosition="start" label="Warehouse Inventory" />
            <Tab icon={<ShoppingCartIcon />} iconPosition="start" label={`Orders (${orders.length})`} />
            <Tab icon={<SupportAgentIcon />} iconPosition="start" label={`Support Tickets (${tickets.length})`} />
            <Tab icon={<CloudUploadIcon />} iconPosition="start" label="Bulk Import" />
            <Tab icon={<HistoryEduIcon />} iconPosition="start" label="Audit Trail" />
          </Tabs>
        </Paper>

        {/* TAB 0: OVERVIEW */}
        {activeTab === 0 && (
          <Box>
            {/* Stat Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
                  <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
                    TOTAL REVENUE (VERIFIED)
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', my: 1 }}>
                    {formatCurrency(totalRevenue)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                    +18.4% from Indian metros
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
                  <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
                    ACTIVE ORDERS
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', my: 1 }}>
                    {totalOrders}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#8C4852', fontWeight: 600 }}>
                    Bengaluru & Bhopal hubs active
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
                  <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
                    AVERAGE ORDER VALUE
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', my: 1 }}>
                    {formatCurrency(aov || 2499)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777', fontWeight: 600 }}>
                    INR Cart Benchmark
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
                  <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
                    ACTIVE CATALOG ITEMS
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', my: 1 }}>
                    {products.length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#D4A373', fontWeight: 600 }}>
                    100% Dermatologically Tested
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Warehouse Hub Distribution */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Fulfillment Hub Performance
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ p: 2, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
                          BENGALURU CENTRAL
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', my: 0.5 }}>
                          Indiranagar Hub
                        </Typography>
                        <Chip label="Same-Day Dispatch" size="small" color="success" sx={{ fontSize: '0.65rem' }} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ p: 2, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
                          BHOPAL REGIONAL
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', my: 0.5 }}>
                          MP Nagar Hub
                        </Typography>
                        <Chip label="24-Hr Express" size="small" color="primary" sx={{ fontSize: '0.65rem' }} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ p: 2, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ color: '#888', fontWeight: 700 }}>
                          PAN-INDIA SURFACE
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', my: 0.5 }}>
                          Delhivery Air
                        </Typography>
                        <Chip label="2-4 Business Days" size="small" sx={{ fontSize: '0.65rem' }} />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Recent System Audits
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {auditLogs.slice(0, 4).map((log) => (
                      <Box key={log.id} sx={{ pb: 1.5, borderBottom: '1px solid #eee' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852' }}>
                            {log.action}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#444', fontSize: '0.85rem' }}>
                          {log.details}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* TAB 1: PRODUCTS */}
        {activeTab === 1 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 3,
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, flex: 1, maxWidth: 500 }}>
                <TextField
                  size="small"
                  placeholder="Search SKU, product title, or brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  fullWidth
                />
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <MenuItem value="All">All Categories</MenuItem>
                    <MenuItem value="Makeup">Makeup</MenuItem>
                    <MenuItem value="Skincare">Skincare</MenuItem>
                    <MenuItem value="Haircare">Haircare</MenuItem>
                    <MenuItem value="Fragrance">Fragrance</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddModalOpen(true)}
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                Add Product
              </Button>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#FAF8F5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>SKU</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>MRP</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Total Stock</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((p) => (
                    <TableRow key={p.id} hover>
                      <TableCell sx={{ fontWeight: 600, color: '#8C4852' }}>{p.sku}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                          {p.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#888' }}>
                          {p.brand} · {p.subcategory}
                        </Typography>
                      </TableCell>
                      <TableCell>{p.department}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{formatCurrency(p.price)}</TableCell>
                      <TableCell sx={{ color: '#888' }}>{formatCurrency(p.mrp)}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${p.stockCount} units`}
                          size="small"
                          color={p.stockCount > 20 ? 'default' : 'warning'}
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={p.status}
                          size="small"
                          color={p.status === 'Active' ? 'success' : 'default'}
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Delete Product">
                          <IconButton size="small" onClick={() => deleteProduct(p.id)} color="error">
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* TAB 2: WAREHOUSE INVENTORY */}
        {activeTab === 2 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Tri-Warehouse Inventory Allocation
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Stock levels distributed across Central Warehouse, Bengaluru Indiranagar Hub, and Bhopal MP Nagar Hub.
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#FAF8F5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Product & SKU</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Central Warehouse</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Bengaluru Hub</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Bhopal Hub</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Aggregate</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Adjust Stocks
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {warehouseInventory.map((item) => {
                    const prod = products.find((p) => p.id === item.productId);
                    const total = item.central + item.bengaluru + item.bhopal;
                    return (
                      <TableRow key={item.productId} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {prod?.name || item.sku}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#888' }}>
                            SKU: {item.sku}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.central} units</TableCell>
                        <TableCell>{item.bengaluru} units</TableCell>
                        <TableCell>{item.bhopal} units</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: total < 20 ? '#d32f2f' : '#1a1a1a' }}>
                          {total} units
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              const newBlr = prompt('New stock for Bengaluru Hub:', String(item.bengaluru));
                              if (newBlr !== null && !isNaN(Number(newBlr))) {
                                updateWarehouseStockCount(item.productId, { bengaluru: Number(newBlr) });
                              }
                            }}
                          >
                            Update BLR
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ ml: 1 }}
                            onClick={() => {
                              const newBpl = prompt('New stock for Bhopal Hub:', String(item.bhopal));
                              if (newBpl !== null && !isNaN(Number(newBpl))) {
                                updateWarehouseStockCount(item.productId, { bhopal: Number(newBpl) });
                              }
                            }}
                          >
                            Update BPL
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 3 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Live Order Pipeline & Courier Fulfillment
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#FAF8F5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Order #</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>City & Pincode</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Update Stage
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id} hover>
                      <TableCell sx={{ fontWeight: 700, color: '#8C4852' }}>{o.orderNumber}</TableCell>
                      <TableCell>{o.date}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {o.shippingAddress?.fullName || 'Customer'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#888' }}>
                          {o.items?.length || 0} item(s)
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {o.city} · {o.pincode}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{formatCurrency(o.total)}</TableCell>
                      <TableCell>
                        <Chip
                          label={o.paymentStatus}
                          size="small"
                          color={o.paymentStatus === 'Paid' ? 'success' : 'warning'}
                          sx={{ fontSize: '0.68rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={o.status}
                          size="small"
                          color={o.status === 'Delivered' ? 'success' : 'primary'}
                          sx={{ fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <FormControl size="small" sx={{ minWidth: 130 }}>
                          <Select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as Order['status'])}
                          >
                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* TAB 4: SUPPORT TICKETS */}
        {activeTab === 4 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Customer Concierge Tickets
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#FAF8F5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Ticket ID</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="right">
                      Resolution
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((t) => (
                    <TableRow key={t.id} hover>
                      <TableCell sx={{ fontWeight: 700, color: '#8C4852' }}>{t.ticketId}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {t.customerName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#888' }}>
                          {t.phone}
                        </Typography>
                      </TableCell>
                      <TableCell>{t.category}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {t.subject}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                          {t.message}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t.status}
                          size="small"
                          color={t.status === 'Resolved' ? 'success' : t.status === 'In Progress' ? 'warning' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setSelectedTicketId(t.id);
                            setTicketReplyNote(t.replyNote || '');
                          }}
                        >
                          Resolve / Reply
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* TAB 5: BULK IMPORT */}
        {activeTab === 5 && (
          <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Bulk Product Ingestion Engine (CSV / JSON)
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Validate schema conformity, duplicate SKUs, required MRPs, and pricing before committing to the live catalog.
            </Typography>

            {bulkSuccessMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {bulkSuccessMessage}
              </Alert>
            )}

            <TextField
              multiline
              rows={8}
              fullWidth
              value={bulkInputText}
              onChange={(e) => setBulkInputText(e.target.value)}
              placeholder="Paste JSON array of products here..."
              sx={{ fontFamily: 'monospace', mb: 2.5 }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button variant="contained" onClick={handleValidateBulk} sx={{ fontWeight: 700 }}>
                Run Pre-Import Validation
              </Button>
              {bulkReport && bulkReport.validCount + bulkReport.warningCount > 0 && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCommitBulk}
                  sx={{ fontWeight: 700 }}
                >
                  Commit Valid Items ({bulkReport.validCount + bulkReport.warningCount})
                </Button>
              )}
            </Box>

            {/* Validation Report Table */}
            {bulkReport && (
              <Box sx={{ mt: 3, p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Validation Summary: {bulkReport.totalRows} Total Items | {bulkReport.validCount} Valid |{' '}
                  {bulkReport.warningCount} Warnings | {bulkReport.errorCount} Errors |{' '}
                  {bulkReport.duplicateCount} Duplicates
                </Typography>

                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>SKU</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Notes / Diagnostics</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bulkReport.rows.map((row: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell sx={{ fontWeight: 600 }}>{row.sku}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{formatCurrency(row.price)}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.status.toUpperCase()}
                              size="small"
                              color={
                                row.status === 'valid'
                                  ? 'success'
                                  : row.status === 'warning'
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {row.errors.map((e: string, idx: number) => (
                              <Typography key={idx} variant="caption" sx={{ color: '#d32f2f', display: 'block' }}>
                                • {e}
                              </Typography>
                            ))}
                            {row.warnings.map((w: string, idx: number) => (
                              <Typography key={idx} variant="caption" sx={{ color: '#ed6c02', display: 'block' }}>
                                • {w}
                              </Typography>
                            ))}
                            {row.errors.length === 0 && row.warnings.length === 0 && (
                              <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                                Valid schema & attributes
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        )}

        {/* TAB 6: AUDIT TRAIL */}
        {activeTab === 6 && (
          <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Chronological Audit Trail
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#FAF8F5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Timestamp</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actor</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Entity</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id} hover>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{log.actor}</TableCell>
                      <TableCell>
                        <Chip label={log.role} size="small" sx={{ fontSize: '0.65rem' }} />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#8C4852' }}>{log.action}</TableCell>
                      <TableCell>{log.entity}</TableCell>
                      <TableCell>{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* ADD PRODUCT DIALOG */}
        <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} maxWidth="md" fullWidth>
          <form onSubmit={handleCreateProduct}>
            <DialogTitle sx={{ fontWeight: 700 }}>Add New Atelier Product</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SKU"
                    required
                    fullWidth
                    value={newProductForm.sku}
                    onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                    placeholder="e.g. MM-FND-07"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Product Name"
                    required
                    fullWidth
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={newProductForm.department}
                      label="Department"
                      onChange={(e) => setNewProductForm({ ...newProductForm, department: e.target.value as any })}
                    >
                      <MenuItem value="Makeup">Makeup</MenuItem>
                      <MenuItem value="Skincare">Skincare</MenuItem>
                      <MenuItem value="Haircare">Haircare</MenuItem>
                      <MenuItem value="Fragrance">Fragrance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Subcategory"
                    fullWidth
                    value={newProductForm.subcategory}
                    onChange={(e) => setNewProductForm({ ...newProductForm, subcategory: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Selling Price (₹)"
                    type="number"
                    required
                    fullWidth
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="MRP (₹)"
                    type="number"
                    required
                    fullWidth
                    value={newProductForm.mrp}
                    onChange={(e) => setNewProductForm({ ...newProductForm, mrp: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Initial Stock Units"
                    type="number"
                    required
                    fullWidth
                    value={newProductForm.stockCount}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stockCount: Number(e.target.value) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Short Marketing Description"
                    multiline
                    rows={2}
                    fullWidth
                    value={newProductForm.shortDescription}
                    onChange={(e) => setNewProductForm({ ...newProductForm, shortDescription: e.target.value })}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
              <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ fontWeight: 700 }}>
                Publish to Catalog
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* TICKET REPLY DIALOG */}
        <Dialog open={Boolean(selectedTicketId)} onClose={() => setSelectedTicketId(null)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Resolve Support Ticket</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Add concierge reply note and update customer ticket resolution status.
            </Typography>
            <TextField
              label="Concierge Reply / Courier Details"
              multiline
              rows={4}
              fullWidth
              value={ticketReplyNote}
              onChange={(e) => setTicketReplyNote(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setSelectedTicketId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (selectedTicketId) {
                  updateTicketStatus(selectedTicketId, 'Resolved', ticketReplyNote);
                  setSelectedTicketId(null);
                }
              }}
            >
              Mark as Resolved
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
