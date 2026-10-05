import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  CardMedia,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/format';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useStore();

  const currentOrder = orders.find((o) => o.id === orderId || o.orderNumber === orderId) || orders[0];

  if (!currentOrder) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Order Not Found
        </Typography>
        <Button component={Link} to="/shop" variant="contained">
          Return to Atelier
        </Button>
      </Container>
    );
  }

  const activeStep = currentOrder.status === 'Delivered'
    ? 4
    : currentOrder.status === 'Out for Delivery'
    ? 3
    : currentOrder.status === 'Shipped'
    ? 2
    : currentOrder.status === 'Processing'
    ? 1
    : 0;

  return (
    <Box sx={{ bgcolor: '#FAF8F5', minHeight: '85vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Success Banner */}
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: '#ffffff',
            boxShadow: '0 8px 30px rgba(183, 110, 121, 0.08)',
            mb: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: 'rgba(46, 125, 50, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 44, color: '#2e7d32' }} />
          </Box>

          <Typography variant="overline" sx={{ color: '#8C4852', fontWeight: 700, letterSpacing: '0.15em' }}>
            Payment Verified & Authenticated
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a1a', my: 1 }}>
            Thank You For Your Order
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', maxWidth: 600, mx: 'auto' }}>
            Your artisanal beauty formulation has been reserved in our climate-controlled fulfillment atelier.
          </Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, mt: 3, p: 1.5, bgcolor: '#FAF8F5', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              Order Reference: <span style={{ color: '#8C4852' }}>{currentOrder.orderNumber}</span>
            </Typography>
            <Chip
              label={currentOrder.paymentStatus}
              size="small"
              color={currentOrder.paymentStatus === 'Paid' ? 'success' : 'warning'}
              sx={{ fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Tracking Stepper */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Fulfillment Timeline
              </Typography>

              <Stepper activeStep={activeStep} orientation="vertical">
                {currentOrder.trackingSteps.map((step, index) => (
                  <Step key={index} completed={step.completed}>
                    <StepLabel>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', display: 'block' }}>
                        {step.date}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mt: 0.5 }}>
                        {step.description}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(183, 110, 121, 0.06)', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocalShippingIcon sx={{ color: '#8C4852' }} />
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#8C4852', display: 'block' }}>
                    COURIER DISPATCH PARTNER
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {currentOrder.courierName || 'Delhivery Express Indiranagar'} · Tracking: {currentOrder.trackingNumber}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Delivery Address */}
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                Delivery Destination
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                {currentOrder.shippingAddress?.fullName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {currentOrder.shippingAddress?.addressLine1}
                {currentOrder.shippingAddress?.addressLine2 && `, ${currentOrder.shippingAddress?.addressLine2}`}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.state} - {currentOrder.shippingAddress?.postalCode}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                Contact Phone: {currentOrder.shippingAddress?.phone}
              </Typography>
            </Paper>
          </Grid>

          {/* Itemized Summary */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                Itemized Receipt ({currentOrder.items.length} items)
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                {currentOrder.items.map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.productName}
                      sx={{ width: 64, height: 64, borderRadius: 2, objectFit: 'cover' }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {item.productName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888' }}>
                        {item.brand} {item.selectedShade && `· Shade: ${item.selectedShade}`}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mt: 0.2 }}>
                        Qty: {item.quantity} × {formatCurrency(item.price)}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>Subtotal</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(currentOrder.subtotal)}</Typography>
              </Box>

              {currentOrder.discount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#2e7d32' }}>Promotional Savings</Typography>
                  <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 600 }}>-{formatCurrency(currentOrder.discount)}</Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#666' }}>Express Shipping</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {currentOrder.shippingCost === 0 ? 'Complimentary' : formatCurrency(currentOrder.shippingCost)}
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Total Paid</Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#8C4852' }}>
                  {formatCurrency(currentOrder.total)}
                </Typography>
              </Box>

              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button component={Link} to="/shop" variant="contained" fullWidth sx={{ py: 1.3, fontWeight: 700 }}>
                  Continue Shopping
                </Button>
                <Button component={Link} to="/account" variant="outlined" fullWidth sx={{ py: 1.3, fontWeight: 700 }}>
                  View All Orders in Account
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
