import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, Order } from '../types';
import { formatCurrency } from '../utils/format';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, cartDiscount, cartShipping, cartTotal, appliedPromo, createOrder, user } = useStore();

  const [address, setAddress] = useState<ShippingAddress>(user.address || {
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'Credit/Debit Card' | 'UPI / Netbanking' | 'Cash on Delivery'>('Credit/Debit Card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (cart.length === 0 && !confirmedOrder) {
    return (
      <Box sx={{ py: 12, textAlign: 'center', minHeight: '70vh', bgcolor: '#FAF8F5' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Your shopping bag is empty
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
            Add luxury items from our collection before proceeding to checkout.
          </Typography>
          <Button component={Link} to="/shop" variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>
            Return to Shop
          </Button>
        </Container>
      </Box>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.postalCode) {
      setErrorMsg('Please complete all required shipping fields.');
      return;
    }
    setErrorMsg('');

    const newOrder = createOrder({
      shippingAddress: address,
      paymentMethod,
    });

    setConfirmedOrder(newOrder);
    navigate(`/order/${newOrder.id}`);
  };

  // Order Confirmed View
  if (confirmedOrder) {
    return (
      <Box sx={{ py: 10, bgcolor: '#FAF8F5', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              textAlign: 'center',
              bgcolor: '#ffffff',
              border: '1px solid rgba(183, 110, 121, 0.25)',
              boxShadow: '0 16px 50px rgba(183, 110, 121, 0.1)',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 72, color: '#B76E79', mb: 1.5 }} />
            <Typography variant="overline" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.2em' }}>
              Order Confirmed & Payment Verified
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a', mt: 0.5, mb: 1 }}>
              Thank You, {confirmedOrder.shippingAddress.fullName}!
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', maxWidth: 560, mx: 'auto', mb: 4, lineHeight: 1.7 }}>
              Your order <strong>#{confirmedOrder.orderNumber}</strong> has been received by Mariyam Maquillage Atelier. We are carefully preparing your luxury box.
            </Typography>

            {/* Receipt Summary Card */}
            <Box sx={{ bgcolor: '#FAF8F5', p: 3, borderRadius: 2.5, textAlign: 'left', mb: 4, maxWidth: 540, mx: 'auto', border: '1px solid #e8e0d7' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>Tracking Number:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#B76E79' }}>{confirmedOrder.trackingNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>Estimated Delivery:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{confirmedOrder.estimatedDelivery}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>Payment Method:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{confirmedOrder.paymentMethod}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>Destination:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state}</Typography>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Amount Charged:</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#B76E79' }}>{formatCurrency(confirmedOrder.total)}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/account?tab=orders')}
                sx={{ borderRadius: 2, px: 4, py: 1.3, fontWeight: 700 }}
              >
                Track Order In My Account
              </Button>
              <Button
                component={Link}
                to="/shop"
                variant="outlined"
                sx={{ borderRadius: 2, px: 3, py: 1.3, fontWeight: 700 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: '#FAF8F5', minHeight: '85vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#B76E79', fontWeight: 700, letterSpacing: '0.2em' }}>
            Safe & Encrypted
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, fontWeight: 700, color: '#1a1a1a', mt: 0.5 }}>
            Checkout
          </Typography>
        </Box>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            {errorMsg}
          </Alert>
        )}

        <Grid container spacing={5}>
          {/* Left Form: Shipping & Payment */}
          <Grid item xs={12} md={7}>
            <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid rgba(183, 110, 121, 0.2)' }}>
              <Box component="form" onSubmit={handlePlaceOrder}>
                {/* 1. Shipping Details */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}>
                  1. Shipping & Contact Details
                </Typography>

                <Grid container spacing={2.5} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Full Legal Name"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Phone Number"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Street Address / Suite"
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="City"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="State"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Postal / ZIP Code"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      required
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ mb: 4 }} />

                {/* 2. Delivery Speed */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}>
                  2. Delivery Speed
                </Typography>

                <RadioGroup
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value as any)}
                  sx={{ mb: 4 }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      borderRadius: 2,
                      border: shippingMethod === 'standard' ? '2px solid #B76E79' : '1px solid #ddd',
                      bgcolor: shippingMethod === 'standard' ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                    }}
                  >
                    <FormControlLabel
                      value="standard"
                      control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                      label={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Complimentary Standard Delivery (3–4 Business Days)</Typography>
                            <Typography sx={{ color: '#777', fontSize: '0.78rem' }}>Thermal insulated packaging</Typography>
                          </Box>
                          <Typography sx={{ fontWeight: 700, color: '#2E7D32', ml: 2 }}>FREE</Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>
                  <Paper
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: shippingMethod === 'express' ? '2px solid #B76E79' : '1px solid #ddd',
                      bgcolor: shippingMethod === 'express' ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                    }}
                  >
                    <FormControlLabel
                      value="express"
                      control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                      label={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>VIP Next-Day Priority Courier (1 Business Day)</Typography>
                            <Typography sx={{ color: '#777', fontSize: '0.78rem' }}>Direct dispatch from Bengaluru / Bhopal Fulfilment Center</Typography>
                          </Box>
                          <Typography sx={{ fontWeight: 700, color: '#1a1a1a', ml: 2 }}>+₹149</Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>
                </RadioGroup>

                <Divider sx={{ mb: 4 }} />

                {/* 3. Payment Method */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 2 }}>
                  3. Payment Method
                </Typography>

                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  sx={{ mb: 3 }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      borderRadius: 2,
                      border: paymentMethod === 'Credit/Debit Card' ? '2px solid #B76E79' : '1px solid #ddd',
                      bgcolor: paymentMethod === 'Credit/Debit Card' ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                    }}
                  >
                    <FormControlLabel
                      value="Credit/Debit Card"
                      control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CreditCardIcon sx={{ color: '#B76E79' }} />
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Credit or Debit Card (Visa, Mastercard, Amex)</Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>

                  <Paper
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      borderRadius: 2,
                      border: paymentMethod === 'UPI / Netbanking' ? '2px solid #B76E79' : '1px solid #ddd',
                      bgcolor: paymentMethod === 'UPI / Netbanking' ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                    }}
                  >
                    <FormControlLabel
                      value="UPI / Netbanking"
                      control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccountBalanceIcon sx={{ color: '#B76E79' }} />
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>UPI / Net Banking / Digital Wallets</Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>

                  <Paper
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: paymentMethod === 'Cash on Delivery' ? '2px solid #B76E79' : '1px solid #ddd',
                      bgcolor: paymentMethod === 'Cash on Delivery' ? 'rgba(183, 110, 121, 0.05)' : '#fff',
                    }}
                  >
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio sx={{ color: '#B76E79', '&.Mui-checked': { color: '#B76E79' } }} />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PaymentsIcon sx={{ color: '#B76E79' }} />
                          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Cash on Delivery (Pay upon arrival)</Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>
                </RadioGroup>

                {/* Card Fields Mockup */}
                {paymentMethod === 'Credit/Debit Card' && (
                  <Box sx={{ p: 2.5, bgcolor: '#FAF8F5', borderRadius: 2, mb: 4, border: '1px solid #e8e0d7' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Card Number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Expiry MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          label="CVC / Security Code"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<LockOutlinedIcon />}
                  sx={{ py: 1.8, borderRadius: 2, fontWeight: 700, fontSize: '1rem', letterSpacing: '0.1em' }}
                >
                  Place Order · {formatCurrency(cartTotal + (shippingMethod === 'express' ? 149 : 0))}
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Right Summary Sidebar */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              <Card sx={{ p: 3.5, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid rgba(183, 110, 121, 0.2)' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5 }}>
                  Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </Typography>

                {/* Cart items list */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3, maxHeight: 280, overflowY: 'auto', pr: 1 }}>
                  {cart.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box component="img" src={item.image} alt={item.name} sx={{ width: 48, height: 48, borderRadius: 1.5, objectFit: 'cover' }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#777' }}>
                            Qty: {item.quantity} {item.selectedShade ? `· ${item.selectedShade.name}` : ''}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {formatCurrency(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ mb: 2 }} />

                {appliedPromo && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: '#2E7D32' }}>
                    <Typography variant="body2">Promo Code ({appliedPromo.code})</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>-{formatCurrency(cartDiscount)}</Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Subtotal</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(cartSubtotal)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Shipping Method</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {shippingMethod === 'standard' ? (cartShipping === 0 ? 'FREE' : formatCurrency(cartShipping)) : '₹149'}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Total Due</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#B76E79' }}>
                    {formatCurrency(cartTotal + (shippingMethod === 'express' ? 149 : 0))}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
