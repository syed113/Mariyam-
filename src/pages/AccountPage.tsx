import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  TextField,
  Chip,
  Card,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { formatCurrency } from '../utils/format';

export const AccountPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { user, updateUserProfile, orders, wishlist, products, beautyProfile } = useStore();

  const [addressForm, setAddressForm] = useState(user.address);
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ address: addressForm });
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 2500);
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        {/* Header Greeting */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.15em' }}>
              My Atelier Portal
            </Typography>
            <Chip
              label={user.loyaltyTier}
              size="small"
              sx={{ bgcolor: '#1a1a1a', color: '#D4A373', fontWeight: 700, fontSize: '0.7rem' }}
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
            Welcome back, {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Manage your past and active orders, view your customized beauty diagnosis, and redeem reward points.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Sidebar Menu (Inspired by Hayah Laboratories /my-account/) */}
          <Grid item xs={12} md={3.5} lg={3}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                bgcolor: '#ffffff',
                border: '1px solid rgba(183, 110, 121, 0.15)',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: 2.5, bgcolor: '#FAF8F5', borderBottom: '1px solid #f0eae4' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Account Navigation
                </Typography>
                <Typography variant="caption" sx={{ color: '#777' }}>
                  {user.email}
                </Typography>
              </Box>

              <List sx={{ p: 1 }}>
                {[
                  { key: 'dashboard', label: 'Dashboard Overview', icon: <DashboardOutlinedIcon /> },
                  { key: 'orders', label: `Orders & Tracking (${orders.length})`, icon: <ShoppingBagOutlinedIcon /> },
                  { key: 'beauty-profile', label: 'My Beauty Profile', icon: <FaceRetouchingNaturalOutlinedIcon /> },
                  { key: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: <FavoriteBorderOutlinedIcon /> },
                  { key: 'addresses', label: 'Saved Addresses', icon: <LocationOnOutlinedIcon /> },
                  { key: 'rewards', label: 'Loyalty & Rewards', icon: <StarsOutlinedIcon /> },
                ].map((item) => (
                  <ListItemButton
                    key={item.key}
                    selected={activeTab === item.key}
                    onClick={() => handleTabChange(item.key)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      '&.Mui-selected': {
                        bgcolor: 'rgba(183, 110, 121, 0.12)',
                        color: '#8C4852',
                        fontWeight: 700,
                        '& .MuiListItemIcon-root': { color: '#B76E79' },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 38, color: '#666' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.88rem', fontWeight: 600 }} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Tab Content Display */}
          <Grid item xs={12} md={8.5} lg={9}>
            {/* 1. Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Stats cards */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 3, borderRadius: 2.5, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                      <Typography variant="caption" sx={{ color: '#777', fontWeight: 600 }}>Active Orders</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
                        {orders.length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#B76E79', cursor: 'pointer', mt: 1, display: 'block' }} onClick={() => handleTabChange('orders')}>
                        View Tracking →
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 3, borderRadius: 2.5, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                      <Typography variant="caption" sx={{ color: '#777', fontWeight: 600 }}>Reward Points</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#B76E79', mt: 0.5 }}>
                        {user.rewardPoints} pts
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', mt: 1, display: 'block' }}>
                        Gold VIP Status (₹250 off eligible)
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 3, borderRadius: 2.5, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                      <Typography variant="caption" sx={{ color: '#777', fontWeight: 600 }}>Wishlist Items</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
                        {wishlist.length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#B76E79', cursor: 'pointer', mt: 1, display: 'block' }} onClick={() => handleTabChange('wishlist')}>
                        View Saved Items →
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Recent Order Preview */}
                {orders.length > 0 && (
                  <Paper sx={{ p: 3.5, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Latest Order: {orders[0].orderNumber}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#777' }}>
                          Placed on {orders[0].date} · Total: {formatCurrency(orders[0].total)}
                        </Typography>
                      </Box>
                      <Chip label={orders[0].status} sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 700 }} />
                    </Box>
                    <Button variant="outlined" size="small" onClick={() => handleTabChange('orders')}>
                      Track Shipment & Details
                    </Button>
                  </Paper>
                )}
              </Box>
            )}

            {/* 2. Orders & Tracking Tab */}
            {activeTab === 'orders' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Paper sx={{ p: 3.5, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Order History & Real-Time Shipment Tracking
                  </Typography>

                  {orders.map((ord) => (
                    <Box
                      key={ord.id}
                      sx={{
                        p: 3,
                        mb: 3,
                        borderRadius: 2.5,
                        border: '1px solid #eae2db',
                        bgcolor: '#FAF8F5',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                            Order #{ord.orderNumber}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#777' }}>
                            Ordered on {ord.date} · Tracking: <strong>{ord.trackingNumber}</strong>
                          </Typography>
                        </Box>
                        <Chip label={ord.status} sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 700 }} />
                      </Box>

                      {/* Stepper tracking */}
                      <Box sx={{ py: 3, px: { xs: 0, sm: 2 } }}>
                        <Stepper activeStep={ord.status === 'Shipped' ? 2 : 1} alternativeLabel>
                          {ord.trackingSteps.map((step) => (
                            <Step key={step.title} completed={step.completed}>
                              <StepLabel>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{step.title}</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: '#777' }}>{step.date}</Typography>
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Items */}
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                        Purchased Items:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {ord.items.map((item, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff', p: 1.5, borderRadius: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box component="img" src={item.image} alt={item.productName} sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover' }} />
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                  {item.productName}
                                </Typography>
                                {item.selectedShade && (
                                  <Typography variant="caption" sx={{ color: '#666' }}>
                                    Shade: {item.selectedShade}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                              {item.quantity} × {formatCurrency(item.price)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Box>
            )}

            {/* 3. Beauty Profile Tab */}
            {activeTab === 'beauty-profile' && (
              <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Your Saved Beauty Diagnostic Profile
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
                  This profile customizes shade suggestions and routine recommendations throughout your shopping experience.
                </Typography>

                {beautyProfile ? (
                  <Box>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ color: '#777' }}>Skin Type</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{beautyProfile.skinType}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ color: '#777' }}>Complexion Depth</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{beautyProfile.skinTone}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ color: '#777' }}>Targeted Concerns</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{beautyProfile.concerns.join(', ') || 'General Glow'}</Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ color: '#777' }}>Preferred Finish</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{beautyProfile.preferredStyle}</Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                    <Button component={Link} to="/quiz" variant="outlined" sx={{ borderRadius: 2 }}>
                      Retake Beauty Quiz
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                      You haven’t completed your AI Beauty Diagnostic yet.
                    </Typography>
                    <Button component={Link} to="/quiz" variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>
                      Take 60-Second Quiz
                    </Button>
                  </Box>
                )}
              </Paper>
            )}

            {/* 4. Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                  My Saved Wishlist ({wishlistedProducts.length} Items)
                </Typography>
                {wishlistedProducts.length === 0 ? (
                  <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#fff' }}>
                    <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                      Your wishlist is empty
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999', mb: 3 }}>
                      Click the heart icon on any product to save it here for later.
                    </Typography>
                    <Button component={Link} to="/shop" variant="contained">
                      Browse Shop
                    </Button>
                  </Paper>
                ) : (
                  <Grid container spacing={3}>
                    {wishlistedProducts.map((p) => (
                      <Grid item xs={12} sm={6} lg={4} key={p.id}>
                        <ProductCard product={p} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {/* 5. Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Shipping & Delivery Address
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                  Pre-fills your address during checkout for frictionless 1-click ordering.
                </Typography>

                {addressSaved && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Address successfully updated!
                  </Alert>
                )}

                <Box component="form" onSubmit={handleAddressSubmit}>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Full Legal Name"
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Phone Number"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Street Address / Suite"
                        value={addressForm.addressLine1}
                        onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="City"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="State / Province"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Postal / ZIP Code"
                        value={addressForm.postalCode}
                        onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Button type="submit" variant="contained" sx={{ mt: 3, borderRadius: 2, fontWeight: 700 }}>
                    Save Changes
                  </Button>
                </Box>
              </Paper>
            )}

            {/* 6. Rewards & Loyalty Tab */}
            {activeTab === 'rewards' && (
              <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #f0eae4' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700 }}>
                      Atelier VIP Club
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {user.rewardPoints} Loyalty Points
                    </Typography>
                  </Box>
                  <Chip label="Tier: Gold VIP" sx={{ bgcolor: '#1a1a1a', color: '#D4A373', fontWeight: 700, px: 1 }} />
                </Box>

                <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
                  Earn 1 point for every ₹10 spent. Redeem reward points at checkout for instant cash discounts on your favorite luxury products.
                </Typography>

                <Grid container spacing={3}>
                  {[
                    { pts: '200 Pts', reward: '₹200 Off Voucher', code: 'REWARD200' },
                    { pts: '450 Pts', reward: '₹500 Off Voucher', code: 'REWARD500' },
                    { pts: '800 Pts', reward: 'Complimentary Full-Size Lipstick', code: 'LIPGIFT' },
                  ].map((rew, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Card sx={{ p: 2.5, borderRadius: 2, bgcolor: '#FAF8F5', border: '1px solid #e5dcd3' }}>
                        <Typography variant="caption" sx={{ color: '#B76E79', fontWeight: 700 }}>
                          {rew.pts}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, my: 0.5 }}>
                          {rew.reward}
                        </Typography>
                        <Chip label={`Code: ${rew.code}`} size="small" sx={{ bgcolor: '#fff', border: '1px solid #ddd', fontSize: '0.7rem' }} />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
